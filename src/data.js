// Demo data only. Replace with Supabase data later — the screens read
// everything from here, so swapping the backend is one file change.
export const HOSTS = [
  { id: '1', name: 'Ruma', country: 'BGD', flag: '🇧🇩', lang: 'Bengali', level: 6, viewers: 12450, color: '#f472b6', status: 'Live now — singing 🎤' },
  { id: '2', name: 'Nusrat', country: 'IND', flag: '🇮🇳', lang: 'English', level: 5, viewers: 9870, color: '#a78bfa', status: 'Chatting with fans 💬' },
  { id: '3', name: 'Arif', country: 'BGD', flag: '🇧🇩', lang: 'Bengali', level: 4, viewers: 8210, color: '#60a5fa', status: 'PK battle tonight ⚔️' },
  { id: '4', name: 'Sadia', country: 'PAK', flag: '🇵🇰', lang: 'English', level: 7, viewers: 15400, color: '#fbbf24', status: 'Dance party 💃' },
  { id: '5', name: 'Rakib', country: 'BGD', flag: '🇧🇩', lang: 'Bengali', level: 3, viewers: 4320, color: '#34d399', status: 'New host — say hi 👋' },
  { id: '6', name: 'Priya', country: 'IND', flag: '🇮🇳', lang: 'English', level: 5, viewers: 7630, color: '#fb7185', status: 'Q&A live ❓' },
];

export const PARTIES = [
  { id: 'p1', name: 'Dhaka Night Party', country: 'BGD', flag: '🇧🇩', lang: 'Bengali', level: 6, members: 13, color: '#f472b6' },
  { id: 'p2', name: 'English Chat Room', country: 'IND', flag: '🇮🇳', lang: 'English', level: 7, members: 6, color: '#a78bfa' },
  { id: 'p3', name: 'Sing Together 🎤', country: 'BGD', flag: '🇧🇩', lang: 'Bengali', level: 8, members: 8, color: '#60a5fa' },
  { id: 'p4', name: 'Fun Games Night', country: 'PAK', flag: '🇵🇰', lang: 'English', level: 5, members: 21, color: '#fbbf24' },
];

export const BANNERS = [
  { id: 'b1', title: 'Charm Queen 👑', text: '1,000,000,000 🪙 every month!' },
  { id: 'b2', title: 'New Host Bonus 🎁', text: 'Go live this week and earn double diamonds!' },
  { id: 'b3', title: 'PK Championship ⚔️', text: 'Win the Crown bonus — starts Friday!' },
];

export const MESSAGES = [
  { id: 'm1', name: 'Ruma', text: 'Thanks for the Crown! 👑', time: '10:24', color: '#f472b6' },
  { id: 'm2', name: 'Nusrat', text: 'Are you joining my live tonight?', time: '09:51', color: '#a78bfa' },
  { id: 'm3', name: 'Arif', text: 'PK battle at 8pm, be there!', time: 'Yesterday', color: '#60a5fa' },
  { id: 'm4', name: 'Sadia', text: 'You are my top fan this week 💛', time: 'Yesterday', color: '#fbbf24' },
];

export const CHAT_SEED = [
  { id: 'c1', user: 'Arif', text: 'Hello everyone! 👋', lang: 'EN' },
  { id: 'c2', user: 'Sadia', text: 'Your voice is so nice 🎤', lang: 'EN' },
  { id: 'c3', user: 'Rakib', text: 'আমি বাংলাদেশ থেকে দেখছি 🇧🇩', lang: 'BN' },
];
