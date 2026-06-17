import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACEFS — Associação Comercial e Empresarial de Feira de Santana" },
      { name: "description", content: "Há mais de 80 anos representando, defendendo e fortalecendo o empresariado de Feira de Santana e região." },
      { property: "og:title", content: "ACEFS — Associação Comercial e Empresarial de Feira de Santana" },
      { property: "og:description", content: "Há mais de 80 anos representando, defendendo e fortalecendo o empresariado de Feira de Santana." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navItems = [
  { label: "Início", href: "#", active: true },
  { label: "A Associação", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Notícias", href: "#noticias" },
  { label: "Contato", href: "#contato" },
];

const services = [
  { num: "01", title: "SCPC / Boa Vista", desc: "Consultas de crédito, análise de risco e proteção contra inadimplência para sua empresa.", link: "Acessar consultas" },
  { num: "02", title: "Certificado Digital", desc: "Emissão de e-CPF e e-CNPJ com atendimento ágil em nossa sede ou na sua empresa.", link: "Agendar emissão" },
  { num: "03", title: "Cursos e Capacitação", desc: "Treinamentos para empresários e equipes, com foco em gestão, vendas e finanças.", link: "Ver agenda" },
  { num: "04", title: "Networking", desc: "Conexões estratégicas, eventos exclusivos e encontros entre lideranças do comércio.", link: "Próximos eventos" },
];

const news = [
  { date: "12 JUN 2026", title: "ACEFS reúne lideranças para debater futuro do varejo regional", desc: "Encontro reuniu mais de 200 empresários no auditório da associação." },
  { date: "04 JUN 2026", title: "Nova rodada de cursos gratuitos para associados em julho", desc: "Inscrições abertas para capacitações em gestão financeira e marketing digital." },
  { date: "28 MAI 2026", title: "Parceria com Sebrae amplia consultoria gratuita às MPEs", desc: "Atendimento começa em junho na sede da ACEFS, com agenda semanal." },
];

function Index() {
  return (
    <div className="pb-[74px]">
      {/* Topbar */}
      <div className="bg-green-deep text-white text-[13px] py-2">
        <div className="mx-auto max-w-[1180px] px-8 flex justify-between items-center">
          <div className="flex gap-6 text-white/75">
            <span>(75) 3221-0000</span>
            <span>contato@acefs.com.br</span>
          </div>
          <div className="flex gap-3.5 text-white/75">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-line sticky top-0 z-50">
        <div className="mx-auto max-w-[1180px] px-8 py-[18px] flex items-center justify-between">
          <a href="/" className="font-display font-bold text-[26px] text-green-deep tracking-[0.5px] leading-none">
            ACEFS<span className="text-gold">.</span>
            <small className="block font-sans font-medium text-[10.5px] tracking-[1.2px] text-ink-soft uppercase mt-0.5">
              Desde 1944 · Feira de Santana
            </small>
          </a>
          <nav>
            <ul className="flex gap-9 list-none">
              {navItems.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className={`text-[14.5px] font-semibold py-1.5 relative transition-colors hover:text-green ${
                      n.active ? "text-green after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold" : "text-ink"
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#associe" className="bg-green text-white px-6 py-[11px] text-sm font-semibold rounded-[4px] hover:bg-green-deep transition-colors">
            Associe-se
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-green-deep text-white overflow-hidden pt-24 pb-[110px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 30%, rgba(201,162,75,0.16) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(201,162,75,0.10) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-[1180px] px-8 grid grid-cols-[1.1fr_0.9fr] gap-[60px] items-center">
          <div>
            <Eyebrow tone="gold">Associação Comercial · Est. 1944</Eyebrow>
            <h1 className="text-[48px] text-white mb-[22px] tracking-[-0.5px]">
              O comércio de Feira de Santana <em className="not-italic text-gold-soft">tem casa</em>, tem voz e tem história.
            </h1>
            <p className="text-[17px] text-white/[0.78] max-w-[480px] mb-9">
              Há mais de 80 anos representando, defendendo e fortalecendo o empresariado da nossa região com serviços, capacitação e articulação política.
            </p>
            <div className="flex gap-4">
              <a href="#associe" className="bg-gold text-green-deep px-[30px] py-[15px] font-bold text-[14.5px] rounded-[4px] hover:bg-gold-soft hover:-translate-y-[1px] transition-all">
                Torne-se associado
              </a>
              <a href="#servicos" className="border-[1.5px] border-white/35 text-white px-[30px] py-[15px] font-semibold text-[14.5px] rounded-[4px] hover:border-white hover:bg-white/[0.06] transition-all">
                Conheça os serviços
              </a>
            </div>
          </div>
          <div className="bg-white/[0.06] border border-white/[0.14] rounded-md p-9 backdrop-blur-md">
            <StatRow num="82" label="anos de atuação contínua" />
            <StatRow num="2.4k+" label="empresas associadas ativas" />
            <StatRow num="40+" label="serviços e benefícios" />
            <StatRow num="120" label="eventos realizados em 2025" />
          </div>
        </div>
      </section>

      {/* Seal strip */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[1180px] px-8 py-[26px] flex items-center gap-10">
          <div className="flex-shrink-0 w-14 h-14 border-[1.5px] border-gold rounded-full flex items-center justify-center -rotate-6">
            <span className="font-display text-[11px] font-bold text-green tracking-[0.5px] text-center leading-tight">
              ACEFS<br />1944
            </span>
          </div>
          <p className="text-[13.5px] text-ink-soft">
            <strong className="text-green-deep">Filiada à CACB</strong> — Confederação das Associações Comerciais e Empresariais do Brasil, e à FACEB, na Bahia.
          </p>
        </div>
      </div>

      {/* Services */}
      <section id="servicos" className="py-[90px] bg-white border-y border-line">
        <div className="mx-auto max-w-[1180px] px-8">
          <div className="max-w-[620px] mb-[54px]">
            <Eyebrow tone="green">O que oferecemos</Eyebrow>
            <h2 className="text-[34px] mb-3.5">Serviços que sustentam o dia a dia do seu negócio.</h2>
            <p className="text-ink-soft text-[15.5px]">
              De crédito a capacitação, oferecemos a infraestrutura que sua empresa precisa para crescer com segurança.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-px bg-line border border-line">
            {services.map((s) => (
              <div key={s.num} className="bg-white p-10 px-8 hover:bg-cream transition-colors">
                <span className="block font-display text-[13px] text-gold font-bold mb-5">{s.num}</span>
                <h3 className="text-[19px] mb-2.5">{s.title}</h3>
                <p className="text-sm text-ink-soft mb-[18px]">{s.desc}</p>
                <a href="#" className="text-[13px] font-bold text-green border-b-[1.5px] border-gold pb-0.5">{s.link}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="py-[90px]">
        <div className="mx-auto max-w-[1180px] px-8 grid grid-cols-[0.85fr_1.15fr] gap-[70px] items-center">
          <div className="aspect-[4/5] rounded-[4px] relative overflow-hidden" style={{ background: "linear-gradient(160deg, var(--green) 0%, var(--green-deep) 100%)" }}>
            <span className="absolute bottom-6 left-6 text-white/55 text-[11px] tracking-[2px] font-bold">FEIRA DE SANTANA</span>
          </div>
          <div>
            <Eyebrow tone="green">A Associação</Eyebrow>
            <h2 className="text-[32px] mb-5">Uma instituição construída por empresários, para empresários.</h2>
            <p className="text-ink-soft text-[15.5px] mb-[18px]">
              Fundada em 1944, a ACEFS nasceu da necessidade de unir o comércio feirense em torno de uma pauta comum: progresso, representatividade e desenvolvimento econômico para a Princesa do Sertão.
            </p>
            <p className="text-ink-soft text-[15.5px]">
              Hoje somos referência regional em articulação setorial, oferecendo serviços essenciais e mantendo diálogo permanente com o poder público.
            </p>
            <div className="mt-7 flex flex-col gap-3.5">
              {[
                "Representação institucional junto a órgãos municipais e estaduais",
                "Defesa de pautas estratégicas para o varejo e serviços",
                "Rede consolidada com mais de 2.400 empresas associadas",
                "Sede própria no centro de Feira de Santana",
              ].map((item) => (
                <div key={item} className="flex gap-3.5 items-start text-[14.5px]">
                  <span className="w-[7px] h-[7px] rounded-full bg-gold mt-[7px] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="noticias" className="py-[90px] bg-green-deep text-white">
        <div className="mx-auto max-w-[1180px] px-8">
          <div className="max-w-[620px] mb-[54px]">
            <Eyebrow tone="goldSoft">Notícias</Eyebrow>
            <h2 className="text-[34px] mb-3.5 text-white">O que acontece na ACEFS e no comércio regional.</h2>
            <p className="text-white/65 text-[15.5px]">
              Acompanhe nossos comunicados, eventos e ações em defesa do empresariado feirense.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-7">
            {news.map((n) => (
              <article key={n.title} className="bg-white/[0.04] border border-white/10 rounded-[4px] overflow-hidden hover:border-gold hover:-translate-y-[3px] transition-all">
                <div className="h-40" style={{ background: "linear-gradient(135deg, rgba(201,162,75,0.25), rgba(14,42,20,0.4))" }} />
                <div className="p-[26px]">
                  <span className="block text-[11.5px] text-gold-soft font-bold tracking-[1px] uppercase mb-3">{n.date}</span>
                  <h3 className="text-white text-[17px] mb-2.5 leading-snug">{n.title}</h3>
                  <p className="text-[13.5px] text-white/60">{n.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section id="associe" className="bg-gold py-16">
        <div className="mx-auto max-w-[1180px] px-8 flex justify-between items-center gap-10">
          <h2 className="text-[28px] text-green-deep max-w-[480px]">Faça parte da maior rede empresarial de Feira de Santana.</h2>
          <a href="#" className="bg-green-deep text-white px-[34px] py-4 font-bold text-[14.5px] rounded-[4px] flex-shrink-0 hover:bg-green transition-colors">
            Quero me associar
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-green-deep text-white/70 border-t border-white/10">
        <div className="mx-auto max-w-[1180px] px-8 py-16 grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="font-display font-bold text-2xl text-white">ACEFS<span className="text-gold">.</span></div>
            <p className="text-[13.5px] mt-4 max-w-xs">Associação Comercial e Empresarial de Feira de Santana. Desde 1944.</p>
          </div>
          <FooterCol title="Institucional" items={["A Associação", "Diretoria", "História", "Estatuto"]} />
          <FooterCol title="Serviços" items={["SCPC / Boa Vista", "Certificado Digital", "Cursos", "Eventos"]} />
          <FooterCol title="Contato" items={["Rua Senhor dos Passos, 100", "Centro · Feira de Santana — BA", "(75) 3221-0000", "contato@acefs.com.br"]} />
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1180px] px-8 py-5 text-[12.5px] text-white/50 flex justify-between">
            <span>© {new Date().getFullYear()} ACEFS — Todos os direitos reservados.</span>
            <span>Feira de Santana, Bahia</span>
          </div>
        </div>
      </footer>

      {/* Radio bar */}
      <div className="fixed bottom-0 inset-x-0 h-[74px] bg-green text-white border-t-2 border-gold flex items-center z-40">
        <div className="mx-auto max-w-[1180px] px-8 w-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-soft animate-pulse" />
            <div>
              <div className="text-[11px] uppercase tracking-[1.5px] text-gold-soft font-bold">Ao vivo · Rádio ACEFS</div>
              <div className="text-sm font-semibold">Programa do Comércio — boletim das 18h</div>
            </div>
          </div>
          <button className="bg-gold text-green-deep px-6 py-2.5 rounded-[4px] font-bold text-[13px] hover:bg-gold-soft transition-colors">
            ▶ Ouvir agora
          </button>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children, tone }: { children: React.ReactNode; tone: "gold" | "green" | "goldSoft" }) {
  const color = tone === "gold" ? "text-gold-soft" : tone === "goldSoft" ? "text-gold-soft" : "text-green";
  const bar = tone === "green" ? "bg-green" : "bg-gold-soft";
  return (
    <span className={`inline-flex items-center gap-2.5 text-[12.5px] font-bold tracking-[1.6px] uppercase mb-[22px] ${color}`}>
      <span className={`w-7 h-px ${bar}`} />
      {children}
    </span>
  );
}

function StatRow({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex justify-between py-[18px] border-b border-white/10 last:border-b-0">
      <span className="font-display text-[30px] font-semibold text-gold-soft">{num}</span>
      <span className="text-[12.5px] text-white/65 max-w-[140px] text-right leading-snug self-center">{label}</span>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-white text-sm font-bold uppercase tracking-[1.5px] mb-4">{title}</h4>
      <ul className="space-y-2 text-[13.5px]">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
