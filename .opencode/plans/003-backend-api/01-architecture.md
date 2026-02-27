# Arquitetura do backend

## Dependencias mandatarias
- `nestjs-zod`
- `livekit-server-sdk`
- `typeorm` + `pg`
- `@nestjs/config`
- `@livemeet/shared-types`

## Modulos sugeridos
- `AppModule`
- `ConfigModule` (global)
- `DatabaseModule` (TypeORM)
- `LiveKitModule`
- `SessionModule`

## Entidade SessionLog
- `id` (serial)
- `participantName` (varchar)
- `roomName` (varchar)
- `joinedAt` (timestamp default)
- `ipAddress` (varchar)
