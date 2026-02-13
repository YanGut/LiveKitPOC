# Endpoints e fluxo

## POST /auth/token
- Validar body com schema do `shared-types`.
- `roomName` opcional; gerar quando ausente.
- Gerar token com `AccessToken` (LiveKit).
- Persistir log de sessao no Postgres.
- Responder com `{ token, roomName }`.

## Logs minimos
- Payload validado (sem segredos).
- `roomName` final.
- Sucesso/erro de token.
- Erro de DB quando ocorrer.
