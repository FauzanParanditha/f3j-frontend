"use client";

import clientAxios from "@/lib/axios/client";
import { useTimerStore } from "@/store/timerStore";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function ScoreForm() {
  const { time, relaunchCount, mode, pause, reset, lastFlight } =
    useTimerStore();

  const [landingScore, setLandingScore] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async () => {
    pause();
    setIsSubmitting(true);

    const flightSeconds = lastFlight;
    const flightTime = formatTime(flightSeconds);
    const totalScore = Math.min(flightSeconds, 600) + landingScore;

    if (lastFlight < 0 || time <= 0) {
      toast.error("Flight terakhir melebihi waktu kerja!");
      return;
    }

    // 🛑 Validasi: waktu habis
    if (time <= 0) {
      toast.error("Waktu habis. Tidak bisa menyimpan skor.");
      setIsSubmitting(false);
      return;
    }

    // 🛑 Validasi: kompetisi hanya boleh 1x relaunch
    if (mode === "kompetisi" && relaunchCount > 1) {
      toast.error("Mode kompetisi hanya mengizinkan 1 kali relaunch.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      mode,
      flightTime,
      flightSeconds,
      landingScore,
      totalScore,
      relaunchCount,
    };

    try {
      const res = await clientAxios.post("/v1/score", payload);

      if (res.status !== 201) {
        toast.error(res.data.message || "Gagal menyimpan skor.");
        return;
      }

      toast.success("Skor berhasil dikirim.");
      reset();
      mutate("/v1/score");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim skor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 space-y-4 rounded bg-white p-4 shadow">
      <div>
        <label className="mb-1 block font-medium">
          Jarak landing dari titik tengah (cm):
        </label>
        <input
          type="number"
          min={0}
          max={100}
          value={landingScore}
          onChange={(e) =>
            setLandingScore(Math.min(100, Math.max(0, Number(e.target.value))))
          }
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || time <= 0}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Mengirim..." : "Simpan Skor"}
      </button>
    </div>
  );
}
