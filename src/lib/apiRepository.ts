import { safeFetchJson } from "./http";
import { Model, ModelDetail } from "../types/model";
import { modelsArraySchema, modelDetailSchema } from "../schemas/model.schema";

const BASE_URL = "https://challenge.egodesign.dev/api/models";

function normalizeModelDetailPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload;

  const record = payload as Record<string, unknown>;

  const normalizedFeatures = Array.isArray(record.model_features)
    ? record.model_features.map((feature) => {
        if (!feature || typeof feature !== "object") return feature;
        const f = feature as Record<string, unknown>;
        return {
          ...f,
          photo: f.photo ?? f.phote
        };
      })
    : record.model_features;

  return {
    ...record,
    model_highlights: record.model_highlights ?? record.model_hightlights,
    model_features: normalizedFeatures
  };
}

export const apiRepository = {
  async fetchAll(): Promise<{ success: boolean; data?: Model[]; error?: string }> {
    const response = await safeFetchJson<unknown>(`${BASE_URL}/`, { cache: "no-store" });
    if (!response.ok) return { success: false, error: response.error };

    const parsed = modelsArraySchema.safeParse(response.data);
    if (!parsed.success) return { success: false, error: parsed.error.message };

    return { success: true, data: parsed.data };
  },

  async fetchById(id: number): Promise<{ success: boolean; data?: ModelDetail; error?: string }> {
    const response = await safeFetchJson<unknown>(
      `${BASE_URL}/${encodeURIComponent(String(id))}/`,
      { cache: "no-store" }
    );

    if (!response.ok) return { success: false, error: response.error };

    const normalizedPayload = normalizeModelDetailPayload(response.data);
    const parsed = modelDetailSchema.safeParse(normalizedPayload);

    if (!parsed.success) return { success: false, error: parsed.error.message };

    return { success: true, data: parsed.data };
  }
};
