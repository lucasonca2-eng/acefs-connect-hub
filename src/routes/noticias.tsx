import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NEWS, NEWS_CATEGORIES } from "@/lib/site-data";
import { NewsCard } from "./index";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias — ACEFS" },
      { name: "description", content: "Acompanhe as últimas notícias, eventos e comunicados da Associação Comercial e Empresarial de Feira de Santana." },
      { property: "og:title", content: "Notícias — ACEFS" },
      { property: "og:description", content: "Últimas notícias e eventos da ACEFS." },
    ],
  }),
  component: Noticias,
});

function Noticias() {
  const [cat, setCat] = useState<string>("Todas");
  const items = cat === "Todas" ? NEWS : NEWS.filter((n) => n.category === cat);
  return (
    <>
      <PageHeader
        eyebrow="Notícias"
        title="Notícias e comunicados"
        subtitle="Acompanhe os acontecimentos da associação e as novidades do comércio regional."
      />
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="flex flex-wrap gap-2 mb-10">
            {NEWS_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors duration-200 active:scale-[0.98] ${
                  cat === c
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-ink border-line hover:border-navy hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((n, i) => (
              <NewsCard key={n.slug} item={n} tone={i % 3 === 0 ? "navy" : i % 3 === 1 ? "gold" : "muted"} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}