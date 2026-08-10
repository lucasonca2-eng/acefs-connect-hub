import { createFileRoute, Link } from "@tanstack/react-router";
import { NEWS, PARTNERS, SERVICES, LINKS } from "@/lib/site-data";
import { ServiceIcon } from "@/components/service-icon";
import { RadioFeatureCard } from "@/components/radio-player";
import sedeImg from "@/assets/acefs-sede.jpg";

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
      <Hero />
      <Partners />
      <ServicesTeaser />
      <AboutTeaser />
      <RadioSection />
      <NewsTeaser />
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
              href={LINKS.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-bright text-white px-6 py-3.5 rounded-md font-semibold text-[14px] hover:bg-white hover:text-green transition-colors duration-200"
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

function Partners() {
  return (
    <section className="bg-white border-b border-line">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="text-[11px] tracking-[0.22em] uppercase text-ink-soft font-semibold shrink-0">
            Filiações e parcerias
          </div>
          <div className="flex-1 grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="text-center font-display text-[15px] text-ink-soft/80 tracking-tight border border-line rounded-md py-3 px-2 hover:text-navy hover:border-navy/30 transition-colors"
              >
                {p}
              </div>
            ))}
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
          {SERVICES.slice(0, 8).map((s) => (
            <Link
              key={s.slug}
              to="/servicos"
              className="group block bg-cream border border-line rounded-lg p-6 hover:border-navy/30 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-md bg-navy/5 text-navy flex items-center justify-center mb-5 group-hover:bg-navy group-hover:text-white transition-colors">
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
            Nossa história
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
            <p>
              Fundada em 1945, a Associação Comercial e Empresarial de Feira de Santana nasceu da união de comerciantes que entendiam a força da representação coletiva. Desde então, atuamos como voz do empresariado local junto ao poder público e como parceira técnica das empresas associadas.
            </p>
            <p className="text-ink text-[16px] font-medium">
              Hoje, reunimos uma gama de empresas associadas, atuando em prol do desenvolvimento econômico, da defesa dos interesses do empresariado e da geração de oportunidades para toda a região.
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
          <img
            src={sedeImg}
            alt="Sede da ACEFS em Feira de Santana"
            loading="lazy"
            width={1280}
            height={960}
            className="rounded-xl shadow-lg w-full object-cover border-4 border-mint"
          />
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
    </section>
  );
}

function NewsTeaser() {
  const items = NEWS.slice(0, 3);
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
          {items.map((n, i) => (
            <NewsCard key={n.slug} item={n} tone={i === 0 ? "navy" : i === 1 ? "gold" : "muted"} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsCard({
  item,
  tone = "navy",
}: {
  item: (typeof NEWS)[number];
  tone?: "navy" | "gold" | "muted";
}) {
  const bg =
    tone === "gold"
      ? "linear-gradient(135deg, #C9A24B, #E2C97E)"
      : tone === "muted"
        ? "linear-gradient(135deg, #E5E7EB, #F7F8FA)"
        : "linear-gradient(135deg, #0F3460, #1E4A82)";
  return (
    <article className="group bg-white border border-line rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[16/10] relative" style={{ background: bg }}>
        <div className="absolute top-4 left-4 bg-white/95 text-navy text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded">
          {item.category}
        </div>
      </div>
      <div className="p-6">
        <div className="text-[12px] text-ink-soft mb-2">{item.date}</div>
        <h3 className="font-display font-semibold text-[19px] text-navy leading-snug mb-3 group-hover:text-gold transition-colors">
          {item.title}
        </h3>
        <p className="text-[14px] text-ink-soft leading-relaxed">{item.excerpt}</p>
      </div>
    </article>
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
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 bg-gold text-navy-deep px-7 py-4 rounded-md font-semibold text-[14px] hover:bg-gold-soft transition-colors shrink-0"
        >
          Quero me associar <Arrow />
        </Link>
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