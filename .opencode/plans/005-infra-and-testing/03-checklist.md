# Checklist de verificacao

## RF01 - Guest Join
- Enviar `participantName`.
- Receber token e conectar na sala.

## RF02 - Controle A/V
- Alternar microfone e camera.
- UI reflete estado.

## RF03 - Seletor de dispositivos
- Trocar camera/mic em tempo real.

## RF04 - Grid responsivo
- Tiles se ajustam com N participantes.

## RF05 - Active speaker
- Destaque visual para quem fala.

## RF06 - Lista de participantes
- Lista atualiza em join/leave.

## RNF01 - One command
- `docker compose up` sobe sem passos manuais.

## RNF02 - Capacidade
- 3 a 6 participantes sem falhas recorrentes.

## RNF03 - Reconexao
- Queda de WS e reconexao automatica.

## RNF04 - Observabilidade minima
- Logs objetivos de token/conexao/midia.
