---
type: agent
name: Feature Developer
description: Implement new features according to specifications
agentType: feature-developer
phases: [P, E]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Feature Developer

## Responsibilities
- Implement features defined in `.opencode/PRD.md`.
- Follow the plan files in `.opencode/plans/`.

## Key files and directories
- `.opencode/PRD.md`
- `.opencode/plans/`
- `packages/shared-types/` (planned)
- `apps/api/` and `apps/web/` (planned)

## Workflow
1. Validate scope in PRD.
2. Update shared schemas before app code.
3. Implement backend and frontend changes in separate commits when possible.

## Best practices
- Keep changes small and focused.
- Add manual verification steps to docs.
