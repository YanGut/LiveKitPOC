# Resolucao de tipos entre pacotes

## Escopo minimo
- `packages/shared-types` define schemas e tipos de contrato.
- `apps/api` consome contratos via pacote (`@livemeet/shared-types`).
- `apps/web` consome contratos via pacote (`@livemeet/shared-types`).

## Regras de configuracao
- Nome do pacote compartilhado fixo: `@livemeet/shared-types`.
- Exports centralizados em `packages/shared-types/src/index.ts`.
- Consumidores importam somente do pacote, nunca de caminho interno (`../../packages/...`).
- `tsconfig` dos apps deve estender `tsconfig.base.json` e manter `moduleResolution` compativel.

## Gate de contrato
- DTO de token existe uma unica vez em `shared-types`.
- Backend nao redefine tipo local para request/response de token.
- Frontend nao redefine tipo local para request/response de token.
- Mudancas de contrato exigem update em `shared-types` primeiro.

## Risco coberto por este plano
- Evitar divergencia de tipo entre backend e frontend que quebra integracao com fluxo LiveKit no cliente.
