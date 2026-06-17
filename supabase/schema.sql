-- Librería Lighthouse — esquema de base de datos
-- Ejecuta este script completo en Supabase: Dashboard -> SQL Editor -> New query -> Run

create extension if not exists "pgcrypto";

-- Usuarios (clientes registrados + administrador)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Catálogo de libros
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  author text not null,
  category text not null,
  subcategory text,
  version text,
  description text,
  price numeric(10,2) not null default 0,
  original_price numeric(10,2),
  stock integer not null default 0,
  image text,
  rating numeric(2,1) default 4.5,
  reviews_count integer default 0,
  pages integer,
  language text default 'Español',
  isbn text,
  publisher text,
  featured boolean not null default false,
  bestseller boolean not null default false,
  new_arrival boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Combos / paquetes
create table if not exists public.combos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  price numeric(10,2) not null default 0,
  original_price numeric(10,2),
  image text,
  book_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seguridad a nivel de fila
alter table public.users enable row level security;
alter table public.books enable row level security;
alter table public.combos enable row level security;

-- El catálogo público se puede leer sin autenticación (la tienda lo necesita)
drop policy if exists "Public read books" on public.books;
create policy "Public read books" on public.books for select using (true);

drop policy if exists "Public read combos" on public.combos;
create policy "Public read combos" on public.combos for select using (true);

-- La tabla de usuarios NO es legible/escribible públicamente.
-- Todas las escrituras (books, combos, users) se hacen desde el servidor
-- de Next.js usando la service_role key, que ignora RLS.

-- Usuario administrador inicial
-- Email: admin@librerialighthouse.com
-- Password: Lighthouse2026!  (cámbiala después de tu primer login)
insert into public.users (email, password_hash, name, is_admin)
values (
  'admin@librerialighthouse.com',
  '$2b$10$WqL1EGIhp5be1.A4vHFogO3AqktAo7tIzfxz5epEPnOAdBNUrBL7e',
  'Administrador',
  true
)
on conflict (email) do nothing;
