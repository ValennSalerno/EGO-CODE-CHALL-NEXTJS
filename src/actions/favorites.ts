import { z } from "zod";
import { cookies } from "next/headers";
import { modelsService } from "@/src/services/modelsService";

const favoriteSchema = z.object({ modelId: z.number().positive() });

export async function addFavorite(form: FormData): Promise<{ success: boolean; data?: { favorites: number[] }; error?: string }> {
  try {
    const payload = Object.fromEntries(form.entries());
    const parsed = favoriteSchema.safeParse({
      modelId: payload.modelId ? Number(payload.modelId) : undefined
    });

    if (!parsed.success) return { success: false, error: "Invalid payload" };

    const modelCheck = await modelsService.getById(parsed.data.modelId);
    if (!modelCheck.success) return { success: false, error: "Model not found" };

    const cookieStore = await cookies();
    const current = cookieStore.get("favorites")?.value;
    const favorites = Array.isArray(current ? JSON.parse(current) : []) ? JSON.parse(current ?? "[]") : [];

    if (!favorites.includes(parsed.data.modelId)) favorites.push(parsed.data.modelId);

    cookieStore.set("favorites", JSON.stringify(favorites));

    return { success: true, data: { favorites } };
  } catch (err: unknown) {
    if (err instanceof Error) return { success: false, error: err.message };
    return { success: false, error: String(err) };
  }
}
