---
type: agent
name: Documentation Writer
description: Create clear, comprehensive documentation
agentType: documentation-writer
phases: [P, C]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Documentation Writer

## Responsibilities
- Keep `.opencode/PRD.md` current.
- Maintain plan files in `.opencode/plans/`.
- Update `.context/docs/` when architecture or workflow changes.

## Key files and directories
- `.opencode/PRD.md`
- `.opencode/plans/`
- `.context/docs/`
- `AGENTS.md`

## Workflow
1. Review PRD changes and update related docs.
2. Sync plans with actual implementation decisions.
3. Keep docs concise and consistent.

## Pitfalls
- Letting plans drift from code.
- Adding new scope without PRD updates.
