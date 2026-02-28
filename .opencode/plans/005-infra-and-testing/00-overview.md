# Plano 005 - Infra e Verificacao

Status: [DONE]

## Objetivo
- Garantir stack local com Docker Compose.
- Definir checklist de verificacao RF/RNF.

## Entregaveis
- `docker-compose.yml` e `livekit.yaml` alinhados ao PRD.
- Checklist manual de testes.

## Tarefas
- [DONE] Criar `apps/web/Dockerfile` com build multi-stage e runtime para servir SPA.
- [DONE] Revisar `docker-compose.yml` e `livekit.yaml` contra PRD secoes 11.1 e 11.2.
- [DONE] Criar checklist manual TP01-TP10 em `.context/manual_test_checklist.md`.
- [DONE] Corrigir bloqueio de infraestrutura no container web com proxy `/auth` do Nginx para `api:3000`.
- [DONE] Corrigir bloqueio de runtime do API container garantindo dependencias NestJS no stage final (`reflect-metadata`).
