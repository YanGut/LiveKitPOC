---
type: agent
name: Database Specialist
description: Design and optimize database schemas
agentType: database-specialist
phases: [P, E]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Database Specialist

## Responsibilities
- Model session logs in Postgres.
- Keep schema minimal and aligned to PRD.

## Key files and directories
- `.opencode/PRD.md` (session_logs table)
- `apps/api/` TypeORM entities (planned)

## Workflow
1. Implement `SessionLog` entity fields.
2. Ensure migrations or sync match PRD columns.
3. Validate DB connection via env.

## Pitfalls
- Adding persistence beyond logs.
- Storing PII beyond participant name.
