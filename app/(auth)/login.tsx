import { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { signIn, signUp } from '../../lib/auth';
import { useAuth } from '../../lib/AuthContext';
import { Redirect } from 'expo-router';



export default function Login() {
  const {session} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  if (session) return <Redirect href = "/"/>

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong'); //to check what type of error it is before accessing the message
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <TextInput
        placeholder="University email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Pressable onPress={handleSignIn}><Text>Log in</Text></Pressable>
      <Pressable onPress={handleSignUp}><Text>Sign up</Text></Pressable>
    </View>
  );
}