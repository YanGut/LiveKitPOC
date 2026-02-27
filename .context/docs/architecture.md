---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

## Architecture Notes
The repository is currently a planning and tooling workspace for a LiveKit POC. Runtime apps are planned in a monorepo layout and tracked in `.opencode/PRD.md` and `.opencode/plans/`.

## System Architecture Overview
Planned topology is a monorepo with two apps (`apps/api` and `apps/web`) plus shared contracts (`packages/shared-types`). The backend issues LiveKit tokens and persists session logs in Postgres. The frontend connects to LiveKit and renders the room UI. Docker Compose orchestrates LiveKit, API, Web, Postgres, and Redis.

## Architectural Layers
- **Planning and requirements**: `.opencode/PRD.md`, `.opencode/plans/`
- **Shared contracts (planned)**: `packages/shared-types/` with Zod schemas
- **Backend API (planned)**: `apps/api/` with NestJS modules and token endpoint
- **Frontend UI (planned)**: `apps/web/` with React + LiveKit Components
- **Skills and tooling**: `skills/` (skill-creator scripts)

## Detected Design Patterns
| Pattern | Confidence | Locations | Description |
|---|---:|---|---|
| Scaffold generator | 80% | `skills/skill-creator/scripts/init_skill.py` | Creates skill directory templates |
| Validation helper | 70% | `skills/skill-creator/scripts/quick_validate.py` | Validates skill structure and metadata |
| Packager | 70% | `skills/skill-creator/scripts/package_skill.py` | Zips skill folders for distribution |

## Entry Points
- `skills/skill-creator/scripts/init_skill.py`
- `skills/skill-creator/scripts/package_skill.py`
- `skills/skill-creator/scripts/quick_validate.py`

## Public API
| Symbol | Type | Location |
|---|---|---|
| `init_skill` | function | `skills/skill-creator/scripts/init_skill.py` |
| `title_case_skill_name` | function | `skills/skill-creator/scripts/init_skill.py` |
| `package_skill` | function | `skills/skill-creator/scripts/package_skill.py` |
| `validate_skill` | function | `skills/skill-creator/scripts/quick_validate.py` |

## Internal System Boundaries
Planned boundaries follow the monorepo rule: apps import shared types but not each other. Contract definitions live in `packages/shared-types` and are consumed by both the API and web app.

## External Service Dependencies
- LiveKit Server (SFU) via Docker Compose
- PostgreSQL for session logs
- Redis as local support service

## Key Decisions and Trade-offs
- Keep scope minimal for POC validation.
- Use shared Zod schemas to avoid contract drift.
- Prefer local-only infra and configuration.

## Diagrams
Reference: `.opencode/PRD.md` includes a Mermaid component diagram for the planned stack.

## Risks and Constraints
- Media requires UDP ports; local firewalls can block RTC.
- No auth or persistence beyond logs by design.

## Top Directories Snapshot
- `.opencode/` (PRD, plans)
- `.context/` (generated docs, agent playbooks)
- `skills/` (skill-creator)
- `LICENSE`

## Related Resources
- `project-overview.md`
- `data-flow.md`
- `.opencode/PRD.md`
