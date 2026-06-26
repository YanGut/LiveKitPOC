export const RAISE_HAND_TOPIC = "livemeet.raise-hand.v1";

export type RaiseHandMessage = {
  type: "raise-hand";
  participantIdentity: string;
  participantName: string;
  raised: boolean;
  sentAt: number;
};

export type RaisedParticipant = {
  participantIdentity: string;
  participantName: string;
  raisedAt: number;
};

export type RaiseHandState = Record<string, RaisedParticipant>;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function createRaiseHandMessage(input: Omit<RaiseHandMessage, "type">): RaiseHandMessage {
  return {
    type: "raise-hand",
    participantIdentity: input.participantIdentity,
    participantName: input.participantName,
    raised: input.raised,
    sentAt: input.sentAt,
  };
}

export function encodeRaiseHandMessage(message: RaiseHandMessage): Uint8Array {
  return textEncoder.encode(JSON.stringify(message));
}

export function decodeRaiseHandMessage(payload: Uint8Array, topic?: string): RaiseHandMessage | null {
  if (topic !== RAISE_HAND_TOPIC) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(textDecoder.decode(payload));
    return isRaiseHandMessage(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function applyRaiseHandMessage(state: RaiseHandState, message: RaiseHandMessage): RaiseHandState {
  if (!message.raised) {
    const nextState = { ...state };
    delete nextState[message.participantIdentity];
    return nextState;
  }

  return {
    ...state,
    [message.participantIdentity]: {
      participantIdentity: message.participantIdentity,
      participantName: message.participantName,
      raisedAt: message.sentAt,
    },
  };
}

export function applyParticipantDisconnect(state: RaiseHandState, participantIdentity: string): RaiseHandState {
  const nextState = { ...state };
  delete nextState[participantIdentity];
  return nextState;
}

export function getRaisedParticipants(state: RaiseHandState): RaisedParticipant[] {
  return Object.values(state).sort((left, right) => left.raisedAt - right.raisedAt);
}

export function getRebroadcastMessage(
  state: RaiseHandState,
  localParticipantIdentity: string,
  sentAt: number,
): RaiseHandMessage | null {
  const raisedParticipant = state[localParticipantIdentity];

  if (!raisedParticipant) {
    return null;
  }

  return createRaiseHandMessage({
    participantIdentity: raisedParticipant.participantIdentity,
    participantName: raisedParticipant.participantName,
    raised: true,
    sentAt,
  });
}

function isRaiseHandMessage(value: unknown): value is RaiseHandMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<RaiseHandMessage>;

  return (
    candidate.type === "raise-hand" &&
    typeof candidate.participantIdentity === "string" &&
    candidate.participantIdentity.length > 0 &&
    typeof candidate.participantName === "string" &&
    candidate.participantName.length > 0 &&
    typeof candidate.raised === "boolean" &&
    typeof candidate.sentAt === "number" &&
    Number.isFinite(candidate.sentAt)
  );
}
