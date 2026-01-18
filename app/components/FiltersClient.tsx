"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FILTER_MAP: Record<string, string | null> = {
  Todos: null,
  Autos: "Sedan",
  "Pickups y Comerciales": "Pickups y Comerciales",
  "SUVs y Crossovers": "SUVs",
};

const REVERSE_FILTER_MAP: Record<string, string> = {
  Sedan: "Autos",
  "Pickups y Comerciales": "Pickups y Comerciales",
  SUVs: "SUVs y Crossovers",
};

const UI_SEGMENTS = Object.keys(FILTER_MAP);

export default function FiltersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSegment = searchParams?.get("segment");
  const currentSegmentLabel =
    urlSegment && REVERSE_FILTER_MAP[urlSegment]
      ? REVERSE_FILTER_MAP[urlSegment]
      : "Todos";

  const currentSort = searchParams?.get("sortBy") ?? "";

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applySegment = (uiLabel: string) => {
    const apiValue = FILTER_MAP[uiLabel];
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    if (apiValue) {
      params.set("segment", apiValue);
    } else {
      params.delete("segment");
    }

    router.push(`/?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (sortValue) params.set("sortBy", sortValue);
    else params.delete("sortBy");
    router.push(`/?${params.toString()}`);
    setIsSortOpen(false);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-[#191919] whitespace-nowrap">
            Filtrar por
          </span>

          <div className="hidden md:flex gap-2">
            {UI_SEGMENTS.map((label) => {
              const isActive = label === currentSegmentLabel;
              return (
                <button
                  key={label}
                  onClick={() => applySegment(label)}
                  className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gray-100 text-[#191919] font-medium"
                      : "bg-white text-[#191919] hover:text-[#D0021B]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="md:hidden relative z-20" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm font-medium text-[#191919] bg-gray-50 px-3 py-1.5 rounded"
            >
              {currentSegmentLabel}
              <svg
                className={`fill-current h-3 w-3 transform transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            {isFilterOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded shadow-lg border border-gray-100 py-1 overflow-hidden">
                <ul className="text-sm text-[#191919]">
                  {UI_SEGMENTS.map((label) => (
                    <li
                      key={label}
                      onClick={() => applySegment(label)}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 ${label === currentSegmentLabel ? "font-bold bg-gray-50" : ""}`}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-[#191919] focus:outline-none"
          >
            {getSortLabel()}
            <svg
              className={`fill-current h-3 w-3 transform transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg border border-gray-100 py-1 overflow-hidden">
              <ul className="text-sm text-[#191919]">
                <li
                  onClick={() => handleSort("")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  Nada
                </li>
                <li
                  onClick={() => handleSort("price_asc")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  De <b className="font-bold">menor</b> a{" "}
                  <b className="font-bold">mayor</b> precio
                </li>
                <li
                  onClick={() => handleSort("price_desc")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  De <b className="font-bold">mayor</b> a{" "}
                  <b className="font-bold">menor</b> precio
                </li>
                <li
                  onClick={() => handleSort("year_desc")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  Más <b className="font-bold">nuevos</b> primero
                </li>
                <li
                  onClick={() => handleSort("year_asc")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  Más <b className="font-bold">viejos</b> primero
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
