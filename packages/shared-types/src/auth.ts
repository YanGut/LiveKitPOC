import { z } from "zod";

export const TokenRequestSchema = z.object({
  participantName: z.string().min(2),
  roomName: z.string().optional(),
});

export const TokenResponseSchema = z.object({
  token: z.string(),
  roomName: z.string(),
});

export type TokenRequest = z.infer<typeof TokenRequestSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
