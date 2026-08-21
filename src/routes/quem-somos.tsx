import { createFileRoute } from "@tanstack/react-router";
import { useSettings } from "@/hooks/use-cms";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — ACEFS" },
      { name: "description", content: "Conheça a história, a missão e a estrutura da Associação Comercial e Empresarial de Feira de Santana, fundada em 1945." },
      { property: "og:title", content: "Quem Somos — ACEFS" },
      { property: "og:description", content: "Conheça a história, a missão e a estrutura da ACEFS." },
    ],
  }),
  component: QuemSomos,
});

function QuemSomos() {
  const { data: settings } = useSettings();
  const texto = settings?.sobre_nos_texto?.trim() || "";

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
            {texto ? (
              <div className="cms-content" dangerouslySetInnerHTML={{ __html: texto }} />
            ) : (
              <>
                <p>
                  A Associação Comercial e Empresarial de Feira de Santana foi fundada em 1945, no auge do crescimento comercial da cidade, por um grupo de empresários que compreendia a importância da união e da representação coletiva.
                </p>
                <p>
                  Ao longo de mais de oito décadas, a ACEFS consolidou-se como referência institucional na Bahia, sendo filiada à CACB (Confederação das Associações Comerciais e Empresariais do Brasil) e membro fundador da FACEB (Federação das Associações Comerciais e Empresariais da Bahia).
                </p>
                <p>
                  Hoje, reunimos uma gama de empresas associadas, atuando em prol do desenvolvimento econômico, da defesa dos interesses do empresariado e da geração de oportunidades para toda a região.
                </p>
              </>
            )}
          </div>
          <aside className="md:col-span-5">
            <div className="rounded-lg overflow-hidden border border-line">
              <img
                src="/images/acefs-predio.png"
                alt="Sede da ACEFS em Feira de Santana"
                className="w-full h-full object-cover"
              />
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

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">Diretoria</div>
          <h2 className="font-display font-semibold text-[26px] md:text-[32px] text-navy leading-tight mb-8">
            Organograma ACEFS 2025/2027
          </h2>
          <div className="rounded-lg overflow-hidden border border-line">
            <img src="/images/organograma.png" alt="Organograma da diretoria da ACEFS 2025/2027" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="bg-navy-deep text-white py-16">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="w-10 h-1 bg-gold mb-6" />
            <h2 className="font-display font-semibold text-[26px] md:text-[34px] leading-tight">
              Por que se associar à ACEFS?
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-white/75">
              Fazer parte da ACEFS é fortalecer o seu negócio com representatividade, conexões e oportunidades. Tenha
              acesso a serviços, capacitações, networking e benefícios exclusivos, além de fazer parte de uma rede que
              atua na defesa dos interesses empresariais e no desenvolvimento econômico de Feira de Santana.
            </p>
          </div>
          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/15 pt-10">
            <h3 className="font-display font-semibold text-[22px] md:text-[28px] leading-tight max-w-2xl">
              Faça parte da maior rede empresarial da região.
            </h3>
            <a href="https://linktr.ee/acefs" target="_blank" rel="noopener noreferrer" className="bg-gold text-navy-deep px-6 py-3.5 rounded-md font-semibold text-[14px] hover:bg-gold-soft transition-colors">
              Associe-se
            </a>
          </div>
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