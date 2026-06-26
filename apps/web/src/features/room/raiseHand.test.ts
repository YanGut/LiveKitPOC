import { describe, expect, test } from "bun:test";

import {
  RAISE_HAND_TOPIC,
  applyParticipantDisconnect,
  applyRaiseHandMessage,
  createRaiseHandMessage,
  decodeRaiseHandMessage,
  encodeRaiseHandMessage,
  getRaisedParticipants,
  getRebroadcastMessage,
  type RaiseHandState,
} from "./raiseHand";

describe("raise hand protocol", () => {
  test("encodes and decodes valid raise hand messages for the expected topic", () => {
    const message = createRaiseHandMessage({
      participantIdentity: "ana",
      participantName: "Ana",
      raised: true,
      sentAt: 1_703_000_000,
    });

    const payload = encodeRaiseHandMessage(message);
    const decoded = decodeRaiseHandMessage(payload, RAISE_HAND_TOPIC);

    expect(decoded).toEqual(message);
  });

  test("ignores messages from unrelated topics", () => {
    const message = createRaiseHandMessage({
      participantIdentity: "ana",
      participantName: "Ana",
      raised: true,
      sentAt: 1_703_000_000,
    });

    const payload = encodeRaiseHandMessage(message);

    expect(decodeRaiseHandMessage(payload, "livemeet.chat.v1")).toBeNull();
  });

  test("ignores malformed payloads", () => {
    expect(decodeRaiseHandMessage(new TextEncoder().encode("{bad json"), RAISE_HAND_TOPIC)).toBeNull();
    expect(decodeRaiseHandMessage(new TextEncoder().encode("{}"), RAISE_HAND_TOPIC)).toBeNull();
  });
});

describe("raise hand state", () => {
  test("raising a hand adds participant state", () => {
    const initialState: RaiseHandState = {};
    const message = createRaiseHandMessage({
      participantIdentity: "ana",
      participantName: "Ana",
      raised: true,
      sentAt: 1_703_000_000,
    });

    const nextState = applyRaiseHandMessage(initialState, message);

    expect(getRaisedParticipants(nextState)).toEqual([
      {
        participantIdentity: "ana",
        participantName: "Ana",
        raisedAt: 1_703_000_000,
      },
    ]);
  });

  test("lowering a hand removes participant state", () => {
    const initialState = applyRaiseHandMessage(
      {},
      createRaiseHandMessage({
        participantIdentity: "ana",
        participantName: "Ana",
        raised: true,
        sentAt: 1_703_000_000,
      }),
    );

    const nextState = applyRaiseHandMessage(
      initialState,
      createRaiseHandMessage({
        participantIdentity: "ana",
        participantName: "Ana",
        raised: false,
        sentAt: 1_703_000_100,
      }),
    );

    expect(getRaisedParticipants(nextState)).toEqual([]);
  });

  test("disconnecting a participant clears their raised hand", () => {
    const initialState = applyRaiseHandMessage(
      {},
      createRaiseHandMessage({
        participantIdentity: "ana",
        participantName: "Ana",
        raised: true,
        sentAt: 1_703_000_000,
      }),
    );

    const nextState = applyParticipantDisconnect(initialState, "ana");

    expect(getRaisedParticipants(nextState)).toEqual([]);
  });

  test("rebroadcasts local raised hand state for late joiners", () => {
    const state = applyRaiseHandMessage(
      {},
      createRaiseHandMessage({
        participantIdentity: "ana",
        participantName: "Ana",
        raised: true,
        sentAt: 1_703_000_000,
      }),
    );

    const rebroadcast = getRebroadcastMessage(state, "ana", 1_703_000_500);

    expect(rebroadcast).toEqual({
      type: "raise-hand",
      participantIdentity: "ana",
      participantName: "Ana",
      raised: true,
      sentAt: 1_703_000_500,
    });
  });

  test("does not rebroadcast when the local hand is lowered", () => {
    expect(getRebroadcastMessage({}, "ana", 1_703_000_500)).toBeNull();
  });
});
