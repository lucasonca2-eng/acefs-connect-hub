import logoAsset from "@/assets/acefs-logo.png.asset.json";

interface AnimatedLogoProps {
  variant?: "header" | "footer" | "hero";
  className?: string;
}

export function AnimatedLogo({ variant = "header", className }: AnimatedLogoProps) {
  const heightClass =
    variant === "header" ? "h-10 md:h-11" :
    variant === "footer" ? "h-12 md:h-14" :
    "h-16 md:h-24";

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={logoAsset.url}
        alt="ACEFS — Associação Comercial e Empresarial de Feira de Santana"
        width={606}
        height={192}
        className={`${heightClass} w-auto object-contain`}
      />
    </div>
  );
}

