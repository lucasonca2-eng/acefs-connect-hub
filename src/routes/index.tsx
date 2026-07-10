import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACEFS — Associação Comercial e Empresarial de Feira de Santana" },
      { name: "description", content: "Há mais de 80 anos representando, defendendo e fortalecendo o empresariado de Feira de Santana e região." },
      { property: "og:title", content: "ACEFS — Associação Comercial e Empresarial de Feira de Santana" },
      { property: "og:description", content: "Há mais de 80 anos representando, defendendo e fortalecendo o empresariado de Feira de Santana e região." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const NAV = [
  { n: "01", label: "Início", href: "#topo" },
  { n: "02", label: "Manifesto", href: "#sobre" },
  { n: "03", label: "Serviços", href: "#servicos" },
  { n: "04", label: "Crônicas", href: "#noticias" },
  { n: "05", label: "Contato", href: "#contato" },
];

const SERVICES = [
  { n: "I", title: "SCPC · Boa Vista", desc: "Consultas de crédito, análise de risco e proteção contra inadimplência. Inteligência comercial para decisões diárias.", link: "Acessar consultas" },
  { n: "II", title: "Certificado Digital", desc: "Emissão de e-CPF e e-CNPJ com atendimento ágil em nossa sede ou na sua empresa. Validade jurídica, agilidade fiscal.", link: "Agendar emissão" },
  { n: "III", title: "Cursos & Capacitação", desc: "Programas para empresários e equipes em gestão, vendas, finanças e liderança. Currículo desenhado com o Sebrae.", link: "Ver agenda" },
  { n: "IV", title: "Articulação & Networking", desc: "Conexões estratégicas, encontros entre lideranças e representação institucional junto ao poder público.", link: "Próximos encontros" },
];

const NEWS = [
  { date: "12 · JUN · 2026", kicker: "ENCONTRO", title: "ACEFS reúne lideranças para debater o futuro do varejo regional", desc: "Mais de 200 empresários no auditório da associação discutiram crédito, logística urbana e digitalização do comércio." },
  { date: "04 · JUN · 2026", kicker: "FORMAÇÃO", title: "Nova rodada de cursos gratuitos para associados em julho", desc: "Inscrições abertas para capacitações em gestão financeira e marketing digital." },
  { date: "28 · MAI · 2026", kicker: "PARCERIA", title: "Sebrae e ACEFS ampliam consultoria gratuita às MPEs", desc: "Atendimento semanal começa em junho na sede da associação." },
];

const PILLARS = [
  "Representação institucional junto a órgãos municipais e estaduais",
  "Defesa de pautas estratégicas para o varejo, serviços e indústria local",
  "Rede consolidada com mais de 2.400 empresas associadas",
  "Sede própria no coração histórico de Feira de Santana",
];

const MARQUEE = [
  "Filiada à CACB",
  "Membro fundador FACEB",
  "Parceira Sebrae Bahia",
  "Selo de Confiança Boa Vista",
  "ISO 9001 — Gestão",
  "Desde MCMXLIV",
];

function Index() {
  return (
    <div id="topo" className="pb-[88px] bg-cream text-ink">
      <Topbar />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <News />
      <CTA />
      <Footer />
      <RadioBar />
    </div>
  );
}

/* ---------- Topbar ---------- */
function Topbar() {
  return (
    <div className="bg-green-deep text-white/70 text-[11.5px] tracking-[0.18em] uppercase">
      <div className="mx-auto max-w-[1280px] px-10 h-9 flex items-center justify-between">
        <span className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold blink" />
          Sede aberta · seg a sex · 08h–18h
        </span>
        <span className="hidden md:flex gap-8">
          <span>Feira de Santana · Bahia</span>
          <span>(75) 3221·0000</span>
        </span>
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-cream/95 backdrop-blur border-b border-line" : "bg-cream border-b border-transparent"}`}>
      <div className="mx-auto max-w-[1280px] px-10 h-[78px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-3.5">
          <SealMark size={42} />
          <div className="leading-none">
            <div className="font-display text-[22px] text-green-deep tracking-tight">ACEFS</div>
            <div className="text-[9.5px] tracking-[0.32em] text-ink-soft uppercase mt-1">Est · MCMXLIV</div>
          </div>
        </a>
        <nav>
          <ul className="flex gap-9 list-none">
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href} className="group flex items-baseline gap-2 text-[13px] font-medium text-ink hover:text-green-deep transition-colors">
                  <span className="font-display text-[10px] text-gold">{n.n}</span>
                  <span className="link-gold">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#associe" className="group inline-flex items-center gap-3 text-[13px] font-semibold text-green-deep">
          <span>Associe-se</span>
          <span className="w-9 h-9 rounded-full bg-green-deep text-cream flex items-center justify-center transition-transform group-hover:rotate-45">
            <Arrow />
          </span>
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative bg-green-deep text-cream overflow-hidden grain">
      {/* Soft gold radials */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:
          "radial-gradient(ellipse at 15% 20%, rgba(226,201,126,0.18) 0%, transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(201,162,75,0.12) 0%, transparent 55%)"
        }}
      />
      {/* Watermark year */}
      <div className="absolute right-[-2vw] bottom-[-6vw] font-display text-[34vw] leading-none text-white/[0.035] select-none pointer-events-none">1944</div>

      <div className="relative mx-auto max-w-[1280px] px-10 pt-24 pb-32 grid grid-cols-12 gap-10 items-end">
        <div className="col-span-7 reveal-fade in-view">
          <div className="flex items-center gap-4 text-gold-soft text-[11px] tracking-[0.32em] uppercase mb-12">
            <span className="w-10 h-px bg-gold-soft" />
            <span>Capítulo I · Manifesto</span>
          </div>
          <h1 className="font-display text-[clamp(56px,8.2vw,128px)] leading-[0.92] tracking-[-0.03em] text-cream">
            O comércio<br />
            <span className="italic text-gold-soft">que constrói</span><br />
            Feira de Santana<br />
            <span className="text-white/40">desde 1944.</span>
          </h1>

          <div className="grid grid-cols-12 gap-8 mt-14">
            <p className="col-span-7 text-[15px] leading-relaxed text-cream/75">
              Há oitenta e dois anos, a Associação Comercial e Empresarial reúne os que fazem o comércio respirar. Representamos, defendemos e elevamos quem empreende na Princesa do Sertão — uma instituição feita por empresários, para empresários.
            </p>
            <div className="col-span-5 flex flex-col gap-3">
              <a href="#associe" className="group inline-flex items-center justify-between bg-gold text-green-deep px-7 py-4 font-semibold text-[13px] tracking-wide hover:bg-gold-soft transition-colors">
                <span>Tornar-se associado</span>
                <ArrowSmall />
              </a>
              <a href="#servicos" className="group inline-flex items-center justify-between border border-white/25 text-cream px-7 py-4 font-medium text-[13px] tracking-wide hover:border-gold hover:text-gold-soft transition-colors">
                <span>Conhecer os serviços</span>
                <ArrowSmall />
              </a>
            </div>
          </div>
        </div>

        {/* Seal column */}
        <div className="col-span-5 flex justify-end items-center">
          <BrandSeal />
        </div>
      </div>

      {/* Metrics editorial row */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-10 grid grid-cols-4">
          {[
            { n: "82", l: "Anos de atuação contínua" },
            { n: "2.4K", l: "Empresas associadas" },
            { n: "40+", l: "Serviços e benefícios" },
            { n: "120", l: "Eventos em 2025" },
          ].map((m, i) => (
            <div key={m.l} className={`py-10 ${i !== 0 ? "border-l border-white/10" : ""} px-6 first:pl-0 last:pr-0`}>
              <div className="font-display text-[64px] leading-none text-gold-soft tracking-tight">{m.n}</div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-cream/55">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const row = (
    <div className="marquee-track py-6 font-display text-[28px] text-green-deep/80">
      {[...MARQUEE, ...MARQUEE].map((t, i) => (
        <span key={i} className="flex items-center gap-12">
          <span>{t}</span>
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="bg-cream border-y border-line overflow-hidden">
      <div className="whitespace-nowrap overflow-hidden">{row}</div>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id="sobre" ref={ref} className={`relative py-32 ${inView ? "in-view" : ""} reveal-fade`}>
      <div className="mx-auto max-w-[1280px] px-10 grid grid-cols-12 gap-10">
        <aside className="col-span-2">
          <div className="vertical-rl rotate-180 font-display text-[12px] tracking-[0.5em] uppercase text-ink-soft">
            Capítulo II — A Casa
          </div>
        </aside>
        <div className="col-span-10 grid grid-cols-12 gap-10">
          <div className="col-span-7">
            <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-8">
              <span className="inline-block w-8 h-px bg-gold align-middle mr-3" />
              Patrimônio vivo
            </p>
            <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.025em] text-green-deep">
              Uma instituição <em className="not-italic text-gold">construída</em> por quem nunca parou de empreender.
            </h2>
            <div className="mt-10 max-w-[520px] space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <p>
                Em 1944, um grupo de comerciantes feirenses entendeu que o futuro do comércio dependia de união. Nasceu a ACEFS — voz coletiva diante do poder público, escola para a próxima geração e refúgio técnico para quem precisava de orientação.
              </p>
              <p>
                Oito décadas depois, seguimos firmes no mesmo propósito, modernizando a forma de servir sem abrir mão da tradição que nos forjou.
              </p>
            </div>
          </div>
          <div className="col-span-5">
            <div className="border-t border-line pt-8">
              <div className="text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-6">Os quatro pilares</div>
              <ol className="space-y-6">
                {PILLARS.map((p, i) => (
                  <li key={p} className="flex gap-5 items-start border-b border-line pb-5">
                    <span className="font-display text-[20px] text-gold w-8 shrink-0">{["I","II","III","IV"][i]}</span>
                    <span className="text-[14px] text-green-deep leading-snug">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  return (
    <section id="servicos" className="relative bg-green-deep text-cream py-32 grain overflow-hidden">
      <div className="absolute left-[-4vw] top-12 font-display text-[22vw] leading-none text-white/[0.03] select-none">III</div>
      <div className="relative mx-auto max-w-[1280px] px-10">
        <div className="grid grid-cols-12 gap-10 mb-20">
          <div className="col-span-2 vertical-rl rotate-180 font-display text-[12px] tracking-[0.5em] uppercase text-cream/40 self-start">
            Capítulo III — Ofícios
          </div>
          <div className="col-span-7">
            <p className="text-[11px] tracking-[0.32em] uppercase text-gold-soft mb-6">
              <span className="inline-block w-8 h-px bg-gold-soft align-middle mr-3" />
              Serviços ao associado
            </p>
            <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.025em] text-cream">
              Quatro ofícios <em className="not-italic text-gold-soft">essenciais</em> ao dia a dia da sua empresa.
            </h2>
          </div>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {SERVICES.map((s) => (
            <li key={s.title} className="group">
              <a href="#" className="grid grid-cols-12 gap-8 items-center py-10 px-2 transition-colors hover:bg-white/[0.03]">
                <div className="col-span-1 font-display text-[28px] text-gold-soft">{s.n}</div>
                <div className="col-span-4">
                  <h3 className="font-display text-[32px] text-cream leading-tight tracking-tight">{s.title}</h3>
                </div>
                <div className="col-span-5 text-[14px] leading-relaxed text-cream/65">{s.desc}</div>
                <div className="col-span-2 flex justify-end items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-gold-soft">
                  <span>{s.link}</span>
                  <span className="w-9 h-9 rounded-full border border-gold-soft/60 flex items-center justify-center transition-all group-hover:bg-gold group-hover:border-gold group-hover:text-green-deep">
                    <Arrow />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- News ---------- */
function News() {
  const [featured, ...rest] = NEWS;
  return (
    <section id="noticias" className="bg-cream py-32">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="grid grid-cols-12 gap-10 mb-16">
          <div className="col-span-2 vertical-rl rotate-180 font-display text-[12px] tracking-[0.5em] uppercase text-ink-soft self-start">
            Capítulo IV — Crônicas
          </div>
          <div className="col-span-10 flex justify-between items-end">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-6">
                <span className="inline-block w-8 h-px bg-gold align-middle mr-3" />
                Diário institucional
              </p>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.025em] text-green-deep max-w-[760px]">
                O que acontece <em className="not-italic text-gold">na casa</em> e no comércio regional.
              </h2>
            </div>
            <a href="#" className="text-[12px] uppercase tracking-[0.25em] text-green-deep link-gold whitespace-nowrap ml-10">Todas as crônicas →</a>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          <article className="col-span-7 group cursor-pointer">
            <div className="aspect-[16/10] mb-8 relative overflow-hidden bg-green-deep grain">
              <div className="absolute inset-0" style={{ background: "linear-gradient(140deg, rgba(201,162,75,0.35), rgba(14,42,20,0.85))" }} />
              <div className="absolute bottom-8 left-8 right-8 text-cream">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold-soft mb-3">{featured.kicker} · {featured.date}</div>
                <h3 className="font-display text-[40px] leading-[1.02] tracking-tight">{featured.title}</h3>
              </div>
              <div className="absolute top-6 right-6 px-3 py-1 border border-gold-soft/60 text-gold-soft text-[10px] uppercase tracking-[0.25em]">
                Em destaque
              </div>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-soft max-w-[640px]">{featured.desc}</p>
          </article>

          <div className="col-span-5 space-y-10">
            {rest.map((n) => (
              <article key={n.title} className="group cursor-pointer border-t border-line pt-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">{n.kicker} · {n.date}</div>
                <h3 className="font-display text-[24px] leading-tight text-green-deep tracking-tight mb-3 group-hover:text-gold transition-colors">{n.title}</h3>
                <p className="text-[14px] text-ink-soft">{n.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="associe" className="relative bg-gold text-green-deep py-32 overflow-hidden grain">
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--green-deep) 0%, transparent 60%)" }}
      />
      <div className="absolute left-1/2 -translate-x-1/2 top-12 font-display text-[16vw] leading-none text-green-deep/5 select-none">ASSOCIE-SE</div>

      <div className="relative mx-auto max-w-[980px] px-10 text-center">
        <div className="flex justify-center mb-10">
          <SealMark size={64} dark />
        </div>
        <p className="text-[11px] tracking-[0.4em] uppercase text-green-deep/70 mb-8">Capítulo V · Convite</p>
        <h2 className="font-display text-[clamp(48px,6.5vw,96px)] leading-[0.96] tracking-[-0.03em] text-green-deep">
          Sua empresa ao lado<br />das que <em className="not-italic">fizeram</em> Feira.
        </h2>
        <p className="mt-10 text-[16px] text-green-deep/75 max-w-[600px] mx-auto leading-relaxed">
          Junte-se à maior rede empresarial da região. Benefícios, representatividade, formação contínua e a força coletiva de quem caminha junto há mais de oitenta anos.
        </p>
        <div className="mt-12 flex items-center justify-center gap-5">
          <a href="#" className="group inline-flex items-center gap-4 bg-green-deep text-cream px-10 py-5 font-semibold text-[14px] tracking-wide hover:bg-green transition-colors">
            <span>Quero me associar</span>
            <ArrowSmall />
          </a>
          <a href="#" className="text-green-deep text-[13px] uppercase tracking-[0.25em] link-gold">Falar com a equipe</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer id="contato" className="bg-green-deep text-cream/70 grain">
      <div className="mx-auto max-w-[1280px] px-10 py-24 grid grid-cols-12 gap-10">
        <div className="col-span-5">
          <div className="flex items-center gap-4 mb-8">
            <SealMark size={56} />
            <div className="font-display text-[28px] text-cream tracking-tight leading-none">ACEFS</div>
          </div>
          <p className="text-[14px] leading-relaxed max-w-[360px]">
            Associação Comercial e Empresarial de Feira de Santana. Fundada em 1944. Patrimônio do comércio baiano.
          </p>
          <p className="mt-8 text-[11px] tracking-[0.3em] uppercase text-gold-soft">— Princesa do Sertão</p>
        </div>

        <FooterCol title="Instituição" items={["A Associação", "Diretoria", "História", "Estatuto"]} />
        <FooterCol title="Ofícios" items={["SCPC · Boa Vista", "Certificado Digital", "Cursos", "Eventos"]} />
        <FooterCol title="Contato" items={["Rua Senhor dos Passos, 100", "Centro · Feira de Santana — BA", "(75) 3221·0000", "contato@acefs.com.br"]} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-10 py-6 text-[11px] tracking-[0.22em] uppercase text-cream/40 flex justify-between">
          <span>© MMXXVI · ACEFS · Todos os direitos reservados</span>
          <span>Feira de Santana · Bahia · Brasil</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="col-span-2 lg:col-span-2 xl:col-span-2" style={{ gridColumn: "span 2 / span 2" }}>
      <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold-soft mb-6">{title}</h4>
      <ul className="space-y-3 text-[13.5px] text-cream/75">
        {items.map((i) => (
          <li key={i}><a href="#" className="link-gold">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Radio Bar ---------- */
function RadioBar() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="fixed bottom-0 inset-x-0 z-40">
      <div className="bg-green-deep text-cream border-t border-gold/40">
        <div className="mx-auto max-w-[1280px] px-10 h-[78px] flex items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="relative w-11 h-11 rounded-full border border-gold/60 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-gold blink" />
              <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping" />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold-soft">Ao vivo · Rádio ACEFS</div>
              <div className="font-display text-[18px] text-cream tracking-tight mt-1">Programa do Comércio — boletim das 18h</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-cream/60 text-[11px] tracking-[0.22em] uppercase">
            <EqBars />
            <span>Transmitindo</span>
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="group inline-flex items-center gap-3 bg-gold text-green-deep px-6 py-3 font-semibold text-[12px] tracking-[0.2em] uppercase hover:bg-gold-soft transition-colors"
          >
            <span className="w-2.5 h-2.5 border-l-[7px] border-l-green-deep border-y-[5px] border-y-transparent" style={{ display: playing ? "none" : "inline-block" }} />
            <span className="flex gap-0.5" style={{ display: playing ? "inline-flex" : "none" }}>
              <span className="w-[3px] h-3 bg-green-deep" />
              <span className="w-[3px] h-3 bg-green-deep" />
            </span>
            <span>{playing ? "Pausar" : "Ouvir agora"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Primitives ---------- */
function SealMark({ size = 44, dark = false }: { size?: number; dark?: boolean }) {
  const stroke = dark ? "var(--green-deep)" : "var(--gold)";
  const text = dark ? "var(--green-deep)" : "var(--cream)";
  const rawId = useId();
  const id = `p-${rawId.replace(/[:]/g, "")}`;
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="seal-spin">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text fill={stroke} style={{ fontFamily: "Fraunces, serif", fontSize: 11, letterSpacing: 4 }}>
          <textPath href={`#${id}`}>ACEFS · EST · MCMXLIV · FEIRA DE SANTANA · BAHIA ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full flex items-center justify-center font-display"
          style={{
            width: size * 0.55,
            height: size * 0.55,
            border: `1px solid ${stroke}`,
            color: text,
            background: dark ? "transparent" : "var(--green-deep)",
            fontSize: size * 0.22,
            lineHeight: 1,
          }}
        >
          A
        </div>
      </div>
    </div>
  );
}

function BrandSeal() {
  return (
    <div className="relative w-[400px] h-[400px] max-w-full">
      <div className="absolute inset-0 rounded-full border border-gold/30" />
      <div className="absolute inset-6 rounded-full border border-gold/20" />
      <div className="absolute inset-12 rounded-full border-2 border-gold/50" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 seal-spin">
        <defs>
          <path id="bigseal" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
        </defs>
        <text fill="var(--gold-soft)" style={{ fontFamily: "Fraunces, serif", fontSize: 14, letterSpacing: 8 }}>
          <textPath href="#bigseal">
            ASSOCIAÇÃO COMERCIAL E EMPRESARIAL · FEIRA DE SANTANA · BAHIA · BRASIL ·
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase text-gold-soft mb-3">Patrimônio</div>
        <div className="font-display text-[88px] leading-none text-cream tracking-tight">A</div>
        <div className="mt-3 font-display italic text-[20px] text-gold-soft">desde 1944</div>
        <div className="mt-3 flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-cream/60">
          <span className="w-6 h-px bg-cream/40" />
          <span>MCMXLIV</span>
          <span className="w-6 h-px bg-cream/40" />
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
function ArrowSmall() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
      <path d="M0 5H20M20 5L16 1M20 5L16 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
function EqBars() {
  return (
    <span className="inline-flex items-end gap-0.5 h-3">
      <span className="w-0.5 h-2 bg-gold animate-pulse" style={{ animationDelay: "0ms" }} />
      <span className="w-0.5 h-3 bg-gold animate-pulse" style={{ animationDelay: "120ms" }} />
      <span className="w-0.5 h-1.5 bg-gold animate-pulse" style={{ animationDelay: "240ms" }} />
      <span className="w-0.5 h-2.5 bg-gold animate-pulse" style={{ animationDelay: "360ms" }} />
    </span>
  );
}
