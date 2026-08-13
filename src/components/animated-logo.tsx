interface AnimatedLogoProps {
  variant?: "header" | "footer" | "hero";
  className?: string;
}

export function AnimatedLogo({ variant = "header", className }: AnimatedLogoProps) {
  const sizeClass =
    variant === "header"
      ? "text-2xl md:text-[28px]"
      : variant === "footer"
      ? "text-3xl md:text-4xl"
      : "text-6xl md:text-8xl";

  const colorClass =
    variant === "header" ? "text-navy" : "text-white";

  return (
    <span
      className={`inline-block font-serif font-light italic tracking-widest opacity-90 drop-shadow-sm ${sizeClass} ${colorClass} ${className}`}
      aria-label="ACEFS — Associação Comercial e Empresarial de Feira de Santana"
    >
      ACEFS
    </span>
  );
}
