"use client";

import { useTimerStore } from "@/store/timerStore";
import { toast } from "react-toastify";

export default function TimerControls() {
  const {
    isRunning,
    start,
    pause,
    reset,
    relaunch,
    relaunchCount,
    mode,
    time,
  } = useTimerStore();

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {!isRunning ? (
        <button
          onClick={start}
          disabled={time <= 0}
          className="rounded bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700 disabled:opacity-50"
        >
          Start
        </button>
      ) : (
        <button
          onClick={pause}
          className="rounded bg-yellow-500 px-4 py-2 text-white shadow hover:bg-yellow-600"
        >
          Pause
        </button>
      )}

      <button
        onClick={reset}
        className="rounded bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600"
      >
        Reset
      </button>

      <button
        onClick={() => {
          if (mode === "kompetisi" && relaunchCount >= 1) {
            toast.error("Maksimum 1x relaunch untuk kompetisi.");
            return;
          }
          relaunch();
        }}
        disabled={mode === "kompetisi" && relaunchCount >= 1}
        className="rounded bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 disabled:opacity-50"
      >
        Relaunch
      </button>

      <div className="flex items-center text-sm text-gray-600">
        Relaunch Count: <strong className="ml-1">{relaunchCount}</strong>
      </div>
    </div>
  );
}
