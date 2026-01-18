import "./globals.css";
import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import Nav from "./components/Nav";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Car Models",
  description: "Car models catalog",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="flex flex-col min-h-screen">
        <header className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Nav />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="h-12.5 w-full bg-[#191919]" />
      </body>
    </html>
  );
}
