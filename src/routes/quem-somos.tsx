import { createFileRoute, Link } from "@tanstack/react-router";
import { STATS } from "@/lib/site-data";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — ACEFS" },
      { name: "description", content: "Conheça a história, a missão e a estrutura da Associação Comercial e Empresarial de Feira de Santana, fundada em 1944." },
      { property: "og:title", content: "Quem Somos — ACEFS" },
      { property: "og:description", content: "Conheça a história, a missão e a estrutura da ACEFS." },
    ],
  }),
  component: QuemSomos,
});

function QuemSomos() {
  return (
    <>
      <PageHeader
        eyebrow="Institucional"
        title="Sobre a ACEFS"
        subtitle="Há mais de 80 anos representando e fortalecendo o empresariado de Feira de Santana."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-5 text-[16px] leading-relaxed text-ink">
            <h2 className="font-display font-semibold text-[28px] md:text-[34px] text-navy leading-tight">Nossa história</h2>
            <p>
              A Associação Comercial e Empresarial de Feira de Santana foi fundada em 1944, no auge do crescimento comercial da cidade, por um grupo de empresários que compreendia a importância da união e da representação coletiva.
            </p>
            <p>
              Ao longo de mais de oito décadas, a ACEFS consolidou-se como referência institucional na Bahia, sendo filiada à CACB (Confederação das Associações Comerciais e Empresariais do Brasil) e membro fundador da FACEB (Federação das Associações Comerciais e Empresariais da Bahia).
            </p>
            <p>
              Hoje, reunimos mais de 2.400 empresas associadas, atuando em prol do desenvolvimento econômico, da defesa dos interesses do empresariado e da geração de oportunidades para toda a região.
            </p>
          </div>
          <aside className="md:col-span-5">
            <div className="bg-cream border border-line rounded-lg p-6">
              <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-4">Em números</div>
              <ul className="space-y-4">
                {STATS.map((s) => (
                  <li key={s.label} className="flex items-baseline justify-between border-b border-line last:border-0 pb-3 last:pb-0">
                    <span className="font-display font-semibold text-[28px] text-navy tracking-tight">
                      {s.n}<span className="text-gold">{s.suffix}</span>
                    </span>
                    <span className="text-[13px] text-ink-soft text-right max-w-[180px]">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20 border-y border-line">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 grid md:grid-cols-3 gap-6">
          {[
            { t: "Missão", d: "Representar, defender e fortalecer o empresariado de Feira de Santana, promovendo desenvolvimento econômico e geração de oportunidades." },
            { t: "Visão", d: "Ser reconhecida como a principal referência de articulação empresarial no interior da Bahia, unindo tradição e inovação." },
            { t: "Valores", d: "Ética, transparência, colaboração, compromisso com o desenvolvimento regional e respeito à história do comércio local." },
          ].map((v) => (
            <div key={v.t} className="bg-white border border-line rounded-lg p-7">
              <div className="w-10 h-1 bg-gold mb-5" />
              <h3 className="font-display font-semibold text-[22px] text-navy mb-3">{v.t}</h3>
              <p className="text-[14.5px] text-ink-soft leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep text-white py-16">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-display font-semibold text-[26px] md:text-[32px] leading-tight max-w-2xl">
            Faça parte da maior rede empresarial da região.
          </h2>
          <Link to="/contato" className="bg-gold text-navy-deep px-6 py-3.5 rounded-md font-semibold text-[14px] hover:bg-gold-soft transition-colors">
            Associe-se
          </Link>
        </div>
      </section>
    </>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-16 md:py-20">
        <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-4">{eyebrow}</div>
        <h1 className="font-display font-semibold text-[clamp(34px,5vw,56px)] leading-[1.05] tracking-[-0.02em] text-white">
          {title}
        </h1>
        <p className="mt-5 text-[17px] text-white/75 max-w-2xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}