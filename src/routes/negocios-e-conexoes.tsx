import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/negocios-e-conexoes")({
  head: () => ({
    meta: [
      { title: "Negócios & Conexões — Programa de rádio da ACEFS" },
      {
        name: "description",
        content:
          "Programa Negócios & Conexões na Rádio Sociedade News FM 102.1, aos domingos das 13h às 15h, com Genildo Melo e Danillo Freitas.",
      },
      { property: "og:title", content: "Negócios & Conexões — Programa de rádio da ACEFS" },
      { property: "og:description", content: "Empreendedorismo, inovação e associativismo aos domingos, das 13h às 15h, na FM 102.1." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramaRadio,
});

function ProgramaRadio() {
  return (
    <>
      <PageHeader
        eyebrow="Rádio"
        title="Programa Negócios & Conexões"
        subtitle="Rádio Sociedade News FM 102.1 · domingos, das 13h às 15h."
      />
      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-md border border-line">
            <p className="text-ink text-[16px] leading-[1.75] mb-4">
              Negócios &amp; Conexões é o programa na Rádio Sociedade News FM 102.1 oferecido pela ACEFS, Sicomércio BA
              Feira de Santana e CDL Feira de Santana, que conecta empresários, empreendedores, lideranças e
              especialistas em um espaço dedicado ao desenvolvimento econômico e ao fortalecimento do ambiente de
              negócios de Feira de Santana e região.
            </p>
            <p className="text-ink text-[16px] leading-[1.75] mb-4">
              Todos os domingos de 13h às 15h, apresentado por Genildo Melo e o jornalista e empresário Danillo Freitas,
              o programa promove entrevistas, análises e debates sobre empreendedorismo, inovação, gestão,
              associativismo, oportunidades de mercado e os principais temas que impactam o setor produtivo.
            </p>

            <div className="my-8 bg-mint p-6 rounded-lg text-center">
              <span className="text-green font-bold">▶ Player de Transmissão ao Vivo (Em breve)</span>
            </div>

            <button
              type="button"
              disabled
              className="bg-line text-ink px-6 py-3 rounded-md cursor-not-allowed opacity-70 font-semibold text-[14px]"
            >
              Veja as edições anteriores (Em breve no Spotify)
            </button>
          </div>
        </div>
      </section>
    </>
  );
}