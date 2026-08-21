import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Trash2, UserPlus, ShieldCheck } from "lucide-react";
import { createAdmin, listAdmins, removeAdmin, type TeamRole } from "@/lib/team.functions";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

export const Route = createFileRoute("/admin/equipe")({
  ssr: false,
  component: AdminTeam,
});

function AdminTeam() {
  const qc = useQueryClient();
  const fetchAdmins = useServerFn(listAdmins);
  const addAdmin = useServerFn(createAdmin);
  const delAdmin = useServerFn(removeAdmin);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: () => fetchAdmins(),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<TeamRole>("admin");
  const [pending, setPending] = useState<{ userId: string; email: string } | null>(null);

  const create = useMutation({
    mutationFn: (vars: { email: string; password: string; role: TeamRole }) =>
      addAdmin({ data: vars }),
    onSuccess: () => {
      toast.success("Usuário criado.");
      setEmail("");
      setPassword("");
      setRole("admin");
      void qc.invalidateQueries({ queryKey: ["admin-team"] });
    },
    onError: (e: Error) => toast.error(e.message || "Não foi possível criar a conta."),
  });

  const destroy = useMutation({
    mutationFn: (userId: string) => delAdmin({ data: { userId } }),
    onSuccess: () => {
      toast.success("Acesso removido.");
      void qc.invalidateQueries({ queryKey: ["admin-team"] });
    },
    onError: (e: Error) => toast.error(e.message || "Não foi possível remover o usuário."),
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-line rounded-lg p-6 md:p-8">
        <h1 className="font-display font-semibold text-[26px] text-navy mb-1">Equipe</h1>
        <p className="text-[14px] text-ink-soft mb-6">
          Pessoas com acesso ao painel administrativo e seus níveis de acesso.
        </p>

        {isLoading ? (
          <div className="flex items-center gap-2 text-ink-soft text-[14px]">
            <Loader2 size={16} className="animate-spin" /> Carregando…
          </div>
        ) : (data?.length ?? 0) === 0 ? (
          <p className="text-[14px] text-ink-soft">Nenhum administrador cadastrado.</p>
        ) : (
          <ul className="space-y-3">
            {data!.map((m) => (
              <li
                key={m.userId}
                className="flex items-center gap-4 border border-line rounded-md p-3 hover:border-navy/40 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-cream text-navy flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-navy truncate">{m.email}</div>
                  <div className="text-[12px] text-ink-soft">
                    {m.role === "jornalista" ? "Jornalista" : "Administrador geral"}
                  </div>
                </div>
                <button
                  onClick={() => setPending({ userId: m.userId, email: m.email })}
                  className="p-2 rounded-md text-ink-soft hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  aria-label="Excluir usuário"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white border border-line rounded-lg p-6 md:p-8 max-w-[640px]">
        <h2 className="font-display font-semibold text-[20px] text-navy mb-5">
          Novo usuário
        </h2>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            create.mutate({ email, password, role });
          }}
        >
          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-line px-3.5 py-2.5 text-[14px] outline-none focus:border-navy transition-colors"
              placeholder="nome@acefs.com.br"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-navy">Senha inicial</label>
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
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-navy">Nível de acesso</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {(
                [
                  { value: "admin", label: "Administrador geral", hint: "Acesso a todo o painel" },
                  { value: "jornalista", label: "Jornalista", hint: "Acesso apenas a Notícias" },
                ] as { value: TeamRole; label: string; hint: string }[]
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-2.5 rounded-md border p-3 cursor-pointer transition-colors ${
                    role === opt.value ? "border-navy bg-cream" : "border-line hover:border-navy/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    className="mt-1 accent-[#14532D]"
                    checked={role === opt.value}
                    onChange={() => setRole(opt.value)}
                  />
                  <span>
                    <span className="block text-[13.5px] font-semibold text-navy">{opt.label}</span>
                    <span className="block text-[12px] text-ink-soft">{opt.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={create.isPending}
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60"
          >
            {create.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UserPlus size={16} />
            )}
            Criar usuário
          </button>
          <p className="text-[12px] text-ink-soft">
            A conta é criada no servidor — você continua conectado normalmente.
          </p>
        </form>
      </div>

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title="Tem certeza que deseja excluir?"
        description={`O acesso de ${pending?.email ?? ""} será removido permanentemente.`}
        onConfirm={() => {
          if (pending) destroy.mutate(pending.userId);
          setPending(null);
        }}
      />
    </div>
  );
}
