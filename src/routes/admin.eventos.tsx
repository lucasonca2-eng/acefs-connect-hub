import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEventos } from "@/hooks/use-cms";
import { slugify, formatDate, type Evento } from "@/lib/cms";
import { ImageField } from "@/components/admin/image-field";
import { RichTextEditor } from "@/components/admin/rich-text";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { BulkBar, SelectBox } from "@/components/admin/bulk-bar";
import { useCan } from "@/lib/admin-role";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/eventos")({
  ssr: false,
  component: AdminEventos,
});

type Draft = {
  id?: string;
  titulo: string;
  slug: string;
  data_evento: string;
  local: string;
  descricao: string;
  conteudo_detalhado: string;
  imagem_url: string;
  link_inscricao: string;
  ordem: number;
  ativo: boolean;
};

const today = () => new Date().toISOString().slice(0, 10);

const EMPTY: Draft = {
  titulo: "",
  slug: "",
  data_evento: today(),
  local: "",
  descricao: "",
  conteudo_detalhado: "",
  imagem_url: "",
  link_inscricao: "",
  ordem: 0,
  ativo: true,
};

function AdminEventos() {
  const { data: eventos, isLoading } = useEventos(false);
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const podeExcluir = useCan("excluir");

  const refresh = () => qc.invalidateQueries({ queryKey: ["eventos"] });

  function toggleSel(id: string, on: boolean) {
    setSelecionados((s) => (on ? [...s, id] : s.filter((x) => x !== id)));
  }

  async function bulkAtivar(ativo: boolean) {
    setBulkBusy(true);
    const { error } = await supabase.from("eventos").update({ ativo }).in("id", selecionados);
    setBulkBusy(false);
    if (error) {
      toast.error("Não foi possível atualizar os eventos selecionados.");
      return;
    }
    toast.success(
      `${selecionados.length} ${selecionados.length === 1 ? "evento" : "eventos"} ${ativo ? "publicados" : "ocultados"}.`,
    );
    setSelecionados([]);
    void refresh();
  }

  async function bulkExcluir() {
    setBulkBusy(true);
    const { error } = await supabase.from("eventos").delete().in("id", selecionados);
    setBulkBusy(false);
    if (error) {
      toast.error("Não foi possível excluir os eventos selecionados.");
      return;
    }
    toast.success(`${selecionados.length} ${selecionados.length === 1 ? "evento excluído" : "eventos excluídos"}.`);
    setSelecionados([]);
    void refresh();
  }

  function edit(e: Evento) {
    setDraft({
      id: e.id,
      titulo: e.titulo,
      slug: e.slug,
      data_evento: e.data_evento.slice(0, 10),
      local: e.local ?? "",
      descricao: e.descricao ?? "",
      conteudo_detalhado: e.conteudo_detalhado ?? "",
      imagem_url: e.imagem_url ?? "",
      link_inscricao: e.link_inscricao ?? "",
      ordem: e.ordem,
      ativo: e.ativo,
    });
  }

  async function save() {
    if (!draft) return;
    const slug = (draft.slug || slugify(draft.titulo)).trim();
    if (!draft.titulo.trim() || !slug) {
      toast.error("Informe o título do evento.");
      return;
    }
    setSaving(true);
    const payload = {
      titulo: draft.titulo,
      slug,
      data_evento: new Date(`${draft.data_evento}T12:00:00`).toISOString(),
      local: draft.local || null,
      descricao: draft.descricao || null,
      conteudo_detalhado: draft.conteudo_detalhado || null,
      imagem_url: draft.imagem_url || null,
      link_inscricao: draft.link_inscricao || null,
      ordem: Number(draft.ordem) || 0,
      ativo: draft.ativo,
    };
    const { error } = draft.id
      ? await supabase.from("eventos").update(payload).eq("id", draft.id)
      : await supabase.from("eventos").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(
        error.code === "23505" ? "Já existe um evento com esse endereço (slug)." : "Não foi possível salvar.",
      );
      return;
    }
    toast.success("Evento salvo.");
    setDraft(null);
    void refresh();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("eventos").delete().eq("id", id);
    if (error) {
      toast.error("Não foi possível excluir.");
      return;
    }
    toast.success("Evento excluído.");
    void refresh();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-line rounded-lg p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Eventos</h1>
            <p className="text-[14px] text-ink-soft">Gerencie a agenda exibida no site.</p>
          </div>
          <button
            onClick={() => setDraft({ ...EMPTY })}
            className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-md font-semibold text-[13px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer shrink-0"
          >
            <Plus size={16} /> Novo evento
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-ink-soft text-[14px]">
            <Loader2 size={16} className="animate-spin" /> Carregando…
          </div>
        ) : (eventos?.length ?? 0) === 0 ? (
          <p className="text-[14px] text-ink-soft">Nenhum evento cadastrado.</p>
        ) : (
          <ul className="space-y-3">
            {eventos!.map((ev) => (
              <li
                key={ev.id}
                className="flex items-center gap-4 border border-line rounded-md p-3 hover:border-navy/40 transition-colors"
              >
                <div className="w-24 h-16 rounded bg-cream overflow-hidden shrink-0 flex items-center justify-center">
                  {ev.imagem_url ? (
                    <img src={ev.imagem_url} alt={ev.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[11px] text-ink-soft">sem foto</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-navy truncate">{ev.titulo}</div>
                  <div className="text-[12px] text-ink-soft truncate">
                    {formatDate(ev.data_evento)}
                    {ev.local ? ` · ${ev.local}` : ""} · {ev.ativo ? "ativo" : "oculto"}
                  </div>
                </div>
                <button
                  onClick={() => edit(ev)}
                  className="p-2 rounded-md text-ink-soft hover:text-navy hover:bg-cream cursor-pointer"
                  aria-label="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setPendingDelete(ev.id)}
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
            {draft.id ? "Editar evento" : "Novo evento"}
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

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-navy">Data do evento</label>
              <input
                type="date"
                value={draft.data_evento}
                onChange={(e) => setDraft({ ...draft, data_evento: e.target.value })}
                className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-navy">Local</label>
              <input
                value={draft.local}
                onChange={(e) => setDraft({ ...draft, local: e.target.value })}
                className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
              />
            </div>
          </div>

          <ImageField
            label="Imagem do evento"
            value={draft.imagem_url}
            folder="eventos"
            onChange={(url) => setDraft({ ...draft, imagem_url: url })}
          />

          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Descrição curta (card)</label>
            <textarea
              rows={3}
              value={draft.descricao}
              onChange={(e) => setDraft({ ...draft, descricao: e.target.value })}
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
              <label className="block text-[13px] font-semibold text-navy">Link de inscrição (opcional)</label>
              <input
                value={draft.link_inscricao}
                onChange={(e) => setDraft({ ...draft, link_inscricao: e.target.value })}
                placeholder="https://..."
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
        description="Esta ação não pode ser desfeita. O evento será removido do site imediatamente."
        onConfirm={() => {
          const id = pendingDelete;
          setPendingDelete(null);
          if (id) void remove(id);
        }}
      />
    </div>
  );
}
