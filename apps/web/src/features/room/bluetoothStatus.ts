export type BluetoothDeviceState = {
  isConnected: boolean;
  isReconnecting: boolean;
};

export function createInitialState(): BluetoothDeviceState {
  return { isConnected: false, isReconnecting: false };
}

export function applyReconnectStart(state: BluetoothDeviceState): BluetoothDeviceState {
  return { ...state, isReconnecting: true };
}

export function applyReconnectSuccess(): BluetoothDeviceState {
  return { isConnected: true, isReconnecting: false };
}

export function applyReconnectFailure(state: BluetoothDeviceState): BluetoothDeviceState {
  return { ...state, isReconnecting: false };
}

export function applyDisconnect(): BluetoothDeviceState {
  return { isConnected: false, isReconnecting: false };
}
