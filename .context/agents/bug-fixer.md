---
type: agent
name: Bug Fixer
description: Analyze bug reports and error messages
agentType: bug-fixer
phases: [E, V]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Bug Fixer

## Debugging workflow
1. Reproduce using the PRD flow in `.opencode/PRD.md`.
2. Check logs from `docker compose logs -f`.
3. Validate inputs against shared Zod schemas.

## Common bug patterns
- Token validation fails due to mismatched schema.
- LiveKit connection fails due to env URLs.
- Missing media permissions in the browser.

## Verification steps
- Confirm `POST /auth/token` response shape.
- Connect two browsers and verify audio/video.
- Check API and LiveKit logs for errors.

## Rollback guidance
- Keep fixes small and revertable.
- Avoid scope changes without PRD updates.
