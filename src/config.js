// ─────────────────────────────────────────────────────────────────
// M Live — single place for the Agora App ID.
// ⚠️ DO NOT put a real App ID in this file when sharing screenshots.
// Put your real (free) App ID in app.json > extra.AGORA_APP_ID
// or in a .env file (see .env.example). The placeholder below means
// "no real video yet" — the app shows a clear message instead.
// ─────────────────────────────────────────────────────────────────
import Constants from 'expo-constants';

export const AGORA_APP_ID =
  (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra.AGORA_APP_ID) ||
  process.env.EXPO_PUBLIC_AGORA_APP_ID ||
  'YOUR_AGORA_APP_ID_HERE';

export const AGORA_APP_ID_IS_PLACEHOLDER =
  !AGORA_APP_ID || AGORA_APP_ID === 'YOUR_AGORA_APP_ID_HERE';

// 1 gift coin = 1 diamond for the host (easy to change later).
export const COIN_TO_DIAMOND_RATE = 1;

export const COLORS = {
  goldTop: '#fff8e1',
  goldMid: '#fdf0c0',
  goldBottom: '#fbe9b4',
  purple: '#7c3aed',
  purpleDark: '#5b21b6',
  pink: '#ec4899',
  pinkLight: '#f472b6',
  teal: '#0b3d3a',
  gold: '#d4af37',
  white: '#ffffff',
  dark: '#111827',
  grey: '#6b7280',
  lightGrey: '#e5e7eb',
  lavender: '#f5f3ff',
};

export const GIFTS = [
  { id: 'rose', name: 'Rose', emoji: '🌹', price: 10 },
  { id: 'heart', name: 'Heart', emoji: '❤️', price: 20 },
  { id: 'teddy', name: 'Teddy', emoji: '🧸', price: 99 },
  { id: 'crown', name: 'Crown', emoji: '👑', price: 499 },
  { id: 'ring', name: 'Diamond Ring', emoji: '💍', price: 999 },
  { id: 'car', name: 'Sports Car', emoji: '🏎️', price: 2999 },
  { id: 'rocket', name: 'Rocket', emoji: '🚀', price: 4999 },
  { id: 'castle', name: 'Castle', emoji: '🏰', price: 9999 },
];

export const RECHARGE_PACKS = [
  { coins: 100, price: '$0.99' },
  { coins: 500, price: '$4.99' },
  { coins: 1000, price: '$9.99' },
  { coins: 5000, price: '$49.99' },
];

export const WITHDRAW_METHODS = ['bKash', 'Nagad', 'Bank', 'USDT'];
