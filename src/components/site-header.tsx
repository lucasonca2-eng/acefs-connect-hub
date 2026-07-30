import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site-data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="bg-navy-deep text-white/70 text-[11.5px] tracking-[0.14em] uppercase">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 h-9 flex items-center justify-between">
          <span>Seg a sex · 08h–18h · (75) 3211-7446</span>
          <span className="hidden md:block">Feira de Santana · Bahia</span>
        </div>
      </div>
      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? "bg-white/95 backdrop-blur border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            : "bg-white border-b border-line"
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 h-[72px] flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <Logo />
            <div className="leading-none">
              <div className="font-display text-[20px] text-navy tracking-tight font-semibold">ACEFS</div>
              <div className="text-[10px] tracking-[0.22em] text-ink-soft uppercase mt-1">desde 1945</div>
            </div>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-8 list-none">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="text-[14px] font-medium text-ink hover:text-navy transition-colors data-[status=active]:text-navy data-[status=active]:font-semibold"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:block">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-navy-deep transition-colors"
            >
              Associe-se
            </Link>
          </div>
          <button
            aria-label="Menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-navy"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d={open ? "M4 4l14 14M18 4L4 18" : "M3 6h16M3 11h16M3 16h16"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-line bg-white">
            <ul className="px-6 py-4 space-y-1">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-[15px] text-ink data-[status=active]:text-navy data-[status=active]:font-semibold"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/contato"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-navy text-white py-2.5 rounded-md text-[14px] font-semibold"
                >
                  Associe-se
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

function Logo() {
  return (
    <div
      className="w-11 h-11 rounded-md bg-navy flex items-center justify-center font-display text-white text-[22px] font-semibold shrink-0"
      aria-hidden
    >
      <span className="relative">
        A
        <span className="absolute -right-1 -top-1 w-1.5 h-1.5 rounded-full bg-gold" />
      </span>
    </div>
  );
}