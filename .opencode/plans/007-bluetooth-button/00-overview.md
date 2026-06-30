# Plano 007 - Bluetooth Oximeter Reconnect Button

Status: [DONE]

## Objetivo
- Adicionar um botão de reconexão de oxímetro Bluetooth na barra de controle da sala.
- Exibir estado visual (desconectado/reconectando/conectado) sem implementar lógica BLE real.

## Entregáveis
- Helpers puros de estado (`bluetoothStatus.ts`) com 7 testes Bun (`bluetoothStatus.test.ts`).
- Componente presentacional `BluetoothButton.tsx` seguindo o padrão do `RaiseHandButton`.
- Hook `useBluetoothStatus.ts` delegando transições de estado aos helpers puros.
- Integração no `RoomContent.tsx` ao lado do botão Raise Hand.
- Validação com testes, lint e build do app web.

## Tarefas
- [DONE] Escrever testes falhando para helpers de estado bluetooth.
- [DONE] Implementar helpers puros de estado (`bluetoothStatus.ts`).
- [DONE] Criar `BluetoothButton.tsx` (componente presentacional).
- [DONE] Criar `useBluetoothStatus.ts` (hook React fino).
- [DONE] Integrar no `RoomContent.tsx`.
- [DONE] Corrigir erros de lint em todos os arquivos tocados.
- [DONE] Executar e confirmar `bun run --filter @livemeet/web test`, `lint` e `build`.
