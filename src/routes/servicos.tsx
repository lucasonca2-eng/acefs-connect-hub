import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site-data";
import { ServiceIcon } from "@/components/service-icon";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — ACEFS" },
      { name: "description", content: "SCPC, Certificado Digital, cursos e networking. Conheça os serviços da ACEFS para associados e empresas." },
      { property: "og:title", content: "Serviços — ACEFS" },
      { property: "og:description", content: "Serviços empresariais da ACEFS para o comércio, indústria e serviços." },
    ],
  }),
  component: Servicos,
});

function Servicos() {
  return (
    <>
      <PageHeader
        eyebrow="Nossos serviços"
        title="Serviços para sua empresa"
        subtitle="Da consulta de crédito à formação de equipes, oferecemos soluções pensadas para o dia a dia do empresariado."
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article key={s.slug} className="bg-cream border border-line rounded-lg p-7 hover:border-navy/30 hover:shadow-md transition-all flex flex-col">
              <div className="w-12 h-12 rounded-md bg-navy text-white flex items-center justify-center mb-5">
                <ServiceIcon name={s.icon} />
              </div>
              <h3 className="font-display font-semibold text-[21px] leading-snug text-navy mb-3">{s.title}</h3>
              <p className="text-[14.5px] text-ink-soft leading-relaxed mb-5 flex-1">{s.desc}</p>
              <Link to="/contato" className="inline-flex items-center gap-2 text-navy font-semibold text-[14px] hover:text-gold">
                Solicitar informações
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-cream py-14 border-y border-line">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-semibold text-[24px] md:text-[30px] text-navy leading-tight">
              Precisa de orientação personalizada?
            </h2>
            <p className="mt-2 text-[15px] text-ink-soft">Nossa equipe atende associados e não associados em horário comercial.</p>
          </div>
          <Link to="/contato" className="bg-navy text-white px-6 py-3.5 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors shrink-0">
            Fale com a equipe
          </Link>
        </div>
      </section>
    </>
  );
}