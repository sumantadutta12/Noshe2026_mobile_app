import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adminLogin } from '../services/adminService';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminLogin'>;

const adminLogo = require('../assets/NTPC-logo.png');

export function AdminLoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canContinue = username.trim().length > 0 && password.trim().length > 0;
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async () => {
    try {
      if (!username.trim()) {
        Alert.alert('Validation', 'Username is required');
        return;
      }
      if (!password.trim()) {
        Alert.alert('Validation', 'Password is required');
        return;
      }
      setLoading(true);
      const response = await adminLogin(username, password);
      console.log(response);

      if (response.success) {
        await AsyncStorage.setItem('adminToken', response.token);
        await AsyncStorage.setItem('adminuid', response.uid);
        navigation.replace('AdminDashboard');
      } else {
        Alert.alert('Login Failed',response.message || 'Invalid credentials');
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert('Login Failed', error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.screen}>
      <LinearGradient
        colors={['#F8FBFF', '#EEF6FF', '#FFFFFF']}
        locations={[0, 0.55, 1]}
        style={styles.hero}
      >
        <View style={styles.logoShell}>
          <Image
            source={adminLogo}
            style={styles.logoImage}
            resizeMode="contain"
            accessible
            accessibilityLabel="NTPC logo"
          />
        </View>
        <Text style={styles.eyebrow}>NOSHE 2026 Admin</Text>
        <Text style={styles.title}>Admin Login</Text>
        <Text style={styles.subtitle}>
          Enter admin credentials to view attendance and check-in insights.
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>User name</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter user name"
            placeholderTextColor="#99A7B8"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor="#99A7B8"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable
          disabled={!canContinue}
          onPress={handleAdminLogin}
          style={({ pressed }) => [
            styles.button,
            !canContinue && styles.buttonDisabled,
            pressed && canContinue && styles.pressed
          ]}
        >
          {loading ? 'Please wait...' : 'Open Dashboard'}
          <Ionicons name="arrow-forward" size={19} color={theme.colors.white} />
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={18} color={theme.colors.navy} />
        <Text style={styles.backLinkText}>Back</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.white
  },
  hero: {
    marginHorizontal: -theme.spacing.md,
    marginTop: -theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingTop: 22,
    paddingBottom: 32,
    alignItems: 'flex-start'
  },
  logoShell: {
    minHeight: 98,
    alignSelf: 'stretch',
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E4EEF8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16
  },
  logoImage: {
    width: '100%',
    height: 72
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '600',
    marginTop: 5
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    marginTop: 8
  },
  card: {
    marginTop: -12,
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 4
  },
  fieldGroup: {
    gap: 8
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500'
  },
  input: {
    minHeight: 58,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E4ECF6',
    backgroundColor: '#F8FBFE',
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 16
  },
  button: {
    minHeight: 58,
    borderRadius: 19,
    backgroundColor: theme.colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 2
  },
  buttonDisabled: {
    backgroundColor: '#BBC6D4'
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600'
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }]
  },
  backLink: {
    alignSelf: 'center',
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 21,
    backgroundColor: '#F3F8FD',
    borderWidth: 1,
    borderColor: '#E4ECF6'
  },
  backLinkText: {
    color: theme.colors.navy,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600'
  }
});
