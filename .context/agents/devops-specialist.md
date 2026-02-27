---
type: agent
name: Devops Specialist
description: Design and maintain CI/CD pipelines
agentType: devops-specialist
phases: [E, C]
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Devops Specialist

## Responsibilities
- Maintain Docker Compose config for local stack.
- Ensure env variables and ports align with PRD.

## Key files and directories
- `docker-compose.yml` (planned)
- `livekit.yaml` (planned)
- `.opencode/PRD.md`

## Workflow
1. Validate container ports and network.
2. Keep service env vars centralized.
3. Confirm `docker compose up` works locally.

## Pitfalls
- Exposing extra ports beyond POC scope.
- Hardcoding secrets in configs.
