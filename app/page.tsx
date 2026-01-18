import { modelsService } from "@/src/services/modelsService";
import ModelCard from "./components/ModelCard";
import FiltersClient from "./components/FiltersClient";

type SearchParamsRecord = Record<string, string | string[] | undefined>;
type SearchParamsLike =
  | SearchParamsRecord
  | undefined
  | Promise<SearchParamsRecord | undefined>;

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParamsLike;
}) {
  const resolved = await searchParams;
  const sp: SearchParamsRecord = resolved ?? {};

  const getString = (key: string) => {
    const v = sp[key];
    if (Array.isArray(v)) return v[0];
    if (typeof v === "string" && v.length > 0) return v;
    return undefined;
  };

  const filters = {
    segment: getString("segment"),
    search: getString("q"),
    sortBy: getString("sortBy") as
      | "price_asc"
      | "price_desc"
      | "year_desc"
      | "year_asc"
      | undefined,
  };

  const result = await modelsService.list(filters);

  if (!result.success) {
    return <div role="alert">Failed to load models: {result.error}</div>;
  }

  const models = result.data ?? [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-bold text-[35px] md:text-[50px] leading-tight text-[#191919] mb-8">
          Descubrí todos los modelos
        </h1>

        <FiltersClient />
      </div>

      <section className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {models.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
