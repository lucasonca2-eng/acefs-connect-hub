import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/feira-de-santana")({
  head: () => ({
    meta: [
      { title: "Feira de Santana — Perfil econômico | ACEFS" },
      { name: "description", content: "História, economia, educação, saúde e infraestrutura de Feira de Santana, o maior centro urbano do interior do Nordeste." },
      { property: "og:title", content: "Feira de Santana — Perfil econômico | ACEFS" },
      { property: "og:description", content: "Conheça a cidade: economia, transporte, educação, saúde e festividades." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cidade,
});

const BLOCKS = [
  {
    t: "Origem e localização",
    p: [
      "Feira de Santana originou-se no início do século XVIII, na fazenda Santana dos Olhos D'Água, cujos donos, o português Domingos Barbosa de Araújo e Ana Brandoa, construíram uma capela em torno da qual se estruturou uma povoação e, depois, uma feira que se tornou importante centro de permuta comercial.",
      "O município perfaz 1.339 km² e situa-se na planície entre o Recôncavo e os tabuleiros semiáridos do nordeste baiano, a 234 metros de altitude, tendo como principais rios o Jacuípe e o Paraguaçu.",
      "Localizada a 108 km de Salvador, é um dos principais entroncamentos rodoviários do país — o maior do Norte-Nordeste — cortada pelas BRs 101, 116 e 324 e pelas BAs 052, 502, 503 e 504.",
    ],
  },
  {
    t: "Diagnóstico socioeconômico",
    p: [
      "É o segundo maior centro urbano da Bahia e o maior do interior do Norte-Nordeste, liderando uma macrorregião de 96 municípios com cerca de 2,7 milhões de habitantes.",
      "O comércio é o ponto forte da economia, seguido pela indústria, com os polos CIS Tomba e CIS BR-324. A produção industrial é diversificada: alimentos, material de transporte, elétricos, mecânica, química, vestuário, têxtil, móveis, autopeças, bebidas, papel e aeronáutico.",
      "Na pecuária, o município se destaca nacionalmente na criação de asininos, equinos e coelhos, além da produção de frangos, ovos e leite.",
    ],
  },
  {
    t: "Eventos e festividades",
    p: [
      "O calendário anual reúne a Micareta, a EXPOFEIRA (Exposição Agropecuária), o São João de São José, o São Pedro de Humildes, a Caminhada pela Paz, a Feira do Caminhoneiro e o Natal Encantado.",
    ],
  },
  {
    t: "Educação e cultura",
    p: [
      "A cidade é polo de ensino superior na Bahia, com a UEFS, o IFBA, um polo da UFRB e nove instituições particulares.",
      "A rede conta com cerca de 253 escolas de educação infantil, 443 de ensino fundamental e 74 de ensino médio, além do SENAI e do CETEB no ensino profissionalizante.",
    ],
  },
  {
    t: "Transporte, saúde e segurança",
    p: [
      "O município possui aeroporto para aeronaves de pequeno e médio porte, terminal rodoviário e um sistema integrado de transporte com terminais de integração.",
      "Na saúde, são 318 estabelecimentos, 1.358 leitos e 2.522 profissionais, com 2,83 médicos e 3,32 leitos por mil habitantes.",
      "A segurança conta com o 1º Batalhão da Polícia Militar, distribuído em seis companhias, a Polícia Civil e programas em parceria com a prefeitura, como Polícia Cidadã e Ronda Escolar.",
    ],
  },
];

const FACTS = [
  { n: "627 mil", l: "habitantes (IBGE)" },
  { n: "R$ 19,1 bi", l: "maior PIB do interior do NE" },
  { n: "1.339 km²", l: "de área territorial" },
  { n: "108 km", l: "de distância de Salvador" },
];

function Cidade() {
  return (
    <>
      <PageHeader
        eyebrow="A cidade"
        title="Conhecendo Feira de Santana"
        subtitle="O maior centro urbano do interior do Norte-Nordeste e a praça comercial que deu origem à ACEFS."
      />
      <section className="bg-cream py-12 border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {FACTS.map((f) => (
            <div key={f.l} className="bg-white border border-line rounded-lg p-6">
              <div className="font-display font-semibold text-[26px] text-navy tracking-tight">{f.n}</div>
              <div className="mt-1 text-[13px] text-ink-soft leading-relaxed">{f.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[860px] px-6 md:px-10 space-y-12">
          {BLOCKS.map((b) => (
            <div key={b.t}>
              <h2 className="font-display font-semibold text-[26px] md:text-[30px] text-navy leading-tight mb-4">{b.t}</h2>
              <div className="space-y-4 text-[16px] leading-[1.75] text-ink">
                {b.p.map((par) => (
                  <p key={par.slice(0, 24)}>{par}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}