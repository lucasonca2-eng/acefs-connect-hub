import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type TeamRole = "admin" | "jornalista";

export type TeamMember = {
  userId: string;
  email: string;
  role: TeamRole;
  createdAt: string;
};

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role, created_at")
      .in("role", ["admin", "jornalista"])
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const byId = new Map((users?.users ?? []).map((u) => [u.id, u.email ?? ""]));

    return (roles ?? []).map((r) => ({
      userId: r.user_id,
      role: r.role as TeamRole,
      email: byId.get(r.user_id) ?? "(conta removida)",
      createdAt: r.created_at,
    }));
  });

export const createAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string; password: string; role: TeamRole }) => {
    const email = String(input?.email ?? "").trim().toLowerCase();
    const password = String(input?.password ?? "");
    const role = input?.role === "jornalista" ? "jornalista" : "admin";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("E-mail inválido");
    if (password.length < 8) throw new Error("A senha precisa ter ao menos 8 caracteres");
    return { email, password, role: role as TeamRole };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let userId: string | null = null;

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

    if (created?.user) {
      userId = created.user.id;
    } else {
      // Conta já existente: reaproveita o usuário e apenas garante a senha/role.
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
      const existing = (list?.users ?? []).find(
        (u) => (u.email ?? "").toLowerCase() === data.email,
      );
      if (!existing) {
        throw new Error(error?.message ?? "Não foi possível criar a conta");
      }
      userId = existing.id;
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: data.password,
        email_confirm: true,
      });
    }

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: data.role }, { onConflict: "user_id,role" });
    if (roleError) throw new Error(roleError.message);

    return { userId, email: data.email, role: data.role };
  });

export const removeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string }) => {
    const userId = String(input?.userId ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(userId)) throw new Error("Usuário inválido");
    return { userId };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    if (data.userId === context.userId) throw new Error("Você não pode remover o próprio acesso");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    return { ok: true };
  });
