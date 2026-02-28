# LiveMeet POC

POC de videoconferencia inspirada no Google Meet, focada em validar arquitetura de midia em tempo real com **LiveKit (SFU)**, **NestJS** e **monorepo com Bun workspaces**.

## Objetivo da POC

Validar localmente os pilares abaixo:

- geracao de token JWT para entrada em sala (`POST /auth/token`);
- contratos compartilhados entre backend e frontend com Zod;
- base de infraestrutura para LiveKit + Redis + PostgreSQL via Docker Compose;
- fluxo de evolucao incremental por planos (`.opencode/plans`).

## Escopo e restricoes

Esta POC **nao** inclui:

- autenticacao real (login/senha/OAuth);
- chat, gravacao ou compartilhamento de tela;
- persistencia de salas/usuarios (somente logs de sessao).

A midia deve seguir modelo **SFU (LiveKit)**, sem P2P direto entre navegadores.

## Stack atual

- **Monorepo:** Bun workspaces
- **Backend:** NestJS
- **Contratos compartilhados:** Zod (`packages/shared-types`)
- **Token RTC:** `livekit-server-sdk`
- **Banco (logs):** PostgreSQL + TypeORM
- **Infra base:** Docker Compose + LiveKit + Redis + PostgreSQL

## Estrutura do projeto

```text
.
├── apps/
│   ├── api/                  # NestJS API (token server)
│   └── web/                  # Frontend (em evolucao)
├── packages/
│   └── shared-types/         # Schemas Zod e tipos compartilhados
├── docker-compose.yml
├── livekit.yaml
├── .opencode/
│   ├── PRD.md
│   └── plans/
└── .context/
    └── session_state.md
```

## Status atual

### Concluido

- Estrutura inicial do monorepo com workspaces.
- Infra base (`docker-compose.yml` e `livekit.yaml`).
- Contratos compartilhados para `POST /auth/token` em `@livemeet/shared-types`.
- Backend NestJS com:
  - `POST /auth/token`
  - geracao de JWT LiveKit
  - persistencia de `session_logs` no PostgreSQL
- Testes:
  - unit tests dos schemas Zod
  - E2E do endpoint de auth (`apps/api`)

### Em andamento

- Frontend (`apps/web`) ainda esta em fase inicial.
- Dockerfiles de `apps/api` e `apps/web` ainda nao foram adicionados (necessarios para `docker compose up` completo com build dos apps).

## Pre-requisitos

- [Bun](https://bun.sh) >= 1.3.x
- Docker + Docker Compose (para infraestrutura local)

## Instalacao

Na raiz do repositorio:

```bash
bun install
```

## Executando em desenvolvimento

### API (NestJS)

```bash
bun run --filter @livemeet/api dev
```

API por padrao em: `http://localhost:3000`

### Web (estado atual)

```bash
bun run --filter @livemeet/web dev
```

> Observacao: o frontend ainda esta em implementacao.

## Testes e validacoes

### Shared types

```bash
bun run --filter @livemeet/shared-types build
bun run --filter @livemeet/shared-types test
```

### API

```bash
bun run --filter @livemeet/api typecheck
bun run --filter @livemeet/api build
bun run --filter @livemeet/api test:e2e
```

## Endpoint disponivel

### `POST /auth/token`

Gera JWT para conexao no LiveKit e retorna sala final usada.

#### Request

```json
{
  "participantName": "Joao Silva",
  "roomName": "Daily-Meeting-01"
}
```

- `participantName`: obrigatorio, minimo 2 caracteres
- `roomName`: opcional (se omitido, backend gera `room-<id>`)

#### Response

```json
{
  "token": "eyJhbGciOiJIUzI1Ni...",
  "roomName": "Daily-Meeting-01"
}
```

#### Exemplo com curl

```bash
curl -X POST http://localhost:3000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"participantName":"Joao Silva","roomName":"Daily-Meeting-01"}'
```

## Configuracoes importantes (API)

Variaveis usadas pelo backend:

- `DATABASE_URL`
- `REDIS_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_URL`
- `PORT` (opcional, default 3000)

## Referencias internas

- PRD: `.opencode/PRD.md`
- Planos de execucao: `.opencode/plans/`
- Estado da sessao: `.context/session_state.md`
- Regras de execucao do agente: `AGENTS.md`

## Proximos passos

1. Adicionar Dockerfiles de `apps/api` e `apps/web`.
2. Evoluir `apps/web` para fluxo de lobby + conexao LiveKit.
3. Completar checklist de estabilidade com multiplos participantes.
