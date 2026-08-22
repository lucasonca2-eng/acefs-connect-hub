import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useServicos } from "@/hooks/use-cms";
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

const WHATSAPP_LINK = "https://wa.me/557532117446?text=Oii%2C%20vim%20do%20site%20da%20ACEFS";

function Servicos() {
  return (
    <>
      <PageHeader
        eyebrow="Nossos serviços"
        title="Serviços para sua empresa"
        subtitle="Da consulta de crédito à formação de equipes, oferecemos soluções pensadas para o dia a dia do empresariado."
      />
      <ServicosCms />
      <section className="bg-cream py-14 border-y border-line">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-semibold text-[24px] md:text-[30px] text-navy leading-tight">
              Precisa de orientação personalizada?
            </h2>
            <p className="mt-2 text-[15px] text-ink-soft">Nossa equipe atende associados e não associados em horário comercial.</p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy text-white px-6 py-3.5 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors shrink-0"
          >
            Fale conosco
          </a>
        </div>
      </section>
    </>
  );
}

function ServicosCms() {
  const { data, isLoading } = useServicos(true);
  const items = data ?? [];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {isLoading ? (
          <div className="flex items-center gap-2 text-ink-soft text-[14px] py-10">
            <Loader2 size={16} className="animate-spin" /> Carregando serviços…
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 text-ink-soft">
            <p className="text-[15px]">
              Nossos serviços estão sendo atualizados. Fale com a equipe pelo WhatsApp para saber mais.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s) => (
              <article
                key={s.id}
                className="bg-white border border-line rounded-xl overflow-hidden shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                {s.imagem_url && (
                  <div className="h-44 bg-[#E5E7EB] overflow-hidden">
                    <img src={s.imagem_url} alt={s.titulo} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="font-display font-semibold text-[20px] text-navy mb-2">{s.titulo}</h2>
                  {s.descricao_curta && (
                    <p className="text-[14px] text-ink-soft leading-relaxed mb-4">{s.descricao_curta}</p>
                  )}
                  {s.conteudo_detalhado && (
                    <div
                      className="cms-content text-[14px] text-ink-soft leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: s.conteudo_detalhado }}
                    />
                  )}
                  <a
                    href={s.link_externo || WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-4 inline-flex items-center gap-2 text-navy font-semibold text-[14px] hover:text-gold"
                  >
                    Saiba mais →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
