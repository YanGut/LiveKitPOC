---
type: agent
name: Frontend Specialist
description: Design and implement user interfaces
agentType: frontend-specialist
phases: [P, E]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Frontend Specialist

## Responsibilities
- Build lobby and room UI using LiveKit Components.
- Validate forms with shared Zod schemas.
- Keep UI behavior aligned to PRD RFs.

## Key files and directories
- `.opencode/PRD.md`
- `.opencode/plans/004-frontend-web/`
- `apps/web/` (planned)
- `packages/shared-types/` (planned)

## Workflow
1. Implement Lobby form with `react-hook-form` + `@hookform/resolvers`.
2. Call `POST /auth/token` via `axios`.
3. Connect with `LiveKitRoom` and render `VideoConference`.

## Best practices
- Import `@livekit/components-styles`.
- Use Tailwind + clsx/tailwind-merge for classes.
- Keep A/V controls and participant UI minimal.

## Pitfalls
- Diverging from shared schema validation.
- Skipping LiveKit base styles.
- Hardcoding URLs instead of env vars.
