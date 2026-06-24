import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const nosheLogo = require('../assets/ntpc-logo-1.png');
const ntpcLogo = require('../assets/NTPC-logo.png');

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
          source={nosheLogo}
          style={styles.nosheLogo}
          resizeMode="contain"
          accessible
          accessibilityLabel="NOSHE 2026 logo"
        />
        <View style={styles.logoDivider} />
        <Image
          source={ntpcLogo}
          style={styles.ntpcLogo}
          resizeMode="contain"
          accessible
          accessibilityLabel="NTPC logo"
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
    width: 316,
    minHeight: 104,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  nosheLogo: {
    width: 136,
    height: 84
  },
  logoDivider: {
    width: 1,
    height: 76,
    backgroundColor: '#DDECF8',
    marginHorizontal: 8
  },
  ntpcLogo: {
    width: 136,
    height: 84
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
