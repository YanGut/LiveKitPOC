---
type: doc
name: testing-strategy
description: Test frameworks, patterns, coverage requirements, and quality gates
category: testing
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Testing Strategy

## Current state
- No automated test suite yet.
- Verification is manual and aligned to the PRD checklist.

## Manual verification (planned)
- Guest join flow (RF01).
- A/V toggle and device selection (RF02/RF03).
- Room UI behaviors (RF04-RF06).
- Local infra stability (RNF01-RNF04).

## Future automation
- Add API tests for `POST /auth/token`.
- Add UI smoke tests for lobby and room rendering.
