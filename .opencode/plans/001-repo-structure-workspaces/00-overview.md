# Plano 001 - Estrutura do Monorepo

Status: [DONE]

## Objetivo
- Definir a estrutura base do monorepo e regras de dependencia.
- Configurar workspaces e bases de TypeScript.

## Entregaveis
- Pastas `apps/` e `packages/` criadas.
- `package.json` raiz com workspaces.
- `tsconfig.base.json` compartilhado.

## Premissas
- npm workspaces.
- TypeScript em todos os pacotes.

## Criterios de sucesso
- `npm -w apps/api run dev` e `npm -w apps/web run dev` funcionam.
- `packages/shared-types` exporta tipos para ambos apps.
