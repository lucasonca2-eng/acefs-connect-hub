import { Link } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedLogoProps {
  className?: string;
  as?: "link" | "span";
}

export function AnimatedLogo({ className, as = "link" }: AnimatedLogoProps) {
  const content = (
    <h1 className="text-2xl md:text-3xl font-light tracking-[0.25em] text-[#14532D] group-hover:text-[#22C55E] transition-colors">
      ACEFS
    </h1>
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
