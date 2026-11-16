import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../config';
import { BANNERS, PARTIES } from '../data';

const TABS = ['Nearby', 'Party', 'Follow'];

export default function PartyScreen({ navigation }) {
  const [tab, setTab] = useState('Party');
  const [banner, setBanner] = useState(0);

  // Banner carousel — auto-rotates every 4.2s, dots switch it manually.
  // Banner content is data-driven (src/data.js) so an admin can change it.
  useEffect(() => {
    const t = setInterval(() => setBanner((b) => (b + 1) % BANNERS.length), 4200);
    return () => clearInterval(t);
  }, []);

  // FlatList with 2 columns needs a flat list; render pairs via single-column list of rows instead.
  const rows = [];
  for (let i = 0; i < PARTIES.length; i += 2) rows.push(PARTIES.slice(i, i + 2));

  return (
    <LinearGradient colors={[COLORS.goldTop, COLORS.goldMid, COLORS.goldBottom]} style={styles.bg}>
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)}>
            <Text style={[styles.tab, tab === t && styles.tabActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.rank}>📊</Text>
      </View>
      <View style={styles.filters}>
        <View style={styles.pill}><Text>🌐 All ⌄</Text></View>
        <View style={styles.pill}><Text>📍 All ⌄</Text></View>
      </View>
      <FlatList
        data={rows}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={styles.list}
        renderItem={({ item: pair, index }) => (
          <View>
            <View style={styles.row}>
              {pair.map((p) => (
                <TouchableOpacity key={p.id} style={styles.card} onPress={() => navigation.navigate('PartyRoom', { party: p })}>
                  <LinearGradient colors={[p.color, '#7c3aed']} style={styles.photo}>
                    <Text style={styles.avatar}>{p.name[0]}</Text>
                    <View style={styles.memberChip}><Text style={styles.memberText}>👥 {p.members}</Text></View>
                  </LinearGradient>
                  <Text style={styles.name}>{p.name}</Text>
                  <Text style={styles.meta}>{p.flag} {p.country} · <Text style={styles.lv}>Lv{p.level}</Text> · {p.lang}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {index === 0 && (
              <TouchableOpacity style={styles.banner} onPress={() => setBanner((banner + 1) % BANNERS.length)}>
                <Text style={styles.bannerTitle}>{BANNERS[banner].title}</Text>
                <Text style={styles.bannerText}>{BANNERS[banner].text}</Text>
                <Text style={styles.dots}>{BANNERS.map((b, i) => (i === banner ? '● ' : '○ ')).join('')}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  avatar: { color: '#fff', fontSize: 56, fontWeight: 'bold' },
  banner: { backgroundColor: '#7c3aed', borderRadius: 14, marginVertical: 12, padding: 16 },
  bannerText: { color: '#fff', fontSize: 14, marginTop: 4 },
  bannerTitle: { color: '#fbbf24', fontSize: 18, fontWeight: 'bold' },
  bg: { flex: 1, paddingTop: 48 },
  card: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 12, padding: 8, width: '48%' },
  dots: { color: '#fff', marginTop: 8, textAlign: 'center' },
  filters: { flexDirection: 'row', paddingHorizontal: 16 },
  list: { padding: 16 },
  lv: { color: COLORS.purple, fontWeight: 'bold' },
  memberChip: { backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 3, position: 'absolute', right: 8, top: 8 },
  memberText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  meta: { color: COLORS.grey, fontSize: 12, marginTop: 2 },
  name: { fontSize: 15, fontWeight: 'bold', marginTop: 6 },
  photo: { alignItems: 'center', borderRadius: 10, height: 200, justifyContent: 'center' },
  pill: { backgroundColor: '#fff', borderRadius: 20, marginRight: 10, paddingHorizontal: 14, paddingVertical: 8 },
  rank: { fontSize: 20, marginLeft: 'auto' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  tab: { color: COLORS.grey, fontSize: 17, marginRight: 22 },
  tabActive: { color: COLORS.purple, fontWeight: 'bold' },
  tabs: { alignItems: 'center', flexDirection: 'row', paddingHorizontal: 16 },
});
