# Schemas e exports

## Estrutura sugerida
```
packages/shared-types/
├── src/
│   ├── auth.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Schemas principais
- `TokenRequestSchema`:
  - `participantName`: string, min 2 chars.
  - `roomName`: string opcional.
- `TokenResponseSchema`:
  - `token`: string.
  - `roomName`: string.

## Exports
- `export type TokenRequest = z.infer<typeof TokenRequestSchema>`.
- Reexportar tudo em `src/index.ts`.

## Regra de Ouro
- Todo DTO de entrada/saida deve existir como schema Zod aqui.
- Backend usa para validar rotas.
- Frontend usa para validar formularios e tipar requests.
