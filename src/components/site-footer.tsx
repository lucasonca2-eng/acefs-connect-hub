import { Link } from "@tanstack/react-router";
import { AnimatedLogo } from "@/components/animated-logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/75 mt-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <AnimatedLogo />
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
            <li><a href="mailto:acefs@acefs.com.br" className="hover:text-white">acefs@acefs.com.br</a></li>
          </ul>

          <a
            href="https://wa.me/557532117446?text=Oii%2C%20vim%20do%20site%20da%20ACEFS"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2.5 rounded-md text-[13px] font-semibold transition-colors active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Fale no WhatsApp
          </a>

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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
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
