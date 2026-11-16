import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, RECHARGE_PACKS, WITHDRAW_METHODS } from '../config';
import { useApp } from '../store';

export default function WalletScreen() {
  const { coins, diamonds, earnings, recharge, showToast } = useApp();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bKash');
  const [account, setAccount] = useState('');
  const [history, setHistory] = useState([
    { id: 'w1', amount: 500, method: 'bKash', status: 'Approved' },
    { id: 'w2', amount: 200, method: 'Nagad', status: 'Pending' },
  ]);

  const submitWithdraw = () => {
    const n = Number(amount);
    if (!n || n <= 0) { showToast('Enter a valid amount.'); return; }
    if (!account.trim()) { showToast('Enter your account number.'); return; }
    setHistory([{ id: String(Date.now()), amount: n, method, status: 'Pending' }, ...history]);
    setAmount(''); setAccount('');
    showToast('Withdraw request submitted — admin will review it.');
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>My Wallet</Text>
      <View style={styles.row}>
        <View style={[styles.card, styles.coins]}><Text style={styles.cardLabel}>🪙 Coins</Text><Text style={styles.cardValue}>{coins.toLocaleString()}</Text></View>
        <View style={[styles.card, styles.diamonds]}><Text style={styles.cardLabel}>💎 Diamonds</Text><Text style={styles.cardValue}>{diamonds.toLocaleString()}</Text></View>
      </View>
      <View style={styles.card}><Text style={styles.cardLabel}>💰 Earnings (withdrawable)</Text><Text style={styles.cardValue}>{earnings.toLocaleString()} diamonds</Text></View>

      <Text style={styles.section}>Recharge coins</Text>
      <View style={styles.row}>
        {RECHARGE_PACKS.map((p) => (
          <TouchableOpacity key={p.coins} style={styles.pack} onPress={() => recharge(p)}>
            <Text style={styles.packCoins}>{p.coins} 🪙</Text>
            <Text>{p.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.note}>Recharge is a demo for now — connect a real payment method before launch.</Text>

      <Text style={styles.section}>Withdraw</Text>
      <View style={styles.row}>
        {WITHDRAW_METHODS.map((m) => (
          <TouchableOpacity key={m} style={[styles.method, method === m && styles.methodOn]} onPress={() => setMethod(m)}>
            <Text style={method === m ? styles.methodTextOn : styles.methodText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <TextInput style={styles.input} placeholder={`${method} account number`} value={account} onChangeText={setAccount} />
      <TouchableOpacity style={styles.btn} onPress={submitWithdraw}>
        <Text style={styles.btnText}>Submit Withdraw Request</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Withdraw history</Text>
      {history.map((h) => (
        <View key={h.id} style={styles.historyRow}>
          <Text>{h.amount} via {h.method}</Text>
          <Text style={[styles.status, h.status === 'Approved' ? styles.ok : styles.pending]}>{h.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { backgroundColor: '#fff', flex: 1 },
  btn: { alignItems: 'center', backgroundColor: COLORS.purple, borderRadius: 24, marginTop: 14, paddingVertical: 14 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#f3f4f6', borderRadius: 12, flex: 1, padding: 16 },
  cardLabel: { color: COLORS.grey, fontSize: 13 },
  cardValue: { fontSize: 22, fontWeight: 'bold', marginTop: 6 },
  coins: { marginRight: 8 },
  diamonds: { marginLeft: 8 },
  historyRow: { borderBottomColor: '#e5e7eb', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  input: { backgroundColor: '#f3f4f6', borderRadius: 10, marginTop: 10, padding: 13 },
  method: { borderColor: COLORS.lightGrey, borderRadius: 18, borderWidth: 1, marginRight: 8, paddingHorizontal: 14, paddingVertical: 8 },
  methodOn: { backgroundColor: COLORS.purple, borderColor: COLORS.purple },
  methodText: { fontWeight: 'bold' },
  methodTextOn: { color: '#fff', fontWeight: 'bold' },
  note: { color: COLORS.grey, fontSize: 12, marginTop: 8 },
  ok: { color: '#16a34a', fontWeight: 'bold' },
  pack: { alignItems: 'center', backgroundColor: '#fef3c7', borderRadius: 10, flex: 1, marginRight: 8, padding: 12 },
  packCoins: { fontWeight: 'bold' },
  pending: { color: '#d97706', fontWeight: 'bold' },
  row: { flexDirection: 'row', marginTop: 12 },
  section: { fontSize: 17, fontWeight: 'bold', marginTop: 24 },
  status: { fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold' },
  wrap: { padding: 20, paddingTop: 60 },
});
