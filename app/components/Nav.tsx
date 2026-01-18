"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuGroups = [
  {
    links: [
      "Modelos",
      "Servicios y Accesorios",
      "Financiación",
      "Reviews y Comunidad",
    ],
    hasDivider: true,
  },
  {
    links: [
      "Toyota Mobility Service",
      "Toyota Gazoo Racing",
      "Toyota Híbridos",
    ],
    hasDivider: true,
  },
  {
    links: ["Concesionarios", "Test Drive", "Contacto"],
    hasDivider: false,
  },
];

const footerLinks = [
  "Actividades",
  "Servicios al Cliente",
  "Ventas Especiales",
  "Innovación",
  "Prensa",
  "Acerca de...",
];

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isModelsActive = pathname === "/";
  const isDetailActive = pathname.startsWith("/models/");

  const activeStyles =
    "text-[#D0021B] font-semibold border-b-4 border-[#D0021B] pb-4 px-1";
  const inactiveStyles =
    "text-[#191919] font-semibold pb-4 px-1 hover:text-[#D0021B] transition-colors";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="flex items-center justify-between h-20 relative z-30 bg-white">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Logo.svg" alt="EGO" width={38} height={40} priority />
          </Link>

          <nav className="hidden md:flex items-center gap-10 h-full pt-6">
            <Link
              href="/"
              className={isModelsActive ? activeStyles : inactiveStyles}
            >
              Modelos
            </Link>

            <Link
              href={isDetailActive ? pathname : "/models/1"}
              className={isDetailActive ? activeStyles : inactiveStyles}
            >
              Ficha de modelo
            </Link>
          </nav>
        </div>

        <div
          onClick={toggleMenu}
          className="flex items-center gap-4 cursor-pointer text-[#191919] hover:text-[#D0021B] transition-colors group"
        >
          <span className="text-sm font-medium hidden sm:block">Menú</span>
          <div className="p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex justify-end">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 text-[#191919] font-medium hover:text-[#D0021B] transition-colors"
          >
            <span>Cerrar</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-full overflow-y-auto pb-20">
          {menuGroups.map((group, index) => (
            <div key={index}>
              <div className="px-8 mt-8 space-y-2 text-right text-[20px] leading-6 text-[#191919]">
                {group.links.map((link) => (
                  <div
                    key={link}
                    className="cursor-pointer hover:text-[#D0021B] transition-colors"
                  >
                    {link}
                  </div>
                ))}
              </div>
              {group.hasDivider && (
                <hr className="my-8 mx-8 w-84.5 h-px border-0 border-t border-[#CCCCCC] opacity-100 self-end" />
              )}
            </div>
          ))}

          <div className="mt-auto bg-[#F7F7F7] px-8 py-8 space-y-2 text-right text-[20px] leading-6 text-[#191919]">
            {footerLinks.map((link) => (
              <div
                key={link}
                className="cursor-pointer hover:text-[#D0021B] transition-colors"
              >
                {link}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
