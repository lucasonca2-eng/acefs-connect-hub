import { Link } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSettings } from "@/hooks/use-cms";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedLogoProps {
  className?: string;
  as?: "link" | "span";
  variant?: "green" | "white";
}

const FALLBACK = {
  green: "/images/acefs-logo-green.png",
  white: "/images/acefs-logo-white.png",
} as const;

export function AnimatedLogo({ className, as = "link", variant = "green" }: AnimatedLogoProps) {
  const { data: settings } = useSettings();
  const fromCms = variant === "white" ? settings?.logo_branca_url : settings?.logo_url;
  const src = fromCms || FALLBACK[variant];

  const content = (
    <img
      src={src}
      alt="ACEFS — Associação Comercial e Empresarial de Feira de Santana"
      width={379}
      height={108}
      onError={(e) => {
        const el = e.currentTarget;
        if (!el.src.endsWith(FALLBACK[variant])) el.src = FALLBACK[variant];
      }}
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
