---
type: doc
name: development-workflow
description: Day-to-day engineering processes, branching, and contribution guidelines
category: workflow
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Development Workflow

## Current state
This repo is in a planning phase. Implementation guidance lives in `.opencode/PRD.md` and `.opencode/plans/`.

## Workspace management
- Use bun workspaces for monorepo tooling.
- Expected root setup: `apps/*` and `packages/*`.

## Local development (planned)
1. Install deps: `bun install`.
2. Start infra: `docker compose up`.
3. Run apps:
   - `bun -w apps/api run dev`
   - `bun -w apps/web run dev`

## Branching and commits
- Use small, focused changes.
- Keep PRD and plans updated when scope shifts.

## Documentation updates
- Update `.opencode/PRD.md` for requirement changes.
- Update `.opencode/plans/` to reflect new milestones or tasks.
