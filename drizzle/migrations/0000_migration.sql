DROP POLICY IF EXISTS "Admins upload files" ON storage.objects;
DROP POLICY IF EXISTS "Admins update files" ON storage.objects;
CREATE POLICY "Editors upload files" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'uploads' AND (public.has_role_name(auth.uid(),'admin') OR public.has_role_name(auth.uid(),'jornalista')));
CREATE POLICY "Editors update files" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'uploads' AND (public.has_role_name(auth.uid(),'admin') OR public.has_role_name(auth.uid(),'jornalista')));