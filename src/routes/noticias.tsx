import { createFileRoute } from "@tanstack/react-router";
import { NEWS } from "@/lib/site-data";
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

const CATEGORIES = ["Todas", "Encontro", "Formação", "Parceria", "Institucional", "Evento"] as const;

function Noticias() {
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
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                  i === 0
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-ink border-line hover:border-navy hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <NewsCard key={n.slug} item={n} tone={i % 3 === 0 ? "navy" : i % 3 === 1 ? "gold" : "muted"} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}