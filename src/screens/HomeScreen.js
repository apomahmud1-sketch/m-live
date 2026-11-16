import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../config';
import { HOSTS } from '../data';
import { useApp } from '../store';

const TABS = ['Nearby', 'Discover', 'Friends'];

export default function HomeScreen({ navigation }) {
  const [tab, setTab] = useState('Discover');
  const [lang, setLang] = useState('All');
  const [loc, setLoc] = useState('All');
  const { coins } = useApp();

  const hosts = HOSTS.filter(
    (h) => (lang === 'All' || h.lang === lang) && (loc === 'All' || h.country === loc)
  );

  const renderHost = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LiveRoom', { host: item })}>
      <LinearGradient colors={[item.color, '#7c3aed']} style={styles.photo}>
        <Text style={styles.avatar}>{item.name[0]}</Text>
        <View style={styles.liveBadge}><Text style={styles.liveText}>● LIVE</Text></View>
        <View style={styles.chips}>
          <Text style={styles.chip}>{item.flag} {item.country}</Text>
          <Text style={styles.chip}>{item.lang}</Text>
          <Text style={[styles.chip, styles.lv]}>Lv{item.level}</Text>
        </View>
      </LinearGradient>
      <Text style={styles.name}>{item.name} 📞</Text>
      <Text style={styles.status} numberOfLines={1}>{item.status}</Text>
      <Text style={styles.viewers}>👁 {item.viewers.toLocaleString()} watching</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[COLORS.goldTop, COLORS.goldMid, COLORS.goldBottom]} style={styles.bg}>
      <View style={styles.header}>
        <Text style={styles.logo}>M Live</Text>
        <TouchableOpacity style={styles.coinPill} onPress={() => navigation.navigate('WalletTab')}>
          <Text style={styles.coinText}>🪙 {coins.toLocaleString()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)}>
            <Text style={[styles.tab, tab === t && styles.tabActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.rank}>📊</Text>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.pill} onPress={() => setLang(lang === 'All' ? 'Bengali' : lang === 'Bengali' ? 'English' : 'All')}>
          <Text>🌐 {lang} ⌄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pill} onPress={() => setLoc(loc === 'All' ? 'BGD' : loc === 'BGD' ? 'IND' : 'All')}>
          <Text>📍 {loc} ⌄</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={hosts}
        keyExtractor={(h) => h.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderHost}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No hosts match this filter.</Text>}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  avatar: { color: '#fff', fontSize: 64, fontWeight: 'bold' },
  bg: { flex: 1, paddingTop: 48 },
  card: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 14, padding: 8, width: '48%' },
  chip: { backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 8, color: '#fff', fontSize: 10, marginRight: 4, paddingHorizontal: 5, paddingVertical: 2 },
  chips: { bottom: 8, flexDirection: 'row', left: 8, position: 'absolute' },
  coinPill: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  coinText: { fontWeight: 'bold' },
  empty: { marginTop: 40, textAlign: 'center' },
  filters: { flexDirection: 'row', paddingHorizontal: 16 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  list: { padding: 16 },
  liveBadge: { backgroundColor: '#ef4444', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, position: 'absolute', right: 8, top: 8 },
  liveText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  logo: { color: COLORS.purpleDark, fontSize: 26, fontWeight: 'bold' },
  lv: { backgroundColor: COLORS.purple },
  name: { fontSize: 15, fontWeight: 'bold', marginTop: 6 },
  photo: { alignItems: 'center', borderRadius: 10, height: 232, justifyContent: 'center' },
  pill: { backgroundColor: '#fff', borderRadius: 20, marginRight: 10, paddingHorizontal: 14, paddingVertical: 8 },
  rank: { fontSize: 20, marginLeft: 'auto' },
  row: { justifyContent: 'space-between' },
  status: { color: COLORS.grey, fontSize: 11, marginTop: 2 },
  tab: { color: COLORS.grey, fontSize: 17, marginRight: 22 },
  tabActive: { color: COLORS.purple, fontWeight: 'bold' },
  tabs: { alignItems: 'center', flexDirection: 'row', marginTop: 14, paddingHorizontal: 16 },
  viewers: { color: COLORS.grey, fontSize: 11, marginTop: 2 },
});
