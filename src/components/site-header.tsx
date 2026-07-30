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
          <nav className="hidden lg:block">
            <ul className="flex gap-7 list-none">
              {NAV.map((n) => (
                <li key={n.label} className="relative group">
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="inline-flex items-center gap-1.5 py-6 text-[14px] font-medium text-ink hover:text-navy transition-colors duration-200 data-[status=active]:text-navy data-[status=active]:font-semibold"
                  >
                    {n.label}
                    {n.children && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="transition-transform duration-200 group-hover:rotate-180">
                        <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>
                  {n.children && (
                    <div className="absolute left-0 top-full z-50 pt-1 opacity-0 invisible translate-y-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                      <ul className="min-w-[230px] list-none rounded-lg border border-line bg-white p-2 shadow-lg">
                        {n.children.map((c) => (
                          <li key={c.to}>
                            <Link
                              to={c.to}
                              className="block rounded-md px-3 py-2.5 text-[13.5px] text-ink hover:bg-cream hover:text-navy transition-colors duration-200 data-[status=active]:text-navy data-[status=active]:font-semibold"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden lg:block">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-navy-deep transition-colors"
            >
              Associe-se
            </Link>
          </div>
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-navy"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d={open ? "M4 4l14 14M18 4L4 18" : "M3 6h16M3 11h16M3 16h16"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div
          className={`lg:hidden overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-300 ease-out ${
            open ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
          }`}
        >
            <ul className="px-6 py-4 space-y-1 list-none">
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-[15px] font-medium text-ink data-[status=active]:text-navy data-[status=active]:font-semibold"
                  >
                    {n.label}
                  </Link>
                  {n.children && (
                    <ul className="list-none ml-3 pl-3 border-l border-line space-y-0.5 pb-1">
                      {n.children.map((c) => (
                        <li key={c.to}>
                          <Link
                            to={c.to}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 text-[14px] text-ink-soft data-[status=active]:text-navy data-[status=active]:font-semibold"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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