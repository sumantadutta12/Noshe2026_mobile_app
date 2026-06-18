import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const splashLogo = require('../assets/logo-1.png');

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('MainTabs', { screen: 'Home' }), 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0D74C8" translucent={false} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D74C8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 18
  },
  logoCard: {
    width: 150,
    height: 150,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  logo: {
    width: '100%',
    height: '100%'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 31,
    lineHeight: 38,
    fontWeight: '900',
    marginTop: 22
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    marginTop: 10
  }
});
