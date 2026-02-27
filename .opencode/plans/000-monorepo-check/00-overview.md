# Plano 000 - Monorepo Check

## Objetivo
- Validar resolucao de tipos entre workspaces antes de iniciar o Plano 003 (NestJS).
- Garantir que frontend e backend leem os mesmos contratos de `packages/shared-types`.

## Entregaveis
- Gate tecnico de tipos definido antes dos planos de implementacao.
- Checklist de validacao para imports, build e typecheck.
- Criterio claro de liberacao para seguir para Planos 003 e 004.

## Criterios de sucesso
- `@livemeet/shared-types` compila e publica tipos (`.d.ts`) sem erro.
- `apps/api` e `apps/web` importam os mesmos tipos sem path relativo cruzado.
- Typecheck passa nos consumidores sem duplicacao de DTO.
- Plano 003 so inicia apos validacao completa deste plano.
