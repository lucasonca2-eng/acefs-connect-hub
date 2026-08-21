REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY "Active banners are public" ON public.banners;
CREATE POLICY "Anon reads active banners" ON public.banners FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Users read banners" ON public.banners FOR SELECT TO authenticated
USING (ativo = true OR public.has_role(auth.uid(),'admin'));

DROP POLICY "Published news are public" ON public.noticias;
CREATE POLICY "Anon reads published news" ON public.noticias FOR SELECT TO anon USING (publicado = true);
CREATE POLICY "Users read news" ON public.noticias FOR SELECT TO authenticated
USING (publicado = true OR public.has_role(auth.uid(),'admin'));

DROP POLICY "Settings are public" ON public.settings;
CREATE POLICY "Anon reads settings" ON public.settings FOR SELECT TO anon USING (true);
CREATE POLICY "Users read settings" ON public.settings FOR SELECT TO authenticated USING (true);

DROP POLICY "Public read uploads" ON storage.objects;
CREATE POLICY "Public read uploads" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'uploads');