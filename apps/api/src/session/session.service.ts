import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SessionLogEntity } from "./session-log.entity.js";

type LogJoinParams = {
  participantName: string;
  roomName: string;
  ipAddress?: string | null;
};

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(SessionLogEntity)
    private readonly sessionLogRepository: Repository<SessionLogEntity>,
  ) {}

  async logJoin({ participantName, roomName, ipAddress }: LogJoinParams): Promise<void> {
    try {
      const log = this.sessionLogRepository.create({
        participantName,
        roomName,
        ipAddress: ipAddress ?? null,
      });

      await this.sessionLogRepository.save(log);
    } catch (error) {
      this.logger.error("Failed to persist session log", error instanceof Error ? error.stack : String(error));
      throw new InternalServerErrorException("Failed to persist session log");
    }
  }
}
