import { TokenRequestSchema } from "@livemeet/shared-types";
import { createZodDto } from "nestjs-zod";

export class TokenRequestDto extends createZodDto(TokenRequestSchema) {}
