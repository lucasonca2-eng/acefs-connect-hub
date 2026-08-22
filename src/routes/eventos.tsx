import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { PageHeader } from "./quem-somos";
import { useEventos } from "@/hooks/use-cms";
import { formatDate } from "@/lib/cms";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — ACEFS" },
      {
        name: "description",
        content: "Confira a agenda de eventos, encontros e ações da ACEFS em Feira de Santana.",
      },
      { property: "og:title", content: "Eventos — ACEFS" },
      { property: "og:description", content: "Agenda de eventos e encontros da ACEFS." },
    ],
  }),
  component: Eventos,
});

const WHATSAPP_LINK = "https://wa.me/557532117446?text=Oii%2C%20vim%20do%20site%20da%20ACEFS";

function Eventos() {
  const { data, isLoading } = useEventos(true);
  const eventos = data ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Eventos ACEFS"
        subtitle="Encontros, formações e ações que fortalecem o associativismo e o comércio de Feira de Santana."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          {isLoading ? (
            <div className="flex items-center gap-2 text-ink-soft text-[14px] py-10">
              <Loader2 size={16} className="animate-spin" /> Carregando eventos…
            </div>
          ) : eventos.length === 0 ? (
            <div className="text-center py-16 text-ink-soft">
              <p className="text-[15px]">Nenhum evento programado no momento. Volte em breve.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {eventos.map((ev) => (
                <article
                  key={ev.id}
                  className="bg-white border border-line rounded-xl overflow-hidden shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  {ev.imagem_url && (
                    <div className="h-52 bg-[#E5E7EB] overflow-hidden">
                      <img
                        src={ev.imagem_url}
                        alt={ev.titulo}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="text-[11px] tracking-[0.18em] uppercase text-gold font-semibold mb-2">
                      {formatDate(ev.data_evento)}
                    </div>
                    <h2 className="font-display font-semibold text-[21px] text-navy leading-tight mb-2">
                      {ev.titulo}
                    </h2>
                    {ev.local && <p className="text-[13px] text-ink-soft mb-3">{ev.local}</p>}
                    {ev.descricao && (
                      <p className="text-[14.5px] text-ink-soft leading-relaxed mb-4">{ev.descricao}</p>
                    )}
                    {ev.conteudo_detalhado && (
                      <div
                        className="cms-content text-[14px] text-ink-soft leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: ev.conteudo_detalhado }}
                      />
                    )}
                    <a
                      href={ev.link_inscricao || WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-navy font-semibold text-[14px] hover:text-gold transition-colors"
                    >
                      Fazer inscrição →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
