import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AccessToken } from "livekit-server-sdk";

type GenerateTokenParams = {
  participantName: string;
  roomName: string;
};

@Injectable()
export class LiveKitService {
  private readonly logger = new Logger(LiveKitService.name);
  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow<string>("LIVEKIT_API_KEY");
    this.apiSecret = this.configService.getOrThrow<string>("LIVEKIT_API_SECRET");
  }

  async generateToken({ participantName, roomName }: GenerateTokenParams): Promise<string> {
    const accessToken = new AccessToken(this.apiKey, this.apiSecret, {
      identity: participantName,
      name: participantName,
    });

    accessToken.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await accessToken.toJwt();
    this.logger.log(`Token generated for participantName=${participantName}`);
    return token;
  }
}
