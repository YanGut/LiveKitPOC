import "reflect-metadata";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, "0.0.0.0");

  Logger.log(`API listening on port ${port}`, "Bootstrap");
}

void bootstrap();
