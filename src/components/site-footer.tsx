import { Link } from "@tanstack/react-router";

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
          { label: "Notícias", to: "/noticias" },
          { label: "Contato", to: "/contato" },
        ]} />

        <FooterCol title="Serviços" links={[
          { label: "SCPC · Boa Vista", to: "/servicos" },
          { label: "Certificado Digital", to: "/servicos" },
          { label: "Cursos & Capacitação", to: "/servicos" },
          { label: "Networking & Eventos", to: "/servicos" },
        ]} />

        <div className="md:col-span-3">
          <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-4 font-semibold">Contato</h4>
          <ul className="space-y-2 text-[14px] text-white/70">
            <li>Largo São Francisco, 43</li>
            <li>Kalilândia · Feira de Santana — BA</li>
            <li><a href="tel:+557532117446" className="hover:text-white">(75) 3211-7446</a></li>
            <li><a href="mailto:contato@acefs.com.br" className="hover:text-white">contato@acefs.com.br</a></li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/acefsassociacao/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep transition-colors flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
              </svg>
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