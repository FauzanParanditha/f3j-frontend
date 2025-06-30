"use client";

import { useTimerStore } from "@/store/timerStore";
import { useEffect } from "react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TimerDisplay() {
  const { time, isRunning, tick, updateFlightDuration } = useTimerStore();

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
    <div className="rounded-lg bg-white p-6 text-center font-mono text-5xl font-bold shadow">
      {formatTime(time)}
    </div>
  );
}
