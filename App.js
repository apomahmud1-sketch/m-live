import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from './src/store';
import { COLORS } from './src/config';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LiveRoomScreen from './src/screens/LiveRoomScreen';
import PartyScreen from './src/screens/PartyScreen';
import PartyRoomScreen from './src/screens/PartyRoomScreen';
import GoLiveScreen from './src/screens/GoLiveScreen';
import HostApplyScreen from './src/screens/HostApplyScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MessagesScreen from './src/screens/MessagesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{toast}</Text>
    </View>
  );
}

// Centre "+" — host-only rule: approved hosts get Go Live,
// everyone else gets Apply to Become a Host.
function GoLiveButton({ navigation }) {
  const { hostStatus } = useApp();
  return (
    <TouchableOpacity
      style={styles.plusBtn}
      onPress={() => navigation.navigate(hostStatus === 'approved' ? 'GoLive' : 'HostApply')}
    >
      <Text style={styles.plusText}>+</Text>
    </TouchableOpacity>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.purple,
        tabBarInactiveTintColor: COLORS.grey,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="PartyTab" component={PartyScreen} options={{ tabBarLabel: 'Party', tabBarIcon: () => <Text>👥</Text> }} />
      <Tab.Screen
        name="GoLiveTab"
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarLabel: '',
          tabBarButton: () => <GoLiveButton navigation={navigation} />,
        })}
      />
      <Tab.Screen name="MessagesTab" component={MessagesScreen} options={{ tabBarLabel: 'Messages', tabBarIcon: () => <Text>💬</Text> }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="LiveRoom" component={LiveRoomScreen} />
        <Stack.Screen name="PartyRoom" component={PartyRoomScreen} />
        <Stack.Screen name="GoLive" component={GoLiveScreen} />
        <Stack.Screen name="HostApply" component={HostApplyScreen} />
        <Stack.Screen name="WalletTab" component={WalletScreen} />
      </Stack.Navigator>
      <Toast />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  plusBtn: {
    alignItems: 'center',
    backgroundColor: COLORS.pink,
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    marginTop: -18,
    width: 56,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  plusText: { color: '#fff', fontSize: 32, fontWeight: 'bold', lineHeight: 34 },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 20,
    bottom: 100,
    left: 40,
    paddingHorizontal: 18,
    paddingVertical: 10,
    position: 'absolute',
    right: 40,
  },
  toastText: { color: '#fff', textAlign: 'center' },
});
