# Lobby e formulario

## Formulario
- Campos: `participantName` (obrigatorio) e `roomName` (opcional).
- `react-hook-form` com `zodResolver` usando schema do `shared-types`.

## Requisicao
- `axios` para `POST /auth/token`.
- Tipar request/response com schemas compartilhados.

## UI
- Usar `lucide-react` para icones leves.
- Layout com `tailwindcss` e classes condicionais via `clsx` + `tailwind-merge`.
