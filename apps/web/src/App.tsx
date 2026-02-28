import { Video } from "lucide-react";
import { useState } from "react";

import { LobbyForm } from "./features/lobby/LobbyForm";
import { RoomView } from "./features/room/RoomView";
import type { RoomSession } from "./types/session";

function App() {
  const [session, setSession] = useState<RoomSession | null>(null);

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">
          <section className="w-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:max-w-md">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              <Video className="h-3.5 w-3.5" />
              LiveMeet POC
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Join a LiveKit room</h1>
            <p className="mt-3 text-sm text-slate-600">
              Enter your display name and optionally set a room. If no room is provided, the backend creates one.
            </p>
          </section>

          <LobbyForm onJoin={setSession} />
        </div>
      </main>
    );
  }

  return <RoomView session={session} onLeave={() => setSession(null)} />;
}

export default App;
