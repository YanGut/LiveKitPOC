import { zodResolver } from "@hookform/resolvers/zod";
import { TokenRequestSchema, type TokenRequest } from "@livemeet/shared-types";
import { ArrowRight, Hash, UserCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { useToken } from "../../hooks/useToken";
import type { RoomSession } from "../../types/session";

type LobbyFormProps = {
  onJoin: (session: RoomSession) => void;
};

export function LobbyForm({ onJoin }: LobbyFormProps) {
  const { requestToken, isLoading, errorMessage } = useToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenRequest>({
    resolver: zodResolver(TokenRequestSchema),
    defaultValues: {
      participantName: "",
      roomName: undefined,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const payload = TokenRequestSchema.parse({
      participantName: values.participantName.trim(),
      roomName: values.roomName?.trim() || undefined,
    });

    const response = await requestToken(payload);

    onJoin({
      participantName: payload.participantName,
      roomName: response.roomName,
      token: response.token,
    });
  });

  return (
    <section className="w-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor="participantName">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
            <UserCircle2 className="h-4 w-4" />
            Participant Name
          </span>
          <input
            id="participantName"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            {...register("participantName", {
              setValueAs: (value) => String(value).trim(),
            })}
          />
          {errors.participantName ? (
            <span className="text-xs text-rose-600">{errors.participantName.message}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor="roomName">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
            <Hash className="h-4 w-4" />
            Room Name (optional)
          </span>
          <input
            id="roomName"
            type="text"
            placeholder="daily-sync"
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            {...register("roomName", {
              setValueAs: (value) => {
                const normalized = String(value).trim();
                return normalized.length > 0 ? normalized : undefined;
              },
            })}
          />
        </label>

        {errorMessage ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{errorMessage}</p>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowRight className="h-4 w-4" />
          {isLoading ? "Connecting..." : "Enter Meeting"}
        </button>
      </form>
    </section>
  );
}
