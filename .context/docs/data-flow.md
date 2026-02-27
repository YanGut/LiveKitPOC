---
type: doc
name: data-flow
description: How data moves through the system and external integrations
category: data-flow
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

## Data Flow and Integrations
Runtime flow is planned for the LiveMeet POC and described in `.opencode/PRD.md`. The current repo contains planning artifacts and skill tooling.

## Module Dependencies
- **Planned**: `apps/api` -> `packages/shared-types`
- **Planned**: `apps/web` -> `packages/shared-types`
- **Current**: `skills/skill-creator` scripts are standalone utilities

## Service Layer
- No runtime services implemented yet.
- Planned services include a `SessionService` in `apps/api` to validate input, issue tokens, and persist logs.

## High-level Flow
1. Browser loads the web app.
2. User submits `participantName` (and optional `roomName`).
3. Web app calls `POST /auth/token` on the API.
4. API validates input via shared Zod schema, generates LiveKit token, logs session.
5. Web app connects to LiveKit (WS/WebRTC) and publishes media.

## External Integrations
- LiveKit server for signaling and SFU media routing.
- PostgreSQL for session logs.
- Redis as auxiliary local dependency (planned).

## Observability and Failure Modes
- API logs: token issuance, validation failures, DB errors.
- LiveKit logs: room lifecycle and connection issues.
- Frontend shows connection state and media permission status.
