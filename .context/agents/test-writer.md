---
type: agent
name: Test Writer
description: Write comprehensive unit and integration tests
agentType: test-writer
phases: [E, V]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Test Writer

## Responsibilities
- Add tests for token endpoint and basic UI flows when code exists.
- Keep manual verification checklist aligned to PRD.

## Key files and directories
- `.context/docs/testing-strategy.md`
- `.opencode/PRD.md`
- `apps/api/` and `apps/web/` (planned)

## Testing focus
- API: validate schema, token response, and error cases.
- Web: lobby submit, connection state, basic UI render.
