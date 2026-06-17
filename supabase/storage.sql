-- Almacenamiento de fotos de libros — Ejecuta en Supabase: Dashboard -> SQL Editor -> New query -> Run
-- Crea el bucket público "book-images" donde se guardan las fotos subidas desde el panel admin.

insert into storage.buckets (id, name, public)
values ('book-images', 'book-images', true)
on conflict (id) do update set public = true;

-- Lectura pública de las imágenes (necesario para que se vean en la tienda)
drop policy if exists "Public read book images" on storage.objects;
create policy "Public read book images" on storage.objects
  for select using (bucket_id = 'book-images');

-- Las subidas/ediciones/eliminaciones se hacen desde el servidor de Next.js
-- usando la service_role key, que ignora estas políticas de RLS.
