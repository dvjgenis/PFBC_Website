-- Prayer wall (public sticky notes). Run once in Supabase → SQL Editor.

create table if not exists public.prayer_stickers (
  id uuid primary key default gen_random_uuid(),
  topic_id text not null check (char_length(topic_id) between 1 and 32),
  label text not null check (char_length(label) between 1 and 50),
  tone text not null check (char_length(tone) between 1 and 16),
  x double precision not null check (x >= 0 and x <= 100),
  y double precision not null check (y >= 0 and y <= 100),
  rotate double precision not null check (rotate >= -180 and rotate <= 180),
  created_at timestamptz not null default now()
);

create index if not exists prayer_stickers_created_at_idx
  on public.prayer_stickers (created_at desc);

alter table public.prayer_stickers enable row level security;

-- Anyone can read notes (app filters to last 24h).
create policy "prayer_stickers_select_anon"
  on public.prayer_stickers
  for select
  to anon, authenticated
  using (true);

-- Anyone can post a note (matches public prayer wall UX).
create policy "prayer_stickers_insert_anon"
  on public.prayer_stickers
  for insert
  to anon, authenticated
  with check (true);

-- Double-click remove on the site.
create policy "prayer_stickers_delete_anon"
  on public.prayer_stickers
  for delete
  to anon, authenticated
  using (true);

-- Live updates across browsers (Database → Replication if this fails).
alter publication supabase_realtime add table public.prayer_stickers;
