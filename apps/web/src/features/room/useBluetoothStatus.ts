import { useCallback, useState } from "react";

import {
  applyReconnectStart,
  applyReconnectSuccess,
  createInitialState,
  type BluetoothDeviceState,
} from "./bluetoothStatus";

export function useBluetoothStatus() {
  const [state, setState] = useState<BluetoothDeviceState>(createInitialState);

  const reconnect = useCallback(() => {
    setState((current) => applyReconnectStart(current));
    console.info("[BLE] reconnect requested");

    // Stub: simulate async reconnect. Replace with real BLE logic later.
    setTimeout(() => {
      setState(() => applyReconnectSuccess());
    }, 1_500);
  }, []);

  return {
    isConnected: state.isConnected,
    isReconnecting: state.isReconnecting,
    reconnect,
  };
}
