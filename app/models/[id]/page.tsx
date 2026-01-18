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
    <div className="bg-white pb-10">
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full aspect-video md:aspect-4/3">
              <Image
                src={model.photo}
                alt={model.name}
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <h2 className="text-[20px] font-bold text-[#191919]">
              {model.name}
            </h2>
            <h1 className="text-[35px] md:text-[50px] font-bold text-[#191919] leading-tight">
              Preparada para cualquier desafío
            </h1>
            <p className="text-[16px] text-[#373737] leading-relaxed">
              Mayor durabilidad, estabilidad, confort de marcha y mucha
              seguridad. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar snap-x snap-mandatory">
            {model.model_highlights.map((highlight, index) => (
              <div
                key={index}
                className="min-w-75 w-75 shrink-0 snap-start flex flex-col gap-3"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold text-[#191919] mb-1">
                    {highlight.title}
                  </h3>
                  <div
                    className="text-[14px] text-[#373737] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlight.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12 space-y-12">
        {model.model_features.map((feature, index) => {
          if (feature.photo) {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={feature.photo}
                      alt={feature.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <h3 className="text-[20px] font-bold text-[#191919]">
                    {feature.name}
                  </h3>
                  <p className="text-[16px] text-[#373737] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="flex flex-col gap-2 max-w-3xl">
              <h3 className="text-[20px] font-bold text-[#191919]">
                {feature.name}
              </h3>
              <p className="text-[16px] text-[#373737] leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
