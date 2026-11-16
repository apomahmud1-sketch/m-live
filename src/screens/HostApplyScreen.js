import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../config';
import { useApp } from '../store';

export default function HostApplyScreen({ navigation }) {
  const { hostStatus, setHostStatus, showToast } = useApp();
  const [stageName, setStageName] = useState('');
  const [language, setLanguage] = useState('');
  const [talent, setTalent] = useState('');
  const [about, setAbout] = useState('');

  if (hostStatus === 'pending') {
    return (
      <View style={styles.bg}>
        <Text style={styles.title}>Application Sent ✓</Text>
        <Text style={styles.text}>Your host application is under review.</Text>
        <Text style={styles.steps}>① Submitted ✓{'\n'}② Admin review — in progress{'\n'}③ Approved → Go Live unlocks</Text>
        <TouchableOpacity style={styles.btn} onPress={() => { setHostStatus('approved'); showToast('Demo: admin approved you — you are now an Approved Host ✓'); }}>
          <Text style={styles.btnText}>Simulate Admin Approval (demo)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn} onPress={() => setHostStatus('viewer')}>
          <Text style={styles.link}>Withdraw application</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <Text style={styles.title}>Apply to Become a Host</Text>
      <Text style={styles.text}>Only approved hosts can go live. Fill in the form — an admin will review it.</Text>
      <TextInput style={styles.input} placeholder="Stage name" value={stageName} onChangeText={setStageName} />
      <TextInput style={styles.input} placeholder="Language (e.g. Bengali, English)" value={language} onChangeText={setLanguage} />
      <TextInput style={styles.input} placeholder="Talent (singing, chatting, dance…)" value={talent} onChangeText={setTalent} />
      <TextInput style={[styles.input, styles.about]} placeholder="About yourself" multiline value={about} onChangeText={setAbout} />
      <Text style={styles.agree}>By applying you agree to the M Live host agreement and confirm you are over 18.</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (!stageName.trim()) { showToast('Please enter a stage name.'); return; }
          setHostStatus('pending');
        }}
      >
        <Text style={styles.btnText}>Submit Application</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.link}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  about: { height: 90, textAlignVertical: 'top' },
  agree: { color: COLORS.grey, fontSize: 12, marginTop: 12 },
  bg: { backgroundColor: '#fff', flex: 1, padding: 20, paddingTop: 60 },
  btn: { backgroundColor: COLORS.purple, borderRadius: 24, marginTop: 20, paddingVertical: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  input: { backgroundColor: '#f3f4f6', borderRadius: 10, marginTop: 12, padding: 13 },
  link: { color: COLORS.purple, fontWeight: 'bold' },
  linkBtn: { alignItems: 'center', marginTop: 16 },
  steps: { fontSize: 15, lineHeight: 28, marginTop: 20 },
  text: { color: COLORS.grey, fontSize: 14, lineHeight: 20, marginTop: 8 },
  title: { fontSize: 24, fontWeight: 'bold' },
});
