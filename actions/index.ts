"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const roleSchema = z.enum(["JOB_SEEKER", "EMPLOYER"]);

const createJobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  salary: z.number().optional(),
});

const applySchema = z.object({
  jobId: z.string(),
  resumeUrl: z.string().optional(),
  coverLetter: z.string().optional(),
});

const searchJobsSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
});

async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
      name: true,
      email: true,
      verifiedAt: true,
    },
  });

  if (!user) {
    return null;
  }

  return { session, user };
}

async function requireRole(role: z.infer<typeof roleSchema>) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  if (currentUser.user.role !== role) {
    throw new Error("Forbidden");
  }

  return currentUser;
}

export async function getJobs(filters?: z.infer<typeof searchJobsSchema>) {
  const validatedFilters = searchJobsSchema.optional().parse(filters);
  const query = validatedFilters?.query?.trim();
  const location = validatedFilters?.location?.trim();
  const type = validatedFilters?.type?.trim();

  return await prisma.job.findMany({
    where: {
      isActive: true,
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              {
                company: {
                  name: { contains: query, mode: "insensitive" },
                },
              },
            ],
          }
        : {}),
      ...(location
        ? { location: { contains: location, mode: "insensitive" } }
        : {}),
      ...(type && type !== "ALL" ? { type } : {}),
    },
    include: {
      company: { select: { name: true, image: true } },
      applications: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJob(id: string) {
  return await prisma.job.findUnique({
    where: { id },
    include: {
      company: { select: { name: true, image: true } },
      applications: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });
}

export async function createJob(data: z.infer<typeof createJobSchema>) {
  const currentUser = await requireRole("EMPLOYER");
  const validated = createJobSchema.parse(data);

  return await prisma.job.create({
    data: {
      ...validated,
      companyId: currentUser.user.id,
      isActive: true,
    },
  });
}

export async function getEmployerJobs() {
  const currentUser = await requireRole("EMPLOYER");

  return await prisma.job.findMany({
    where: { companyId: currentUser.user.id },
    include: {
      applications: {
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateJob(
  id: string,
  data: z.infer<typeof createJobSchema>,
) {
  const currentUser = await requireRole("EMPLOYER");
  const validated = createJobSchema.parse(data);

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || job.companyId !== currentUser.user.id) {
    throw new Error("Forbidden");
  }

  return await prisma.job.update({
    where: { id },
    data: validated,
  });
}

export async function deleteJob(id: string) {
  const currentUser = await requireRole("EMPLOYER");
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job || job.companyId !== currentUser.user.id) {
    throw new Error("Forbidden");
  }

  await prisma.job.delete({ where: { id } });
  return { success: true };
}

export async function applyToJob(data: z.infer<typeof applySchema>) {
  const currentUser = await requireRole("JOB_SEEKER");
  const validated = applySchema.parse(data);

  const job = await prisma.job.findUnique({
    where: { id: validated.jobId },
    select: {
      id: true,
      title: true,
      companyId: true,
      isActive: true,
    },
  });

  if (!job || !job.isActive) {
    throw new Error("This job is no longer accepting applications");
  }

  if (job.companyId === currentUser.user.id) {
    throw new Error("You cannot apply to your own job post");
  }

  const existing = await prisma.application.findFirst({
    where: {
      jobId: validated.jobId,
      userId: currentUser.user.id,
    },
  });

  if (existing) {
    throw new Error("Already applied");
  }

  const application = await prisma.application.create({
    data: {
      jobId: validated.jobId,
      userId: currentUser.user.id,
      resumeUrl: validated.resumeUrl,
      coverLetter: validated.coverLetter,
      status: "PENDING",
    },
  });

  await prisma.notification.create({
    data: {
      userId: job.companyId,
      type: "APPLICATION_RECEIVED",
      title: "New application received",
      message: `${currentUser.user.name || "Someone"} applied to "${job.title}".`,
    },
  });

  return application;
}

export async function getMyApplications() {
  const currentUser = await requireRole("JOB_SEEKER");

  return await prisma.application.findMany({
    where: { userId: currentUser.user.id },
    include: {
      job: {
        include: {
          company: {
            select: { name: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserRole(): Promise<string> {
  const currentUser = await getCurrentUser();
  return currentUser?.user.role || "JOB_SEEKER";
}

export async function setUserRole(role: z.infer<typeof roleSchema>) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const validatedRole = roleSchema.parse(role);

  await prisma.user.update({
    where: { id: currentUser.user.id },
    data: { role: validatedRole },
  });

  return { success: true, role: validatedRole };
}

export async function getCurrentUserSummary() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return {
    id: currentUser.user.id,
    name: currentUser.user.name,
    email: currentUser.user.email,
    role: currentUser.user.role,
    verifiedAt: currentUser.user.verifiedAt,
  };
}
