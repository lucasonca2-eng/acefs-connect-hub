import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/use-cms";
import { ImageField } from "@/components/admin/image-field";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  component: AdminSettings,
});

const FIELDS = [
  { key: "telefone", label: "Telefone" },
  { key: "whatsapp", label: "WhatsApp (somente números, ex: 557532117446)" },
  { key: "email", label: "E-mail de contato" },
  { key: "endereco", label: "Endereço" },
  { key: "instagram_url", label: "Instagram" },
  { key: "facebook_url", label: "Facebook" },
  { key: "linkedin_url", label: "LinkedIn" },
  { key: "youtube_url", label: "YouTube" },
] as const;

function AdminSettings() {
  const { data, isLoading } = useSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(data)) next[k] = typeof v === "string" ? v : "";
      setForm(next);
    }
  }, [data]);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    const payload = {
      logo_url: form["logo_url"] || null,
      logo_branca_url: form["logo_branca_url"] || null,
      telefone: form["telefone"] || null,
      whatsapp: form["whatsapp"] || null,
      email: form["email"] || null,
      endereco: form["endereco"] || null,
      instagram_url: form["instagram_url"] || null,
      facebook_url: form["facebook_url"] || null,
      linkedin_url: form["linkedin_url"] || null,
      youtube_url: form["youtube_url"] || null,
    };
    const { error } = data?.id
      ? await supabase.from("settings").update(payload).eq("id", data.id)
      : await supabase.from("settings").insert(payload);
    setSaving(false);
    if (error) {
      toast.error("Não foi possível salvar as configurações.");
      return;
    }
    toast.success("Configurações salvas.");
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
      <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Configurações gerais</h1>
      <p className="text-[14px] text-ink-soft mb-8">
        Logo, contatos e redes sociais exibidos em todo o site.
      </p>

      <div className="space-y-7 max-w-[640px]">
        <ImageField
          label="Logo principal (cabeçalho)"
          value={form["logo_url"]}
          folder="logos"
          onChange={(url) => set("logo_url", url)}
        />
        <ImageField
          label="Logo branca (rodapé)"
          value={form["logo_branca_url"]}
          folder="logos"
          onChange={(url) => set("logo_branca_url", url)}
        />

        {FIELDS.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">{f.label}</label>
            <input
              type="text"
              value={form[f.key] ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy transition-colors"
            />
          </div>
        ))}

        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
