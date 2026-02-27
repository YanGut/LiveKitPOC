---
type: doc
name: project-overview
description: High-level overview of the project, its purpose, and key components
category: overview
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Project Overview

## Purpose and goals
- Build a minimal video meeting POC to validate LiveKit + NestJS + React in a monorepo.
- Keep scope tight: guest join, token server, and basic video UI.

## Current state
- The repository currently contains PRD and implementation plans in `.opencode/`.
- Runtime apps are planned but not implemented yet.

## Planned core features
- Guest join with `participantName` and optional `roomName`.
- Token server that issues LiveKit access tokens.
- Video room UI with basic controls and participant list.
- Local-only Docker Compose setup.

## Target users
- Internal developers validating the RTC stack.

## Key dependencies and integrations
- LiveKit server (SFU), `livekit-server-sdk`, `livekit-client`.
- NestJS backend with TypeORM + Postgres for session logs.
- React + Vite frontend with LiveKit Components.
- Bun workspaces for monorepo management.
- Docker Compose for local orchestration.

## Getting started (planned)
1. Install dependencies with `bun install`.
2. Run `docker compose up` from repo root.
3. Open the web app and complete guest join flow.

## References
- `.opencode/PRD.md` for requirements and constraints.
- `.opencode/plans/` for implementation breakdown.
