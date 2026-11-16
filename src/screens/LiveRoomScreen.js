import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, GIFTS } from '../config';
import { CHAT_SEED } from '../data';
import { useApp } from '../store';
import LiveVideo from '../agora/LiveVideo';

export default function LiveRoomScreen({ route, navigation }) {
  const host = (route.params && route.params.host) || { name: 'Ruma', viewers: 12450, level: 6, color: '#f472b6' };
  const { coins, sendGift, following, toggleFollow, showToast } = useApp();
  const [chat, setChat] = useState(CHAT_SEED);
  const [msg, setMsg] = useState('');
  const [giftOpen, setGiftOpen] = useState(false);
  const [pk, setPk] = useState(false);
  const [beauty, setBeauty] = useState(50);
  const isFollowing = following.includes(host.id);

  const sendChat = () => {
    if (!msg.trim()) return;
    setChat([...chat, { id: String(Date.now()), user: 'You', text: msg, lang: 'EN' }]);
    setMsg('');
  };

  return (
    <View style={styles.bg}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.topBtn}>✕ Exit</Text>
        </TouchableOpacity>
        <Text style={styles.hostName}>{host.name} · Lv{host.level} · 👁 {host.viewers.toLocaleString()}</Text>
        <TouchableOpacity onPress={() => toggleFollow(host.id)}>
          <Text style={[styles.follow, isFollowing && styles.following]}>{isFollowing ? 'Following ✓' : '+ Follow'}</Text>
        </TouchableOpacity>
      </View>

      <LiveVideo channel={`mlive-room-${host.id || '1'}`} role="audience" style={styles.video} />

      {pk && (
        <View style={styles.pk}>
          <Text style={styles.pkTitle}>⚔️ PK Battle — 04:32 left</Text>
          <View style={styles.pkBar}><View style={[styles.pkFill, { width: '56%' }]} /><Text style={styles.pkScore}>12,450 vs 9,870</Text></View>
          <Text style={styles.pkNote}>Send gifts to push {host.name} ahead — winner gets the Crown bonus 👑</Text>
        </View>
      )}

      <FlatList
        data={chat}
        keyExtractor={(c) => c.id}
        style={styles.chat}
        renderItem={({ item }) => (
          <Text style={styles.chatLine}><Text style={styles.chatUser}>{item.user}: </Text>{item.text}</Text>
        )}
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setPk(!pk)}>
          <Text>⚔️ PK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => { setBeauty(beauty === 50 ? 80 : 50); showToast(`Beauty filter: Smooth ${beauty === 50 ? 80 : 50}%`); }}>
          <Text>✨ Beauty {beauty}%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => showToast('❤️ Liked!')}>
          <Text>❤️ Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.giftBtn]} onPress={() => setGiftOpen(!giftOpen)}>
          <Text style={styles.giftBtnText}>🎁 Gift · 🪙 {coins.toLocaleString()}</Text>
        </TouchableOpacity>
      </View>

      {giftOpen && (
        <View style={styles.giftSheet}>
          {GIFTS.map((g) => (
            <TouchableOpacity key={g.id} style={styles.gift} onPress={() => sendGift(g)}>
              <Text style={styles.giftEmoji}>{g.emoji}</Text>
              <Text style={styles.giftName}>{g.name}</Text>
              <Text style={styles.giftPrice}>{g.price} 🪙</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Say something… (auto-translated)" value={msg} onChangeText={setMsg} onSubmitEditing={sendChat} />
        <TouchableOpacity style={styles.send} onPress={sendChat}><Text style={styles.sendText}>Send</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionBtn: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 12 },
  bg: { backgroundColor: '#111827', flex: 1, paddingTop: 48 },
  chat: { flex: 1, paddingHorizontal: 14 },
  chatLine: { color: '#e5e7eb', fontSize: 14, marginTop: 6 },
  chatUser: { color: '#fbbf24', fontWeight: 'bold' },
  follow: { backgroundColor: COLORS.pink, borderRadius: 16, color: '#fff', fontWeight: 'bold', paddingHorizontal: 12, paddingVertical: 6 },
  following: { backgroundColor: '#374151' },
  gift: { alignItems: 'center', backgroundColor: '#1f2937', borderRadius: 10, padding: 8, width: '23%' },
  giftBtn: { backgroundColor: COLORS.pink },
  giftBtnText: { color: '#fff', fontWeight: 'bold' },
  giftEmoji: { fontSize: 26 },
  giftName: { color: '#fff', fontSize: 10, marginTop: 2, textAlign: 'center' },
  giftPrice: { color: '#fbbf24', fontSize: 10 },
  giftSheet: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 12 },
  hostName: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#fff', borderRadius: 20, flex: 1, paddingHorizontal: 14, paddingVertical: 10 },
  inputRow: { flexDirection: 'row', gap: 8, padding: 12 },
  pk: { backgroundColor: '#7c3aed', margin: 12, padding: 12, borderRadius: 12 },
  pkBar: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 8, height: 18, marginTop: 8, overflow: 'hidden' },
  pkFill: { backgroundColor: '#ec4899', height: 18 },
  pkNote: { color: '#e5e7eb', fontSize: 12, marginTop: 8 },
  pkScore: { color: '#fff', fontWeight: 'bold', marginTop: 4 },
  pkTitle: { color: '#fff', fontWeight: 'bold' },
  send: { backgroundColor: COLORS.purple, borderRadius: 20, justifyContent: 'center', paddingHorizontal: 16 },
  sendText: { color: '#fff', fontWeight: 'bold' },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14 },
  topBtn: { color: '#fff', fontWeight: 'bold' },
  video: { height: 260, margin: 12 },
});
