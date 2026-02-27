import { Injectable, Logger } from "@nestjs/common";
import { TokenResponseSchema, type TokenRequest, type TokenResponse } from "@livemeet/shared-types";
import { randomUUID } from "node:crypto";

import { LiveKitService } from "../livekit/livekit.service.js";
import { SessionService } from "../session/session.service.js";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly liveKitService: LiveKitService,
    private readonly sessionService: SessionService,
  ) {}

  async createToken(payload: TokenRequest, ipAddress?: string | null): Promise<TokenResponse> {
    this.logger.log(`Validated payload participantName=${payload.participantName}`);

    const roomName = payload.roomName ?? this.generateRoomName();
    this.logger.log(`Final roomName=${roomName}`);

    const token = await this.liveKitService.generateToken({
      participantName: payload.participantName,
      roomName,
    });

    await this.sessionService.logJoin({
      participantName: payload.participantName,
      roomName,
      ipAddress,
    });

    return TokenResponseSchema.parse({ token, roomName });
  }

  private generateRoomName(): string {
    return `room-${randomUUID().slice(0, 8)}`;
  }
}
