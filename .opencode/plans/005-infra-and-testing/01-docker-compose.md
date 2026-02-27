# Docker Compose

## Services
- `livekit`, `redis`, `postgres`, `api`, `web`.

## Portas
- `7880/7881/7882` e range UDP `50000-50050`.

## Volumes e network
- Montar `livekit.yaml`.
- Network unica `livemeet-net`.

## Env vars
- API: `DATABASE_URL`, `REDIS_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL`.
- Web: `VITE_API_URL`, `VITE_LIVEKIT_URL`.
