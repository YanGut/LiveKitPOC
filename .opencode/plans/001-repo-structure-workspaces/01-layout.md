# Layout do repositorio

## Arvore base
```
/
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   └── shared-types/
├── docker-compose.yml
├── livekit.yaml
├── package.json
└── tsconfig.base.json
```

## Regras de dependencia
- `apps/web` e `apps/api` podem importar `packages/shared-types`.
- `apps/*` nao importam entre si.
- `shared-types` nao importa `apps/*`.
