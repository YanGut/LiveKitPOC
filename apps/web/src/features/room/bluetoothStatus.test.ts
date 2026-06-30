import { describe, expect, test } from "bun:test";

import {
  applyDisconnect,
  applyReconnectFailure,
  applyReconnectStart,
  applyReconnectSuccess,
  createInitialState,
} from "./bluetoothStatus";

describe("bluetooth status state", () => {
  test("initial state is disconnected and not reconnecting", () => {
    const state = createInitialState();

    expect(state).toEqual({ isConnected: false, isReconnecting: false });
  });

  test("applyReconnectStart sets isReconnecting to true", () => {
    const state = applyReconnectStart(createInitialState());

    expect(state.isReconnecting).toBe(true);
  });

  test("applyReconnectStart does not change isConnected", () => {
    const state = applyReconnectStart(createInitialState());

    expect(state.isConnected).toBe(false);
  });

  test("applyReconnectSuccess sets isConnected to true and clears isReconnecting", () => {
    const state = applyReconnectSuccess();

    expect(state).toEqual({ isConnected: true, isReconnecting: false });
  });

  test("applyReconnectFailure clears isReconnecting without changing isConnected", () => {
    const reconnecting = applyReconnectStart(createInitialState());
    const state = applyReconnectFailure(reconnecting);

    expect(state).toEqual({ isConnected: false, isReconnecting: false });
  });

  test("applyDisconnect resets to disconnected and not reconnecting", () => {
    const state = applyDisconnect();

    expect(state).toEqual({ isConnected: false, isReconnecting: false });
  });

  test("applyDisconnect from a reconnecting state also clears isReconnecting", () => {
    const state = applyDisconnect();

    expect(state).toEqual({ isConnected: false, isReconnecting: false });
  });
});
