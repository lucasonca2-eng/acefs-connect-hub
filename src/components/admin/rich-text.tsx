import { useEffect, useRef } from "react";
import { Bold, Italic, List, Heading2, Link2, Undo2 } from "lucide-react";

/**
 * Editor de texto simples (contentEditable) que devolve HTML.
 * Suporta parágrafos, negrito, itálico, subtítulo, lista e link.
 */
export function RichTextEditor({
  label,
  value,
  onChange,
  minHeight = 300,
}: {
  label: string;
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== value) el.innerHTML = value || "<p><br/></p>";
    // sincroniza apenas quando o valor externo muda (ex.: abrir outro registro)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value === "" ? "" : undefined, label]);

  function exec(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML ?? "");
  }

  const btn =
    "p-2 rounded-md text-ink-soft hover:text-navy hover:bg-cream transition-colors cursor-pointer";

  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-semibold text-navy">{label}</label>
      <div className="rounded-md border border-line overflow-hidden focus-within:border-navy transition-colors">
        <div className="flex items-center gap-1 border-b border-line bg-cream/60 px-2 py-1.5">
          <button type="button" className={btn} onClick={() => exec("bold")} aria-label="Negrito">
            <Bold size={16} />
          </button>
          <button type="button" className={btn} onClick={() => exec("italic")} aria-label="Itálico">
            <Italic size={16} />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => exec("formatBlock", "<h2>")}
            aria-label="Subtítulo"
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => exec("insertUnorderedList")}
            aria-label="Lista"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => {
              const url = window.prompt("Endereço do link (https://...)");
              if (url) exec("createLink", url);
            }}
            aria-label="Link"
          >
            <Link2 size={16} />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => exec("removeFormat")}
            aria-label="Limpar formatação"
          >
            <Undo2 size={16} />
          </button>
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
          onBlur={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
          style={{ minHeight }}
          className="admin-richtext px-4 py-3 text-[15px] leading-[1.75] text-ink outline-none"
        />
      </div>
      <p className="text-[12px] text-ink-soft">
        Use os botões para negrito, itálico, subtítulos e listas. O conteúdo é salvo formatado.
      </p>
    </div>
  );
}
