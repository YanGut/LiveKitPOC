import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SessionLogEntity } from "./session-log.entity.js";
import { SessionService } from "./session.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([SessionLogEntity])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
