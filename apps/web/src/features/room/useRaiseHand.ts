import { useParticipants, useRoomContext } from "@livekit/components-react";
import { RoomEvent, type RemoteParticipant } from "livekit-client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

export function useRaiseHand() {
  const room = useRoomContext();
  const participants = useParticipants();
  const previousParticipantCount = useRef(participants.length);
  const [raisedHands, setRaisedHands] = useState<RaiseHandState>({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const localParticipant = room.localParticipant;
  const localIdentity = localParticipant.identity;
  const localName = localParticipant.name || localParticipant.identity;
  const isLocalHandRaised = Boolean(raisedHands[localIdentity]);

  const publishMessage = useCallback(
    async (raised: boolean, sentAt = Date.now()) => {
      const message = createRaiseHandMessage({
        participantIdentity: localIdentity,
        participantName: localName,
        raised,
        sentAt,
      });

      await localParticipant.publishData(encodeRaiseHandMessage(message), {
        reliable: true,
        topic: RAISE_HAND_TOPIC,
      });

      setRaisedHands((currentState) => applyRaiseHandMessage(currentState, message));
      return message;
    },
    [localIdentity, localName, localParticipant],
  );

  const toggleLocalHand = useCallback(async () => {
    const nextRaisedState = !isLocalHandRaised;

    setIsPublishing(true);
    setPublishError(null);

    try {
      await publishMessage(nextRaisedState);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to update raise hand state.";
      setPublishError(message);
    } finally {
      setIsPublishing(false);
    }
  }, [isLocalHandRaised, publishMessage]);

  useEffect(() => {
    const handleDataReceived = (
      payload: Uint8Array,
      _participant?: RemoteParticipant,
      _kind?: unknown,
      topic?: string,
    ) => {
      const message = decodeRaiseHandMessage(payload, topic);

      if (!message) {
        return;
      }

      setRaisedHands((currentState) => applyRaiseHandMessage(currentState, message));
    };

    const handleParticipantDisconnected = (participant: RemoteParticipant) => {
      setRaisedHands((currentState) => applyParticipantDisconnect(currentState, participant.identity));
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
      room.off(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);
    };
  }, [room]);

  useEffect(() => {
    const participantJoined = participants.length > previousParticipantCount.current;
    previousParticipantCount.current = participants.length;

    if (!participantJoined) {
      return;
    }

    const rebroadcastMessage = getRebroadcastMessage(raisedHands, localIdentity, Date.now());

    if (!rebroadcastMessage) {
      return;
    }

    localParticipant
      .publishData(encodeRaiseHandMessage(rebroadcastMessage), {
        reliable: true,
        topic: RAISE_HAND_TOPIC,
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Unable to rebroadcast raise hand state.";
        setPublishError(message);
      });
  }, [localIdentity, localParticipant, participants.length, raisedHands]);

  const raisedParticipantList = useMemo(() => getRaisedParticipants(raisedHands), [raisedHands]);

  return {
    isLocalHandRaised,
    isPublishing,
    publishError,
    raisedHands,
    raisedParticipantList,
    toggleLocalHand,
  };
}
