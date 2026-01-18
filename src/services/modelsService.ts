import { apiRepository } from "@/src/lib/apiRepository";
import { Model, ModelDetail } from "@/src/types/model";

export type ModelsFilters = {
  segment?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "year_desc" | "year_asc";
};

function applyFilters(items: Model[], filters: ModelsFilters): Model[] {
  return items.filter((m) => {
    if (filters.segment && m.segment.toLowerCase() !== filters.segment.toLowerCase()) return false;
    if (typeof filters.minYear === "number" && m.year < filters.minYear) return false;
    if (typeof filters.maxYear === "number" && m.year > filters.maxYear) return false;
    if (typeof filters.minPrice === "number" && m.price < filters.minPrice) return false;
    if (typeof filters.maxPrice === "number" && m.price > filters.maxPrice) return false;
    if (filters.search && !m.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}

function applySort(items: Model[], sortBy?: ModelsFilters["sortBy"]): Model[] {
  if (!sortBy) return items;
  const copy = [...items];
  switch (sortBy) {
    case "price_asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price_desc":
      return copy.sort((a, b) => b.price - a.price);
    case "year_asc":
      return copy.sort((a, b) => a.year - b.year);
    case "year_desc":
      return copy.sort((a, b) => b.year - a.year);
    default:
      return items;
  }
}

export const modelsService = {
  async list(filters: ModelsFilters = {}): Promise<{ success: boolean; data?: Model[]; error?: string }> {
    const repo = await apiRepository.fetchAll();
    if (!repo.success) return { success: false, error: repo.error };
    const filtered = applyFilters(repo.data ?? [], filters);
    const sorted = applySort(filtered, filters.sortBy);
    return { success: true, data: sorted };
  },

  async getById(id: number): Promise<{ success: boolean; data?: ModelDetail; error?: string }> {
    if (!Number.isFinite(id) || id <= 0) return { success: false, error: "Invalid model id" };
    return apiRepository.fetchById(id);
  }
};
