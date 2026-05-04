# Abay Hire - Setup Instructions

## Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm

## Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database credentials:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `BETTER_AUTH_SECRET`: Generate a secure secret key (min 32 chars)
   - `BETTER_AUTH_URL`: Your app URL (http://localhost:3000 for dev)
   - `NEXT_PUBLIC_BETTER_AUTH_URL`: Public auth origin used by browser requests
   - `NEXT_PUBLIC_APP_URL`: Frontend app URL (can match BETTER_AUTH_URL in local dev)

   For client-side SDK verification flow, also set:
   - `NEXT_PUBLIC_SEBEVERIFY_API_KEY`: SebeVerify raw API key (`raw_key` in format `svk_<key_id>.<secret>`), NOT the key id
   - `NEXT_PUBLIC_SEBEVERIFY_PROJECT_ID`: SebeVerify project id
   - `NEXT_PUBLIC_SEBEVERIFY_BACKEND_URL`: SebeVerify backend API base URL (e.g. http://localhost:8000)
   - `NEXT_PUBLIC_SEBEVERIFY_SDK_WEB_APP_URL`: Hosted SebeVerify web app URL (e.g. http://localhost:3001)

3. **Generate Prisma client**
   ```bash
   pnpm prisma generate
   ```

4. **Push database schema**
   ```bash
   pnpm prisma db push
   ```

   Or run migrations:
   ```bash
   pnpm prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open http://localhost:3000**

## Project Structure

```
abayhire/
├── app/                    # Next.js App Router pages
│   ├── api/auth/[...all]/  # Auth API route
│   ├── jobs/              # Job listings
│   ├── (auth)/           # Auth pages (signin, signup)
│   └── (protected)/     # Protected pages
├── actions/               # Server actions
├── lib/                 # Core libraries
│   ├── auth.ts          # Better-auth config
│   ├── auth-client.ts  # Auth client
│   └── db.ts          # Prisma client
└── prisma/
    └── schema.prisma    # Database schema
```

## Features

- User registration/login with email & password
- Role-based access (JOB_SEEKER / EMPLOYER)
- Job listings and search
- Job applications
- Employer job management
- Protected routes

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Better-auth for authentication
- Prisma ORM with PostgreSQL
- Tailwind CSS
- Zod for validation

## Key Files

- `lib/auth.ts` - Better-auth configuration
- `prisma/schema.prisma` - Database schema with User, Session, Account, Job, Application models
- `actions/index.ts` - Server actions for jobs and applications
- `app/api/auth/[...all]/route.ts` - Auth API handler