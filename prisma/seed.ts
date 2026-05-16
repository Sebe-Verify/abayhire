import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data in dependency order
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  // Employers
  const [acmeCorp, techNova] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Acme Corp",
        email: "hiring@acmecorp.com",
        emailVerified: true,
        role: "EMPLOYER",
      },
    }),
    prisma.user.create({
      data: {
        name: "TechNova Ltd",
        email: "jobs@technova.io",
        emailVerified: true,
        role: "EMPLOYER",
      },
    }),
  ]);

  // Job seekers
  const [alice, bob, carol] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Alice Tamiru",
        email: "alice@example.com",
        emailVerified: true,
        role: "JOB_SEEKER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Bob Mengistu",
        email: "bob@example.com",
        emailVerified: true,
        role: "JOB_SEEKER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Carol Bekele",
        email: "carol@example.com",
        emailVerified: false,
        role: "JOB_SEEKER",
      },
    }),
  ]);

  // Jobs
  const [frontendJob, backendJob, designJob, dataJob] = await Promise.all([
    prisma.job.create({
      data: {
        title: "Frontend Developer",
        description:
          "Build and maintain React/Next.js applications. You will work closely with the design team to deliver pixel-perfect UIs.",
        location: "Addis Ababa, Ethiopia",
        type: "FULL_TIME",
        salary: 85000,
        companyId: acmeCorp.id,
        isActive: true,
      },
    }),
    prisma.job.create({
      data: {
        title: "Backend Engineer",
        description:
          "Design and scale FastAPI microservices. Strong Python and PostgreSQL skills required.",
        location: "Remote",
        type: "FULL_TIME",
        salary: 95000,
        companyId: acmeCorp.id,
        isActive: true,
      },
    }),
    prisma.job.create({
      data: {
        title: "Product Designer",
        description:
          "Own the end-to-end design process from discovery through handoff. Figma expertise essential.",
        location: "Nairobi, Kenya",
        type: "CONTRACT",
        salary: 70000,
        companyId: techNova.id,
        isActive: true,
      },
    }),
    prisma.job.create({
      data: {
        title: "Data Analyst",
        description:
          "Turn raw data into actionable insights using SQL, Python, and BI tools.",
        location: "Remote",
        type: "PART_TIME",
        salary: 55000,
        companyId: techNova.id,
        isActive: false,
      },
    }),
  ]);

  // Applications
  await Promise.all([
    prisma.application.create({
      data: {
        jobId: frontendJob.id,
        userId: alice.id,
        status: "PENDING",
        coverLetter: "I have 4 years of React experience and love great UX.",
      },
    }),
    prisma.application.create({
      data: {
        jobId: backendJob.id,
        userId: alice.id,
        status: "REVIEWED",
        coverLetter: "Strong Python background, contributed to several OSS FastAPI projects.",
      },
    }),
    prisma.application.create({
      data: {
        jobId: frontendJob.id,
        userId: bob.id,
        status: "ACCEPTED",
        coverLetter: "Next.js enthusiast with a portfolio of shipped products.",
      },
    }),
    prisma.application.create({
      data: {
        jobId: designJob.id,
        userId: carol.id,
        status: "PENDING",
        coverLetter: "3 years in product design with a focus on mobile-first flows.",
      },
    }),
  ]);

  console.log("Done.");
  console.log(`  Users:        5 (2 employers, 3 job seekers)`);
  console.log(`  Jobs:         4 (3 active, 1 inactive)`);
  console.log(`  Applications: 4`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
