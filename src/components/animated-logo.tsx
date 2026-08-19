import { Link } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedLogoProps {
  className?: string;
  as?: "link" | "span";
  variant?: "green" | "white";
}

const SOURCES = {
  green: "/images/acefs-logo-green.png",
  white: "/images/acefs-logo-white.png",
} as const;

export function AnimatedLogo({ className, as = "link", variant = "green" }: AnimatedLogoProps) {
  const content = (
    <img
      src={SOURCES[variant]}
      alt="ACEFS — Associação Comercial e Empresarial de Feira de Santana"
      width={379}
      height={108}
      onError={(e) => {
        const el = e.currentTarget;
        if (!el.src.endsWith("/images/acefs-logo-green.png")) el.src = "/images/acefs-logo-green.png";
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
