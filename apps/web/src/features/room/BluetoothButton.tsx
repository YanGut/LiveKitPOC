import { Bluetooth } from "lucide-react";

type BluetoothButtonProps = {
  isConnected: boolean;
  isReconnecting: boolean;
  onReconnect: () => void;
};

export function BluetoothButton({ isConnected, isReconnecting, onReconnect }: BluetoothButtonProps) {
  return (
    <button
      type="button"
      disabled={isReconnecting || isConnected}
      onClick={onReconnect}
      className={[
        "inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
        isConnected
          ? "border-emerald-400 bg-emerald-400 text-slate-950 focus:ring-emerald-300"
          : "border-red-500 bg-red-600 text-white hover:bg-red-500 focus:ring-red-300",
        isReconnecting ? "cursor-wait opacity-70" : "",
      ].join(" ")}
    >
      <Bluetooth className="h-4 w-4" />
      {isConnected ? "Oximeter connected" : "Reconnect oximeter"}
    </button>
  );
}
