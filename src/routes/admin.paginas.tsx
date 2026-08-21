import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/use-cms";
import { RichTextEditor } from "@/components/admin/rich-text";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/paginas")({
  ssr: false,
  component: AdminPaginas,
});

function AdminPaginas() {
  const { data, isLoading } = useSettings();
  const qc = useQueryClient();
  const [sobre, setSobre] = useState("");
  const [feira, setFeira] = useState("");
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (data && !ready) {
      setSobre(data.sobre_nos_texto ?? "");
      setFeira(data.feira_de_santana_texto ?? "");
      setReady(true);
    }
  }, [data, ready]);

  async function save() {
    setSaving(true);
    const payload = {
      sobre_nos_texto: sobre || null,
      feira_de_santana_texto: feira || null,
    };
    const { error } = data?.id
      ? await supabase.from("settings").update(payload).eq("id", data.id)
      : await supabase.from("settings").insert(payload);
    setSaving(false);
    if (error) {
      toast.error("Não foi possível salvar os textos.");
      return;
    }
    toast.success("Páginas institucionais atualizadas.");
    void qc.invalidateQueries({ queryKey: ["settings"] });
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-ink-soft text-[14px]">
        <Loader2 size={16} className="animate-spin" /> Carregando…
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-lg p-6 md:p-8">
      <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Páginas institucionais</h1>
      <p className="text-[14px] text-ink-soft mb-8">
        Edite os textos exibidos nas páginas “Quem Somos” e “Feira de Santana”.
      </p>

      <div className="space-y-10 max-w-[860px]">
        {ready && (
          <>
            <RichTextEditor label="Quem Somos — texto institucional" value={sobre} onChange={setSobre} />
            <RichTextEditor label="Feira de Santana — texto da página" value={feira} onChange={setFeira} />
          </>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          Salvar textos
        </button>
      </div>
    </div>
  );
}
