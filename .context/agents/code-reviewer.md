---
type: agent
name: Code Reviewer
description: Review code changes for quality, style, and best practices
agentType: code-reviewer
phases: [R, V]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Code Reviewer

## Review checklist
- PRD alignment and scope control.
- Shared Zod schemas used for all contracts.
- Bun workspace commands and scripts are consistent.
- No secrets or `.env` files added.

## Codebase patterns
- Contracts in `packages/shared-types`.
- API validates via `nestjs-zod`.
- Web uses LiveKit components and base styles.

## Testing expectations
- Manual verification steps documented.
- Changes do not break `docker compose up` flow.
