import { Hand } from "lucide-react";

type RaiseHandButtonProps = {
  isRaised: boolean;
  isPublishing: boolean;
  onToggle: () => void;
};

export function RaiseHandButton({ isRaised, isPublishing, onToggle }: RaiseHandButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isRaised}
      disabled={isPublishing}
      onClick={onToggle}
      className={[
        "inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950",
        isRaised
          ? "border-amber-300 bg-amber-300 text-slate-950 hover:bg-amber-200"
          : "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700",
        isPublishing ? "cursor-wait opacity-70" : "",
      ].join(" ")}
    >
      <Hand className="h-4 w-4" />
      {isRaised ? "Lower hand" : "Raise hand"}
    </button>
  );
}
