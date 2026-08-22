import { createContext, useContext } from "react";

export type AdminRole = "admin" | "jornalista";

export type AdminAbility =
  | "banners"
  | "noticias"
  | "paginas"
  | "servicos"
  | "eventos"
  | "equipe"
  | "configuracoes"
  | "auditoria"
  | "ajuda"
  | "excluir";

const ABILITIES: Record<AdminRole, AdminAbility[]> = {
  admin: [
    "banners",
    "noticias",
    "paginas",
    "servicos",
    "eventos",
    "equipe",
    "configuracoes",
    "auditoria",
    "ajuda",
    "excluir",
  ],
  jornalista: ["noticias", "ajuda"],
};

const AdminRoleContext = createContext<AdminRole | null>(null);

export const AdminRoleProvider = AdminRoleContext.Provider;

export function useAdminRole(): AdminRole | null {
  return useContext(AdminRoleContext);
}

export function roleCan(role: AdminRole | null, ability: AdminAbility): boolean {
  if (!role) return false;
  return ABILITIES[role].includes(ability);
}

/** Permissão usada nos componentes das abas do painel. */
export function useCan(ability: AdminAbility): boolean {
  return roleCan(useAdminRole(), ability);
}

/** Caminhos liberados por perfil (usado pelo layout do painel). */
export function pathAllowed(role: AdminRole | null, pathname: string): boolean {
  if (!role) return false;
  if (role === "admin") return true;
  const p = pathname.replace(/\/$/, "");
  if (p === "/admin") return true;
  const section = p.split("/")[2] ?? "";
  return roleCan(role, section as AdminAbility);
}
