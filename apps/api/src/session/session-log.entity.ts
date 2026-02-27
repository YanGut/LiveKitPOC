import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "session_logs" })
export class SessionLogEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "participant_name", type: "varchar", length: 255 })
  participantName!: string;

  @Column({ name: "room_name", type: "varchar", length: 255 })
  roomName!: string;

  @CreateDateColumn({ name: "joined_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  joinedAt!: Date;

  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ipAddress!: string | null;
}
