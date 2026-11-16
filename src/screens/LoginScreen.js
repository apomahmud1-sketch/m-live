import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../config';

export default function LoginScreen({ navigation }) {
  const [agreed, setAgreed] = useState(true);

  const goHome = () => {
    if (!agreed) {
      Alert.alert('Please agree first', 'Tick "Agree to User Agreement & Privacy Policy and confirm I\'m over 18" to continue.');
      return;
    }
    navigation.replace('Main');
  };

  return (
    <View style={styles.bg}>
      <Video
        source={require('../../assets/login-bg.mp4')}
        posterSource={require('../../assets/login-poster.jpg')}
        usePoster
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient colors={['rgba(30,27,75,0.55)', 'rgba(124,58,237,0.35)', 'rgba(236,72,153,0.55)']} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Text style={styles.title}>M Live</Text>
        <Text style={styles.subtitle}>Live video • Party rooms • PK battles</Text>

        <View style={styles.bottom}>
          <TouchableOpacity style={[styles.btn, styles.btnPink]} onPress={goHome}>
            <Text style={styles.btnWhiteText}>G Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.agreeRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
              {agreed && <Text style={styles.check}>✓</Text>}
            </View>
            <Text style={styles.agreeText}>
              Agree to <Text style={styles.link}>User Agreement</Text> &amp; <Text style={styles.link}>Privacy Policy</Text> and confirm I'm over 18
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  agreeRow: { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
  agreeText: { color: '#e5e7eb', flex: 1, fontSize: 12, lineHeight: 17 },
  bg: { flex: 1 },
  bottom: { marginTop: 'auto' },
  btn: { alignItems: 'center', borderRadius: 30, marginTop: 12, paddingVertical: 15 },
  btnPink: { backgroundColor: '#ec4899' },
  btnWhiteText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  check: { color: '#fff', fontWeight: 'bold' },
  checkbox: { alignItems: 'center', borderColor: '#fff', borderRadius: 4, borderWidth: 2, height: 22, justifyContent: 'center', marginRight: 10, width: 22 },
  checkboxOn: { backgroundColor: COLORS.pink },
  content: { flex: 1, padding: 24 },
  link: { textDecorationLine: 'underline' },
  subtitle: { color: '#e5e7eb', fontSize: 15, marginTop: 8, textAlign: 'center' },
  title: { color: '#fff', fontSize: 52, fontWeight: 'bold', marginTop: 90, textAlign: 'center' },
});
