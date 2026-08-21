import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useBanners } from "@/hooks/use-cms";
import type { Banner } from "@/lib/cms";
import { ImageField } from "@/components/admin/image-field";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/banners")({
  ssr: false,
  component: AdminBanners,
});

type Draft = {
  id?: string;
  titulo: string;
  imagem_url: string;
  link_destino: string;
  ordem: number;
  ativo: boolean;
};

const EMPTY: Draft = { titulo: "", imagem_url: "", link_destino: "", ordem: 0, ativo: true };

function AdminBanners() {
  const { data: banners, isLoading } = useBanners(false);
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["banners"] });

  function edit(b: Banner) {
    setDraft({
      id: b.id,
      titulo: b.titulo,
      imagem_url: b.imagem_url,
      link_destino: b.link_destino ?? "",
      ordem: b.ordem,
      ativo: b.ativo,
    });
  }

  async function save() {
    if (!draft) return;
    if (!draft.titulo.trim() || !draft.imagem_url.trim()) {
      toast.error("Informe título e imagem.");
      return;
    }
    setSaving(true);
    const payload = {
      titulo: draft.titulo,
      imagem_url: draft.imagem_url,
      link_destino: draft.link_destino || null,
      ordem: Number(draft.ordem) || 0,
      ativo: draft.ativo,
    };
    const { error } = draft.id
      ? await supabase.from("banners").update(payload).eq("id", draft.id)
      : await supabase.from("banners").insert(payload);
    setSaving(false);
    if (error) {
      toast.error("Não foi possível salvar o banner.");
      return;
    }
    toast.success("Banner salvo.");
    setDraft(null);
    void refresh();
  }

  async function remove(id: string) {
    if (!confirm("Excluir este banner?")) return;
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (error) {
      toast.error("Não foi possível excluir.");
      return;
    }
    toast.success("Banner excluído.");
    void refresh();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-line rounded-lg p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Banners</h1>
            <p className="text-[14px] text-ink-soft">Imagens do carrossel principal da Home.</p>
          </div>
          <button
            onClick={() => setDraft({ ...EMPTY, ordem: (banners?.length ?? 0) + 1 })}
            className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-md font-semibold text-[13px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer shrink-0"
          >
            <Plus size={16} /> Novo banner
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-ink-soft text-[14px]">
            <Loader2 size={16} className="animate-spin" /> Carregando…
          </div>
        ) : (banners?.length ?? 0) === 0 ? (
          <p className="text-[14px] text-ink-soft">Nenhum banner cadastrado.</p>
        ) : (
          <ul className="space-y-3">
            {banners!.map((b) => (
              <li
                key={b.id}
                className="flex items-center gap-4 border border-line rounded-md p-3 hover:border-navy/40 transition-colors"
              >
                <img
                  src={b.imagem_url}
                  alt={b.titulo}
                  className="w-28 h-16 object-cover rounded bg-cream shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-navy truncate">{b.titulo}</div>
                  <div className="text-[12px] text-ink-soft">
                    Ordem {b.ordem} · {b.ativo ? "ativo" : "inativo"}
                  </div>
                </div>
                <button
                  onClick={() => edit(b)}
                  className="p-2 rounded-md text-ink-soft hover:text-navy hover:bg-cream cursor-pointer"
                  aria-label="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => remove(b.id)}
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
        <div className="bg-white border border-line rounded-lg p-6 md:p-8 space-y-6 max-w-[640px]">
          <h2 className="font-display font-semibold text-[20px] text-navy">
            {draft.id ? "Editar banner" : "Novo banner"}
          </h2>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Título</label>
            <input
              value={draft.titulo}
              onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
            />
          </div>

          <ImageField
            label="Imagem do banner"
            value={draft.imagem_url}
            folder="banners"
            onChange={(url) => setDraft({ ...draft, imagem_url: url })}
          />

          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Link de destino (opcional)</label>
            <input
              value={draft.link_destino}
              onChange={(e) => setDraft({ ...draft, link_destino: e.target.value })}
              placeholder="https://…"
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
            />
          </div>

          <div className="flex items-end gap-6">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-navy">Ordem</label>
              <input
                type="number"
                value={draft.ordem}
                onChange={(e) => setDraft({ ...draft, ordem: Number(e.target.value) })}
                className="w-28 rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy"
              />
            </div>
            <label className="flex items-center gap-2 text-[14px] text-navy font-medium pb-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={draft.ativo}
                onChange={(e) => setDraft({ ...draft, ativo: e.target.checked })}
                className="w-4 h-4 cursor-pointer"
              />
              Ativo
            </label>
          </div>

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
    </div>
  );
}
