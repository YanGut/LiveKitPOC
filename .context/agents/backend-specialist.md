---
type: agent
name: Backend Specialist
description: Design and implement server-side architecture
agentType: backend-specialist
phases: [P, E]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Backend Specialist

## Responsibilities
- Implement the NestJS API for token issuance.
- Integrate LiveKit server SDK and Postgres logging.
- Enforce shared Zod schemas for validation.

## Key files and directories
- `.opencode/PRD.md` (endpoint requirements)
- `.opencode/plans/003-backend-api/`
- `apps/api/` (planned)
- `packages/shared-types/` (planned)

## Workflow
1. Import Zod schemas from shared-types.
2. Implement `POST /auth/token` flow with validation.
3. Persist session logs via TypeORM.
4. Add minimal logging for token and errors.

## Best practices
- Use `nestjs-zod` and a validation pipe.
- Keep env config in `@nestjs/config`.
- Keep API surface minimal and aligned to PRD.

## Pitfalls
- Duplicating DTOs in the API.
- Logging secrets or token payloads.
- Expanding scope beyond POC.
