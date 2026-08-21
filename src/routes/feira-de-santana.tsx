import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./quem-somos";
import { useSettings } from "@/hooks/use-cms";

export const Route = createFileRoute("/feira-de-santana")({
  head: () => ({
    meta: [
      { title: "Feira de Santana — ACEFS" },
      {
        name: "description",
        content:
          "Conheça Feira de Santana, o Portal do Sertão baiano: sua história, sua vocação comercial e o papel da ACEFS no desenvolvimento da cidade.",
      },
      { property: "og:title", content: "Feira de Santana — ACEFS" },
      {
        property: "og:description",
        content: "Conheça Feira de Santana, o Portal do Sertão baiano, e a força do seu comércio.",
      },
    ],
  }),
  component: FeiraDeSantana,
});

const PHOTOS = [
  { src: "/images/feira-1.jpg", alt: "Vista aérea do centro histórico de Feira de Santana" },
  { src: "/images/feira-2.jpg", alt: "Praça central de Feira de Santana com a igreja matriz" },
  { src: "/images/feira-3.jpg", alt: "Monumento do relógio de São João, símbolo da cidade" },
  { src: "/images/feira-4.webp", alt: "Feira de Santana, tradição do comércio popular baiano" },
];

function FeiraDeSantana() {
  const { data: settings } = useSettings();
  const texto = settings?.feira_de_santana_texto?.trim() || "";

  return (
    <>
      <PageHeader
        eyebrow="Institucional"
        title="Feira de Santana"
        subtitle="O Portal do Sertão — maior polo comercial do interior da Bahia e casa da ACEFS há mais de 80 anos."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <div className="max-w-[720px] space-y-5 text-[16px] leading-relaxed text-ink">
            <h2 className="font-display font-semibold text-[28px] md:text-[34px] text-navy leading-tight">
              A cidade que move o interior da Bahia
            </h2>
            {texto ? (
              <div className="cms-content" dangerouslySetInnerHTML={{ __html: texto }} />
            ) : (
              <>
                <p>
                  Conhecida como o "Portal do Sertão", Feira de Santana ocupa uma posição estratégica no
                  cruzamento das principais rodovias que ligam Salvador ao interior do estado — uma
                  vocação comercial que remonta às antigas feiras de gado do século XIX e que hoje faz da
                  cidade o maior polo econômico, comercial e industrial do interior baiano.
                </p>
                <p>
                  É nesse cenário que a ACEFS nasceu e se desenvolveu: representando um empresariado
                  diverso, que vai do pequeno comerciante do centro histórico às indústrias que hoje geram
                  empregos para toda a região.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-cream py-4 md:py-6">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {PHOTOS.map((photo) => (
              <div key={photo.src} className="rounded-lg overflow-hidden border border-line aspect-[3/4]">
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 text-center">
          <h2 className="font-display font-semibold text-[24px] md:text-[30px] text-navy leading-tight">
            Faça parte do comércio que constrói Feira de Santana.
          </h2>
          <a
            href="https://app.higestor.com.br/inscricao/empresa/associacao-comercial-de-feira-de-santana"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-gold text-navy-deep px-7 py-3.5 rounded-md font-semibold text-[14px] hover:bg-gold-soft transition-colors"
          >
            Associe-se
          </a>
        </div>
      </section>
    </>
  );
}
