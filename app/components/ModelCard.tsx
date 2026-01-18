import Link from "next/link";
import Image from "next/image";
import { Model } from "@/src/types/model";

export default function ModelCard({
  model,
  selected = false,
}: {
  model: Model;
  selected?: boolean;
}) {
  const borderClass = selected
    ? "ring-2 ring-brand/70"
    : "border border-transparent";
  const titleClass = selected
    ? "text-brand font-semibold"
    : "text-[#191919] font-semibold";

  return (
    <article
      className={`bg-white ${borderClass} rounded-lg p-4 flex flex-col items-center text-center`}
    >
      <Link href={`/models/${model.id}`} className="w-full">
        <div className="w-full h-48 flex items-end justify-center overflow-hidden relative">
          <Image
            src={model.thumbnail}
            alt={model.name}
            fill
            className="object-contain"
          />
        </div>

        <h3 className={`mt-4 text-xl ${titleClass}`}>{model.name}</h3>

        <div className="mt-2 text-sm text-gray-600">
          <span>{model.year}</span>
          <span className="mx-2">|</span>
          <span>${model.price.toLocaleString()}</span>
        </div>
      </Link>

      <div className="mt-4">
        <Link href={`/models/${model.id}`}>
          <button className="px-4 py-2 rounded-full bg-black text-white text-sm">
            Ver Modelo
          </button>
        </Link>
      </div>
    </article>
  );
}
