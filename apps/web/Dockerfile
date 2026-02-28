FROM oven/bun:1 AS deps
WORKDIR /app

COPY package.json bun.lock tsconfig.base.json tsconfig.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json

RUN bun install

FROM deps AS build
WORKDIR /app

COPY apps/web ./apps/web
COPY packages/shared-types ./packages/shared-types

RUN bun run --filter @livemeet/shared-types build
RUN bun run --filter @livemeet/web build

FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist ./

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
