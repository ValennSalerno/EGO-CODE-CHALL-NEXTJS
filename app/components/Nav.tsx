"use client";

import Link from "next/link";

export default function Nav({
  activeTab = "models",
}: {
  activeTab?: "models" | "detail";
}) {
  const activeStyles = "text-brand font-semibold border-b-2 border-brand pb-3";
  const inactiveStyles = "text-[#191919]";

  return (
    <div className="flex items-center justify-between h-20">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
            EGO
          </div>
        </Link>

        <nav className="hidden md:flex items-end gap-6">
          <Link
            href="/"
            className={activeTab === "models" ? activeStyles : inactiveStyles}
          >
            Modelos
          </Link>

          <Link
            href="/models/1"
            className={activeTab === "detail" ? activeStyles : inactiveStyles}
          >
            Ficha de modelo
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block text-sm text-gray-500">Menu</span>
        <button aria-label="Open menu" className="p-2 md:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="#191919"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
