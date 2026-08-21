import { Link } from "@tanstack/react-router";
import { DEFAULT_NEWS_IMAGE, newsImage } from "@/lib/news-images";
import { formatDate, type Noticia } from "@/lib/cms";

export function NewsCard({ item }: { item: Noticia }) {
  const src = item.imagem_capa_url || newsImage(item.slug, item.categoria);
  return (
    <Link
      to="/noticia/$slug"
      params={{ slug: item.slug }}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-line rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-[#E5E7EB]">
        <img
          src={src}
          alt={item.titulo}
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.endsWith(DEFAULT_NEWS_IMAGE)) el.src = DEFAULT_NEWS_IMAGE;
          }}
        />
        <div className="absolute top-4 left-4 bg-white/95 text-navy text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded">
          {item.categoria}
        </div>
      </div>
      <div className="p-6">
        <div className="text-[12px] text-ink-soft mb-2">{formatDate(item.data_publicacao)}</div>
        <h3 className="font-display font-semibold text-[19px] text-navy leading-snug mb-3 group-hover:text-gold transition-colors duration-200">
          {item.titulo}
        </h3>
        <p className="text-[14px] text-ink-soft leading-relaxed">{item.resumo}</p>
      </div>
    </Link>
  );
}
