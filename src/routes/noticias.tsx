import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NewsCard } from "@/components/news-card";
import { useNoticias } from "@/hooks/use-cms";
import { PageHeader } from "./quem-somos";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias — ACEFS" },
      {
        name: "description",
        content:
          "Acompanhe as últimas notícias, eventos e comunicados da Associação Comercial e Empresarial de Feira de Santana.",
      },
      { property: "og:title", content: "Notícias — ACEFS" },
      { property: "og:description", content: "Últimas notícias e eventos da ACEFS." },
    ],
  }),
  component: Noticias,
});

const CATEGORIES = [
  "Todas",
  "Encontro",
  "Formação",
  "Parceria",
  "Institucional",
  "Evento",
  "Reconhecimento",
] as const;

function Noticias() {
  const [active, setActive] = useState<string>("Todas");
  const { data, isLoading } = useNoticias(true);
  const news = data ?? [];
  const filtered = active === "Todas" ? news : news.filter((n) => n.categoria === active);

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
            {CATEGORIES.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border cursor-pointer transition-all duration-200 ease-out ${
                    isActive
                      ? "bg-navy text-white border-navy shadow-sm"
                      : "bg-white text-ink border-line hover:border-navy hover:text-navy hover:bg-navy/[0.04]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 text-ink-soft text-[14px] py-10">
              <Loader2 size={16} className="animate-spin" /> Carregando notícias…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-ink-soft">
              <p className="text-[15px]">Nenhuma notícia encontrada para essa categoria.</p>
              <button
                onClick={() => setActive("Todas")}
                className="mt-4 inline-flex items-center text-navy font-semibold text-[14px] hover:text-gold transition-colors cursor-pointer"
              >
                Ver todas as notícias
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
