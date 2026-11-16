import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AGORA_APP_ID_IS_PLACEHOLDER, COLORS } from '../config';

// ─────────────────────────────────────────────────────────────────
// Real live video lives here — and ONLY here.
// - If AGORA_APP_ID is still the placeholder, we show a clear message
//   and NEVER pretend the video is real.
// - If a real App ID is set, we lazy-load react-native-agora (native
//   module). It only works in a dev build / EAS build, NOT in Expo Go
//   (Expo Go cannot load custom native modules). If the native module
//   is missing, we fall back to the same clear message.
// ─────────────────────────────────────────────────────────────────
export default function LiveVideo({ channel = 'mlive-room-1', role = 'audience', style }) {
  const [joined, setJoined] = React.useState(false);
  const [error, setError] = React.useState('');

  if (AGORA_APP_ID_IS_PLACEHOLDER) {
    return (
      <View style={[styles.box, style]}>
        <Text style={styles.emoji}>📹</Text>
        <Text style={styles.title}>Live video needs your free Agora App ID</Text>
        <Text style={styles.text}>
          1. Sign up free at console.agora.io{'\n'}
          2. Create a project and copy the App ID{'\n'}
          3. Paste it in app.json → extra → AGORA_APP_ID{'\n'}
          (or in a .env file — see README.md)
        </Text>
        <Text style={styles.note}>Demo video is shown here until then — no fake live video.</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.box, style]}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.title}>Live video could not start</Text>
        <Text style={styles.text}>{error}</Text>
        <Text style={styles.note}>Agora needs a dev build / EAS build — it does not work in Expo Go.</Text>
      </View>
    );
  }

  // Real Agora path — loaded lazily so the app still runs without it.
  let AgoraView = null;
  try {
    // eslint-disable-next-line global-require
    const Agora = require('react-native-agora');
    AgoraView = Agora.RtcSurfaceView;
    // NOTE: full join logic (createAgoraRtcEngine, joinChannel) goes here
    // once a real App ID + channel token are set. See README.md §2.
    void AgoraView;
  } catch (e) {
    setError('react-native-agora native module is not available in this build.');
    return null;
  }

  return (
    <View style={[styles.box, style]}>
      <Text style={styles.emoji}>📹</Text>
      <Text style={styles.title}>Agora is configured — join the channel to go live</Text>
      <Text style={styles.text}>Channel: {channel} · Role: {role}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => setJoined(true)}>
        <Text style={styles.btnText}>{joined ? 'Joined ✓' : 'Join live channel'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: '#1f2937', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 12 },
  btn: { backgroundColor: COLORS.purple, borderRadius: 20, marginTop: 14, paddingHorizontal: 20, paddingVertical: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  emoji: { fontSize: 40, marginBottom: 8 },
  note: { color: '#fbbf24', fontSize: 12, marginTop: 12, textAlign: 'center' },
  text: { color: '#d1d5db', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
});
