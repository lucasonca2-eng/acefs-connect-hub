import { createFileRoute, Link } from "@tanstack/react-router";
import { useBanners, useEventos, useNoticias, useServicos } from "@/hooks/use-cms";
import { formatDate } from "@/lib/cms";
import {
  Newspaper,
  Images,
  Briefcase,
  CalendarDays,
  Plus,
  Settings,
  ExternalLink,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  component: AdminDashboard,
});

function AdminDashboard() {
  const noticias = useNoticias(false);
  const banners = useBanners(false);
  const servicos = useServicos(false);
  const eventos = useEventos(false);

  const loading =
    noticias.isLoading || banners.isLoading || servicos.isLoading || eventos.isLoading;

  const publicadas = (noticias.data ?? []).filter((n) => n.publicado).length;
  const bannersAtivos = (banners.data ?? []).filter((b) => b.ativo).length;
  const servicosAtivos = (servicos.data ?? []).filter((s) => s.ativo).length;
  const agora = Date.now();
  const eventosFuturos = (eventos.data ?? []).filter(
    (e) => new Date(e.data_evento).getTime() >= agora,
  ).length;

  const recentes = [...(noticias.data ?? [])]
    .sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-line rounded-lg p-6 md:p-8">
        <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Painel de conteúdo</h1>
        <p className="text-[14px] text-ink-soft">
          Um resumo do que está publicado no site e atalhos para as tarefas do dia a dia.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            to="/admin/noticias"
            icon={<Newspaper size={18} />}
            label="Notícias publicadas"
            value={publicadas}
            hint={`${noticias.data?.length ?? 0} no total`}
            loading={loading}
          />
          <StatCard
            to="/admin/banners"
            icon={<Images size={18} />}
            label="Banners ativos"
            value={bannersAtivos}
            hint={`${banners.data?.length ?? 0} cadastrados`}
            loading={loading}
          />
          <StatCard
            to="/admin/servicos"
            icon={<Briefcase size={18} />}
            label="Serviços ativos"
            value={servicosAtivos}
            hint={`${servicos.data?.length ?? 0} cadastrados`}
            loading={loading}
          />
          <StatCard
            to="/admin/eventos"
            icon={<CalendarDays size={18} />}
            label="Eventos futuros"
            value={eventosFuturos}
            hint={`${eventos.data?.length ?? 0} cadastrados`}
            loading={loading}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div className="bg-white border border-line rounded-lg p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-display font-semibold text-[20px] text-navy">Últimas edições</h2>
            <Link
              to="/admin/noticias"
              className="text-[13px] font-semibold text-navy hover:text-gold transition-colors"
            >
              Ver todas
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-ink-soft text-[14px]">
              <Loader2 size={16} className="animate-spin" /> Carregando…
            </div>
          ) : recentes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[14px] text-ink-soft mb-4">Nenhuma notícia cadastrada ainda.</p>
              <Link
                to="/admin/noticias"
                className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-md font-semibold text-[13px] hover:bg-navy-deep transition-colors"
              >
                <Plus size={16} /> Criar a primeira notícia
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {recentes.map((n) => (
                <li key={n.id} className="py-3 flex items-center gap-3">
                  <img
                    src={n.imagem_capa_url ?? "/images/news/news-default.jpg"}
                    alt=""
                    className="w-14 h-10 rounded object-cover bg-cream shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-navy truncate">{n.titulo}</div>
                    <div className="text-[12px] text-ink-soft">
                      {formatDate(n.updated_at)} · {n.publicado ? "publicada" : "rascunho"}
                    </div>
                  </div>
                  <Link
                    to="/admin/noticias"
                    className="text-[12.5px] font-semibold text-navy hover:text-gold transition-colors shrink-0"
                  >
                    Editar
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-line rounded-lg p-6 space-y-3">
          <h2 className="font-display font-semibold text-[18px] text-navy mb-1">Atalhos</h2>
          <Shortcut to="/admin/noticias" icon={<Newspaper size={16} />} label="Nova notícia" />
          <Shortcut to="/admin/banners" icon={<Images size={16} />} label="Gerenciar banners" />
          <Shortcut to="/admin/eventos" icon={<CalendarDays size={16} />} label="Novo evento" />
          <Shortcut
            to="/admin/configuracoes"
            icon={<Settings size={16} />}
            label="Configurações gerais"
          />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-md border border-line text-[13.5px] font-medium text-ink hover:border-navy hover:text-navy transition-colors"
          >
            <ExternalLink size={16} /> Ver o site publicado
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  to,
  icon,
  label,
  value,
  hint,
  loading,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  hint: string;
  loading: boolean;
}) {
  return (
    <Link
      to={to}
      className="rounded-lg border border-line p-4 hover:border-navy/40 hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-all block"
    >
      <div className="flex items-center gap-2 text-gold">{icon}</div>
      <div className="mt-3 font-display font-semibold text-[28px] leading-none text-navy">
        {loading ? <span className="text-ink-soft text-[18px]">…</span> : value}
      </div>
      <div className="mt-2 text-[13px] font-semibold text-navy">{label}</div>
      <div className="text-[12px] text-ink-soft">{hint}</div>
    </Link>
  );
}

function Shortcut({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-md border border-line text-[13.5px] font-medium text-ink hover:border-navy hover:text-navy transition-colors"
    >
      {icon} {label}
    </Link>
  );
}
