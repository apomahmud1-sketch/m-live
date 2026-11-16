import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../config';
import { MESSAGES } from '../data';

export default function MessagesScreen() {
  const [open, setOpen] = useState(null);
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState([]);

  if (open) {
    return (
      <View style={styles.bg}>
        <TouchableOpacity onPress={() => setOpen(null)}><Text style={styles.back}>← {open.name}</Text></TouchableOpacity>
        <FlatList
          data={sent}
          keyExtractor={(m) => m.id}
          ListEmptyComponent={<Text style={styles.empty}>No messages yet — say hello! 👋</Text>}
          renderItem={({ item }) => <Text style={styles.bubble}>{item.text}</Text>}
        />
        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="Write a message…" value={draft} onChangeText={setDraft} />
          <TouchableOpacity style={styles.send} onPress={() => { if (draft.trim()) { setSent([...sent, { id: String(Date.now()), text: draft }]); setDraft(''); } }}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <Text style={styles.title}>Messages 💬</Text>
      <FlatList
        data={MESSAGES}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => setOpen(item)}>
            <View style={[styles.avatar, { backgroundColor: item.color }]}><Text style={styles.avatarText}>{item.name[0]}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text} numberOfLines={1}>{item.text}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', borderRadius: 24, height: 48, justifyContent: 'center', marginRight: 12, width: 48 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  back: { color: COLORS.purple, fontSize: 17, fontWeight: 'bold', marginBottom: 12 },
  bg: { backgroundColor: '#fff', flex: 1, padding: 20, paddingTop: 60 },
  bubble: { alignSelf: 'flex-end', backgroundColor: '#ede9fe', borderRadius: 14, marginTop: 8, padding: 10 },
  empty: { color: COLORS.grey, marginTop: 40, textAlign: 'center' },
  input: { backgroundColor: '#f3f4f6', borderRadius: 20, flex: 1, paddingHorizontal: 14, paddingVertical: 10 },
  inputRow: { flexDirection: 'row', gap: 8 },
  name: { fontWeight: 'bold' },
  row: { alignItems: 'center', borderBottomColor: '#f3f4f6', borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 12 },
  send: { backgroundColor: COLORS.purple, borderRadius: 20, justifyContent: 'center', paddingHorizontal: 16 },
  sendText: { color: '#fff', fontWeight: 'bold' },
  text: { color: COLORS.grey, marginTop: 2 },
  time: { color: COLORS.grey, fontSize: 11 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
});
