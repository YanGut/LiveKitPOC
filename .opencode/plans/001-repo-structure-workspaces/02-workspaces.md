# Workspaces e TypeScript

## Root package.json
- `workspaces: ["apps/*", "packages/*"]`.
- Scripts raiz para acionar workspaces quando necessario.

## Padrao de pacotes
- `apps/api`: `name: @livemeet/api`, `private: true`.
- `apps/web`: `name: @livemeet/web`, `private: true`.
- `packages/shared-types`: `name: @livemeet/shared-types`.

## tsconfig.base.json
- `target`, `moduleResolution`, `esModuleInterop`, `skipLibCheck` padronizados.
- Cada pacote estende o base.
