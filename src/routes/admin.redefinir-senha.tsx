import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthShell } from "./admin.recuperar-senha";

export const Route = createFileRoute("/admin/redefinir-senha")({
  ssr: false,
  component: RedefinirSenha,
});

function RedefinirSenha() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let done = false;
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        done = true;
        setValid(true);
        setReady(true);
      }
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (done) return;
      setValid(!!data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("A senha precisa ter ao menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      toast.error("As senhas não conferem.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setBusy(false);
      toast.error("Não foi possível redefinir a senha. Solicite um novo link.");
      return;
    }
    await supabase.auth.signOut();
    setBusy(false);
    toast.success("Senha redefinida! Entre com a nova senha.");
    void navigate({ to: "/admin", replace: true });
  }

  if (!ready) {
    return (
      <div className="min-h-[80vh] bg-navy-deep flex items-center justify-center">
        <Loader2 className="animate-spin text-white" />
      </div>
    );
  }

  if (!valid) {
    return (
      <AuthShell
        title="Link inválido"
        subtitle="Este link de recuperação expirou ou já foi utilizado."
      >
        <button
          onClick={() => void navigate({ to: "/admin/recuperar-senha" })}
          className="w-full bg-navy text-white py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors cursor-pointer"
        >
          Solicitar novo link
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Nova senha" subtitle="Defina a nova senha de acesso ao painel.">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-navy">Nova senha</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy transition-colors"
            placeholder="Mínimo de 8 caracteres"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-navy">Confirmar nova senha</label>
          <input
            type="password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy transition-colors"
            placeholder="Repita a nova senha"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60"
        >
          {busy && <Loader2 size={16} className="animate-spin" />}
          Salvar nova senha
        </button>
      </form>
    </AuthShell>
  );
}
