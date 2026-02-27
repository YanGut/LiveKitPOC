---
type: doc
name: security
description: Security policies, authentication, secrets management, and compliance requirements
category: security
generated: 2026-02-13
status: filled
scaffoldVersion: "2.0.0"
---

# Security Notes

## Scope
- Local-only POC.
- No authentication beyond LiveKit token issuance.

## Secrets management
- Use environment variables for LiveKit keys and database connection strings.
- Do not commit `.env` files or secrets to the repo.

## Network exposure
- Only expose required ports via Docker Compose.
- LiveKit UDP ports are local-only per PRD.

## Data handling
- Store only minimal session logs in Postgres.
- No user profiles or persistent room state.
