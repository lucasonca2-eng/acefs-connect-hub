INSERT INTO public.user_roles (user_id, role)
VALUES ('43b8f455-fac0-4fdd-8630-52038a6bd4ef', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;