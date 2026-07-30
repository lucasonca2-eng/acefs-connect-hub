import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DIRECTORY } from "@/lib/site-data";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/diretoria")({
  head: () => ({
    meta: [
      { title: "Diretoria e Conselhos — ACEFS" },
      { name: "description", content: "Conheça a diretoria executiva, o conselho diretor, o conselho fiscal e o conselho superior da ACEFS." },
      { property: "og:title", content: "Diretoria e Conselhos — ACEFS" },
      { property: "og:description", content: "Diretoria executiva e conselhos da Associação Comercial e Empresarial de Feira de Santana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Diretoria,
});

function Diretoria() {
  const [active, setActive] = useState(0);
  const group = DIRECTORY[active];
  return (
    <>
      <PageHeader
        eyebrow="Institucional"
        title="Diretoria e conselhos"
        subtitle="A gestão da ACEFS é exercida por empresários voluntários eleitos pelos associados."
      />
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {DIRECTORY.map((g, i) => (
              <button
                key={g.group}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-200 active:scale-[0.98] ${
                  i === active
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-ink border-line hover:border-navy hover:text-navy"
                }`}
              >
                {g.group}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {group.people.map((p) => (
              <article key={p.name} className="bg-cream border border-line rounded-lg p-6">
                <div className="w-10 h-1 bg-gold mb-4" />
                <h3 className="font-display font-semibold text-[18px] text-navy leading-snug">{p.name}</h3>
                {p.role && <p className="mt-2 text-[13.5px] text-ink font-medium">{p.role}</p>}
                {p.company && <p className="mt-1 text-[13.5px] text-ink-soft">{p.company}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}