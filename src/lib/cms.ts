import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Settings = Tables<"settings">;

export type NavLink = { label: string; to: string };

/** Converte o JSON salvo no banco em uma lista de links válida. */
export function parseLinks(value: unknown, fallback: NavLink[] = []): NavLink[] {
  const raw = typeof value === "string" ? safeJson(value) : value;
  if (!Array.isArray(raw)) return fallback;
  const list = raw
    .filter((i): i is Record<string, unknown> => !!i && typeof i === "object")
    .map((i) => ({ label: String(i["label"] ?? ""), to: String(i["to"] ?? i["url"] ?? "") }))
    .filter((i) => i.label && i.to);
  return list.length ? list : fallback;
}

function safeJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
export type Banner = Tables<"banners">;
export type Noticia = Tables<"noticias">;

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

/** Faz upload de um arquivo para o bucket `uploads` e devolve a URL de leitura. */
export async function uploadImage(file: File, folder = "geral"): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("uploads").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage
    .from("uploads")
    .createSignedUrl(path, TEN_YEARS);
  if (signError || !data?.signedUrl) throw signError ?? new Error("Falha ao gerar URL da imagem");

  return data.signedUrl;
}

export async function fetchSettings(): Promise<Settings | null> {
  const { data } = await supabase
    .from("settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

export async function fetchBanners(onlyActive = true): Promise<Banner[]> {
  let q = supabase.from("banners").select("*").order("ordem", { ascending: true });
  if (onlyActive) q = q.eq("ativo", true);
  const { data } = await q;
  return data ?? [];
}

export async function fetchNoticias(onlyPublished = true): Promise<Noticia[]> {
  let q = supabase
    .from("noticias")
    .select("*")
    .order("data_publicacao", { ascending: false });
  if (onlyPublished) q = q.eq("publicado", true);
  const { data } = await q;
  return data ?? [];
}

export async function fetchNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const { data } = await supabase.from("noticias").select("*").eq("slug", slug).maybeSingle();
  return data ?? null;
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export type Servico = Tables<"servicos">;
export type Evento = Tables<"eventos">;

export async function fetchServicos(onlyActive = true): Promise<Servico[]> {
  let q = supabase.from("servicos").select("*").order("ordem", { ascending: true });
  if (onlyActive) q = q.eq("ativo", true);
  const { data } = await q;
  return data ?? [];
}

export async function fetchServicoBySlug(slug: string): Promise<Servico | null> {
  const { data } = await supabase.from("servicos").select("*").eq("slug", slug).maybeSingle();
  return data ?? null;
}

export async function fetchEventos(onlyActive = true): Promise<Evento[]> {
  let q = supabase.from("eventos").select("*").order("data_evento", { ascending: true });
  if (onlyActive) q = q.eq("ativo", true);
  const { data } = await q;
  return data ?? [];
}

export async function fetchEventoBySlug(slug: string): Promise<Evento | null> {
  const { data } = await supabase.from("eventos").select("*").eq("slug", slug).maybeSingle();
  return data ?? null;
}

export type AuditEntry = Tables<"audit_log">;

/** Histórico de alterações feitas pelo painel (somente administradores conseguem ler). */
export async function fetchAuditLog(limit = 200): Promise<AuditEntry[]> {
  const { data, error } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
