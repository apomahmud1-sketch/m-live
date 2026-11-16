import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../config';

export default function LoginScreen({ navigation }) {
  const [agreed, setAgreed] = useState(true);
  const [mode, setMode] = useState(null); // null | 'phone' | 'gmail'
  const [input, setInput] = useState('');

  const needAgree = () => {
    if (!agreed) {
      Alert.alert('Please agree first', 'Tick "Agree to User Agreement & Privacy Policy and confirm I\'m over 18" to continue.');
      return false;
    }
    return true;
  };

  const goHome = () => {
    if (needAgree()) navigation.replace('Main');
  };

  return (
    <LinearGradient colors={['#1e1b4b', '#7c3aed', '#ec4899']} style={styles.bg}>
      <View style={styles.videoHint}>
        <Text style={styles.videoHintText}>🎥 Background video plays here (login-bg.mp4)</Text>
      </View>
      <Text style={styles.title}>M Live</Text>
      <Text style={styles.subtitle}>Live video • Party rooms • PK battles</Text>

      <View style={styles.bottom}>
        {mode === 'phone' && (
          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Phone / WhatsApp number" placeholderTextColor="#9ca3af" keyboardType="phone-pad" value={input} onChangeText={setInput} />
            <TouchableOpacity style={[styles.btn, styles.btnWhite]} onPress={goHome}>
              <Text style={styles.btnDark}>Send OTP →</Text>
            </TouchableOpacity>
          </View>
        )}
        {mode === 'gmail' && (
          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Gmail address" placeholderTextColor="#9ca3af" keyboardType="email-address" autoCapitalize="none" value={input} onChangeText={setInput} />
            <TouchableOpacity style={[styles.btn, styles.btnWhite]} onPress={goHome}>
              <Text style={styles.btnDark}>Continue with Gmail →</Text>
            </TouchableOpacity>
          </View>
        )}
        {mode === null && (
          <>
            <TouchableOpacity style={[styles.btn, styles.btnWhite]} onPress={goHome}>
              <Text style={styles.btnDark}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnPink]} onPress={goHome}>
              <Text style={styles.btnWhiteText}>G Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnPurple]} onPress={() => setMode('phone')}>
              <Text style={styles.btnWhiteText}>📱 Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={() => setMode('gmail')}>
              <Text style={styles.btnWhiteText}>✉️ Gmail</Text>
            </TouchableOpacity>
          </>
        )}
        {mode !== null && (
          <TouchableOpacity onPress={() => setMode(null)}>
            <Text style={styles.back}>← Back to all login options</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.agreeRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
            {agreed && <Text style={styles.check}>✓</Text>}
          </View>
          <Text style={styles.agreeText}>
            Agree to <Text style={styles.link}>User Agreement</Text> &amp; <Text style={styles.link}>Privacy Policy</Text> and confirm I'm over 18
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  agreeRow: { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
  agreeText: { color: '#e5e7eb', flex: 1, fontSize: 12, lineHeight: 17 },
  back: { color: '#fff', marginTop: 10, textAlign: 'center' },
  bg: { flex: 1, padding: 24 },
  bottom: { marginTop: 'auto' },
  btn: { alignItems: 'center', borderRadius: 30, marginTop: 12, paddingVertical: 15 },
  btnDark: { color: COLORS.dark, fontSize: 17, fontWeight: 'bold' },
  btnOutline: { backgroundColor: 'transparent', borderColor: '#fff', borderWidth: 1.5 },
  btnPink: { backgroundColor: '#ec4899' },
  btnPurple: { backgroundColor: '#7c3aed' },
  btnWhite: { backgroundColor: '#fff' },
  btnWhiteText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  check: { color: '#fff', fontWeight: 'bold' },
  checkbox: { borderColor: '#fff', borderRadius: 4, borderWidth: 2, height: 22, marginRight: 10, width: 22, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: COLORS.pink },
  form: { marginTop: 8 },
  input: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 12, fontSize: 16, padding: 14 },
  link: { textDecorationLine: 'underline' },
  subtitle: { color: '#e5e7eb', fontSize: 15, marginTop: 8, textAlign: 'center' },
  title: { color: '#fff', fontSize: 52, fontWeight: 'bold', marginTop: 90, textAlign: 'center' },
  videoHint: { backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10, marginTop: 50, padding: 10 },
  videoHintText: { color: '#fde68a', fontSize: 12, textAlign: 'center' },
});
