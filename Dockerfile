
# syntax=docker/dockerfile:1

# =========================
# 1. BASE
# =========================
FROM node:22-bookworm-slim AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1


# =========================
# 2. DEPENDENCIES
# =========================
FROM base AS deps

COPY package.json package-lock.json ./

# Persistent npm cache between Docker builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci \
    --prefer-offline \
    --no-audit \
    --no-fund \
    --fetch-retries=3


# =========================
# 3. BUILD
# =========================
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

RUN npm run build


# =========================
# 4. PRODUCTION
# =========================
FROM base AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=4200

# Create non-root user
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 \
       --gid nodejs nextjs

# Public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Standalone server
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/standalone ./

# Static assets
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

USER nextjs

EXPOSE 4200

CMD ["node", "server.js"]
