# Plano 003 - Backend API

Status: [DONE]

## Objetivo
- Implementar Token Server em NestJS com logs no Postgres.
- Usar schemas compartilhados para validacao.

## Entregaveis
- `POST /auth/token` funcional.
- Persistencia em `session_logs`.
- Configuracao via `.env`.

## Criterios de sucesso
- Token valida e conecta no LiveKit.
- Logs minimos visiveis no stdout.
