import { Module } from "@nestjs/common";

import { LiveKitModule } from "../livekit/livekit.module.js";
import { SessionModule } from "../session/session.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
  imports: [LiveKitModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
