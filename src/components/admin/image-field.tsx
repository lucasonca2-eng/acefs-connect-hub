import { useRef, useState } from "react";
import { uploadImage } from "@/lib/cms";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

/** Reduz a imagem no navegador antes do upload (evita arquivos de vários MB). */
async function compress(file: File, maxWidth = 1920): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;
  try {
    const bitmap = await createImageBitmap(file);
    if (bitmap.width <= maxWidth && file.size < 600_000) return file;
    const scale = Math.min(1, maxWidth / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85),
    );
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function ImageField({
  label,
  value,
  folder,
  onChange,
  hint,
}: {
  label: string;
  value: string | null | undefined;
  folder: string;
  onChange: (url: string) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem.");
      return;
    }
    setBusy(true);
    try {
      const url = await uploadImage(await compress(file), folder);
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
      {hint && <p className="text-[12px] text-ink-soft -mt-1">{hint}</p>}
      <div className="flex items-start gap-4">
        <div className="w-32 h-20 rounded-md border border-line bg-cream overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-contain" />
          ) : (
            <span className="text-[11px] text-ink-soft">sem imagem</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              void handleFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            className={`rounded-md border border-dashed px-4 py-4 text-center cursor-pointer transition-colors ${
              dragging ? "border-navy bg-cream" : "border-line hover:border-navy/50"
            }`}
          >
            <UploadCloud size={18} className="mx-auto text-ink-soft mb-1" />
            <p className="text-[13px] text-ink">
              {busy ? "Enviando imagem…" : "Arraste uma imagem aqui ou clique para escolher"}
            </p>
            <p className="text-[11.5px] text-ink-soft mt-0.5">JPG ou PNG — reduzimos o tamanho automaticamente</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ou cole uma URL de imagem"
            className="w-full rounded-md border border-line px-3 py-2 text-[13px] outline-none focus:border-navy"
          />
        </div>
      </div>
    </div>
  );
}
