import logoAsset from "@/assets/acefs-logo.png.asset.json";

interface AnimatedLogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export function AnimatedLogo({ variant = "header", className }: AnimatedLogoProps) {
  const heightClass = variant === "header" ? "h-10 md:h-11" : "h-12 md:h-14";

  return (
    <div className={`logo-shine inline-flex items-center justify-center rounded-md bg-white p-2 md:p-3 shrink-0 ${className}`}>
      <img
        src={logoAsset.url}
        alt="ACEFS — Associação Comercial e Empresarial de Feira de Santana"
        width={606}
        height={192}
        className={`${heightClass} w-auto object-contain logo-animate`}
      />
    </div>
  );
}
