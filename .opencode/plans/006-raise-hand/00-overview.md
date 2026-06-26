# Plano 006 - Raise Hand

Status: [DONE]

## Objetivo
- Adicionar um botao de levantar/abaixar a mao na sala LiveKit.
- Propagar o estado para todos os participantes conectados usando mensagens confiaveis do LiveKit.

## Entregaveis
- Testes Bun para protocolo e estado puro de raise hand.
- Layout customizado da sala com botao Raise Hand e indicador nos tiles.
- Validacao com testes, lint e build do app web.

## Tarefas
- [DONE] Adicionar testes falhando para protocolo/estado de raise hand.
- [DONE] Implementar helpers puros de protocolo/estado.
- [DONE] Integrar hook e UI no RoomView.
- [DONE] Executar e corrigir `bun run --filter @livemeet/web test`, `lint` e `build`.
