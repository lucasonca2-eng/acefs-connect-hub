import { createFileRoute, Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LayoutDashboard, Images, Newspaper, Users, LogOut, Loader2, Briefcase, CalendarDays, FileText, HelpCircle, Settings, Menu, ExternalLink, History } from "lucide-react";
import { AdminRoleProvider, pathAllowed, type AdminRole } from "@/lib/admin-role";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel administrativo — ACEFS" },
      { name: "description", content: "Área restrita de gestão de conteúdo do site da ACEFS." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Painel administrativo — ACEFS" },
      { property: "og:description", content: "Área restrita de gestão de conteúdo do site da ACEFS." },
    ],
  }),
  component: AdminLayout,
});

type State = "loading" | "anon" | "denied" | "ok";
type Role = AdminRole;

function AdminLayout() {
  const [state, setState] = useState<State>("loading");
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPublicAuthPage =
    pathname.startsWith("/admin/recuperar-senha") || pathname.startsWith("/admin/redefinir-senha");

  async function check() {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      setState("anon");
      setRole(null);
      return;
    }
    setEmail(user.email ?? "");
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);
    const names = (roles ?? []).map((r) => r.role as string);
    const resolved: Role | null = names.includes("admin")
      ? "admin"
      : names.includes("jornalista")
        ? "jornalista"
        : null;
    setRole(resolved);
    setState(resolved ? "ok" : "denied");
  }

  useEffect(() => {
    void check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        void check();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setState("anon");
    setRole(null);
    void router.invalidate();
  }

  const isJournalist = role === "jornalista";
  const journalistBlocked = state === "ok" && !pathAllowed(role, pathname);

  if (isPublicAuthPage) return <Outlet />;

  if (state === "loading") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cream">
        <Loader2 className="animate-spin text-navy" />
      </div>
    );
  }

  if (state === "anon") return <LoginScreen />;

  if (state === "denied") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream px-6 text-center">
        <h1 className="font-display text-2xl text-navy mb-2">Acesso restrito</h1>
        <p className="text-ink-soft max-w-md text-[14px]">
          A conta <strong>{email}</strong> não tem permissão de administrador. Solicite a liberação
          do acesso ao responsável pelo site.
        </p>
        <button
          onClick={signOut}
          className="mt-6 text-[13px] font-semibold text-navy hover:text-gold cursor-pointer"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <AdminRoleProvider value={role}>
    <div className="min-h-[80vh] bg-cream">
      <div className="mx-auto max-w-[1240px] px-4 md:px-10 py-8 grid md:grid-cols-[240px_1fr] gap-6">
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="w-full inline-flex items-center justify-between gap-2 bg-white border border-line rounded-lg px-4 py-3 text-[14px] font-semibold text-navy cursor-pointer"
          >
            <span className="inline-flex items-center gap-2">
              <Menu size={18} /> Menu do painel
            </span>
            <span className="text-[12px] font-medium text-ink-soft">{menuOpen ? "fechar" : "abrir"}</span>
          </button>
        </div>
        <aside
          className={`${menuOpen ? "block" : "hidden"} md:block bg-white border border-line rounded-lg p-4 h-fit md:sticky md:top-24`}
        >
          <div className="px-2 pb-4 mb-2 border-b border-line">
            <div className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold">Painel</div>
            <div className="text-[13px] text-ink-soft mt-1 break-all">{email}</div>
            <div className="mt-1 inline-flex items-center rounded-full bg-cream px-2 py-0.5 text-[11px] font-semibold text-navy">
              {isJournalist ? "Jornalista" : "Administrador"}
            </div>
          </div>
          <nav className="space-y-1" onClick={() => setMenuOpen(false)}>
            <SideLink to="/admin" icon={<LayoutDashboard size={16} />} label="Início" exact />
            {!isJournalist && (
              <SideLink to="/admin/banners" icon={<Images size={16} />} label="Banners" />
            )}
            <SideLink to="/admin/noticias" icon={<Newspaper size={16} />} label="Notícias" />
            {!isJournalist && (
              <>
                <SideLink to="/admin/paginas" icon={<FileText size={16} />} label="Páginas institucionais" />
                <SideLink to="/admin/servicos" icon={<Briefcase size={16} />} label="Serviços" />
                <SideLink to="/admin/eventos" icon={<CalendarDays size={16} />} label="Eventos" />
                <SideLink to="/admin/equipe" icon={<Users size={16} />} label="Equipe" />
                <SideLink to="/admin/configuracoes" icon={<Settings size={16} />} label="Configurações gerais" />
                <SideLink to="/admin/auditoria" icon={<History size={16} />} label="Histórico de alterações" />
              </>
            )}
            <SideLink to="/admin/ajuda" icon={<HelpCircle size={16} />} label="Ajuda" />
          </nav>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full inline-flex items-center gap-2 px-3 py-2 rounded-md text-[13px] font-medium text-ink-soft hover:bg-cream hover:text-navy transition-colors"
          >
            <ExternalLink size={16} /> Ver o site
          </a>
          <button
            onClick={signOut}
            className="mt-1 w-full inline-flex items-center gap-2 px-3 py-2 rounded-md text-[13px] font-medium text-ink-soft hover:bg-cream hover:text-navy transition-colors cursor-pointer"
          >
            <LogOut size={16} /> Sair
          </button>
        </aside>

        <main className="min-w-0">
          {journalistBlocked ? (
            <div className="bg-white border border-line rounded-lg p-8 text-center">
              <h1 className="font-display font-semibold text-[22px] text-navy mb-2">
                Área restrita a administradores
              </h1>
              <p className="text-[14px] text-ink-soft">
                Seu perfil de jornalista tem acesso apenas à gestão de notícias.
              </p>
              <Link
                to="/admin/noticias"
                className="mt-6 inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors"
              >
                Ir para Notícias
              </Link>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
    </AdminRoleProvider>
  );
}

function SideLink({
  to,
  icon,
  label,
  exact,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: !!exact }}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13.5px] font-medium text-ink hover:bg-cream transition-colors data-[status=active]:bg-navy data-[status=active]:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error("E-mail ou senha inválidos.");
  }

  return (
    <div className="min-h-[80vh] bg-navy-deep flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="text-[11px] tracking-[0.28em] uppercase text-gold font-semibold mb-3">
            Área restrita
          </div>
          <h1 className="font-display font-semibold text-[32px] leading-tight text-white">
            Painel de conteúdo
          </h1>
          <p className="mt-2 text-white/60 text-[14px]">
            Acesse para gerenciar banners, notícias e configurações do site.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="bg-white rounded-xl border border-line p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-navy">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy transition-colors"
              placeholder="seuemail@acefs.com.br"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-navy">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60"
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            Entrar
          </button>
          <Link
            to="/admin/recuperar-senha"
            className="block text-center text-[13px] font-semibold text-ink-soft hover:text-navy transition-colors"
          >
            Esqueci minha senha
          </Link>
        </form>
      </div>
    </div>
  );
}
