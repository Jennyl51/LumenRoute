-- Run once in Supabase SQL editor. All rows are demo/historical unless explicitly updated.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Do not store caller names, exact residential addresses, or other identifying details here.
create table if not exists public.incidents (
  id bigint generated always as identity primary key,
  external_id text unique,
  reported_at timestamptz not null,
  category text not null,
  severity smallint check (severity between 1 and 5),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  source text not null default 'historical_berkeley_calls',
  created_at timestamptz not null default now()
);
create index if not exists incidents_reported_at_idx on public.incidents(reported_at desc);
create index if not exists incidents_lat_lon_idx on public.incidents(latitude, longitude);
alter table public.incidents enable row level security;
-- Public read is only appropriate for a vetted, non-identifying historical demo dataset.
create policy "incidents_public_read" on public.incidents
  for select to anon, authenticated using (true);
-- No public INSERT/UPDATE/DELETE policies. Use controlled admin import scripts.
