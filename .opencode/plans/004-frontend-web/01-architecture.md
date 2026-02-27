# Arquitetura do frontend

## Dependencias mandatarias
- `livekit-client`
- `@livekit/components-react`
- `@livekit/components-styles`
- `axios`
- `react-hook-form` + `@hookform/resolvers`
- `@livemeet/shared-types`
- `tailwindcss`
- `clsx` + `tailwind-merge`
- `lucide-react`

## Estrutura sugerida
```
apps/web/src/
├── features/
│   ├── lobby/
│   │   └── JoinForm.tsx
│   └── room/
│       └── RoomPage.tsx
├── hooks/
│   └── useToken.ts
├── libs/
│   └── livekit/
└── shared/
```
