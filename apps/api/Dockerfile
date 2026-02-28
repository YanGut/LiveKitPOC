FROM oven/bun:1 AS deps
WORKDIR /app

COPY package.json bun.lock tsconfig.base.json tsconfig.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json

RUN bun install

FROM deps AS build
WORKDIR /app

COPY apps/api ./apps/api
COPY packages/shared-types ./packages/shared-types

RUN bun run --filter @livemeet/shared-types build
RUN bun run --filter @livemeet/api build

FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/shared-types/package.json ./packages/shared-types/package.json
COPY --from=build /app/packages/shared-types/dist ./packages/shared-types/dist

EXPOSE 3000

CMD ["bun", "apps/api/dist/main.js"]
