import { useEffect, useState } from "react";
import { useBanners } from "@/hooks/use-cms";

const FALLBACK_BANNERS = [
  {
    id: "fallback-premio",
    imagem_url: "/images/banner-premio-fama.png",
    titulo: "Prêmio Fama — Vem aí! O maior reconhecimento empresarial de Feira de Santana",
    link_destino: null as string | null,
  },
];

export function HeroCarousel() {
  const { data } = useBanners(true);
  const banners =
    data && data.length > 0
      ? data.map((b) => ({
          id: b.id,
          imagem_url: b.imagem_url,
          titulo: b.titulo,
          link_destino: b.link_destino,
        }))
      : FALLBACK_BANNERS;

  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % banners.length), 6000);
    return () => clearInterval(id);
  }, [banners.length]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 pt-6 md:pt-8">
        <div className="relative overflow-hidden rounded-xl bg-navy/5 aspect-[16/7] md:aspect-[21/8]">
          {banners.map((b, idx) => {
            const img = (
              <img
                src={b.imagem_url}
                alt={b.titulo}
                className="absolute inset-0 h-full w-full object-cover"
              />
            );
            return (
              <div
                key={b.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {b.link_destino ? (
                  <a
                    href={b.link_destino}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block absolute inset-0"
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((b, idx) => (
                <button
                  key={b.id}
                  aria-label={`Banner ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === i ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
