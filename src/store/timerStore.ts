import { create } from "zustand";

type ModeType = "latihan" | "kompetisi";

interface TimerState {
  time: number;
  initialTime: number;
  isRunning: boolean;
  mode: ModeType;
  relaunchCount: number;
  flightStart: number | null;
  flightDuration: number;
  lastFlight: number;
  wtRelaunch: number;
  possibleFlight: number;

  setMode: (mode: ModeType) => void;
  setTime: (seconds: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  relaunch: () => void;
  startFlight: () => void;
  stopFlight: () => void;
  updateFlightDuration: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  time: 0,
  initialTime: 0,
  isRunning: false,
  mode: "latihan",
  relaunchCount: 0,
  flightStart: null,
  flightDuration: 0,
  lastFlight: 0,
  wtRelaunch: 0,
  possibleFlight: 0,

  setMode: (mode) => set(() => ({ mode })),

  setTime: (seconds) =>
    set(() => ({
      time: seconds,
      initialTime: seconds,
    })),

  start: () => set(() => ({ isRunning: true })),

  pause: () => set(() => ({ isRunning: false })),

  reset: () =>
    set((state) => ({
      time: state.initialTime,
      isRunning: false,
      flightDuration: 0,
      flightStart: null,
      relaunchCount: 0,
      wtRelaunch: state.initialTime,
      possibleFlight: state.initialTime,
      lastFlight: 0, // tambahkan ini
      mode: "latihan", // opsional: reset mode
    })),

  tick: () =>
    set((state) => {
      console.log("Tick: ", state.time);
      if (state.time <= 0) return { isRunning: false };
      return { time: state.time - 1 };
    }),

  relaunch: () =>
    set((state) => {
      const now = Date.now();
      const lastFlight = state.flightStart
        ? Math.floor((now - state.flightStart) / 1000)
        : 0;

      const maxFlight = 600;
      const possibleFlight = Math.min(state.time, maxFlight);

      return {
        relaunchCount: state.relaunchCount + 1,
        flightStart: now,
        flightDuration: 0,
        lastFlight,
        wtRelaunch: state.time,
        possibleFlight,
      };
    }),

  startFlight: () =>
    set((state) => {
      const now = Date.now();
      const maxFlight = 600; // 10 menit
      const possibleFlight = Math.min(state.time, maxFlight);

      return {
        flightStart: now,
        flightDuration: 0,
        wtRelaunch: state.time,
        possibleFlight,
      };
    }),

  stopFlight: () =>
    set((state) => {
      if (!state.flightStart) return {};
      const duration = Math.floor((Date.now() - state.flightStart) / 1000);
      return {
        flightDuration: duration,
        lastFlight: duration, // ← simpan sebagai last flight
        flightStart: null,
      };
    }),

  updateFlightDuration: () =>
    set((state) => {
      if (!state.flightStart) return {};
      const duration = Math.floor((Date.now() - state.flightStart) / 1000);
      return { flightDuration: duration };
    }),
}));
