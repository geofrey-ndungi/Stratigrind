import { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../../../lib/AuthContext';
import { signIn, signUp } from '../../../lib/auth';

export default function Login() {
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (session) return <Redirect href="/" />;

  const handleSignIn = async () => {
    setError('');
    try {
      await signIn(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    }
  };

  const handleSignUp = async () => {
    setError('');
    try {
      await signUp(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        Stratigrind
      </Text>

      <TextInput
        placeholder="University email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
      />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Pressable
        onPress={handleSignIn}
        style={{ backgroundColor: '#222', padding: 14, borderRadius: 8, alignItems: 'center' }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Log in</Text>
      </Pressable>

      <Pressable onPress={handleSignUp} style={{ padding: 14, alignItems: 'center' }}>
        <Text style={{ color: '#222' }}>Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
}