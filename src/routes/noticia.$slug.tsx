import { createFileRoute, Link } from "@tanstack/react-router";
import { NEWS } from "@/lib/site-data";
import { newsImage, DEFAULT_NEWS_IMAGE } from "@/lib/news-images";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/noticia/$slug")({
  head: ({ params }) => {
    const item = NEWS.find((n) => n.slug === params.slug);
    const title = item ? `${item.title} — ACEFS` : "Notícia — ACEFS";
    const desc = item?.excerpt ?? "Leia a matéria completa na ACEFS.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: NoticiaDetalhe,
});

function NoticiaDetalhe() {
  const { slug } = Route.useParams();
  const item = NEWS.find((n) => n.slug === slug);

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

  const src = newsImage(item.slug, item.category);

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
          {item.category}
        </span>
        <h1 className="font-display font-semibold text-[clamp(28px,4.2vw,44px)] leading-tight tracking-tight text-navy mb-4">
          {item.title}
        </h1>
        <div className="flex items-center gap-3 text-[13px] text-ink-soft mb-8">
          <span className="font-medium text-navy">ACEFS</span>
          <span className="w-1 h-1 rounded-full bg-ink-soft/40" />
          <span>{item.date}</span>
        </div>
      </div>

      <div className="w-full h-64 md:h-[420px] bg-[#E5E7EB] overflow-hidden">
        <img
          src={src}
          alt={item.title}
          width={1280}
          height={600}
          className="w-full h-full object-cover"
          onError={(e) => {
            const el = e.currentTarget;
            if (el.src !== DEFAULT_NEWS_IMAGE) el.src = DEFAULT_NEWS_IMAGE;
          }}
        />
      </div>

      <div className="mx-auto max-w-[820px] px-6 md:px-10 py-10 md:py-14">
        <div className="prose prose-lg max-w-none text-[16px] md:text-[17px] leading-[1.8] text-ink">
          <p className="font-medium text-navy text-[18px] md:text-[19px] leading-relaxed">
            {item.excerpt}
          </p>
          <p>
            A ACEFS, em sua missão de representar e fortalecer o empresariado de Feira de Santana e região, acompanha de perto as principais pautas que movimentam o cenário econômico local. Este comunicado tem o objetivo de informar associados, parceiros e a comunidade empresarial sobre os detalhes desta iniciativa e seu impacto no desenvolvimento regional.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <h2 className="font-display font-semibold text-[22px] md:text-[24px] text-navy mt-10 mb-4">
            Impacto para o empresariado local
          </h2>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            A ACEFS segue à disposição de seus associados para esclarecimentos, apoio institucional e acesso aos benefícios oferecidos pela associação. Para mais informações, entre em contato com nossa equipe ou acompanhe as próximas comunicações em nossos canais oficiais.
          </p>
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
