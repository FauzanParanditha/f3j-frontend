"use client";

import { swrFetcher } from "@/lib/fetcher/swrFetcher";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import "./globals.css";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        revalidateOnFocus: true,
        shouldRetryOnError: true,
        refreshInterval: 0,
        onError: (err) => {
          console.error("[SWR Error]", err.message);
        },
      }}
    >
      {children}
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        pauseOnFocusLoss={false}
      />
    </SWRConfig>
  );
}
