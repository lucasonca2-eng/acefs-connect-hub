import { createFileRoute, Link } from "@tanstack/react-router";
import { JOBS } from "@/lib/site-data";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/empregos")({
  head: () => ({
    meta: [
      { title: "Empregos — ACEFS" },
      { name: "description", content: "Vagas de emprego divulgadas pelas empresas associadas à ACEFS em Feira de Santana." },
      { property: "og:title", content: "Empregos — ACEFS" },
      { property: "og:description", content: "Vagas abertas nas empresas associadas à ACEFS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Empregos,
});

function Empregos() {
  return (
    <>
      <PageHeader
        eyebrow="Banco de talentos"
        title="Vagas de emprego"
        subtitle="Oportunidades divulgadas pelas empresas associadas. Cadastre seu currículo e participe dos processos."
      />
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-5">
            {JOBS.map((j) => (
              <article
                key={j.slug}
                className="bg-cream border border-line rounded-lg p-7 hover:border-navy/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-semibold">
                  <span className="text-gold">{j.area}</span>
                  <span className="text-ink-soft/70">{j.date}</span>
                </div>
                <h2 className="mt-3 font-display font-semibold text-[22px] text-navy leading-snug">{j.title}</h2>
                <p className="mt-2 text-[14.5px] text-ink-soft">{j.company}</p>
                <p className="mt-1 text-[13.5px] text-ink-soft">
                  {j.type} · {j.city}
                </p>
                <Link
                  to="/curriculo"
                  className="mt-5 inline-flex items-center gap-2 text-navy font-semibold text-[14px] hover:text-gold transition-colors"
                >
                  Candidatar-se
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-cream py-14 border-y border-line">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-semibold text-[24px] md:text-[30px] text-navy leading-tight">
              É empresa associada e quer divulgar uma vaga?
            </h2>
            <p className="mt-2 text-[15px] text-ink-soft">Envie a descrição da oportunidade e publicamos gratuitamente.</p>
          </div>
          <Link
            to="/contato"
            className="bg-navy text-white px-6 py-3.5 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-all duration-200 active:scale-[0.98] shrink-0"
          >
            Divulgar vaga
          </Link>
        </div>
      </section>
    </>
  );
}