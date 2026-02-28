import {
  ConnectionStateToast,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
  useConnectionState,
} from "@livekit/components-react";
import { AlertTriangle, LogOut, Wifi } from "lucide-react";
import { useCallback, useState } from "react";
import type { MediaDeviceFailure } from "livekit-client";

import type { RoomSession } from "../../types/session";

type RoomViewProps = {
  session: RoomSession;
  onLeave: () => void;
};

function ConnectionStatusBadge() {
  const connectionState = useConnectionState();

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
      <Wifi className="h-3.5 w-3.5" />
      {connectionState}
    </span>
  );
}

export function RoomView({ session, onLeave }: RoomViewProps) {
  const [roomError, setRoomError] = useState<string | null>(null);
  const [mediaIssue, setMediaIssue] = useState<string | null>(null);

  const livekitUrl = import.meta.env.VITE_LIVEKIT_URL ?? "ws://localhost:7880";

  const handleMediaFailure = useCallback((failure?: MediaDeviceFailure) => {
    const issue = failure ? String(failure) : "Unknown media device issue";
    setMediaIssue(`Media permission/device issue: ${issue}`);
  }, []);

  return (
    <LiveKitRoom
      token={session.token}
      serverUrl={livekitUrl}
      connect
      audio
      video
      onError={(error) => setRoomError(error.message)}
      onMediaDeviceFailure={handleMediaFailure}
      onDisconnected={onLeave}
      className="flex h-screen flex-col bg-slate-900"
      data-lk-theme="default"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-slate-950/80 px-4 py-3 text-white backdrop-blur">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-slate-400">Room</p>
          <p className="truncate text-sm font-semibold">{session.roomName}</p>
          <p className="truncate text-xs text-slate-300">{session.participantName}</p>
        </div>

        <div className="flex items-center gap-2">
          <ConnectionStatusBadge />
          <button
            type="button"
            onClick={onLeave}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4" />
            Leave
          </button>
        </div>
      </header>

      {(roomError || mediaIssue) && (
        <div className="mx-4 mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          <p className="inline-flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4" />
            {roomError ?? mediaIssue}
          </p>
        </div>
      )}

      <div className="flex-1 overflow-hidden px-3 pb-3 pt-3">
        <VideoConference />
      </div>

      <RoomAudioRenderer />
      <ConnectionStateToast className="!bottom-24" />
    </LiveKitRoom>
  );
}
