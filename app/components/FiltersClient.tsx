"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const segments = [
  "Todos",
  "Autos",
  "Pickups y Comerciales",
  "SUVs y Crossovers",
];

export default function FiltersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams?.get("q") ?? "");
  const currentSegment = searchParams?.get("segment") ?? "Todos";
  const currentSort = searchParams?.get("sortBy") ?? "";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (searchTerm) params.set("q", searchTerm);
      else params.delete("q");

      if ((searchParams?.get("q") ?? "") !== searchTerm) {
        router.push(`/?${params.toString()}`);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, router, searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applySegment = (segment: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (segment && segment !== "Todos") params.set("segment", segment);
    else params.delete("segment");
    router.push(`/?${params.toString()}`);
  };

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (sortValue) params.set("sortBy", sortValue);
    else params.delete("sortBy");
    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  const getSortLabel = () => {
    switch (currentSort) {
      case "price_asc":
        return "De menor a mayor precio";
      case "price_desc":
        return "De mayor a menor precio";
      case "year_desc":
        return "Más nuevos primero";
      case "year_asc":
        return "Más viejos primero";
      default:
        return "Ordenar por";
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 border-b border-gray-300 py-2 focus:outline-none focus:border-brand text-sm transition-colors"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 overflow-x-auto">
          <span className="text-sm font-semibold text-[#191919] whitespace-nowrap">
            Filtrar por
          </span>

          <div className="flex gap-2">
            {segments.map((s) => {
              const isActive = s === currentSegment;
              return (
                <button
                  key={s}
                  onClick={() => applySegment(s)}
                  className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gray-100 text-[#191919] font-medium"
                      : "bg-white text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-[#191919] focus:outline-none"
          >
            {getSortLabel()}
            <svg
              className={`fill-current h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border border-gray-100 py-2">
              <ul className="text-sm text-gray-700">
                <li
                  onClick={() => handleSort("")}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  Nada
                </li>
                <li
                  onClick={() => handleSort("price_asc")}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  De <b className="text-black">MENOR</b> a{" "}
                  <b className="text-black">MAYOR</b> precio
                </li>
                <li
                  onClick={() => handleSort("price_desc")}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  De <b className="text-black">MAYOR</b> a{" "}
                  <b className="text-black">MENOR</b> precio
                </li>
                <li
                  onClick={() => handleSort("year_desc")}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  Más <b className="text-black">NUEVOS</b> primero
                </li>
                <li
                  onClick={() => handleSort("year_asc")}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  Más <b className="text-black">VIEJOS</b> primero
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
