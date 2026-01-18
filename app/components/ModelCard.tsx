import Link from "next/link";
import Image from "next/image";
import { Model } from "@/src/types/model";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <Link
        href={`/models/${model.id}`}
        className="flex flex-col items-center cursor-pointer"
      >
        <h3 className="text-2xl font-bold text-[#191919] group-hover:text-[#D0021B] transition-colors duration-300 mb-2">
          {model.name}
        </h3>

        <div className="text-sm text-[#191919]">
          {model.year} | ${model.price.toLocaleString("es-AR")}
        </div>

        <div className="relative w-67 h-45.5 md:w-67.25 md:h-53.75 my-4 flex items-center justify-center">
          <Image
            src={model.thumbnail}
            alt={model.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 268px, 269px"
            priority={false}
          />
        </div>

        <div className="h-10 flex items-center justify-center">
          <div className="bg-[#191919] text-white text-sm font-medium px-6 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out cursor-pointer">
            Ver Modelo
          </div>
        </div>
      </Link>
    </div>
  );
}
