import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../lib/AuthContext';
import { Text } from 'react-native';

export default function TabsLayout() {
  const { session, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;
  if (!session) return <Redirect href="/login" />;

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Log' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="stats" options={{ title: 'Stats' }} />
    </Tabs>
  );
}