# Plano 004 - Frontend Web

Status: [DONE]

## Objetivo
- Implementar Lobby e Sala com LiveKit Components.
- Validar formulario com schema compartilhado.

## Entregaveis
- Formulario de entrada e fluxo de token.
- Conexao LiveKit e UI base.

## Criterios de sucesso
- Lobby envia `POST /auth/token`.
- VideoConference renderiza com 2 navegadores.

## Tarefas
- [DONE] Scaffold React + Vite em `apps/web` com dependencias mandatarias e link para `@livemeet/shared-types`.
- [DONE] Implementar Lobby com `react-hook-form` + `zodResolver` e chamada `POST /auth/token`.
- [DONE] Integrar `LiveKitRoom` + `VideoConference` com feedback de conexao/permissoes.
