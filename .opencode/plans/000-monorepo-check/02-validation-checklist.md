# Checklist de validacao (pre-NestJS)

## Preparacao
- Workspaces declarados no `package.json` raiz (`apps/*`, `packages/*`).
- `packages/shared-types` com build de tipos habilitado.

## Verificacoes tecnicas
- Executar instalacao de dependencias no monorepo.
- Executar build de `packages/shared-types` sem erros.
- Executar typecheck em `apps/api` consumindo tipos do pacote compartilhado.
- Executar typecheck em `apps/web` consumindo tipos do pacote compartilhado.
- Confirmar que nenhum app importa outro app diretamente.

## Comandos de referencia
- `bun install`
- `bun -w packages/shared-types run build`
- `bun -w apps/api run typecheck`
- `bun -w apps/web run typecheck`

## Criterio de liberacao
- Somente apos checklist completo este repositorio esta liberado para iniciar o Plano 003 (Backend NestJS).
