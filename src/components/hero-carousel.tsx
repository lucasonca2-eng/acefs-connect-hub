import { useEffect, useState } from "react";
import bannerPremioFama from "@/assets/banner-premio-fama.png.asset.json";

const BANNERS = [
  { src: bannerPremioFama.url, alt: "Prêmio Fama — Vem aí! O maior reconhecimento empresarial de Feira de Santana" },
  { src: "/images/acefs-predio.png", alt: "Sede da ACEFS em Feira de Santana" },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % BANNERS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 pt-6 md:pt-8">
        <div className="relative overflow-hidden rounded-xl bg-navy/5 aspect-[16/7] md:aspect-[21/8]">
          {BANNERS.map((b, idx) => (
            <img
              key={b.src}
              src={b.src}
              alt={b.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {BANNERS.map((b, idx) => (
              <button
                key={b.src}
                aria-label={`Banner ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === i ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
