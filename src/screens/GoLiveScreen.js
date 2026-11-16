import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../config';
import { useApp } from '../store';

const COVERS = ['🌸', '🌃', '🎤', '🌺'];

export default function GoLiveScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState('audio'); // 'audio' | 'multi'
  const [seats, setSeats] = useState(4);
  const [cover, setCover] = useState(0);
  const [beautyOn, setBeautyOn] = useState(false);
  const [cameraFront, setCameraFront] = useState(true);
  const { showToast } = useApp();

  const startLive = () => {
    if (!title.trim()) {
      showToast('Please write a live title first.');
      return;
    }
    navigation.navigate('LiveRoom', { host: { id: 'me', name: title, viewers: 1, level: 6, color: '#7c3aed' } });
  };

  return (
    <LinearGradient colors={['#7c3aed', '#5b21b6', '#312e81']} style={styles.bg}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.topBtn}>✕</Text></TouchableOpacity>
        <Text style={styles.title}>Live</Text>
        <Text style={styles.topBtn}>   </Text>
      </View>

      <TouchableOpacity style={styles.cover} onPress={() => setCover((cover + 1) % COVERS.length)}>
        <Text style={styles.coverEmoji}>{COVERS[cover]}</Text>
        <Text style={styles.changeCover}>change cover</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Live title</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a live title"
        placeholderTextColor="#c4b5fd"
        value={title}
        onChangeText={(t) => setTitle(t.slice(0, 15))}
        maxLength={15}
      />
      <Text style={styles.counter}>{title.length}/15</Text>

      {mode === 'multi' && (
        <View style={styles.multi}>
          <Text style={styles.multiText}>📹 Camera preview ({cameraFront ? 'front' : 'back'} camera)</Text>
          <TouchableOpacity onPress={() => showToast('Multi-guest Rule: be kind, no bad words, host can mute guests.')}>
            <Text style={styles.rule}>Multi-guest Rule ›</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity style={styles.roundBtn} onPress={() => setBeautyOn(!beautyOn)}>
              <Text>✨ Beauty {beautyOn ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundBtn} onPress={() => setCameraFront(!cameraFront)}>
              <Text>🔄 Switch camera</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Seats</Text>
          <View style={styles.row}>
            {[4, 6, 9].map((n) => (
              <TouchableOpacity key={n} style={[styles.seatBtn, seats === n && styles.seatBtnOn]} onPress={() => setSeats(n)}>
                <Text style={seats === n ? styles.seatTextOn : styles.seatText}>{n} seats</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {mode === 'audio' && (
        <View style={styles.themeCard}>
          <Text style={styles.themeText}>🎵 Room theme — Golden Night ✓</Text>
          <Text style={styles.eq}>▂▄▆█ ▂▄▆█ ▂▄▆█</Text>
        </View>
      )}

      <TouchableOpacity onPress={startLive}>
        <LinearGradient colors={['#ec4899', '#3b82f6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.startBtn}>
          <Text style={styles.startText}>Start live</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.agree}>live means agree 《M Live host agreement》</Text>

      <View style={styles.modeTabs}>
        <TouchableOpacity style={[styles.modeTab, mode === 'audio' && styles.modeTabOn]} onPress={() => setMode('audio')}>
          <Text style={mode === 'audio' ? styles.modeTextOn : styles.modeText}>🎙️ Audio Live</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.modeTab, mode === 'multi' && styles.modeTabOn]} onPress={() => setMode('multi')}>
          <Text style={mode === 'multi' ? styles.modeTextOn : styles.modeText}>👥 Multi-guest Live</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  agree: { color: '#c4b5fd', fontSize: 12, marginTop: 10, textAlign: 'center' },
  bg: { flex: 1, padding: 20, paddingTop: 48 },
  changeCover: { color: '#fff', fontSize: 12, marginTop: 4, textDecorationLine: 'underline' },
  counter: { color: '#c4b5fd', textAlign: 'right' },
  cover: { alignItems: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 60, height: 120, justifyContent: 'center', marginTop: 20, width: 120 },
  coverEmoji: { fontSize: 48 },
  eq: { color: '#fbbf24', fontSize: 18, marginTop: 6 },
  input: { borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 1, color: '#fff', fontSize: 17, paddingVertical: 8 },
  label: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginTop: 24 },
  modeTab: { borderRadius: 20, paddingHorizontal: 18, paddingVertical: 10 },
  modeTabOn: { backgroundColor: 'rgba(255,255,255,0.25)' },
  modeTabs: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto' },
  modeText: { color: '#c4b5fd', fontWeight: 'bold' },
  modeTextOn: { color: '#fff', fontWeight: 'bold' },
  multi: { marginTop: 16 },
  multiText: { color: '#fff' },
  roundBtn: { backgroundColor: '#fff', borderRadius: 20, marginRight: 10, paddingHorizontal: 14, paddingVertical: 9 },
  row: { flexDirection: 'row', marginTop: 12 },
  rule: { color: '#fbbf24', marginTop: 8 },
  seatBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, marginRight: 10, paddingHorizontal: 16, paddingVertical: 8 },
  seatBtnOn: { backgroundColor: '#fff' },
  seatText: { color: '#fff', fontWeight: 'bold' },
  seatTextOn: { color: COLORS.purple, fontWeight: 'bold' },
  startBtn: { alignItems: 'center', borderRadius: 30, marginTop: 24, paddingVertical: 15 },
  startText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  themeCard: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, marginTop: 16, padding: 14 },
  themeText: { color: '#fff', fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  topBtn: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
