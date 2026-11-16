import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../config';
import LiveVideo from '../agora/LiveVideo';
import { useApp } from '../store';

const SEATS = [1, 2, 3, 4, 5];

export default function PartyRoomScreen({ route, navigation }) {
  const party = (route.params && route.params.party) || { name: 'Party Room', members: 5 };
  const { showToast } = useApp();
  const [mySeat, setMySeat] = useState(null);

  return (
    <View style={styles.bg}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.topBtn}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>{party.name}</Text>
        <Text style={styles.topBtn}>👥 {party.members}</Text>
      </View>
      <LiveVideo channel={`mlive-party-${party.id || '1'}`} role="audience" style={styles.video} />
      <Text style={styles.seatTitle}>Party seats — 1 host + 4 guests (tap an empty seat to join)</Text>
      <View style={styles.seats}>
        {SEATS.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.seat, mySeat === s && styles.mySeat]}
            onPress={() => { setMySeat(s); showToast(s === 1 ? 'Seat 1 is the host seat' : `You joined Party Seat ${s} 🎤`); }}
          >
            <Text style={styles.seatEmoji}>{s === 1 ? '👑' : mySeat === s ? '🙋' : '🪑'}</Text>
            <Text style={styles.seatText}>{s === 1 ? 'Host' : mySeat === s ? 'You' : `Seat ${s}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.note}>Party chat and gifts work here just like in a Live Room.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { backgroundColor: '#111827', flex: 1, paddingTop: 48 },
  mySeat: { borderColor: COLORS.pink, borderWidth: 2 },
  note: { color: '#9ca3af', marginTop: 16, paddingHorizontal: 16, textAlign: 'center' },
  seat: { alignItems: 'center', backgroundColor: '#1f2937', borderRadius: 12, padding: 14, width: '18%' },
  seatEmoji: { fontSize: 24 },
  seatText: { color: '#fff', fontSize: 11, marginTop: 4 },
  seatTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 16, paddingHorizontal: 16 },
  seats: { flexDirection: 'row', gap: 8, justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 16 },
  title: { color: '#fff', fontWeight: 'bold' },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14 },
  topBtn: { color: '#fff', fontWeight: 'bold' },
  video: { height: 240, margin: 12 },
});
