"use client";

import { useTimerStore } from "@/store/timerStore";
import { useEffect } from "react";

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function WorkingTimeStatus() {
  const {
    time,
    isRunning,
    tick,
    updateFlightDuration,
    initialTime,
    flightDuration,
    startFlight,
    stopFlight,
    flightStart,
    lastFlight,
  } = useTimerStore();

  const wtDec = time; // Waktu kerja tersisa
  const wtInc = initialTime - time; // Waktu kerja yang sudah berjalan

  useEffect(() => {
    if (!isRunning || time <= 0) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick, time]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateFlightDuration();
    }, 1000);
    return () => clearInterval(interval);
  }, [updateFlightDuration]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-center">
        {/* Timer utama */}
        <div className="rounded-lg bg-white p-6 font-mono text-4xl font-bold shadow">
          {formatTime(time)}
          <p className="mt-2 text-sm text-gray-500">Main Timer</p>
        </div>

        {/* Flight Timer */}
        <div className="rounded-lg bg-yellow-100 p-6 font-mono text-4xl font-bold text-yellow-900 shadow">
          {formatTime(flightDuration)}
          <p className="mt-2 text-sm text-yellow-700">Your Flight</p>
        </div>

        {/* WT-Inc */}
        <div className="rounded bg-gray-100 p-4">
          <p className="text-sm font-medium text-gray-500">WT-Inc</p>
          <p className="text-xl font-bold text-black">{formatTime(wtInc)}</p>
        </div>

        {/* WT-Dec */}
        <div className="rounded bg-gray-100 p-4">
          <p className="text-sm font-medium text-gray-500">WT-Dec</p>
          <p className="text-xl font-bold text-black">{formatTime(wtDec)}</p>
        </div>
      </div>

      {/* Tombol Flight */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={startFlight}
          disabled={!!flightStart}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Start Flight
        </button>
        <button
          onClick={stopFlight}
          disabled={!flightStart}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          Stop Flight
        </button>

        {lastFlight > 0 && (
          <div className="text-center text-sm text-gray-600">
            Last Seconds: {formatTime(lastFlight)}
          </div>
        )}
      </div>
    </div>
  );
}
