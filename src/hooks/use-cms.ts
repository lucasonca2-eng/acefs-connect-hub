import { useQuery } from "@tanstack/react-query";
import { fetchBanners, fetchNoticias, fetchSettings } from "@/lib/cms";

export function useSettings() {
  return useQuery({ queryKey: ["settings"], queryFn: fetchSettings, staleTime: 60_000 });
}

export function useBanners(onlyActive = true) {
  return useQuery({
    queryKey: ["banners", onlyActive],
    queryFn: () => fetchBanners(onlyActive),
    staleTime: 60_000,
  });
}

export function useNoticias(onlyPublished = true) {
  return useQuery({
    queryKey: ["noticias", onlyPublished],
    queryFn: () => fetchNoticias(onlyPublished),
    staleTime: 60_000,
  });
}
