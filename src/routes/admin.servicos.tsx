import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useServicos } from "@/hooks/use-cms";
import { slugify, type Servico } from "@/lib/cms";
import { ImageField } from "@/components/admin/image-field";
import { RichTextEditor } from "@/components/admin/rich-text";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/servicos")({
  ssr: false,
  component: AdminServicos,
});

type Draft = {
  id?: string;
  titulo: string;
  slug: string;
  descricao_curta: string;
  conteudo_detalhado: string;
  imagem_url: string;
  link_externo: string;
  ordem: number;
  ativo: boolean;
};

const EMPTY: Draft = {
  titulo: "",
  slug: "",
  descricao_curta: "",
  conteudo_detalhado: "",
  imagem_url: "",
  link_externo: "",
  ordem: 0,
  ativo: true,
};

function AdminServicos() {
  const { data: servicos, isLoading } = useServicos(false);
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["servicos"] });

  function edit(s: Servico) {
    setDraft({
      id: s.id,
      titulo: s.titulo,
      slug: s.slug,
      descricao_curta: s.descricao_curta ?? "",
      conteudo_detalhado: s.conteudo_detalhado ?? "",
      imagem_url: s.imagem_url ?? "",
      link_externo: s.link_externo ?? "",
      ordem: s.ordem,
      ativo: s.ativo,
    });
  }

  async function save() {
    if (!draft) return;
    const slug = (draft.slug || slugify(draft.titulo)).trim();
    if (!draft.titulo.trim() || !slug) {
      toast.error("Informe o título do serviço.");
      return;
    }
    setSaving(true);
    const payload = {
      titulo: draft.titulo,
      slug,
      descricao_curta: draft.descricao_curta || null,
      conteudo_detalhado: draft.conteudo_detalhado || null,
      imagem_url: draft.imagem_url || null,
      link_externo: draft.link_externo || null,
      ordem: Number(draft.ordem) || 0,
      ativo: draft.ativo,
    };
    const { error } = draft.id
      ? await supabase.from("servicos").update(payload).eq("id", draft.id)
      : await supabase.from("servicos").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(
        error.code === "23505" ? "Já existe um serviço com esse endereço (slug)." : "Não foi possível salvar.",
      );
      return;
    }
    toast.success("Serviço salvo.");
    setDraft(null);
    void refresh();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("servicos").delete().eq("id", id);
    if (error) {
      toast.error("Não foi possível excluir.");
      return;
    }
    toast.success("Serviço excluído.");
    void refresh();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-line rounded-lg p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Serviços</h1>
            <p className="text-[14px] text-ink-soft">Cadastre os serviços exibidos no site.</p>
          </div>
          <button
            onClick={() => setDraft({ ...EMPTY })}
            className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-md font-semibold text-[13px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer shrink-0"
          >
            <Plus size={16} /> Novo serviço
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-ink-soft text-[14px]">
            <Loader2 size={16} className="animate-spin" /> Carregando…
          </div>
        ) : (servicos?.length ?? 0) === 0 ? (
          <p className="text-[14px] text-ink-soft">Nenhum serviço cadastrado.</p>
        ) : (
          <ul className="space-y-3">
            {servicos!.map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-4 border border-line rounded-md p-3 hover:border-navy/40 transition-colors"
              >
                <div className="w-24 h-16 rounded bg-cream overflow-hidden shrink-0 flex items-center justify-center">
                  {s.imagem_url ? (
                    <img src={s.imagem_url} alt={s.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[11px] text-ink-soft">sem foto</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-navy truncate">{s.titulo}</div>
                  <div className="text-[12px] text-ink-soft truncate">
                    ordem {s.ordem} · {s.ativo ? "ativo" : "oculto"}
                  </div>
                </div>
                <button
                  onClick={() => edit(s)}
                  className="p-2 rounded-md text-ink-soft hover:text-navy hover:bg-cream cursor-pointer"
                  aria-label="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setPendingDelete(s.id)}
                  className="p-2 rounded-md text-ink-soft hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  aria-label="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {draft && (
        <div className="bg-white border border-line rounded-lg p-6 md:p-8 space-y-6 max-w-[760px]">
          <h2 className="font-display font-semibold text-[20px] text-navy">
            {draft.id ? "Editar serviço" : "Novo serviço"}
          </h2>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Título</label>
            <input
              value={draft.titulo}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  titulo: e.target.value,
                  slug: draft.id ? draft.slug : slugify(e.target.value),
                })
              }
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Endereço da página (slug)</label>
            <input
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
            />
          </div>

          <ImageField
            label="Imagem do serviço"
            value={draft.imagem_url}
            folder="servicos"
            onChange={(url) => setDraft({ ...draft, imagem_url: url })}
          />

          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Descrição curta (card)</label>
            <textarea
              rows={3}
              value={draft.descricao_curta}
              onChange={(e) => setDraft({ ...draft, descricao_curta: e.target.value })}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy resize-y"
            />
          </div>

          <RichTextEditor
            label="Conteúdo detalhado"
            value={draft.conteudo_detalhado}
            onChange={(html) => setDraft({ ...draft, conteudo_detalhado: html })}
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-navy">Link externo (opcional)</label>
              <input
                value={draft.link_externo}
                onChange={(e) => setDraft({ ...draft, link_externo: e.target.value })}
                placeholder="https://wa.me/..."
                className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-navy">Ordem de exibição</label>
              <input
                type="number"
                value={draft.ordem}
                onChange={(e) => setDraft({ ...draft, ordem: Number(e.target.value) })}
                className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-[14px] text-navy font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={draft.ativo}
              onChange={(e) => setDraft({ ...draft, ativo: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            Visível no site
          </label>

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />} Salvar
            </button>
            <button
              onClick={() => setDraft(null)}
              className="px-6 py-3 rounded-md border border-line text-[14px] font-medium text-ink hover:border-navy hover:text-navy transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(o) => !o && setPendingDelete(null)}
        description="Esta ação não pode ser desfeita. O serviço será removido do site imediatamente."
        onConfirm={() => {
          const id = pendingDelete;
          setPendingDelete(null);
          if (id) void remove(id);
        }}
      />
    </div>
  );
}
