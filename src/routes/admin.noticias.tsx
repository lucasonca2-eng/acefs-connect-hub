import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNoticias } from "@/hooks/use-cms";
import { slugify, formatDate, type Noticia } from "@/lib/cms";
import { ImageField } from "@/components/admin/image-field";
import { RichTextEditor } from "@/components/admin/rich-text";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/noticias")({
  ssr: false,
  component: AdminNoticias,
});

const CATEGORIAS = ["Encontro", "Formação", "Parceria", "Institucional", "Evento", "Reconhecimento"];

type Draft = {
  id?: string;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  imagem_capa_url: string;
  data_publicacao: string;
  publicado: boolean;
};

const today = () => new Date().toISOString().slice(0, 10);

const EMPTY: Draft = {
  titulo: "",
  slug: "",
  resumo: "",
  conteudo: "",
  categoria: "Institucional",
  imagem_capa_url: "",
  data_publicacao: today(),
  publicado: true,
};

function AdminNoticias() {
  const { data: noticias, isLoading } = useNoticias(false);
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["noticias"] });

  function edit(n: Noticia) {
    setDraft({
      id: n.id,
      titulo: n.titulo,
      slug: n.slug,
      resumo: n.resumo ?? "",
      conteudo: n.conteudo ?? "",
      categoria: n.categoria,
      imagem_capa_url: n.imagem_capa_url ?? "",
      data_publicacao: n.data_publicacao.slice(0, 10),
      publicado: n.publicado,
    });
  }

  async function save() {
    if (!draft) return;
    const slug = (draft.slug || slugify(draft.titulo)).trim();
    if (!draft.titulo.trim() || !slug) {
      toast.error("Informe o título da notícia.");
      return;
    }
    setSaving(true);
    const payload = {
      titulo: draft.titulo,
      slug,
      resumo: draft.resumo || null,
      conteudo: draft.conteudo || null,
      categoria: draft.categoria,
      imagem_capa_url: draft.imagem_capa_url || null,
      data_publicacao: new Date(`${draft.data_publicacao}T12:00:00`).toISOString(),
      publicado: draft.publicado,
    };
    const { error } = draft.id
      ? await supabase.from("noticias").update(payload).eq("id", draft.id)
      : await supabase.from("noticias").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(
        error.code === "23505"
          ? "Já existe uma notícia com esse endereço (slug)."
          : "Não foi possível salvar a notícia.",
      );
      return;
    }
    toast.success("Notícia salva.");
    setDraft(null);
    void refresh();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("noticias").delete().eq("id", id);
    if (error) {
      toast.error("Não foi possível excluir.");
      return;
    }
    toast.success("Notícia excluída.");
    void refresh();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-line rounded-lg p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Notícias</h1>
            <p className="text-[14px] text-ink-soft">Publique e edite as matérias do site.</p>
          </div>
          <button
            onClick={() => setDraft({ ...EMPTY })}
            className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-md font-semibold text-[13px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer shrink-0"
          >
            <Plus size={16} /> Nova notícia
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-ink-soft text-[14px]">
            <Loader2 size={16} className="animate-spin" /> Carregando…
          </div>
        ) : (noticias?.length ?? 0) === 0 ? (
          <p className="text-[14px] text-ink-soft">Nenhuma notícia cadastrada.</p>
        ) : (
          <ul className="space-y-3">
            {noticias!.map((n) => (
              <li
                key={n.id}
                className="flex items-center gap-4 border border-line rounded-md p-3 hover:border-navy/40 transition-colors"
              >
                <img
                  src={n.imagem_capa_url ?? "/images/news/news-default.jpg"}
                  alt={n.titulo}
                  className="w-24 h-16 object-cover rounded bg-cream shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-navy truncate">{n.titulo}</div>
                  <div className="text-[12px] text-ink-soft">
                    {n.categoria} · {formatDate(n.data_publicacao)} ·{" "}
                    {n.publicado ? "publicada" : "rascunho"}
                  </div>
                </div>
                <button
                  onClick={() => edit(n)}
                  className="p-2 rounded-md text-ink-soft hover:text-navy hover:bg-cream cursor-pointer"
                  aria-label="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setPendingDelete(n.id)}
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
            {draft.id ? "Editar notícia" : "Nova notícia"}
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
            label="Imagem de capa"
            value={draft.imagem_capa_url}
            folder="noticias"
            onChange={(url) => setDraft({ ...draft, imagem_capa_url: url })}
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-navy">Categoria</label>
              <select
                value={draft.categoria}
                onChange={(e) => setDraft({ ...draft, categoria: e.target.value })}
                className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy cursor-pointer bg-white"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-navy">Data de publicação</label>
              <input
                type="date"
                value={draft.data_publicacao}
                onChange={(e) => setDraft({ ...draft, data_publicacao: e.target.value })}
                className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Resumo (chamada do card)</label>
            <textarea
              rows={2}
              value={draft.resumo}
              onChange={(e) => setDraft({ ...draft, resumo: e.target.value })}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy resize-y"
            />
          </div>

          <RichTextEditor
            label="Conteúdo completo da matéria"
            value={draft.conteudo}
            onChange={(html) => setDraft({ ...draft, conteudo: html })}
            minHeight={340}
          />

          <label className="flex items-center gap-2 text-[14px] text-navy font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={draft.publicado}
              onChange={(e) => setDraft({ ...draft, publicado: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            Publicada no site
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
        description="Esta ação não pode ser desfeita. O item será removido do site imediatamente."
        onConfirm={() => {
          const id = pendingDelete;
          setPendingDelete(null);
          if (id) void remove(id);
        }}
      />
    </div>
  );
}
