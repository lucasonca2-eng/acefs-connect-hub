import { useEffect, useRef, useState } from "react";
import { uploadImage } from "@/lib/cms";
import { toast } from "sonner";
import { UploadCloud, AlertCircle, Check, X, Loader2 } from "lucide-react";

const MAX_BYTES = 10 * 1024 * 1024;
const ACEITOS = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

function formatSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Valida o arquivo antes de qualquer envio e devolve a mensagem de erro (ou null). */
function validar(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Esse arquivo não é uma imagem. Envie um JPG, PNG ou WEBP.";
  }
  if (!ACEITOS.includes(file.type)) {
    return `Formato não suportado (${file.type.replace("image/", "").toUpperCase()}). Use JPG, PNG ou WEBP.`;
  }
  if (file.size > MAX_BYTES) {
    return `A imagem tem ${formatSize(file.size)} e o limite é 10 MB. Reduza o arquivo e tente novamente.`;
  }
  if (file.size === 0) return "O arquivo está vazio ou corrompido.";
  return null;
}

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

type Pendente = { file: File; url: string; width: number; height: number };

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
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, setPendente] = useState<Pendente | null>(null);

  useEffect(() => {
    return () => {
      if (pendente) URL.revokeObjectURL(pendente.url);
    };
  }, [pendente]);

  function limparPendente() {
    setPendente((p) => {
      if (p) URL.revokeObjectURL(p.url);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
  }

  async function selecionar(file: File | undefined) {
    if (!file) return;
    const problema = validar(file);
    if (problema) {
      setErro(problema);
      toast.error(problema);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setErro(null);
    let width = 0;
    let height = 0;
    try {
      const bitmap = await createImageBitmap(file);
      width = bitmap.width;
      height = bitmap.height;
      bitmap.close?.();
    } catch {
      const msg = "Não foi possível ler essa imagem. Ela pode estar corrompida.";
      setErro(msg);
      toast.error(msg);
      return;
    }
    if (width < 200 || height < 120) {
      const msg = `Imagem muito pequena (${width}×${height}px). Use pelo menos 200×120px para não ficar borrada no site.`;
      setErro(msg);
      toast.error(msg);
      return;
    }
    limparPendente();
    setPendente({ file, url: URL.createObjectURL(file), width, height });
  }

  async function confirmar() {
    if (!pendente) return;
    setBusy(true);
    try {
      const url = await uploadImage(await compress(pendente.file), folder);
      onChange(url);
      setErro(null);
      limparPendente();
      toast.success("Imagem enviada com sucesso");
    } catch (err) {
      const msg =
        err instanceof Error
          ? `Falha no envio: ${err.message}`
          : "Falha no envio da imagem. Verifique sua conexão e tente novamente.";
      setErro(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  const preview = pendente?.url ?? value ?? "";

  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-semibold text-navy">{label}</label>
      {hint && <p className="text-[12px] text-ink-soft -mt-1">{hint}</p>}
      <div className="flex items-start gap-4">
        <div className="w-32 h-20 rounded-md border border-line bg-cream overflow-hidden shrink-0 flex items-center justify-center">
          {preview ? (
            <img src={preview} alt={label} className="w-full h-full object-contain" />
          ) : (
            <span className="text-[11px] text-ink-soft">sem imagem</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          {pendente ? (
            <div className="rounded-md border border-line bg-cream/60 px-4 py-3">
              <p className="text-[13px] font-semibold text-navy truncate">{pendente.file.name}</p>
              <p className="text-[12px] text-ink-soft mt-0.5">
                {pendente.width}×{pendente.height}px · {formatSize(pendente.file.size)} · pré-visualização
                ao lado — ainda não foi salva
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={confirmar}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 bg-navy text-white px-3.5 py-2 rounded-md text-[13px] font-semibold hover:bg-navy-deep transition-colors cursor-pointer disabled:opacity-60"
                >
                  {busy ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  {busy ? "Enviando…" : "Usar esta imagem"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    limparPendente();
                    setErro(null);
                  }}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-line text-[13px] font-medium text-ink hover:border-navy hover:text-navy transition-colors cursor-pointer"
                >
                  <X size={14} /> Escolher outra
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                void selecionar(e.dataTransfer.files?.[0]);
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
              <p className="text-[13px] text-ink">Arraste uma imagem aqui ou clique para escolher</p>
              <p className="text-[11.5px] text-ink-soft mt-0.5">
                JPG, PNG ou WEBP até 10 MB — você confere a pré-visualização antes de salvar
              </p>
            </div>
          )}

          {erro && (
            <p className="flex items-start gap-1.5 text-[12.5px] text-red-600">
              <AlertCircle size={14} className="mt-0.5 shrink-0" /> {erro}
            </p>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            disabled={busy}
            onChange={(e) => selecionar(e.target.files?.[0])}
            className="hidden"
          />
          <input
            type="text"
            value={pendente ? "" : (value ?? "")}
            disabled={!!pendente}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ou cole uma URL de imagem"
            className="w-full rounded-md border border-line px-3 py-2 text-[13px] outline-none focus:border-navy disabled:bg-cream/60"
          />
        </div>
      </div>
    </div>
  );
}
