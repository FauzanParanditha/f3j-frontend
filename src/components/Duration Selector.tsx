"use client";

import { useTimerStore } from "@/store/timerStore";
import { useEffect } from "react";

const presetDurations = [
  { label: "0:00", value: 0 },
  { label: "2:00", value: 120 },
  { label: "3:00", value: 180 },
  { label: "5:00", value: 300 },
  { label: "7:00", value: 420 },
  { label: "10:00", value: 600 },
  { label: "15:00", value: 900 },
];

export default function DurationSelector() {
  const { setTime, isRunning, mode } = useTimerStore();

  useEffect(() => {
    if (mode === "kompetisi") {
      setTime(600); // 10 menit tetap
    }
  }, [mode, setTime]);

  if (mode === "kompetisi") return null;

  return (
    <div className="mb-4 text-center">
      <label className="text-sm font-medium">Durasi countdown:</label>
      <select
        className="ml-2 rounded border px-2 py-1"
        onChange={(e) => setTime(Number(e.target.value))}
        disabled={isRunning}
      >
        {presetDurations.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
}
