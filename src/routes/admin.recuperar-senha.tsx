import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";

export const Route = createFileRoute("/admin/recuperar-senha")({
  ssr: false,
  component: RecuperarSenha,
});

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/redefinir-senha`,
    });
    setBusy(false);
    if (error) {
      toast.error("Não foi possível enviar o e-mail de recuperação.");
      return;
    }
    setSent(true);
    toast.success("E-mail enviado! Verifique a caixa de entrada e também o spam.");
  }

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Informe o e-mail cadastrado e enviaremos um link para criar uma nova senha."
    >
      {sent ? (
        <div className="space-y-4 text-center">
          <MailCheck className="mx-auto text-navy" size={32} />
          <p className="text-[14px] text-ink-soft">
            Enviamos um link de recuperação para <strong className="text-navy">{email}</strong>.
            Verifique sua caixa de entrada — e também a pasta de spam.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-gold"
          >
            <ArrowLeft size={14} /> Voltar para o login
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
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
          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60"
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            Enviar link de recuperação
          </button>
          <Link
            to="/admin"
            className="flex items-center justify-center gap-2 text-[13px] font-semibold text-ink-soft hover:text-navy"
          >
            <ArrowLeft size={14} /> Voltar para o login
          </Link>
        </form>
      )}
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[80vh] bg-navy-deep flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="text-[11px] tracking-[0.28em] uppercase text-gold font-semibold mb-3">
            Área restrita
          </div>
          <h1 className="font-display font-semibold text-[32px] leading-tight text-white">
            {title}
          </h1>
          <p className="mt-2 text-white/60 text-[14px]">{subtitle}</p>
        </div>
        <div className="bg-white rounded-xl border border-line p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]">
          {children}
        </div>
      </div>
    </div>
  );
}
