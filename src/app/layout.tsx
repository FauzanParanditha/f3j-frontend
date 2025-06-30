import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Providers from "./Provider";

export const metadata = {
  title: "F3J Timer",
  description: "Flight Timer for F3J Aeromodelling",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
