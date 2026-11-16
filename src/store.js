import React, { createContext, useContext, useMemo, useState } from 'react';
import { COIN_TO_DIAMOND_RATE } from './config';

// Simple in-app state (demo). Supabase replaces this later;
// every screen uses this context, so the swap is in one place.
const AppCtx = createContext(null);

export function AppProvider({ children }) {
  // Prototype default: approved host, so "+" opens Go Live directly.
  // Real rule stays the same: only approved hosts can go live.
  const [hostStatus, setHostStatus] = useState('approved'); // 'viewer' | 'pending' | 'approved'
  const [coins, setCoins] = useState(12450);
  const [diamonds, setDiamonds] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [following, setFollowing] = useState(['2']);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const sendGift = (gift) => {
    if (coins < gift.price) {
      showToast('Not enough coins — please recharge first.');
      return false;
    }
    setCoins((c) => c - gift.price);
    setDiamonds((d) => d + gift.price * COIN_TO_DIAMOND_RATE);
    setEarnings((e) => e + gift.price * COIN_TO_DIAMOND_RATE);
    showToast(`Sent ${gift.emoji} ${gift.name} (-${gift.price} coins)`);
    return true;
  };

  const recharge = (pack) => {
    setCoins((c) => c + pack.coins);
    showToast(`Recharged ${pack.coins} coins (demo — no real payment yet)`);
  };

  const toggleFollow = (hostId) => {
    setFollowing((f) => (f.includes(hostId) ? f.filter((x) => x !== hostId) : [...f, hostId]));
  };

  const value = useMemo(
    () => ({ hostStatus, setHostStatus, coins, diamonds, earnings, following, toggleFollow, sendGift, recharge, toast, showToast }),
    [hostStatus, coins, diamonds, earnings, following, toast]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
