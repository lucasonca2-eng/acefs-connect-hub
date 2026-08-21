import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchNoticiaBySlug, formatDate } from "@/lib/cms";
import { newsImage, DEFAULT_NEWS_IMAGE } from "@/lib/news-images";

export const Route = createFileRoute("/noticia/$slug")({
  head: () => ({
    meta: [
      { title: "Notícia — ACEFS" },
      { name: "description", content: "Leia a matéria completa no site da ACEFS." },
      { property: "og:title", content: "Notícia — ACEFS" },
      { property: "og:description", content: "Leia a matéria completa no site da ACEFS." },
    ],
  }),
  component: NoticiaDetalhe,
});

function NoticiaDetalhe() {
  const { slug } = Route.useParams();
  const { data: item, isLoading } = useQuery({
    queryKey: ["noticia", slug],
    queryFn: () => fetchNoticiaBySlug(slug),
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-navy" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-2xl text-navy mb-2">Notícia não encontrada</h1>
        <p className="text-ink-soft mb-6">A matéria solicitada não está disponível no momento.</p>
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 text-navy font-semibold text-[14px] hover:text-gold transition-colors"
        >
          <ArrowLeft size={16} /> Voltar para notícias
        </Link>
      </div>
    );
  }

  const src = item.imagem_capa_url || newsImage(item.slug, item.categoria);
  const conteudo = item.conteudo ?? "";
  const isHtml = /<\/?(p|h[1-6]|ul|ol|li|strong|em|br|a)\b/i.test(conteudo);
  const paragraphs = conteudo.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-[820px] px-6 md:px-10 py-10 md:py-14">
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft hover:text-navy transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-gold font-semibold mb-4">
          {item.categoria}
        </span>
        <h1 className="font-display font-semibold text-[clamp(28px,4.2vw,44px)] leading-tight tracking-tight text-navy mb-4">
          {item.titulo}
        </h1>
        <div className="flex items-center gap-3 text-[13px] text-ink-soft mb-8">
          <span className="font-medium text-navy">ACEFS</span>
          <span className="w-1 h-1 rounded-full bg-ink-soft/40" />
          <span>{formatDate(item.data_publicacao)}</span>
        </div>
      </div>

      <div className="w-full h-64 md:h-[420px] bg-[#E5E7EB] overflow-hidden">
        <img
          src={src}
          alt={item.titulo}
          width={1280}
          height={600}
          className="w-full h-full object-cover"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.endsWith(DEFAULT_NEWS_IMAGE)) el.src = DEFAULT_NEWS_IMAGE;
          }}
        />
      </div>

      <div className="mx-auto max-w-[820px] px-6 md:px-10 py-10 md:py-14">
        <div className="max-w-none text-[16px] md:text-[17px] leading-[1.8] text-ink space-y-5">
          {item.resumo && (
            <p className="font-medium text-navy text-[18px] md:text-[19px] leading-relaxed">
              {item.resumo}
            </p>
          )}
          {isHtml ? (
            <div className="cms-content" dangerouslySetInnerHTML={{ __html: conteudo }} />
          ) : (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-line">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 text-navy font-semibold text-[14px] hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Ver todas as notícias
          </Link>
        </div>
      </div>
    </article>
  );
}
