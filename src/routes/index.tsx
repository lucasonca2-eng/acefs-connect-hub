import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site-data";
import { ServiceIcon } from "@/components/service-icon";
import { RadioFeatureCard } from "@/components/radio-player";
import { HeroCarousel } from "@/components/hero-carousel";
import { NewsCard } from "@/components/news-card";
import { useNoticias, useEventos } from "@/hooks/use-cms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACEFS — Associação Comercial e Empresarial de Feira de Santana" },
      {
        name: "description",
        content:
          "Há mais de 80 anos representando, defendendo e fortalecendo o empresariado de Feira de Santana e região. Conheça nossos serviços e associe-se.",
      },
      { property: "og:title", content: "ACEFS — Associação Comercial e Empresarial de Feira de Santana" },
      { property: "og:description", content: "Representação, serviços e formação para o empresariado feirense desde 1945." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroCarousel />
      <Hero />
      <Partners />
      <ServicesTeaser />
      <AboutTeaser />
      <RadioSection />
      <NewsTeaser />
      <EventsTeaser />
      <CTABand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 20%, rgba(201,162,75,0.18) 0%, transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(30,74,130,0.6) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-gold mb-6 font-semibold">
            <span className="w-6 h-px bg-gold" />
            Associação Comercial · desde 1945
          </div>
          <h1 className="font-display font-semibold text-[clamp(36px,5.6vw,68px)] leading-[1.05] tracking-[-0.02em] text-white">
            Fortalecendo o empresariado de Feira de Santana há mais de 80 anos.
          </h1>
          <p className="mt-6 text-[16px] md:text-[17px] leading-relaxed text-white/75 max-w-[620px]">
            Representação institucional, serviços empresariais e formação contínua para quem constrói o comércio, a indústria e os serviços da nossa região.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://linktr.ee/acefs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy-deep px-6 py-3.5 rounded-md font-semibold text-[14px] hover:bg-gold-soft transition-colors"
            >
              Associe-se
              <Arrow />
            </a>
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3.5 rounded-md font-medium text-[14px] hover:bg-white/10 transition-colors"
            >
              Conhecer serviços
            </Link>
          </div>
        </div>
        <div className="hidden md:block md:col-span-4">
          <div className="relative aspect-square max-w-[360px] ml-auto">
            <div className="absolute inset-0 rounded-full border border-white/15" />
            <div className="absolute inset-6 rounded-full border border-gold/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[10px] tracking-[0.32em] uppercase text-gold mb-3 font-semibold">Fundada em</div>
              <div className="font-display text-[96px] leading-none text-white font-semibold">1945</div>
              <div className="mt-4 text-[11px] tracking-[0.22em] uppercase text-white/50">Feira de Santana · BA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PARTNER_LOGOS = [
  { name: "Feira", file: "feira" },
  { name: "Sicomércio", file: "sicomercio" },
  { name: "CDL Feira de Santana", file: "cdl" },
  { name: "CIFS", file: "cifs" },
  { name: "Sebrae", file: "sebrae" },
  { name: "Convention & Visitors Bureau", file: "convention" },
  { name: "Instituto Pensar Feira", file: "pensar_feira" },
  { name: "Sindfeira", file: "sindfeira" },
] as const;

function Partners() {
  const track = [...PARTNER_LOGOS, ...PARTNER_LOGOS]; // duplicated for seamless loop
  return (
    <section className="bg-white border-b border-line">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="text-[11px] tracking-[0.22em] uppercase text-ink-soft font-semibold shrink-0">
            Filiações e parcerias
          </div>
          <div className="flex-1 overflow-hidden marquee-wrap [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track items-center">
              {track.map((p, i) => (
                <div
                  key={`${p.file}-${i}`}
                  className="shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  title={p.name}
                >
                  <img src={`/images/partners/${p.file}.png`} alt={p.name} className="h-9 md:h-10 w-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">Nossos serviços</div>
            <h2 className="font-display font-semibold text-[clamp(28px,3.6vw,42px)] leading-tight tracking-tight text-navy">
              Tudo o que sua empresa precisa em um só lugar.
            </h2>
          </div>
          <Link to="/servicos" className="text-navy font-semibold text-[14px] hover:text-gold inline-flex items-center gap-2">
            Ver todos os serviços <Arrow />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.slice(0, 4).map((s) => (
            <Link
              key={s.slug}
              to="/servicos"
              className="group block bg-mint border border-navy-soft/20 rounded-lg p-6 hover:border-navy-soft hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="w-11 h-11 rounded-md bg-navy-soft text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                <ServiceIcon name={s.icon} />
              </div>
              <h3 className="font-display font-semibold text-[19px] text-navy leading-tight mb-2">{s.title}</h3>
              <p className="text-[14px] text-ink-soft leading-relaxed">{s.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">Sobre a ACEFS</div>
          <h2 className="font-display font-semibold text-[clamp(28px,3.6vw,42px)] leading-tight tracking-tight text-navy">
            Uma instituição construída por quem empreende em Feira de Santana.
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
            <p>
              Fundada em 1945, a Associação Comercial e Empresarial de Feira de Santana nasceu da união de comerciantes que entendiam a força da representação coletiva. Desde então, atuamos como voz do empresariado local junto ao poder público e como parceira técnica das empresas associadas.
            </p>
            <p>
              Hoje, reunimos uma gama de empresas associadas de diferentes portes e setores, oferecendo serviços, formação e articulação em benefício do desenvolvimento econômico regional.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/quem-somos"
              className="inline-flex items-center gap-2 text-navy font-semibold text-[14px] hover:text-gold"
            >
              Conheça nossa história <Arrow />
            </Link>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Representação", d: "Voz do empresariado junto ao poder público municipal e estadual." },
              { t: "Serviços", d: "Certificado digital, SCPC, cursos e mais de 40 benefícios." },
              { t: "Formação", d: "Capacitação contínua em parceria com o Sebrae Bahia." },
              { t: "Networking", d: "Rede consolidada de empresas associadas em toda a região." },
            ].map((p) => (
              <div key={p.t} className="bg-white border border-line rounded-lg p-5">
                <div className="w-8 h-1 bg-gold mb-4" />
                <div className="font-display font-semibold text-navy text-[17px] mb-1.5">{p.t}</div>
                <div className="text-[13px] text-ink-soft leading-relaxed">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RadioSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">No ar</div>
          <h2 className="font-display font-semibold text-[clamp(28px,3.6vw,42px)] leading-tight tracking-tight text-navy">
            A voz do comércio feirense, ao vivo.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft max-w-[440px]">
            A Rádio ACEFS leva boletins, entrevistas e a pauta econômica da região direto da sede da associação para o empresariado de Feira de Santana.
          </p>
        </div>
        <div className="md:col-span-7">
          <RadioFeatureCard />
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-10 mt-14 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-6">
          <img
            src="/images/radio-negocios-conexoes.png"
            alt="Programa Negócios & Conexões — Rádio Sociedade News FM 102.1"
            className="w-full h-auto rounded-lg border border-line"
          />
        </div>
        <div className="md:col-span-6 text-[14.5px] leading-relaxed text-ink-soft space-y-4">
          <p>
            <strong className="text-navy">Negócios & Conexões</strong> é o programa na Rádio Sociedade News FM 102.1 oferecido pela ACEFS, Sicomércio BA Feira de Santana e CDL Feira de Santana, que conecta empresários, empreendedores, lideranças e especialistas em um espaço dedicado ao desenvolvimento econômico e ao fortalecimento do ambiente de negócios de Feira de Santana e região.
          </p>
          <p>
            Todos os domingos, das 13h às 15h, apresentado por Genildo Melo, presidente da ACEFS, e o jornalista e empresário Danillo Freitas, o programa promove entrevistas, análises e debates sobre empreendedorismo, inovação, gestão, associativismo, oportunidades de mercado e os principais temas que impactam o setor produtivo.
          </p>
          <button
            disabled
            title="Em breve — edições anteriores estarão disponíveis em podcast"
            className="mt-2 inline-flex items-center gap-2 border border-line text-ink-soft/60 px-5 py-2.5 rounded-md font-semibold text-[13px] cursor-not-allowed"
          >
            Veja edições anteriores
          </button>
        </div>
      </div>
    </section>
  );
}

function NewsTeaser() {
  const { data } = useNoticias(true);
  const items = (data ?? []).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">Notícias</div>
            <h2 className="font-display font-semibold text-[clamp(28px,3.6vw,42px)] leading-tight tracking-tight text-navy">
              O que acontece na ACEFS e no comércio regional.
            </h2>
          </div>
          <Link to="/noticias" className="text-navy font-semibold text-[14px] hover:text-gold inline-flex items-center gap-2">
            Ver todas as notícias <Arrow />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((n) => (
            <NewsCard key={n.slug} item={n} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsTeaser() {
  const { data } = useEventos(true);
  const items = (data ?? []).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">Agenda</div>
            <h2 className="font-display font-semibold text-[clamp(28px,3.6vw,42px)] leading-tight tracking-tight text-navy">
              Próximos eventos da ACEFS.
            </h2>
          </div>
          <Link to="/eventos" className="text-navy font-semibold text-[14px] hover:text-gold inline-flex items-center gap-2">
            Ver agenda completa <Arrow />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((ev) => (
            <article
              key={ev.id}
              className="bg-white border border-line rounded-xl overflow-hidden shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="h-44 bg-[#E5E7EB] overflow-hidden">
                {ev.imagem_url && (
                  <img src={ev.imagem_url} alt={ev.titulo} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <div className="p-6">
                <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold mb-2">
                  {formatDate(ev.data_evento)}
                </div>
                <h3 className="font-display font-semibold text-[19px] leading-snug text-navy mb-2">{ev.titulo}</h3>
                {ev.local && <p className="text-[13px] text-ink-soft mb-2">{ev.local}</p>}
                {ev.descricao && (
                  <p className="text-[14px] leading-relaxed text-ink-soft line-clamp-3">{ev.descricao}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="bg-navy-deep text-white py-16 md:py-20">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-display font-semibold text-[clamp(26px,3.4vw,38px)] leading-tight tracking-tight text-white">
            Sua empresa ao lado das que constroem Feira de Santana.
          </h2>
          <p className="mt-3 text-white/70 text-[15px] leading-relaxed">
            Associe-se e tenha acesso a benefícios exclusivos, formação e a força coletiva da maior rede empresarial da região.
          </p>
        </div>
        <a
          href="https://linktr.ee/acefs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold text-navy-deep px-7 py-4 rounded-md font-semibold text-[14px] hover:bg-gold-soft transition-colors shrink-0"
        >
          Quero me associar <Arrow />
        </a>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
