import { createFileRoute } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/site-data";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/artigos")({
  head: () => ({
    meta: [
      { title: "Artigos — ACEFS" },
      { name: "description", content: "Artigos técnicos sobre gestão, tributos, crédito e direito empresarial produzidos pelos conselhos e parceiros da ACEFS." },
      { property: "og:title", content: "Artigos — ACEFS" },
      { property: "og:description", content: "Conteúdo técnico para o empresariado de Feira de Santana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Artigos,
});

function Artigos() {
  return (
    <>
      <PageHeader
        eyebrow="Conteúdo"
        title="Artigos"
        subtitle="Análises e orientações técnicas produzidas pelos conselhos, diretorias e parceiros da associação."
      />
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 grid md:grid-cols-2 gap-6">
          {ARTICLES.map((a) => (
            <article
              key={a.slug}
              className="bg-cream border border-line rounded-lg p-7 hover:border-navy/30 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-semibold">
                <span className="text-gold">{a.category}</span>
                <span className="text-ink-soft/70">{a.date}</span>
              </div>
              <h2 className="mt-3 font-display font-semibold text-[23px] text-navy leading-snug">{a.title}</h2>
              <p className="mt-3 text-[14.5px] text-ink-soft leading-relaxed">{a.excerpt}</p>
              <p className="mt-5 text-[13px] text-ink-soft">Por {a.author}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}