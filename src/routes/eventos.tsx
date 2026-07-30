import { createFileRoute, Link } from "@tanstack/react-router";
import { EVENTS } from "@/lib/site-data";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — ACEFS" },
      { name: "description", content: "Agenda de eventos, encontros de negócios, seminários e cafés empresariais promovidos pela ACEFS." },
      { property: "og:title", content: "Eventos — ACEFS" },
      { property: "og:description", content: "Agenda de eventos e encontros empresariais da ACEFS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Eventos,
});

function Eventos() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Eventos ACEFS"
        subtitle="Encontros de negócios, seminários técnicos e capacitações abertas a associados e convidados."
      />
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 space-y-5">
          {EVENTS.map((e) => (
            <article
              key={e.slug}
              className="grid md:grid-cols-12 gap-6 items-center bg-cream border border-line rounded-lg p-6 md:p-7 hover:border-navy/30 hover:shadow-md transition-all duration-200"
            >
              <div className="md:col-span-2">
                <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-lg bg-navy text-white">
                  <span className="font-display font-semibold text-[24px] leading-none">{e.date.split(" ")[0]}</span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-gold mt-1">{e.date.split(" ")[1]}</span>
                </div>
              </div>
              <div className="md:col-span-7">
                <h2 className="font-display font-semibold text-[22px] text-navy leading-snug">{e.title}</h2>
                <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">{e.excerpt}</p>
                <p className="mt-3 text-[13px] text-ink-soft">
                  {e.time} · {e.place}
                </p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <Link
                  to="/contato"
                  className="inline-block bg-navy text-white px-5 py-3 rounded-md font-semibold text-[13.5px] hover:bg-navy-deep transition-all duration-200 active:scale-[0.98]"
                >
                  Quero participar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}