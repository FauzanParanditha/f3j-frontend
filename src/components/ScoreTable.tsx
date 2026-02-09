"use client";

import clientAxios from "@/lib/axios/client";
import { toast } from "react-toastify";
import useSWR from "swr";
import FullScreenLoader from "./ui/LoadingSpinner";

export default function ScoreTable() {
  const { data: scores, isLoading } = useSWR("/v1/score");

  const handleExport = async () => {
    try {
      const res = await clientAxios.get("/v1/score/export", {
        responseType: "blob", // penting untuk file
      });

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "scores.csv";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengekspor skor.");
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <div className="mt-8 rounded bg-white p-4 shadow">
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl font-semibold">Riwayat Skor</h2>

        <div className="mb-4 text-right">
          <button
            onClick={handleExport}
            disabled={scores.length === 0}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">Waktu</th>
              <th className="border px-3 py-2">Mode</th>
              <th className="border px-3 py-2">Flight</th>
              <th className="border px-3 py-2">Landing</th>
              <th className="border px-3 py-2">Total</th>
              <th className="border px-3 py-2">Relaunch</th>
            </tr>
          </thead>
          <tbody>
            {scores.length === 0 && (
              <tr>
                <td className="px-3 py-2 text-center" colSpan={6}>
                  Data Not Found
                </td>
              </tr>
            )}
            {scores.map((s: any) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">
                  {new Date(s.createdAt).toLocaleString()}
                </td>
                <td className="px-3 py-2">{s.mode}</td>
                <td className="px-3 py-2">{s.flightTime}</td>
                <td className="px-3 py-2">{s.landingScore}</td>
                <td className="px-3 py-2 font-semibold">{s.totalScore}</td>
                <td className="px-3 py-2">{s.relaunchCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
