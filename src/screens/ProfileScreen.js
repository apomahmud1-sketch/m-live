import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../config';
import { useApp } from '../store';

const MENU = ['Celebrity Gifts', 'My profile', 'My invitation', 'My chat price — 1260/min', 'Setting'];

export default function ProfileScreen({ navigation }) {
  const { coins, hostStatus, setHostStatus, showToast } = useApp();

  const copyId = async () => {
    await Clipboard.setStringAsync('9065858');
    showToast('ID 9065858 copied ✓');
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.avatar}><Text style={styles.avatarText}>M</Text></View>
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={styles.name}>Mr.lee</Text>
          <TouchableOpacity onPress={copyId}>
            <Text style={styles.id}>ID: 9065858 📋 (tap to copy)</Text>
          </TouchableOpacity>
          <Text style={styles.chips}>🇸🇬  ♂ 30  ·  English</Text>
        </View>
        <Text style={styles.topIcons}>✅ 🌙</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.stat}><Text style={styles.statNum}>1</Text> Friend</Text>
        <Text style={styles.stat}><Text style={styles.statNum}>1</Text> Follow</Text>
        <Text style={styles.stat}><Text style={styles.statNum}>2</Text> Fans</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.walletCard} onPress={() => navigation.navigate('WalletTab')}>
          <Text style={styles.cardLabel}>💎 My Wallet</Text>
          <Text style={styles.cardValue}>{coins} <Text style={styles.discount}>Discount</Text></Text>
        </TouchableOpacity>
        <View style={styles.incomeCard}>
          <Text style={styles.cardLabel}>💰 My Income</Text>
          <Text style={styles.cardValue}>0</Text>
        </View>
      </View>

      <View style={styles.levelBox}>
        <Text style={styles.levelLabel}>⭐ My level</Text>
        <View style={styles.levelBar}><LinearGradient colors={['#fbbf24', '#d4af37']} style={[styles.levelFill, { width: '60%' }]} /></View>
        <Text style={styles.levelText}>Lv 6 — 60% to next level</Text>
      </View>

      <View style={styles.shortcuts}>
        {['👑 VIP', '🎖️ Badge', '👨‍👩‍👧 Family', '🛍️ Mall'].map((s) => (
          <TouchableOpacity key={s} style={styles.shortcut} onPress={() => showToast(`${s} — coming soon in the full app`)}>
            <Text>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.hostCard}>
        <Text style={styles.hostTitle}>Host status: {hostStatus === 'approved' ? 'Approved Host ✅' : hostStatus === 'pending' ? 'Pending Review ⏳' : 'Viewer'}</Text>
        {hostStatus === 'approved' && (
          <TouchableOpacity onPress={() => setHostStatus('viewer')}>
            <Text style={styles.link}>Switch to Viewer — test Apply flow</Text>
          </TouchableOpacity>
        )}
        {hostStatus !== 'approved' && (
          <TouchableOpacity onPress={() => navigation.navigate('HostApply')}>
            <Text style={styles.link}>Host Center — Apply to Become a Host ›</Text>
          </TouchableOpacity>
        )}
      </View>

      {MENU.map((m) => (
        <TouchableOpacity key={m} style={styles.menuRow} onPress={() => showToast(`${m} — coming soon in the full app`)}>
          <Text style={styles.menuText}>{m}</Text>
          <Text>›</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.logout} onPress={() => { Alert.alert('Log out?', 'You will go back to the Login screen.', [{ text: 'Cancel' }, { text: 'Log Out', onPress: () => navigation.replace('Login') }]); }}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', backgroundColor: COLORS.purple, borderRadius: 40, height: 80, justifyContent: 'center', width: 80 },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  bg: { backgroundColor: COLORS.lavender, flex: 1 },
  cardLabel: { color: COLORS.grey, fontSize: 13 },
  cardValue: { fontSize: 20, fontWeight: 'bold', marginTop: 6 },
  chips: { marginTop: 6 },
  discount: { backgroundColor: '#fbbf24', borderRadius: 8, color: '#fff', fontSize: 11, paddingHorizontal: 6 },
  hostCard: { backgroundColor: '#fff', borderRadius: 12, marginTop: 16, padding: 14 },
  hostTitle: { fontWeight: 'bold' },
  id: { color: COLORS.grey, marginTop: 4 },
  incomeCard: { backgroundColor: '#fff', borderRadius: 12, flex: 1, marginLeft: 8, padding: 14 },
  levelBar: { backgroundColor: '#e5e7eb', borderRadius: 8, height: 12, marginTop: 8, overflow: 'hidden' },
  levelBox: { backgroundColor: '#fff', borderRadius: 12, marginTop: 16, padding: 14 },
  levelFill: { height: 12 },
  levelLabel: { fontWeight: 'bold' },
  levelText: { color: COLORS.grey, fontSize: 12, marginTop: 6 },
  link: { color: COLORS.purple, fontWeight: 'bold', marginTop: 8 },
  logout: { alignItems: 'center', marginVertical: 24 },
  logoutText: { color: '#ef4444', fontWeight: 'bold' },
  menuRow: { backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 14 },
  menuText: { fontSize: 15 },
  name: { fontSize: 22, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginTop: 16 },
  shortcut: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, flex: 1, marginRight: 8, padding: 12 },
  shortcuts: { flexDirection: 'row', marginTop: 16 },
  stat: { color: COLORS.grey },
  statNum: { color: COLORS.dark, fontSize: 17, fontWeight: 'bold' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 18 },
  topIcons: { fontSize: 18 },
  topRow: { alignItems: 'center', flexDirection: 'row' },
  walletCard: { backgroundColor: '#fff', borderRadius: 12, flex: 1, marginRight: 8, padding: 14 },
  wrap: { padding: 20, paddingTop: 60 },
});
