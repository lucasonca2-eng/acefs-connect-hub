import { useRef, useState } from "react";
import { uploadImage } from "@/lib/cms";
import { toast } from "sonner";

export function ImageField({
  label,
  value,
  folder,
  onChange,
}: {
  label: string;
  value: string | null | undefined;
  folder: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Imagem enviada com sucesso");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no upload da imagem");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-semibold text-navy">{label}</label>
      <div className="flex items-start gap-4">
        <div className="w-32 h-20 rounded-md border border-line bg-cream overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-contain" />
          ) : (
            <span className="text-[11px] text-ink-soft">sem imagem</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="block w-full text-[13px] text-ink-soft file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-white file:text-[13px] file:font-semibold hover:file:bg-navy-deep file:cursor-pointer cursor-pointer"
          />
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ou cole uma URL de imagem"
            className="w-full rounded-md border border-line px-3 py-2 text-[13px] outline-none focus:border-navy"
          />
          {busy && <p className="text-[12px] text-ink-soft">Enviando imagem…</p>}
        </div>
      </div>
    </div>
  );
}
