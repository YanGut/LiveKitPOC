# LiveMeet POC

LiveMeet is a local-first video meeting POC built to validate a LiveKit SFU architecture with a Bun workspace monorepo, NestJS backend, and React + Vite frontend.

## Current status

All planned phases are complete (`Plan 000` to `Plan 005`).

- Monorepo and workspace contracts are stable.
- `POST /auth/token` is implemented, validated with Zod, and covered by API E2E tests.
- Frontend lobby -> token -> room flow is implemented with LiveKit components.
- Docker infrastructure is in place for `livekit`, `redis`, `postgres`, `api`, and `web`.
- Manual verification checklist (TP01-TP10) is available at `.context/manual_test_checklist.md`.

## Scope

Included in this POC:

- Guest join flow using token generation (`POST /auth/token`).
- Shared API contracts via `@livemeet/shared-types` (Zod runtime + TypeScript types).
- LiveKit room connection and base conference UI.
- Local infrastructure orchestration with Docker Compose.

Out of scope:

- Real authentication (OAuth, username/password, account system).
- Chat, recording, and screen sharing.
- Persistent room/user management (only session logs are stored).

## Architecture summary

- `packages/shared-types`: Zod schemas and inferred types used by both apps.
- `apps/api`: NestJS token API with LiveKit token generation and session log persistence.
- `apps/web`: React + Vite app with lobby form, token call, and LiveKit room UI.
- `docker-compose.yml`: full local stack on `livemeet-net`.
- `livekit.yaml`: local LiveKit transport and key config.

## Repository layout

```text
.
|-- apps/
|   |-- api/                  # NestJS API (token server)
|   `-- web/                  # React + Vite frontend
|-- packages/
|   `-- shared-types/         # Shared Zod contracts and TS types
|-- docker-compose.yml
|-- livekit.yaml
|-- .opencode/
|   |-- PRD.md
|   `-- plans/
`-- .context/
    |-- session_state.md
    `-- manual_test_checklist.md
```

## Prerequisites

- [Bun](https://bun.sh) `>= 1.3`
- Docker + Docker Compose

## Quick start (Docker Compose)

From repository root:

```bash
bun install
docker compose up --build
```

Services and ports:

- Web: `http://localhost:5173`
- API: `http://localhost:3000`
- LiveKit signal/API: `ws://localhost:7880`
- Postgres: `localhost:5432`
- Redis: `localhost:6379`

## Local development (without full containerized app runtime)

1) Start infrastructure services:

```bash
docker compose up -d livekit redis postgres
```

2) Create local env file for API:

```bash
cp .env.example .env
```

3) Run API and web in separate terminals:

```bash
bun run --filter @livemeet/api dev
bun run --filter @livemeet/web dev
```

## API contract

### `POST /auth/token`

Request body:

```json
{
  "participantName": "Jane Doe",
  "roomName": "daily-sync"
}
```

- `participantName`: required, min length 2
- `roomName`: optional

Response body:

```json
{
  "token": "<jwt>",
  "roomName": "daily-sync"
}
```

Quick test:

```bash
curl -X POST http://localhost:3000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"participantName":"Jane Doe","roomName":"daily-sync"}'
```

## Environment variables

Root `.env.example` contains backend variables used by API:

- `PORT` (default `3000`)
- `DATABASE_URL`
- `REDIS_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_URL`

Frontend runtime variables in Compose:

- `VITE_API_URL`
- `VITE_LIVEKIT_URL`

## Testing

Shared contracts:

```bash
bun run --filter @livemeet/shared-types build
bun run --filter @livemeet/shared-types test
```

API:

```bash
bun run --filter @livemeet/api typecheck
bun run --filter @livemeet/api build
bun run --filter @livemeet/api test:e2e
```

Web:

```bash
bun run --filter @livemeet/web lint
bun run --filter @livemeet/web build
```

## Manual verification

Use `.context/manual_test_checklist.md` to validate TP01-TP10 from PRD Section 15.

## Infrastructure notes

- Web container uses `nginx:alpine` to serve Vite static assets.
- Nginx proxies `/auth` to `http://api:3000` in containerized mode.
- API container runtime includes workspace-level dependencies so NestJS modules (including `reflect-metadata`) resolve correctly.
- LiveKit UDP mappings are explicitly configured in Compose (`7882/udp` and `50000-50050/udp`).

## Internal references

- PRD: `.opencode/PRD.md`
- Plans: `.opencode/plans/`
- Session state: `.context/session_state.md`
- Agent workflow rules: `AGENTS.md`
