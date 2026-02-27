# AGENTS.md - System Instructions for AI Assistant

## 1. [CRITICAL] Boot Sequence & Workflow Protocol
EVERY time a new session starts or a prompt is given, you MUST execute this loop in order:
1. **READ STATE:** Read `.context/session_state.md` to understand the current context, blockers, and decisions.
2. **CHECK PLAN:** Read `.opencode/plans/` to find the current `[IN_PROGRESS]` or next `[PENDING]` task.
3. **EXECUTE & TEST:** Write the code, strictly following the scope constraints and testing rules below.
4. **UPDATE STATE:** Before finishing your response, update `.context/session_state.md` (Actual status, Decision Log, Blockers) and mark the `.opencode/plans/` task as `[DONE]`.

## 2. Repository Overview
This repo hosts the LiveMeet POC planning and tooling. Implementation is defined in `.opencode/PRD.md` and broken down in `.opencode/plans/`.

## 3. [MANDATORY] Scope and Constraints
- **NO Feature Creep:** No real authentication, chat, screen share, or recording.
- **NO Persistence:** No persistent rooms or users beyond session logs.
- **Media Architecture:** Media must use LiveKit SFU, not P2P.

## 4. Monorepo Rules (Bun Workspaces)
- Contracts live in `packages/shared-types` as Zod schemas.
- Backend and frontend import the shared schemas.
- **Rule of Isolation:** Apps (`apps/api`, `apps/web`) DO NOT import each other directly.
- **Atomicity:** Do not jump from Plan 002 (shared contracts) to dependent plans before validating that `packages/shared-types` is solid, successfully exported, and usable by both apps without TypeScript errors.

## 5. Testing and Verification Strategy
To maintain POC velocity and ensure core stability, testing is strictly scoped. You MUST follow these rules when implementing features:
- **`packages/shared-types`**: WRITE Unit tests for Zod schemas to ensure input validation is bulletproof.
- **`apps/api` (NestJS)**: WRITE E2E tests (using Supertest) for `POST /auth/token` to validate JWT generation and payload contracts.
- **`apps/web` (React/Vite)**: DO NOT write unit/component tests for UI (e.g., testing button clicks or Tailwind classes). UI and WebRTC connections will be validated via manual/E2E flow checks defined in the PRD.
- **Requirement:** A backend/contract feature is NOT `[DONE]` until its specific tests are written and passing.

## 6. Key Paths & Source of Truth
- `.opencode/PRD.md` - requirements and constraints.
- `.opencode/plans/` - implementation breakdown.
- `.context/session_state.md` - live execution state (Single Source of Truth for execution tracking).
- `.context/docs/` - architecture, data flow, workflow.

## 7. Tooling and Commands
- Package Manager: Bun workspaces (`bun install`).
- Start Infra: `docker compose up`.
- Run Apps:
  - `bun -w apps/api run dev`
  - `bun -w apps/web run dev`