import { createFileRoute } from "@tanstack/react-router";
import { PARTNERS } from "@/lib/site-data";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros — ACEFS" },
      { name: "description", content: "Conheça as entidades e empresas parceiras da Associação Comercial e Empresarial de Feira de Santana." },
      { property: "og:title", content: "Parceiros — ACEFS" },
      { property: "og:description", content: "Entidades e empresas parceiras da ACEFS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Parceiros,
});

function Parceiros() {
  return (
    <>
      <PageHeader
        eyebrow="Rede"
        title="Nossos parceiros"
        subtitle="Instituições e empresas que caminham com a ACEFS na promoção do desenvolvimento econômico regional."
      />
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="h-28 rounded-lg border border-line bg-cream flex items-center justify-center px-4 text-center font-display font-semibold text-[17px] text-navy hover:border-navy/30 hover:shadow-md transition-all duration-200"
              >
                {p}
              </div>
            ))}
          </div>
          <p className="mt-10 text-[15px] text-ink-soft max-w-2xl leading-relaxed">
            Quer se tornar parceiro da ACEFS e alcançar mais de 2.400 empresas associadas? Fale com a nossa
            diretoria de marketing pelo e-mail acefs@acefs.com.br.
          </p>
        </div>
      </section>
    </>
  );
}