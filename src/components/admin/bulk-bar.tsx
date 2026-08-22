import { CheckSquare, Eye, EyeOff, Trash2, X } from "lucide-react";

export function SelectBox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-label={label}
      className="w-4 h-4 cursor-pointer accent-[#14532D] shrink-0"
    />
  );
}

/** Barra de ações em lote exibida quando há itens selecionados na listagem. */
export function BulkBar({
  count,
  total,
  onSelectAll,
  onClear,
  onPublish,
  onUnpublish,
  onDelete,
  canDelete = true,
  publishLabel = "Publicar",
  unpublishLabel = "Despublicar",
  busy,
}: {
  count: number;
  total: number;
  onSelectAll: () => void;
  onClear: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
  canDelete?: boolean;
  publishLabel?: string;
  unpublishLabel?: string;
  busy?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-navy/25 bg-cream px-3 py-2.5 mb-4">
      <span className="text-[13px] font-semibold text-navy mr-1">
        {count} {count === 1 ? "item selecionado" : "itens selecionados"}
      </span>
      <button
        onClick={onSelectAll}
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-navy cursor-pointer"
      >
        <CheckSquare size={14} /> Selecionar todos ({total})
      </button>
      <div className="flex-1" />
      <button
        onClick={onPublish}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-md bg-navy text-white px-3 py-1.5 text-[12.5px] font-semibold hover:bg-navy-deep transition-colors cursor-pointer disabled:opacity-60"
      >
        <Eye size={14} /> {publishLabel}
      </button>
      <button
        onClick={onUnpublish}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-[12.5px] font-semibold text-ink hover:border-navy hover:text-navy transition-colors cursor-pointer disabled:opacity-60"
      >
        <EyeOff size={14} /> {unpublishLabel}
      </button>
      {canDelete && (
        <button
          onClick={onDelete}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-60"
        >
          <Trash2 size={14} /> Excluir
        </button>
      )}
      <button
        onClick={onClear}
        aria-label="Limpar seleção"
        className="p-1.5 rounded-md text-ink-soft hover:text-navy hover:bg-white cursor-pointer"
      >
        <X size={15} />
      </button>
    </div>
  );
}
