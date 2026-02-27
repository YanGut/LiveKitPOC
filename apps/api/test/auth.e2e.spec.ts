import type { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { ZodValidationPipe } from "nestjs-zod";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { AuthController } from "../src/auth/auth.controller.js";
import { AuthService } from "../src/auth/auth.service.js";
import { LiveKitService } from "../src/livekit/livekit.service.js";
import { SessionService } from "../src/session/session.service.js";

const sessionServiceMock: Pick<SessionService, "logJoin"> = {
  logJoin: async () => {},
};

function decodeJwtPayload(token: string): Record<string, unknown> {
  const encodedPayload = token.split(".")[1];

  if (!encodedPayload) {
    throw new Error("Invalid JWT payload");
  }

  const decodedJson = Buffer.from(encodedPayload, "base64url").toString("utf-8");
  return JSON.parse(decodedJson) as Record<string, unknown>;
}

describe("POST /auth/token (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = "secret";

    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [AuthController],
      providers: [
        AuthService,
        LiveKitService,
        {
          provide: SessionService,
          useValue: sessionServiceMock,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ZodValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns JWT and provided roomName", async () => {
    const response = await request(app.getHttpServer()).post("/auth/token").send({
      participantName: "Ana Clara",
      roomName: "Daily-Meeting-01",
    });

    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(response.body.roomName).toBe("Daily-Meeting-01");

    const payload = decodeJwtPayload(response.body.token);
    expect(payload.iss).toBe("devkey");
    expect(payload.sub).toBe("Ana Clara");
    expect((payload.video as { room?: string }).room).toBe("Daily-Meeting-01");
  });

  it("generates roomName when not provided", async () => {
    const response = await request(app.getHttpServer()).post("/auth/token").send({
      participantName: "Bruno",
    });

    expect(response.status).toBe(200);
    expect(typeof response.body.roomName).toBe("string");
    expect(response.body.roomName.startsWith("room-")).toBe(true);

    const payload = decodeJwtPayload(response.body.token);
    expect((payload.video as { room?: string }).room).toBe(response.body.roomName);
  });

  it("rejects invalid participantName", async () => {
    const response = await request(app.getHttpServer()).post("/auth/token").send({
      participantName: "A",
    });

    expect(response.status).toBe(400);
  });
});
