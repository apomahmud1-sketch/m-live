// ─────────────────────────────────────────────────────────────────
// M Live — Supabase client (FREE tier scaffold).
//
// ⚠️ PLACEHOLDERS ONLY: no real Supabase URL / key is in this file.
//   1. Create a FREE project at https://supabase.com/dashboard
//   2. Copy .env.example to .env and paste your real values there:
//        EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
//        EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
//   3. In the Supabase SQL Editor, run supabase/schema.sql once.
// Until then the app keeps using demo data (src/data.js + src/store.js)
// and `supabase` below is null — nothing breaks, nothing is sent anywhere.
// ─────────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY
);

// null until the user adds real keys — screens must check
// isSupabaseConfigured before calling supabase.
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

if (!isSupabaseConfigured && typeof __DEV__ !== 'undefined' && __DEV__) {
  // eslint-disable-next-line no-console
  console.log(
    '[M Live] Supabase not configured — using demo data. ' +
      'Add EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY to .env to connect.'
  );
}
