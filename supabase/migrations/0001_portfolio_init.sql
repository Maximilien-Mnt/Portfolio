-- ORIGIN portfolio — tables are prefixed pf_ so they can live next to other projects in one Supabase project.
-- Writes go through Next.js server actions using the service role (after a Turnstile check).
-- Anon can only READ approved guestbook rows.

create table if not exists public.pf_guestbook (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text check (name is null or char_length(name) <= 40),
  message     text not null check (char_length(message) between 1 and 140),
  x           real not null check (x between 0 and 1),
  y           real not null check (y between 0 and 1),
  country     text check (country is null or char_length(country) = 2),
  approved    boolean not null default false   -- you approve rows in the Table Editor
);

create table if not exists public.pf_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 80),
  email       text not null check (char_length(email) between 3 and 200),
  message     text not null check (char_length(message) between 5 and 2000),
  handled     boolean not null default false
);

alter table public.pf_guestbook enable row level security;
alter table public.pf_messages  enable row level security;

drop policy if exists "pf_guestbook_read_approved" on public.pf_guestbook;
create policy "pf_guestbook_read_approved" on public.pf_guestbook
  for select to anon, authenticated using (approved = true);

-- pf_messages: NO policies on purpose -> only the service role (server) can read/write.
-- The private HQ (applications tracker) gets its own migration in prompt P17.

create index if not exists pf_guestbook_created_idx on public.pf_guestbook (created_at desc);
