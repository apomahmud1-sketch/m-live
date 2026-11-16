-- ─────────────────────────────────────────────────────────────────
-- M Live — Supabase schema (FREE tier)
-- Run ONCE in Supabase Dashboard → SQL Editor → New query → paste → Run.
-- No real data is in this file. Tables match the app:
--   gifts: Rose 10 … Castle 9,999 coins; 1 gift coin = 1 diamond
--   withdraw methods: bKash / Nagad / Bank / USDT
--   host_status: viewer / pending / approved (only approved hosts go live)
--   chat price: 1,260/min (profile default, per the prototype)
-- ─────────────────────────────────────────────────────────────────

-- Profiles: one row per user (id = Supabase Auth user id).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'M Live User',
  avatar_url text,
  country text,
  language text default 'English',
  level integer not null default 1,
  coins integer not null default 0 check (coins >= 0),
  diamonds integer not null default 0 check (diamonds >= 0),
  earnings integer not null default 0 check (earnings >= 0),
  chat_price_per_min integer not null default 1260,
  host_status text not null default 'viewer'
    check (host_status in ('viewer', 'pending', 'approved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Host applications: viewer applies → admin approves → host_status = 'approved'.
create table if not exists public.host_applications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  stage_name text not null,
  language text not null default 'English',
  talent_category text,
  about text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Live rooms: one row per live session (audio or multi-guest).
create table if not exists public.live_rooms (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.profiles (id) on delete cascade,
  title varchar(15) not null default 'Live',
  cover_url text,
  mode text not null default 'audio'
    check (mode in ('audio', 'multi')),
  seats integer not null default 4 check (seats in (4, 6, 9)),
  agora_channel text,
  status text not null default 'live'
    check (status in ('live', 'ended')),
  viewer_count integer not null default 0 check (viewer_count >= 0),
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

-- Gifts catalogue: prices in coins; host receives the same number of diamonds.
create table if not exists public.gifts (
  id text primary key,
  name text not null,
  emoji text not null,
  price_coins integer not null check (price_coins > 0),
  diamonds integer not null check (diamonds > 0)
);

insert into public.gifts (id, name, emoji, price_coins, diamonds) values
  ('rose',   'Rose',         '🌹',   10,   10),
  ('heart',  'Heart',        '❤️',   20,   20),
  ('teddy',  'Teddy',        '🧸',   99,   99),
  ('crown',  'Crown',        '👑',  499,  499),
  ('ring',   'Diamond Ring', '💍',  999,  999),
  ('car',    'Sports Car',   '🏎️', 2999, 2999),
  ('rocket', 'Rocket',       '🚀',  4999, 4999),
  ('castle', 'Castle',       '🏰',  9999, 9999)
on conflict (id) do nothing;

-- Wallet transactions: every coin/diamond movement, one row each.
-- type: recharge | gift_sent | gift_received | withdraw
-- status: pending | completed | failed
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  type text not null
    check (type in ('recharge', 'gift_sent', 'gift_received', 'withdraw')),
  amount_coins integer not null default 0,
  amount_diamonds integer not null default 0,
  gift_id text references public.gifts (id),
  room_id uuid references public.live_rooms (id) on delete set null,
  method text,
  status text not null default 'completed'
    check (status in ('pending', 'completed', 'failed')),
  created_at timestamptz not null default now()
);

-- Withdrawals: host cashes out diamonds. Real money is paid by an admin
-- AFTER manual approval — this table only records the request.
-- method: bKash | Nagad | Bank | USDT
create table if not exists public.withdrawals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  amount_diamonds integer not null check (amount_diamonds > 0),
  method text not null
    check (method in ('bKash', 'Nagad', 'Bank', 'USDT')),
  account_details text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'paid')),
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

-- Helpful indexes
create index if not exists idx_live_rooms_status on public.live_rooms (status, started_at desc);
create index if not exists idx_transactions_user on public.transactions (user_id, created_at desc);
create index if not exists idx_withdrawals_user on public.withdrawals (user_id, created_at desc);
create index if not exists idx_host_apps_status on public.host_applications (status, created_at desc);

-- ── Row Level Security: turn it on, then allow the safe minimum ──
alter table public.profiles enable row level security;
alter table public.host_applications enable row level security;
alter table public.live_rooms enable row level security;
alter table public.gifts enable row level security;
alter table public.transactions enable row level security;
alter table public.withdrawals enable row level security;

-- Everyone signed in can read profiles, live rooms and the gift catalogue.
create policy "Anyone can read profiles"
  on public.profiles for select using (true);
create policy "Anyone can read live rooms"
  on public.live_rooms for select using (true);
create policy "Anyone can read gifts"
  on public.gifts for select using (true);

-- Users can only read / write their OWN rows for the rest.
create policy "Users manage their own profile"
  on public.profiles for all using (auth.uid() = id);
create policy "Users manage their own host applications"
  on public.host_applications for all using (auth.uid() = profile_id);
create policy "Hosts manage their own live rooms"
  on public.live_rooms for all using (auth.uid() = host_id);
create policy "Users read their own transactions"
  on public.transactions for select using (auth.uid() = user_id);
create policy "Users manage their own withdrawals"
  on public.withdrawals for all using (auth.uid() = user_id);
