# Build context must be the monorepo root (whole/):
#   docker build -f abayhire/Dockerfile -t abayhire .

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- deps ----
FROM base AS deps
WORKDIR /monorepo

# Replicate the directory structure pnpm-lock.yaml expects
COPY SebeVerify-SDK/packages/sdk/package.json ./SebeVerify-SDK/packages/sdk/package.json
COPY SebeVerify-SDK/packages/sdk/dist/        ./SebeVerify-SDK/packages/sdk/dist/

COPY abayhire/package.json        ./abayhire/package.json
COPY abayhire/pnpm-lock.yaml      ./abayhire/pnpm-lock.yaml
COPY abayhire/pnpm-workspace.yaml ./abayhire/pnpm-workspace.yaml

WORKDIR /monorepo/abayhire
RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM base AS builder
WORKDIR /monorepo

COPY SebeVerify-SDK/packages/sdk/ ./SebeVerify-SDK/packages/sdk/
COPY abayhire/                    ./abayhire/

COPY --from=deps /monorepo/abayhire/node_modules ./abayhire/node_modules

WORKDIR /monorepo/abayhire

# Generate Prisma client for the target platform
RUN pnpm prisma generate

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /monorepo/abayhire/public            ./public
COPY --from=builder --chown=nextjs:nodejs /monorepo/abayhire/.next/standalone  ./
COPY --from=builder --chown=nextjs:nodejs /monorepo/abayhire/.next/static      ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
