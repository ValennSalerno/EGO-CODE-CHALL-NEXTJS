import { modelsService } from "@/src/services/modelsService";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModelDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const result = await modelsService.getById(id);

  if (!result.success) {
    return (
      <div role="alert" className="p-4 text-red-600">
        Error: {result.error}
      </div>
    );
  }

  const model = result.data!;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-0 flex justify-center">
          <Image
            src={model.photo}
            alt={model.name}
            width={576}
            height={400}
            className="w-full max-w-xl object-contain"
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-500">{model.name}</div>
          <h1 className="text-4xl font-bold text-[#191919]">
            Preparada para cualquier desafío
          </h1>
          <p className="text-base text-gray-600">
            Mayor durabilidad, estabilidad, confort de marcha y mucha seguridad.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

      <section className="mt-8">
        <div className="overflow-x-auto -mx-6 px-6">
          <div className="flex gap-4">
            {Array.isArray(model.model_highlights) &&
            model.model_highlights.length > 0 ? (
              model.model_highlights.map((h, i) => (
                <div
                  key={i}
                  className="min-w-60 bg-white border rounded shadow-sm p-3"
                >
                  <Image
                    src={h.image}
                    alt={h.title}
                    width={240}
                    height={144}
                    className="w-full h-36 object-cover rounded"
                  />
                  <h3 className="mt-3 font-semibold">{h.title}</h3>
                  <p className="text-sm text-gray-600">{h.content}</p>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No highlights available</div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Especificaciones y características
        </h2>
        {Array.isArray(model.model_features) &&
        model.model_features.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {model.model_features.map((f, i) => (
              <li key={i} className="border p-4 rounded">
                <div className="flex items-start gap-4">
                  {f.photo && (
                    <Image
                      src={f.photo}
                      alt={f.name}
                      width={112}
                      height={80}
                      className="w-28 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{f.name}</h3>
                    <p className="text-sm text-gray-600">{f.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No features available</div>
        )}
      </section>
    </main>
  );
}
