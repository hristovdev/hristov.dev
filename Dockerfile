# syntax=docker/dockerfile:1

ARG NODE_VERSION=24

# ---------------------------------------------------------------- base ----
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---------------------------------------------------------------- deps ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ----------------------------------------------------------------- dev ----
# Used by the `dev` compose profile. Source is bind-mounted over /app, so the
# image only needs to carry the dependencies.
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
# The entrypoint reinstalls when this stamp drifts from package-lock.json.
# Seeding it here keeps a freshly created volume from reinstalling on first run.
RUN cp package-lock.json node_modules/.lockstamp
COPY --chmod=0755 docker/dev-entrypoint.sh /usr/local/bin/dev-entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/dev-entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

# --------------------------------------------------------------- build ----
FROM base AS build
# NEXT_PUBLIC_* values are inlined at build time, so this one is a build arg
# rather than a runtime variable. Secrets must never be passed here.
ARG NEXT_PUBLIC_SITE_URL=https://hristov.dev
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -------------------------------------------------------------- runner ----
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/en').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
