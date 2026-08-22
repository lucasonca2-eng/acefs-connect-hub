import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/use-cms";
import { ImageField } from "@/components/admin/image-field";
import { parseLinks, type NavLink } from "@/lib/cms";
import { NAV } from "@/lib/site-data";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/configuracoes")({
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

const DEFAULT_FOOTER_LINKS: NavLink[] = [
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Notícias", to: "/noticias" },
  { label: "Contato", to: "/contato" },
];

function AdminSettings() {
  const { data, isLoading } = useSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState<Record<string, string>>({});
  const [menu, setMenu] = useState<NavLink[]>([]);
  const [footer, setFooter] = useState<NavLink[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(data)) next[k] = typeof v === "string" ? v : "";
      setForm(next);
      setMenu(parseLinks(data.menu_links, [...NAV]));
      setFooter(parseLinks(data.rodape_links_institucionais, DEFAULT_FOOTER_LINKS));
    }
  }, [data]);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    const clean = (list: NavLink[]) =>
      list
        .map((l) => ({ label: l.label.trim(), to: l.to.trim() }))
        .filter((l) => l.label && l.to);
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
      rodape_descricao: form["rodape_descricao"] || null,
      menu_links: clean(menu),
      rodape_links_institucionais: clean(footer),
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
        Logo, contatos, redes sociais, menu e rodapé exibidos em todo o site.
      </p>

      <div className="space-y-7 max-w-[720px]">
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

        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-navy">
            Texto descritivo do rodapé (abaixo da logo)
          </label>
          <textarea
            rows={4}
            value={form["rodape_descricao"] ?? ""}
            onChange={(e) => set("rodape_descricao", e.target.value)}
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] leading-relaxed outline-none focus:border-navy transition-colors"
          />
        </div>

        <LinkManager
          title="Menu principal (cabeçalho)"
          hint="Ordem dos itens do menu. Use caminhos internos (ex.: /servicos) ou endereços completos."
          links={menu}
          onChange={setMenu}
        />

        <LinkManager
          title="Rodapé — coluna Institucional"
          hint="Links exibidos na coluna “Institucional” do rodapé."
          links={footer}
          onChange={setFooter}
        />

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

function LinkManager({
  title,
  hint,
  links,
  onChange,
}: {
  title: string;
  hint: string;
  links: NavLink[];
  onChange: (list: NavLink[]) => void;
}) {
  function update(index: number, patch: Partial<NavLink>) {
    onChange(links.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  }

  return (
    <div className="rounded-lg border border-line p-5 space-y-4">
      <div>
        <h2 className="text-[15px] font-semibold text-navy">{title}</h2>
        <p className="text-[12.5px] text-ink-soft mt-0.5">{hint}</p>
      </div>

      <div className="space-y-3">
        {links.map((l, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={l.label}
              placeholder="Nome exibido"
              onChange={(e) => update(i, { label: e.target.value })}
              className="flex-1 rounded-md border border-line px-3 py-2 text-[14px] outline-none focus:border-navy transition-colors"
            />
            <input
              type="text"
              value={l.to}
              placeholder="/caminho ou https://..."
              onChange={(e) => update(i, { to: e.target.value })}
              className="flex-1 rounded-md border border-line px-3 py-2 text-[14px] outline-none focus:border-navy transition-colors"
            />
            <button
              type="button"
              aria-label="Remover link"
              onClick={() => onChange(links.filter((_, idx) => idx !== i))}
              className="inline-flex items-center justify-center rounded-md border border-line px-3 py-2 text-ink-soft hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {links.length === 0 && (
          <p className="text-[13px] text-ink-soft">Nenhum link cadastrado.</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange([...links, { label: "", to: "" }])}
        className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-[13px] font-semibold text-navy hover:bg-cream transition-colors cursor-pointer"
      >
        <Plus size={15} /> Adicionar link
      </button>
    </div>
  );
}
