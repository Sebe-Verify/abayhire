"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

// In-memory job store
const jobs = new Map<string, {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  salary?: number;
  companyId: string;
  isActive: boolean;
}>();

const applications = new Map<string, {
  id: string;
  jobId: string;
  userId: string;
  status: string;
}>();

export async function getJobs() {
  return Array.from(jobs.values()).filter(j => j.isActive);
}

export async function getJob(id: string) {
  return jobs.get(id);
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
  const job = {
    id: crypto.randomUUID(),
    ...validated,
    companyId: session.user.id,
    isActive: true,
  };
  jobs.set(job.id, job);
  return job;
}

export async function getEmployerJobs() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return Array.from(jobs.values()).filter(j => j.companyId === session.user.id);
}

export async function updateJob(id: string, data: z.infer<typeof createJobSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const job = jobs.get(id);
  if (!job || job.companyId !== session.user.id) {
    throw new Error("Forbidden");
  }
  const updated = { ...job, ...data };
  jobs.set(id, updated);
  return updated;
}

export async function deleteJob(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const job = jobs.get(id);
  if (!job || job.companyId !== session.user.id) {
    throw new Error("Forbidden");
  }
  jobs.delete(id);
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
  for (const app of applications.values()) {
    if (app.jobId === validated.jobId && app.userId === session.user.id) {
      throw new Error("Already applied");
    }
  }
  
  const app = {
    id: crypto.randomUUID(),
    jobId: validated.jobId,
    userId: session.user.id,
    status: "PENDING",
  };
  applications.set(app.id, app);
  return app;
}

export async function getMyApplications() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return Array.from(applications.values())
    .filter(a => a.userId === session.user.id)
    .map(app => {
      const job = jobs.get(app.jobId);
      return { ...app, job };
    });
}

export async function getUserRole(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return "JOB_SEEKER";
  // Default role
  return "JOB_SEEKER";
}