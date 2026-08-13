import { Link } from "@tanstack/react-router";

export function AnimatedLogo() {
  return (
    <Link to="/" className="flex items-center group">
      <h1 className="text-2xl md:text-3xl font-light tracking-[0.25em] text-[#14532D] group-hover:text-[#22C55E] transition-colors">
        ACEFS
      </h1>
    </Link>
  );
}
