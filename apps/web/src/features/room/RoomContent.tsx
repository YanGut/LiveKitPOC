import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  useTrackRefContext,
  useTracks,
} from "@livekit/components-react";
import { AlertTriangle, Hand } from "lucide-react";
import { Track } from "livekit-client";

import { RaiseHandButton } from "./RaiseHandButton";
import { useRaiseHand } from "./useRaiseHand";

function ParticipantTileWithRaiseHand({ raisedHands }: Pick<ReturnType<typeof useRaiseHand>, "raisedHands">) {
  const trackReference = useTrackRefContext();
  const raisedParticipant = raisedHands[trackReference.participant.identity];

  return (
    <div className="relative h-full min-h-0 overflow-hidden rounded-lg bg-slate-950">
      <ParticipantTile className="h-full" />

      {raisedParticipant && (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-300 px-2.5 py-1 text-xs font-bold text-slate-950 shadow-lg">
          <Hand className="h-3.5 w-3.5" />
          Raised
        </div>
      )}
    </div>
  );
}

export function RoomContent() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);
  const { isLocalHandRaised, isPublishing, publishError, raisedHands, toggleLocalHand } = useRaiseHand();

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      {publishError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          <p className="inline-flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4" />
            {publishError}
          </p>
        </div>
      )}

      <GridLayout tracks={tracks} className="min-h-0 flex-1 content-center">
        <ParticipantTileWithRaiseHand raisedHands={raisedHands} />
      </GridLayout>

      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/90 px-3 py-3">
        <ControlBar
          controls={{
            microphone: true,
            camera: true,
            chat: false,
            screenShare: false,
            leave: false,
            settings: false,
          }}
          variation="minimal"
        />
        <RaiseHandButton isRaised={isLocalHandRaised} isPublishing={isPublishing} onToggle={toggleLocalHand} />
      </div>
    </div>
  );
}
