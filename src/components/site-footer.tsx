import { Link } from "@tanstack/react-router";
import { LINKS } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/75 mt-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center font-display text-white text-[20px] font-semibold">
              <span className="relative">A<span className="absolute -right-1 -top-1 w-1.5 h-1.5 rounded-full bg-gold" /></span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-[20px] text-white font-semibold">ACEFS</div>
              <div className="text-[10px] tracking-[0.22em] text-white/50 uppercase mt-0.5">desde 1945</div>
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-white/65 max-w-sm">
            Associação Comercial e Empresarial de Feira de Santana. Representando, defendendo e fortalecendo o empresariado baiano há mais de oito décadas.
          </p>
        </div>

        <FooterCol title="Institucional" links={[
          { label: "Quem Somos", to: "/quem-somos" },
          { label: "Diretoria", to: "/diretoria" },
          { label: "Feira de Santana", to: "/feira-de-santana" },
          { label: "Parceiros", to: "/parceiros" },
        ]} />

        <FooterCol title="Conteúdo" links={[
          { label: "Serviços", to: "/servicos" },
          { label: "Notícias", to: "/noticias" },
          { label: "Artigos", to: "/artigos" },
          { label: "Eventos", to: "/eventos" },
          { label: "Negócios & Conexões", to: "/negocios-e-conexoes" },
          { label: "Empregos", to: "/empregos" },
        ]} />

        <div className="md:col-span-3">
          <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-4 font-semibold">Contato</h4>
          <ul className="space-y-2 text-[14px] text-white/70">
            <li>Largo São Francisco, 43</li>
            <li>Kalilândia · Feira de Santana — BA</li>
            <li><a href="tel:+557532117446" className="hover:text-white">(75) 3211-7446</a></li>
            <li><a href="mailto:acefs@acefs.com.br" className="hover:text-white">acefs@acefs.com.br</a></li>
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da ACEFS"
              className="bg-green text-white p-3 rounded-full hover:bg-green-bright transition-colors duration-200"
            >
              <InstagramIcon />
            </a>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-green-bright px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-green transition-colors duration-200"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-5 text-[12px] text-white/50 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} ACEFS — Todos os direitos reservados</span>
          <span>Feira de Santana · Bahia · Brasil</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-4 font-semibold">{title}</h4>
      <ul className="space-y-2 text-[14px] text-white/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}