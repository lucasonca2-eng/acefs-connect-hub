import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAuditLog, type AuditEntry } from "@/lib/cms";
import { useCan } from "@/lib/admin-role";
import { History, Loader2, Filter } from "lucide-react";

export const Route = createFileRoute("/admin/auditoria")({
  ssr: false,
  component: AdminAuditoria,
});

const TABELAS: Record<string, string> = {
  noticias: "Notícias",
  eventos: "Eventos",
  servicos: "Serviços",
  settings: "Configurações",
  banners: "Banners",
};

const CAMPOS: Record<string, string> = {
  titulo: "título",
  slug: "endereço",
  resumo: "resumo",
  conteudo: "conteúdo",
  conteudo_detalhado: "conteúdo",
  categoria: "categoria",
  imagem_capa_url: "imagem",
  imagem_url: "imagem",
  publicado: "publicação",
  ativo: "visibilidade",
  ordem: "ordem",
  data_publicacao: "data",
  data_evento: "data",
};

function acaoStyle(acao: string) {
  if (acao === "criou") return "bg-green-50 text-green-700";
  if (acao === "excluiu") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
}

function quando(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminAuditoria() {
  const pode = useCan("auditoria");
  const [tabela, setTabela] = useState("todas");
  const { data, isLoading, error } = useQuery({
    queryKey: ["audit-log"],
    queryFn: () => fetchAuditLog(200),
    enabled: pode,
  });

  if (!pode) {
    return (
      <div className="bg-white border border-line rounded-lg p-8 text-center">
        <h1 className="font-display font-semibold text-[22px] text-navy mb-2">Acesso restrito</h1>
        <p className="text-[14px] text-ink-soft">O histórico é visível apenas para administradores.</p>
      </div>
    );
  }

  const lista = (data ?? []).filter((e: AuditEntry) => tabela === "todas" || e.tabela === tabela);

  return (
    <div className="bg-white border border-line rounded-lg p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-display font-semibold text-[26px] text-navy mb-1 flex items-center gap-2">
            <History size={22} /> Histórico de alterações
          </h1>
          <p className="text-[14px] text-ink-soft">
            Tudo que foi criado, editado ou excluído pelo painel, com autor e data.
          </p>
        </div>
        <div className="relative">
          <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <select
            value={tabela}
            onChange={(e) => setTabela(e.target.value)}
            className="rounded-md border border-line bg-white pl-9 pr-3 py-2.5 text-[14px] outline-none focus:border-navy cursor-pointer"
          >
            <option value="todas">Todas as áreas</option>
            {Object.entries(TABELAS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-ink-soft text-[14px]">
          <Loader2 size={16} className="animate-spin" /> Carregando histórico…
        </div>
      ) : error ? (
        <p className="text-[14px] text-red-600">Não foi possível carregar o histórico.</p>
      ) : lista.length === 0 ? (
        <p className="text-[14px] text-ink-soft">Nenhuma alteração registrada até agora.</p>
      ) : (
        <ul className="divide-y divide-line border border-line rounded-md">
          {lista.map((e) => (
            <li key={e.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${acaoStyle(e.acao)}`}
              >
                {e.acao}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-navy truncate">
                  {e.titulo ?? "(sem título)"}
                </div>
                <div className="text-[12px] text-ink-soft">
                  {TABELAS[e.tabela] ?? e.tabela} · {e.ator_email ?? "sistema"}
                  {e.campos.length > 0 && (
                    <>
                      {" · alterou "}
                      {e.campos.map((c) => CAMPOS[c] ?? c).join(", ")}
                    </>
                  )}
                </div>
              </div>
              <span className="text-[12px] text-ink-soft whitespace-nowrap">{quando(e.created_at)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
