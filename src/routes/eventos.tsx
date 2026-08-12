import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./quem-somos";
import { EVENTS } from "@/lib/site-data";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — ACEFS" },
      {
        name: "description",
        content: "Confira a agenda de eventos, encontros e ações da ACEFS em Feira de Santana.",
      },
    ],
  }),
  component: Eventos,
});

const WHATSAPP_LINK = "https://wa.me/557532117446?text=Oii%2C%20vim%20do%20site%20da%20ACEFS";

function Eventos() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Eventos ACEFS"
        subtitle="Encontros, formações e ações que fortalecem o associativismo e o comércio de Feira de Santana."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-10 space-y-6">
          {EVENTS.map((ev) =>
            ev.hasArt ? (
              <div key={ev.slug} className="rounded-lg overflow-hidden border border-line">
                <div className="bg-navy-deep text-white p-7 md:p-9">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">
                    {ev.date} · {ev.time}
                  </div>
                  <h2 className="font-display font-semibold text-[24px] md:text-[30px] leading-tight mb-3">
                    {ev.title}
                  </h2>
                  <p className="text-white/75 text-[14.5px] leading-relaxed mb-5 max-w-2xl">{ev.desc}</p>
                  <p className="text-white/60 text-[13px] mb-6">{ev.location}</p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold text-navy-deep px-6 py-3 rounded-md font-semibold text-[14px] hover:bg-gold-soft transition-colors"
                  >
                    Fazer inscrição
                  </a>
                </div>
              </div>
            ) : (
              <div
                key={ev.slug}
                className="border border-line rounded-lg p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:border-navy/30 hover:shadow-sm transition-all"
              >
                <div className="shrink-0 md:w-40">
                  <div className="text-[11px] tracking-[0.18em] uppercase text-gold font-semibold">{ev.date}</div>
                  <div className="text-[13px] text-ink-soft mt-0.5">{ev.time}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[17px] text-navy leading-tight mb-1.5">{ev.title}</h3>
                  <p className="text-[13.5px] text-ink-soft leading-relaxed">{ev.desc}</p>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-navy font-semibold text-[13.5px] hover:text-gold inline-flex items-center gap-1.5"
                >
                  Saiba mais →
                </a>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
