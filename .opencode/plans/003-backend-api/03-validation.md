# Validacao e Pipes

## Zod + NestJS
- Usar `nestjs-zod` para validar DTOs.
- Adotar `ZodValidationPipe` global ou por rota.

## Contratos compartilhados
- DTOs devem referenciar schemas do `shared-types`.
- Evitar duplicacao de regras de validacao no backend.
