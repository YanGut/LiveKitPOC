# PRD — LiveMeet POC (LiveKit Video Rooms)
Versão: 1.1.0 (Monorepo Edition)  
Status: Aprovado para Desenvolvimento  
Data: 06/02/2026  
Tipo: Proof of Concept (POC)  
Produto: LiveMeet POC (Google Meet Clone minimalista)  
Objetivo técnico: Validar arquitetura de vídeo em tempo real (SFU) usando LiveKit + NestJS + React, em Monorepo totalmente conteinerizado (Docker Compose).  
Ambiente-alvo: Local (Docker)  
Usuários simultâneos esperados: 2–6  
Persistência: Não crítica (somente auditoria/logs)

---

## 1. Contexto e Objetivo

### 1.1 Objetivo do Produto
Criar uma aplicação funcional de videoconferência minimalista que permita múltiplos usuários entrarem em uma sala efêmera, verem uns aos outros e comunicarem-se por áudio/vídeo. O foco é validar a stack LiveKit + NestJS + Docker em execução local, ignorando funcionalidades periféricas nesta fase.

### 1.2 Métrica de Sucesso (POC)
A POC é considerada bem-sucedida se:
1. Dois navegadores distintos conseguem entrar na mesma sala e transmitir áudio/vídeo bidirecionalmente.
2. Com 3+ participantes, o sistema permanece estável (sem falhas de conexão recorrentes) usando SFU.
3. Todo o stack sobe localmente com um único comando (docker compose up) e logs suficientes para debug.

---

## 2. Princípios e Restrições

### 2.1 Princípios de Arquitetura
- Local-First: Infraestrutura sobe com um único comando `docker compose up`.
- Monorepo Strategy: Backend e Frontend no mesmo repositório para compartilhar tipos e padronizar dependências.
- Ephemeral by Design: Não há persistência de usuários ou salas após o fim da sessão (apenas logs).
- SFU by Default: LiveKit Server (SFU) é obrigatório para estabilidade com 3+ participantes.

### 2.2 Restrições Absolutas (para evitar escopo indevido)
- Não implementar autenticação real (login/senha, OAuth, etc.).
- Não criar CRUD de usuários ou salas (sem entidades de “Room” persistidas).
- Não usar P2P direto entre browsers; toda mídia deve passar pelo SFU (LiveKit).
- Não usar banco para estado de sala (estado “vivo” pertence ao LiveKit).
- Não adicionar chat, gravação (Egress) ou screen share nesta POC.

---

## 3. Escopo do Produto

### 3.1 Funcionalidades IN (Fase POC)
| Funcionalidade | Status | Descrição |
|---|---:|---|
| Entrada (Auth) | IN | Acesso via Guest (input de Nome). Sem login/senha. |
| Gestão de Salas | IN | Sala criada instantaneamente. Exclusão lógica ao esvaziar. |
| Vídeo/Áudio | IN | Transmissão bidirecional com Mute/Unmute e Video On/Off. |
| Grid de Vídeo | IN | Layout responsivo adaptado ao número de participantes. |
| Device Selection | IN | Seleção de Câmera e Microfone durante a chamada. |
| Active Speaker | IN | Destaque visual para quem está falando. |
| Lista de Participantes | IN | Listagem lateral ou modal com participantes da sala. |

### 3.2 Funcionalidades OUT (Non-Goals)
| Funcionalidade | Status | Motivo |
|---|---:|---|
| Screen Share | OUT | Aumenta complexidade de RTC e debugging na fase inicial. |
| Chat de Texto | OUT | Dispersa o foco da validação de A/V e SFU. |
| Gravação | OUT | Exige infraestrutura adicional (Egress) e não é objetivo local. |
| Persistência de Salas/Usuários | OUT | POC é efêmera; somente logs simples são permitidos. |

---

## 4. Persona e Fluxos

### 4.1 Persona
Usuário Convidado (Guest)
- Não possui conta.
- Entra informando nome.
- Permanece até sair da aba ou desconectar.

### 4.2 Fluxo Principal (Happy Path)
1. Usuário acessa `/` (Lobby).
2. Informa `participantName`.
3. Frontend chama `POST /auth/token` para obter JWT e `roomName`.
4. Frontend conecta no LiveKit (`ws://...`) e publica áudio/vídeo.
5. UI renderiza grid + controles.
6. Usuário sai (disconnect / fecha aba). Sala é encerrada quando fica vazia (evento do LiveKit).

---

## 5. Requisitos Funcionais (RF)

### RF01 — Acesso de Convidado (Guest Join)
Descrição  
Usuário deve acessar a home e entrar em uma sala informando apenas o nome.

Critérios de Aceite  
- Dado um `participantName` não vazio (min 2 caracteres)
- Quando o usuário clicar em “Entrar na Reunião”
- Então o frontend deve:
  - Solicitar token ao backend (`POST /auth/token`)
  - Receber `{ token, roomName }`
  - Conectar no LiveKit com sucesso
  - Exibir o vídeo local e o estado de conexão

### RF02 — Controle de Mídia (A/V Toggle)
Descrição  
Usuário deve alternar microfone e câmera durante a chamada.

Critérios de Aceite  
- Dado que o usuário está conectado na sala
- Quando clicar em “Microfone”
- Então deve alternar Mute/Unmute e refletir o estado no ícone
- Quando clicar em “Câmera”
- Então deve alternar On/Off e, se Off, exibir placeholder/avatar

Regras  
- Estado inicial pode ser “Ligado” por padrão, mas deve respeitar permissões do navegador.
- Se permissão for negada, UI deve indicar estado e permitir tentativa de re-habilitar.

### RF03 — Seletor de Dispositivos (Device Manager)
Descrição  
Usuário deve escolher câmera e microfone sem sair da chamada.

Critérios de Aceite  
- Dado que o usuário está conectado
- Quando abrir o menu de dispositivos
- Então deve listar dispositivos disponíveis (câmera/microfone)
- Quando selecionar um item
- Então o input de mídia deve ser trocado em tempo real

Implementação recomendada  
- Utilizar `MediaDeviceMenu` do `@livekit/components-react`.

### RF04 — Visualização em Grid
Descrição  
Aplicação deve renderizar streams de todos os participantes.

Critérios de Aceite  
- Dado que existem N participantes na sala (N>=1)
- Então a UI deve renderizar N tiles de vídeo (ou placeholder quando sem vídeo)
- Layout deve se adaptar responsivamente ao número de participantes

Implementação recomendada  
- Utilizar `<VideoConference />` do `@livekit/components-react`.

### RF05 — Active Speaker
Descrição  
Quem estiver falando deve ter destaque visual.

Critérios de Aceite  
- Dado que há dois ou mais participantes
- Quando um participante falar
- Então sua tile deve receber destaque (borda/foco) com mudança perceptível

### RF06 — Lista de Participantes
Descrição  
Aplicação deve exibir lista de participantes conectados.

Critérios de Aceite  
- Dado que o usuário está em uma sala
- Então deve existir uma lista (sidebar ou modal) com participantes atuais
- Quando alguém entrar/sair
- Então a lista deve atualizar automaticamente

---

## 6. Requisitos Não-Funcionais (RNF)

### RNF01 — Execução Local (One Command)
- Stack deve subir com `docker compose up` sem passos manuais adicionais.

### RNF02 — Capacidade (POC)
- Suportar 2–6 participantes em rede local sem degradação visível (objetivo de validação).

### RNF03 — Reconexão
- Queda de WebSocket deve tentar reconectar automaticamente (com feedback de UI).

### RNF04 — Observabilidade mínima
- Logs devem estar visíveis via stdout dos containers.
- Erros de token, conexão e mídia devem ser logados de forma objetiva.

### RNF05 — Segurança mínima (local)
- Segredos e chaves via variáveis de ambiente.
- Sem exposição desnecessária de portas fora do escopo local.

---

## 7. Arquitetura da Solução

### 7.1 Visão Geral
- Frontend (React/Vite) atua como client WebRTC usando LiveKit SDK.
- Backend (NestJS) atua como Token Server (JWT).
- LiveKit Server é a SFU e fonte de verdade do estado da sala.
- PostgreSQL registra logs de sessão (auditoria local).
- Redis é usado como suporte (LiveKit e eventual pub/sub local).

### 7.2 Estrutura do Monorepo
Gerenciamento sugerido: bun workspaces, Turborepo ou Nx.

Estrutura:

/
├── apps/
│ ├── api/ # NestJS Application
│ └── web/ # React + Vite Application
├── packages/
│ └── shared-types/ # Interfaces/DTOs compartilhados (TokenResponse, TokenRequest, etc.)
├── docker-compose.yml
├── livekit.yaml
└── package.json # Workspaces config


Regras de dependência (para evitar acoplamento)
- `apps/web` pode importar `packages/shared-types`
- `apps/api` pode importar `packages/shared-types`
- `apps/*` não importam diretamente código entre si

### 7.3 Contratos entre Serviços
| Origem | Destino | Protocolo | Contrato |
|---|---|---|---|
| Browser | Web | HTTP | Carrega SPA |
| Web | API | HTTP | `POST /auth/token` |
| API | LiveKit | SDK | Gera JWT (AccessToken) |
| Browser | LiveKit | WebRTC + WS | Conexão de mídia e signaling |
| LiveKit | API | Webhook (opcional) | Eventos de sala (room_started/room_finished) |

### 7.4 Diagrama de Componentes (Conceitual)
```mermaid
graph TD
    User[Browser Client]
    subgraph "Docker Compose Network"
        Frontend[React/Vite Container]
        Backend[NestJS API Container]
        Redis[Redis]
        DB[PostgreSQL]
        LiveKit[LiveKit Server SFU]
    end

    User -->|HTTP| Frontend
    User -->|HTTP| Backend
    Backend -->|SDK JWT| Backend
    Backend -->|Logs| DB
    Backend -->|Pub/Sub (opcional)| Redis
    User -->|WebSocket/WebRTC| LiveKit
    LiveKit -.->|Webhook (opcional)| Backend
```

### 7.5 Stack de Bibliotecas e Padrões de Código

Para garantir a integridade do Monorepo e reduzir duplicação de código, as seguintes bibliotecas são mandatórias:

| Escopo | Biblioteca | Motivo Técnico |
|---|---|---|
| Shared | zod | Definição única de contratos e inferência de tipos TS. |
| Backend | nestjs-zod | Validação automática de DTOs via Pipes. |
| Backend | livekit-server-sdk | Geração de Tokens de acesso e gestão de salas via API. |
| Backend | typeorm + pg | ORM padrão do NestJS para persistência dos logs no PostgreSQL. |
| Backend | @nestjs/config | Gestão de variáveis de ambiente (.env). |
| Frontend | livekit-client | SDK Core para conexão WebRTC. |
| Frontend | @livekit/components-react | Componentes de UI prontos (Room, VideoConference, Controls). |
| Frontend | @livekit/components-styles | CSS base obrigatório para os componentes do LiveKit. |
| Frontend | axios | Cliente HTTP para realizar o POST /auth/token. |
| Frontend | react-hook-form + resolvers | Gestão de formulários (Lobby) integrada ao Zod. |
| Frontend | tailwindcss | Framework CSS utilitário (via PostCSS). |
| Frontend | clsx + tailwind-merge | Utilitários para classes CSS condicionais. |
| Frontend | lucide-react | Ícones leves para botões customizados (Lobby). |

Regra de Ouro do Monorepo:

- Todo DTO de entrada/saída (ex: JoinRoomDto) deve ser definido como um Schema Zod em packages/shared-types.
- O Backend importa esse schema para validar a rota.
- O Frontend importa esse schema para validar o formulário e tipar a requisição.

8. Especificação Técnica
8.1 Backend (NestJS — apps/api)

Arquitetura modular monolítica por domínios.

Módulos

    CoreModule: Config, Logger, Database

    LiveKitModule: wrapper do livekit-server-sdk (AccessToken, RoomServiceClient se necessário)

    SessionModule:

        SessionController: endpoints REST

        SessionService: validação -> token -> log

        SessionEntity: log de sessão (TypeORM)

    WebhooksModule (opcional Fase 1.5): recebe eventos do LiveKit e atualiza log

8.2 Frontend (React — apps/web)

Arquitetura por features e hooks.

Estrutura sugerida

    libs/livekit: provider/config do LiveKit e estilos

    features/lobby: JoinForm, DevicePreview

    features/room: VideoGrid, ControlBar, ParticipantList

    hooks/useToken: client HTTP para POST /auth/token

    shared: tipos importados de packages/shared-types

8.3 LiveKit (SFU)

    LiveKit Server rodando via container oficial.

    Config por livekit.yaml com chaves locais.

    Porta de signaling e faixa UDP configuradas para ambiente local.

9. API (NestJS)

Backend servirá principalmente como emissor de credenciais (Token Server).
9.1 Endpoint REST (Obrigatório)

POST /auth/token
Gera um JWT assinado para conexão com o LiveKit.

Request Body

{
  "participantName": "João Silva",
  "roomName": "Daily-Meeting-01"
}

Regras

    participantName obrigatório (min 2 chars)

    roomName:

        se omitido: backend gera um nome aleatório (ex: room-<shortid>)

        se fornecido: backend aceita para facilitar testes

Processo

    Validar input

    Registrar tentativa no PostgreSQL (session_logs)

    Gerar JWT com permissões:

        canPublish: true

        canSubscribe: true

    Retornar token e roomName

Response

{
  "token": "eyJhbGciOiJIUzI1Ni...",
  "roomName": "Daily-Meeting-01"
}

9.2 Webhooks (Opcional — Fase 1.5, Recomendado)

Configurar endpoint para receber eventos do LiveKit Server (ex: room_finished) para atualizar logs no PostgreSQL.
10. Modelo de Dados (PostgreSQL)

Focado em auditoria, já que o estado vivo está no LiveKit.

Tabela: session_logs

CREATE TABLE session_logs (
    id SERIAL PRIMARY KEY,
    participant_name VARCHAR(255) NOT NULL,
    room_name VARCHAR(255) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);

Observação

    Sem tabelas de usuários/salas persistidas (fora do escopo).

11. Infraestrutura Local (Docker Compose)

Objetivo: garantir que o LiveKit rode localmente sem problemas de rede.
11.1 docker-compose.yml (Raiz do Monorepo)

version: '3.9'
services:
  livekit:
    image: livekit/livekit-server:latest
    command: --config /livekit.yaml --node-ip 127.0.0.1
    ports:
      - "7880:7880"   # API/Signal (HTTP/WebSocket)
      - "7881:7881"   # TCP (RTC)
      - "7882:7882"   # UDP (RTC)
      - "50000-50050:50000-50050/udp" # Media Ports (Range reduzido local)
    volumes:
      - ./livekit.yaml:/livekit.yaml
    networks:
      - livemeet-net

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    networks:
      - livemeet-net

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: livemeet
    ports:
      - "5432:5432"
    networks:
      - livemeet-net

  api:
    build:
      context: .
      dockerfile: ./apps/api/Dockerfile
    environment:
      DATABASE_URL: postgres://user:password@postgres:5432/livemeet
      REDIS_URL: redis://redis:6379
      LIVEKIT_API_KEY: "devkey"
      LIVEKIT_API_SECRET: "secret"
      LIVEKIT_URL: "ws://livekit:7880"
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
      - livekit
    networks:
      - livemeet-net

  web:
    build:
      context: .
      dockerfile: ./apps/web/Dockerfile
    environment:
      VITE_API_URL: "http://localhost:3000"
      VITE_LIVEKIT_URL: "ws://localhost:7880"
    ports:
      - "5173:5173"
    depends_on:
      - api
    networks:
      - livemeet-net

networks:
  livemeet-net:
    driver: bridge

11.2 livekit.yaml

port: 7880
rtc:
  udp_port: 7882
  tcp_port: 7881
  port_range_start: 50000
  port_range_end: 50050
  use_external_ip: false
keys:
  devkey: secret

12. Observabilidade e Debug (mínimo necessário)

    Logs do LiveKit e API via stdout (docker compose logs -f).

    API deve logar:

        payload validado (sem segredos)

        roomName final usado

        criação de token (sucesso/erro)

        erro de DB (se ocorrer)

    Frontend deve exibir:

        estado de conexão (connecting/connected/reconnecting)

        estado de permissões de mídia (granted/denied)

13. Riscos Conhecidos (POC)

    Portas UDP bloqueadas por firewall podem impedir mídia.

    Permissões de câmera/microfone variam por navegador.

    Uso de --node-ip 127.0.0.1 funciona localmente, mas não serve para rede externa (fora de escopo).

14. Roadmap Executável (com verificação)
Fase 1 — Infra (Critérios verificáveis)

    LiveKit responde em http://localhost:7880 (status/health conforme config)

    Redis aceita conexão

    Postgres aceita conexão

Fase 2 — Backend (Token Server)

    POST /auth/token retorna JWT válido

    Token conecta no LiveKit usando URL interna (container) e externa (host) conforme env

Fase 3 — Frontend (UI + LiveKit Components)

    Lobby coleta nome

    Conecta e renderiza vídeo local

    Dois navegadores se veem na mesma sala

Fase 4 — Estabilidade

    3+ participantes sem falhas recorrentes

    Reconexão automática quando WebSocket cai

---

## 15. Plano de Testes (Draft)

### 15.1 Objetivo
Validar que a POC atende aos RF/RNF definidos, com foco em fluxo de entrada, qualidade de mídia, estabilidade e execução local via Docker.

### 15.2 Escopo
- Inclui: RF01–RF06 e RNF01–RNF04.
- Exclui: autenticação real, chat, gravação, screen share, persistência de usuários/salas.

### 15.3 Ambiente de Teste
- Local via Docker Compose (`docker compose up`).
- Navegadores: Chrome e Firefox (últimas versões estáveis).
- Dispositivos: 1 webcam + 1 microfone físicos ou virtuais (loopback permitido).
- Rede: local (LAN), sem VPN.

### 15.4 Tipos de Teste
- Funcional: fluxo de entrada, controles A/V, seleção de dispositivos, lista de participantes.
- Integração: API token + conexão LiveKit + renderização de streams.
- Estabilidade: 3+ participantes, reconexão após queda de WS.
- Observabilidade: logs mínimos no API/LiveKit e feedback de UI.

### 15.5 Casos Prioritários (alto nível)
| ID | Caso | Resultado esperado |
|---|---|---|
| TP01 | Guest Join (RF01) | Token gerado, conexão LiveKit OK, vídeo local visível. |
| TP02 | A/V Toggle (RF02) | Mute/Unmute e Video On/Off refletidos na UI e no stream. |
| TP03 | Device Manager (RF03) | Troca de câmera/mic em tempo real sem desconectar. |
| TP04 | Grid Responsivo (RF04) | Tiles ajustam layout conforme N participantes. |
| TP05 | Active Speaker (RF05) | Destaque visual muda para o participante que fala. |
| TP06 | Participant List (RF06) | Lista atualiza em join/leave em tempo real. |
| TP07 | One Command (RNF01) | Stack sobe sem passos manuais adicionais. |
| TP08 | Estabilidade 3+ (RNF02) | 3–6 participantes sem falhas recorrentes. |
| TP09 | Reconexão (RNF03) | UI indica reconnecting e retorna ao estado connected. |
| TP10 | Logs mínimos (RNF04) | Logs objetivos de token/conexão/mídia. |

### 15.6 Critérios de Entrada
- Docker e Docker Compose instalados.
- Chaves de LiveKit configuradas via env.
- Pelo menos dois navegadores disponíveis para teste.

### 15.7 Critérios de Saída
- Todos os casos TP01–TP10 aprovados.
- Sem falhas bloqueantes de conexão ou mídia.
- Logs mínimos coletados para rastreabilidade.

### 15.8 Evidências
- Capturas de tela (UI conectada, grid, active speaker).
- Trecho de logs do API/LiveKit mostrando token e conexão.
- Nota breve de ambiente (SO, navegador, data).
