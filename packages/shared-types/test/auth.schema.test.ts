import { describe, expect, it } from "bun:test";

import { TokenRequestSchema, TokenResponseSchema } from "../src/auth";

describe("TokenRequestSchema", () => {
  it("accepts a valid payload with only participantName", () => {
    const result = TokenRequestSchema.safeParse({ participantName: "Ana" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ participantName: "Ana" });
    }
  });

  it("accepts a valid payload with roomName", () => {
    const result = TokenRequestSchema.safeParse({
      participantName: "Joao Silva",
      roomName: "Daily-Meeting-01",
    });

    expect(result.success).toBe(true);
  });

  it("rejects participantName shorter than 2 chars", () => {
    const result = TokenRequestSchema.safeParse({ participantName: "A" });

    expect(result.success).toBe(false);
  });

  it("rejects invalid field types", () => {
    const result = TokenRequestSchema.safeParse({
      participantName: 123,
      roomName: 456,
    });

    expect(result.success).toBe(false);
  });
});

describe("TokenResponseSchema", () => {
  it("accepts a valid response payload", () => {
    const result = TokenResponseSchema.safeParse({
      token: "eyJhbGciOiJIUzI1Ni...",
      roomName: "Daily-Meeting-01",
    });

    expect(result.success).toBe(true);
  });

  it("rejects response without token", () => {
    const result = TokenResponseSchema.safeParse({
      roomName: "Daily-Meeting-01",
    });

    expect(result.success).toBe(false);
  });

  it("rejects response with invalid types", () => {
    const result = TokenResponseSchema.safeParse({ token: 100, roomName: true });

    expect(result.success).toBe(false);
  });
});
