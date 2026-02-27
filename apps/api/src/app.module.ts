import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module.js";
import { DatabaseModule } from "./core/database/database.module.js";
import { LiveKitModule } from "./livekit/livekit.module.js";
import { SessionModule } from "./session/session.module.js";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, LiveKitModule, SessionModule, AuthModule],
})
export class AppModule {}
