import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const splashLogo = require('../assets/logo-1.png');

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('MainTabs', { screen: 'Home' }), 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={[theme.colors.navy, theme.colors.navySoft]} style={styles.container}>
      <StatusBar style="light" backgroundColor={theme.colors.navy} translucent={false} />
      <View style={styles.logoCard}>
        <Image
          source={splashLogo}
          style={styles.logo}
          resizeMode="contain"
          accessible
          accessibilityLabel="NOSHE 2026 logo"
        />
      </View>
      <Text style={styles.title}>NOSHE 2026</Text>
      <Text style={styles.subtitle}>Occupational Health & Safety Forum</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  logoCard: {
    width: 160,
    height: 160,
    borderRadius: 34,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    shadowColor: '#001D3D',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8
  },
  logo: {
    width: '100%',
    height: '100%'
  },
  title: {
    color: theme.colors.white,
    fontSize: 34,
    fontWeight: '900'
  },
  subtitle: {
    color: '#DDE7F5',
    fontSize: 15,
    fontWeight: '700'
  }
});
