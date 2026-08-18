import { Link } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import logoAsset from "@/assets/acefs-mark.png.asset.json";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedLogoProps {
  className?: string;
  as?: "link" | "span";
}

export function AnimatedLogo({ className, as = "link" }: AnimatedLogoProps) {
  const content = (
    <img
      src={logoAsset.url}
      alt="ACEFS — Associação Comercial e Empresarial de Feira de Santana"
      className="h-10 md:h-12 w-auto max-w-none object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
    />
  );

  if (as === "span") {
    return <span className={cn("inline-flex items-center group", className)}>{content}</span>;
  }

  return (
    <Link to="/" className={cn("flex items-center group", className)}>
      {content}
    </Link>
  );
}
