"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function getJobs() {
  return await prisma.job.findMany({
    where: { isActive: true },
    include: { company: { select: { name: true, image: true } } }
  });
}

export async function getJob(id: string) {
  return await prisma.job.findUnique({
    where: { id },
    include: { company: { select: { name: true, image: true } } }
  });
}

const createJobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  salary: z.number().optional(),
});

export async function createJob(data: z.infer<typeof createJobSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const validated = createJobSchema.parse(data);
  return await prisma.job.create({
    data: {
      ...validated,
      companyId: session.user.id,
      isActive: true,
    }
  });
}

export async function getEmployerJobs() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return await prisma.job.findMany({
    where: { companyId: session.user.id },
    include: {
      applications: {
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }
    }
  });
}

export async function updateJob(id: string, data: z.infer<typeof createJobSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || job.companyId !== session.user.id) {
    throw new Error("Forbidden");
  }
  
  return await prisma.job.update({
    where: { id },
    data,
  });
}

export async function deleteJob(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || job.companyId !== session.user.id) {
    throw new Error("Forbidden");
  }
  await prisma.job.delete({ where: { id } });
  return { success: true };
}

const applySchema = z.object({
  jobId: z.string(),
  resumeUrl: z.string().optional(),
  coverLetter: z.string().optional(),
});

export async function applyToJob(data: z.infer<typeof applySchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const validated = applySchema.parse(data);
  
  // Check if already applied
  const existing = await prisma.application.findFirst({
    where: {
      jobId: validated.jobId,
      userId: session.user.id,
    }
  });
  if (existing) {
    throw new Error("Already applied");
  }
  
  return await prisma.application.create({
    data: {
      jobId: validated.jobId,
      userId: session.user.id,
      resumeUrl: validated.resumeUrl,
      coverLetter: validated.coverLetter,
      status: "PENDING",
    }
  });
}

export async function getMyApplications() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return await prisma.application.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: {
          company: {
            select: { name: true }
          }
        }
      }
    }
  });
}

export async function getUserRole(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return "JOB_SEEKER";
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });
  return user?.role || "JOB_SEEKER";
}