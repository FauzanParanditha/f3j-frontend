// components/TimerControls.tsx
"use client";

import { useTimerStore } from "@/store/timerStore";
import { formatTime } from "@/utils/timeFormat";
import { useEffect } from "react";

export default function TimerControls() {
  const {
    flightDuration,
    lastFlight,
    flightStart,
    startFlight,
    stopFlight,
    relaunch,
    time,
    mode,
    relaunchCount,
    updateFlightDuration,
  } = useTimerStore();

  const wtRelaunch = formatTime(time);
  const possibleFlight = formatTime(Math.max(0, time - 3));

  useEffect(() => {
    if (!flightStart) return;
    const interval = setInterval(() => {
      updateFlightDuration();
    }, 1000);
    return () => clearInterval(interval);
  }, [flightStart, updateFlightDuration]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">✈️ Flight Control</h2>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded bg-yellow-100 p-4 shadow">
          <p className="text-sm text-yellow-700">Your Flight</p>
          <p className="text-3xl font-bold text-yellow-900">
            {formatTime(flightDuration)}
          </p>
        </div>

        {lastFlight > 0 && (
          <div className="rounded bg-gray-100 p-4 shadow">
            <p className="text-sm text-gray-500">Last Flight</p>
            <p className="text-2xl font-bold">{formatTime(lastFlight)}</p>
          </div>
        )}

        <div className="rounded bg-gray-100 p-4">
          <p className="text-sm text-gray-500">WT-Relaunch</p>
          <p className="text-xl font-bold">{wtRelaunch}</p>
        </div>

        <div className="rounded bg-gray-100 p-4">
          <p className="text-sm text-gray-500">Possible Flight</p>
          <p className="text-xl font-bold">{possibleFlight}</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={startFlight}
          disabled={!!flightStart}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Take Off
        </button>

        <button
          onClick={stopFlight}
          disabled={!flightStart}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          Landing
        </button>

        <button
          onClick={relaunch}
          disabled={mode === "kompetisi" && relaunchCount >= 1}
          className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          Relaunch
        </button>
      </div>

      <div className="rounded bg-gray-100 p-4">
        <p className="text-sm text-gray-500">Relaunch Count</p>
        <p className="text-xl font-bold">{relaunchCount}</p>
      </div>
    </div>
  );
}
