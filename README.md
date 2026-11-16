# M Live — APK-Ready Expo Project

> **এই প্রজেক্টে কোনো APK ফাইল নেই — এটা APK বানানোর সম্পূর্ণ সোর্স কোড।**
> This project has NO APK file inside — it is the complete source code to build the APK.
> No payment was needed for this code. Only Google Play charges $25 later, one time.

M Live — video live app like Chamet. Only approved hosts go live. Gift, coin, diamond, wallet and withdraw are included.

---

## ✅ APK বানানোর আগে যা বাকি ছিল — চেকলিস্ট / Remaining before APK

**DONE — ইতিমধ্যে করা আছে ✅**
- ✅ পুরো অ্যাপের কোড + ১০টা স্ক্রিন (Login, Home, Party, Live Room, Go Live, Wallet, Profile, Messages)
- ✅ Agora জায়গা রেডি (App ID-র জায়গা খালি রাখা — কোনো ভুয়া ID নেই)
- ✅ Supabase ব্যাকএন্ড স্ক্যাফোল্ড — `src/supabase/client.js` + `supabase/schema.sql` (profiles, hosts, live_rooms, gifts, transactions, withdrawals)
- ✅ Play Store লিস্টিং ডক — `PLAY_STORE_LISTING.md` (বর্ণনা, কীওয়ার্ড, 18+ নোট)
- ✅ Privacy Policy + Terms — `PRIVACY_POLICY.md`, `TERMS.md` (টেমপ্লেট — আসল ইমেইল বসাতে হবে)
- ✅ আপলোড-রেডি zip — `m-live-apk-project.zip` (169 KB, `node_modules/` ছাড়া)

**STILL NEEDS THE USER — তোমাকে করতে হবে ⏳**
- ⏳ **ফ্রি Agora App ID** — console.agora.io থেকে নিয়ে `app.json`-এ বসানো (না হলে আসল লাইভ ভিডিও চলবে না)
- ⏳ **ফ্রি Supabase প্রজেক্ট** — supabase.com-এ ফ্রি প্রজেক্ট খুলে URL + anon key `.env`-এ বসানো, আর `supabase/schema.sql` একবার চালানো (না করলে অ্যাপ ডেমো ডেটাতেই চলবে)
- ⏳ **ফ্রি Expo অ্যাকাউন্ট** — EAS-এ লগইন করার জন্য (`eas login`), নইলে APK বিল্ড হবে না
- ⏳ **$25 Play Store ফি** — শুধু পাবলিশ করার সময়, এখন না
- ⏳ **আসল পেমেন্ট গেটওয়ে** — Recharge / Withdraw-এ আসল টাকা চালু করতে পরে লাগবে (এখন ডেমো)
- ⏳ **Privacy Policy লিংক** — `PRIVACY_POLICY.md` নিজের ওয়েবসাইটে আপলোড করে লিংক Play Console-এ দেওয়া

**English:** Code, screens, Agora placeholder, Supabase scaffold, listing docs and the clean zip are DONE. Still blocked on the user: free Agora App ID, free Supabase project + keys, free Expo account for EAS login, $25 Play fee later, real payment gateway later.

---

## 🇧🇩 বাংলায় — সহজ ধাপ (Bengali — simple steps)

### ১) এই প্রজেক্টটা কী?
এটা M Live অ্যাপের আসল কোড (React Native + Expo)। ভেতরে আছে:
- **Login** — ভিডিও ব্যাকগ্রাউন্ড, M Live টাইটেল, Start / Google / Phone / Gmail, 18+ Agree
- **Home / Discover** — হালকা গোল্ডেন ব্যাকগ্রাউন্ড, Nearby / Discover / Friends, All ফিল্টার, একই সাইজের 2-কলাম হোস্ট কার্ড
- **Live Room** — লাইভ ভিডিও, চ্যাট, PK Battle, Beauty ফিল্টার, গিফট (Rose 10 → Castle 9,999 কয়েন)
- **Party** — Nearby / Party / Follow, ব্যানার ক্যারোসেল, মেম্বার সংখ্যা, Party Room (৫ সিট)
- **Go Live (+ বাটন)** — বেগুনি স্ক্রিন, Live title 0/15, change cover, Start live, Audio Live / Multi-guest Live (Beauty, Switch camera, 4 / 6 / 9 seats)
- **Wallet** — Coins, Diamonds, Earnings, Recharge, Withdraw (bKash / Nagad / Bank / USDT)
- **Profile** — Mr.lee স্টাইল, ID 9065858 (কপি বাটন), My Wallet / My Income, My level, VIP / Badge / Family / Mall, My chat price 1260/min
- **Messages** — চ্যাট লিস্ট (Wallet-এর বদলে Message আইকন)

**নিয়ম:** শুধু Approved Host-ই লাইভে যেতে পারে। Viewer "+" চাপলে **Apply to Become a Host** খুলবে। প্রোটোটাইপে ডিফল্ট Approved Host রাখা আছে, যাতে তুমি Go Live টেস্ট করতে পারো — Profile থেকে "Switch to Viewer" দিয়ে Apply ফ্লো টেস্ট করা যায়।

### ২) ফ্রি Agora App ID নেওয়া (আসল লাইভ ভিডিওর জন্য — MUST)
আসল ভিডিও ছাড়া অ্যাপ শুধু ডিজাইন থাকবে। Agora ফ্রিতে 10,000 মিনিট/মাস দেয়।
1. যাও: **https://console.agora.io/** — ফ্রি অ্যাকাউন্ট খোলো (ইমেইল দিয়ে)।
2. **Create a project** → নাম দাও `M Live` → Use case: **Interactive Live Streaming**।
3. **App ID** কপি করো (এটা পাবলিক ID, পাসওয়ার্ড না — তবুও স্ক্রিনশটে শেয়ার করো না)।
4. এই প্রজেক্টে `app.json` খোলো → `extra` → `AGORA_APP_ID` — সেখানে `YOUR_AGORA_APP_ID_HERE`-এর জায়গায় তোমার App ID বসাও।
   - অথবা `.env.example` কপি করে `.env` বানাও, সেখানে `AGORA_APP_ID=তোমার-ID` লেখো।
5. App ID না বসালে অ্যাপ চলবে, কিন্তু Live Room-এ লেখা দেখাবে: **"Add your free Agora App ID to go live"** — এটা ইচ্ছা করে রাখা, ভুয়া ভিডিও দেখানো হয় না।
6. **Token:** প্রথমে Agora Console-এ App Certificate **OFF** রাখো (Test Mode), তাহলে শুধু App ID-ই যথেষ্ট। পরে সিকিউরিটির জন্য Token চালু করবে।

### ৩) ফোনে ফ্রিতে টেস্ট করা (Expo Go)
```bash
npm install
npx expo start
```
ফোনে **Expo Go** অ্যাপ ইনস্টল করে QR কোড স্ক্যান করো। অ্যাপ খুলবে।
⚠️ **Expo Go-তে আসল Agora ভিডিও চলবে না** — Agora নেটিভ কোড, Expo Go-তে সেটা লোড হয় না। আসল ভিডিও টেস্ট করতে নিচের APK / dev build লাগবে।

### ৪) APK বানানো — ফ্রি (EAS)
```bash
npm install -g eas-cli
eas login
eas build --configure        # প্রথমবার একবার
eas build -p android --profile preview      # ← APK (ফোনে সরাসরি ইনস্টল করা যায়)
eas build -p android --profile production   # ← AAB (Play Store-এ আপলোডের জন্য)
```
- `preview` প্রোফাইল = **APK**, `production` প্রোফাইল = **AAB** — দুটোই `eas.json`-এ আগে থেকে লেখা আছে।
- EAS ফ্রি টিয়ারে মাসে সীমিত বিল্ড দেয় — প্রথম বিল্ড ফ্রিতে হবে।
- বিল্ড শেষ হলে EAS একটা ডাউনলোড লিংক / QR দেবে — ফোনে সেটা দিয়ে APK ইনস্টল করো।
- `app.json`-এ `eas.projectId` এখন `00000000-...` (placeholder) — `eas build --configure` চালালে আসল ID বসে যাবে।

### ৫) Fastshot দিয়ে বানানো
Fastshot-এ এই পুরো `m-live-apk-project` ফোল্ডারটা **zip করে আপলোড** করো, অথবা Fastshot-এ `Video_Live_App_Prompt.txt` পেস্ট করে এই কোডটা রেফারেন্স হিসেবে দাও। Fastshot নিজের সার্ভারে APK/AAB বানিয়ে দেবে।

### ৬) খরচ — কী ফ্রি, কী নয়
| জিনিস | খরচ |
|---|---|
| এই কোড | **ফ্রি** |
| Agora (10,000 মিনিট/মাস) | **ফ্রি** |
| Expo Go টেস্ট | **ফ্রি** |
| EAS APK বিল্ড (ফ্রি টিয়ার) | **ফ্রি** |
| Google Play Developer অ্যাকাউন্ট | **$25 একবার** (শুধু পাবলিশ করার সময়) |
| UK Ltd কোম্পানি (Business অ্যাকাউন্টের জন্য) | £199.99 — এখন টাকা না থাকলে পরে করবে, আগে Personal অ্যাকাউন্ট ($25) দিয়ে পাবলিশ করো |

### ৭) এখনো যা বাকি (সত্যি কথা)
- আসল টাকা (Recharge / Withdraw) এখনো ডেমো — আসল পেমেন্ট গেটওয়ে আর অ্যাডমিন অ্যাপ্রুভাল লাগবে।
- ব্যাকএন্ড স্ক্যাফোল্ড রেডি আছে, কিন্তু এখনো জোড়া হয়নি — `src/supabase/client.js` + `supabase/schema.sql` বানানো আছে; তুমি ফ্রি Supabase প্রজেক্ট খুলে URL + anon key `.env`-এ বসালে আর SQL একবার চালালে তবেই লগইন, হোস্ট, কয়েন আসল ডেটা হবে। তার আগ পর্যন্ত লগইন, হোস্ট, চ্যাট, কয়েন সব ডেমো ডেটা (`src/data.js` + `src/store.js`)।
- আসল ভিডিওর জন্য উপরের ধাপ ২-এর Agora App ID লাগবেই।

---

## 🇬🇧 English — quick start

```bash
npm install
npx expo start          # test free in Expo Go (QR code)
eas build -p android --profile preview      # APK — install directly on Android
eas build -p android --profile production   # AAB — upload to Google Play
```

**Agora (free, required for real video):** sign up at https://console.agora.io/ → Create a project (Interactive Live Streaming) → copy the App ID → paste it into `app.json` → `extra.AGORA_APP_ID` (or into a `.env` file, see `.env.example`). Keep App Certificate OFF / Test Mode first, so no token is needed. Without a real App ID the Live Room shows "Add your free Agora App ID to go live" — no fake video is shown.

**Fastshot:** zip this folder and upload it, or paste `Video_Live_App_Prompt.txt` and use this code as reference.

## Project structure

```
m-live-apk-project/
├── App.js                  # Navigation: Login → Tabs (Home/Party/+/Messages/Profile)
├── app.json                # name M Live, package com.mlive.app, AGORA_APP_ID placeholder
├── eas.json                # preview = APK, production = AAB
├── package.json            # Expo SDK 52, React Navigation, react-native-agora, @supabase/supabase-js
├── babel.config.js / metro.config.js
├── .env.example            # AGORA_APP_ID + EXPO_PUBLIC_SUPABASE_URL / ANON_KEY placeholders (no real secrets)
├── m-live-apk-project.zip  # clean upload-ready zip (167 KB, no node_modules)
├── PLAY_STORE_LISTING.md   # Play Store short + full description, keywords, 18+ notes
├── PRIVACY_POLICY.md       # privacy template — put your real support email in it
├── TERMS.md                # terms template — coins/gifts/withdraw rules
├── supabase/
│   └── schema.sql          # profiles, host_applications, live_rooms, gifts, transactions, withdrawals
├── assets/                 # icon.png, splash.png, login-poster.jpg (placeholders)
└── src/
    ├── config.js           # ★ AGORA_APP_ID in ONE place, gifts, recharge, withdraw methods
    ├── data.js             # demo hosts, parties, banners, messages
    ├── store.js            # coins/diamonds/hostStatus state (Supabase replaces this)
    ├── agora/LiveVideo.js  # real Agora loader + placeholder message when no App ID
    ├── supabase/client.js  # Supabase client — null until real keys are in .env
    └── screens/
        ├── LoginScreen.js  HomeScreen.js  LiveRoomScreen.js
        ├── PartyScreen.js  PartyRoomScreen.js  GoLiveScreen.js
        ├── HostApplyScreen.js  WalletScreen.js
        ├── ProfileScreen.js  MessagesScreen.js
```

## What was verified / not verified (honest)

- ✅ Re-checked 15 Nov 2026: `expo config` (run directly via the installed CLI — plain `npx expo` fails in this sandbox because `npm install --no-bin-links` left no `node_modules/.bin/`, a sandbox quirk, not a project error) validates with **zero errors**: SDK 52.0.0, name M Live, Android package `com.mlive.app`, version 1.0.0. **No config errors found, nothing needed fixing.**
- ✅ Re-checked 15 Nov 2026: all **16/16 JS files parse OK** (Babel `babel-preset-expo`), including the new `src/supabase/client.js`.
- ✅ `@supabase/supabase-js` **2.119.0 installed** and verified; Expo still SDK 52.0.49 after install.
- ✅ Supabase schema has all **6 tables** (profiles, host_applications, live_rooms, gifts, transactions, withdrawals) with gift seed rows Rose 10 … Castle 9,999 and withdraw methods bKash/Nagad/Bank/USDT. SQL was written carefully but **not executed against a real Supabase project** (no project/keys exist) — run it once in the SQL Editor after creating the free project.
- ✅ Clean zip verified: `m-live-apk-project.zip` — **167 KB, 40 files**, contains no `node_modules/`, no `.git/`, no `.env`, no real secrets (only placeholders).
- ✅ `npm install` completed in this workspace: 889 packages installed (Expo 52.0.49, React Native 0.76.9, react-native-agora 4.6.4, React Navigation 6.1.18). Note: the first plain `npm install` failed in this sandbox with an `EPERM chown` error on a bin file; the retry with `npm install --ignore-scripts --no-bin-links` succeeded. On a normal computer / on EAS, plain `npm install` works — this was a sandbox permission quirk, not a project error.
- ✅ `expo config` validates: SDK 52.0.0, name M Live, Android package `com.mlive.app`, version 1.0.0.
- ✅ All 16 JS source files parse OK (checked with Babel `babel-preset-expo`).
- ✅ No real Agora App ID anywhere — only the placeholder `YOUR_AGORA_APP_ID_HERE` in `app.json`, `src/config.js` and `.env.example`. No secrets in the project.
- ⚠️ **When zipping / uploading: exclude `node_modules/` (326 MB)** — the builder reinstalls it. The project without `node_modules` is only ~608 KB. The ready-made zip `m-live-apk-project.zip` (167 KB) already excludes it.
- ❌ **The APK was NOT built here** — this machine has no Android SDK / Java, and EAS needs your `eas login`. Build it with step 4 above.
- ❌ Agora video was NOT tested with a real App ID (none was provided, and none was invented).
- ❌ Supabase was NOT connected to a real project (no URL/key provided, none invented) — the app still runs on demo data until you add keys.
- ❌ No EAS build / Play Store upload was done.
