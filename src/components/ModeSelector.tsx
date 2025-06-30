"use client";

import { useTimerStore } from "@/store/timerStore";

export default function ModeSelector() {
  const { mode, setMode } = useTimerStore();

  return (
    <div className="mb-4 flex items-center justify-center gap-4">
      <label className="text-sm font-medium">Mode:</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as "latihan" | "kompetisi")}
        className="rounded border px-3 py-1"
      >
        <option value="latihan">Latihan</option>
        <option value="kompetisi">Kompetisi</option>
      </select>
    </div>
  );
}
