// components/WorkingTimeStatus.tsx
"use client";

import { useTimerStore } from "@/store/timerStore";
import { formatTime } from "@/utils/timeFormat";
import { useEffect } from "react";

export default function WorkingTimeStatus() {
  const {
    time,
    isRunning,
    tick,
    reset,
    start,
    initialTime,
    pause,
    updateFlightDuration,
  } = useTimerStore();

  useEffect(() => {
    if (!isRunning || time <= 0) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick, time]);

  const handleStartWorkingTime = () => {
    updateFlightDuration();
    start();
  };

  const wtInc = initialTime - time;
  const wtDec = time;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">⏱ Working Time</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded bg-gray-100 p-4">
          <p className="text-sm font-medium text-gray-500">
            Main Timer (WT-Dec)
          </p>
          <p className="text-xl font-bold">{formatTime(wtDec)}</p>
        </div>
        <div className="rounded bg-gray-100 p-4">
          <p className="text-sm font-medium text-gray-500">Elapsed (WT-Inc)</p>
          <p className="text-xl font-bold">{formatTime(wtInc)}</p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleStartWorkingTime}
          disabled={isRunning}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          Start Working Time
        </button>

        <button
          onClick={reset}
          className="rounded bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600"
        >
          Reset
        </button>

        <button
          onClick={pause}
          disabled={!isRunning}
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50"
        >
          Stop Working Time
        </button>
      </div>
    </div>
  );
}
