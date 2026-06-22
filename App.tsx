import 'react-native-gesture-handler';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts
} from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AttendeeAuthProvider } from './src/context/AttendeeAuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';
import Toast from 'react-native-toast-message'; 
import { Ionicons } from '@expo/vector-icons';

const toastConfig = {
  success: ({ text1 }: { text1?: string }) => (
    <View style={styles.toast}>
      <View style={styles.toastIcon}>
        <Ionicons name="checkmark" size={18} color={theme.colors.white} />
      </View>
      <Text style={styles.toastText} numberOfLines={2}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }: { text1?: string }) => (
    <View style={[styles.toast, styles.errorToast]}>
      <View style={[styles.toastIcon, styles.errorToastIcon]}>
        <Ionicons name="alert" size={18} color={theme.colors.white} />
      </View>
      <Text style={styles.toastText} numberOfLines={2}>{text1}</Text>
    </View>
  )
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    // Global font default for current screens. Future API/data work can use
    // theme.typography.fontFamily for component-level font refinements.
    const defaultTextProps = (Text as unknown as { defaultProps?: { style?: object[] } }).defaultProps ?? {};
    const defaultInputProps =
      (TextInput as unknown as { defaultProps?: { style?: object[] } }).defaultProps ?? {};

    (Text as unknown as { defaultProps: object }).defaultProps = {
      ...defaultTextProps,
      style: [{ fontFamily: theme.typography.fontFamily }, defaultTextProps.style]
    };
    (TextInput as unknown as { defaultProps: object }).defaultProps = {
      ...defaultInputProps,
      style: [{ fontFamily: theme.typography.fontFamily }, defaultInputProps.style]
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AttendeeAuthProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor={theme.colors.background} translucent={false} />
          <AppNavigator />
        </NavigationContainer>
      </AttendeeAuthProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  toast: {
    width: '90%',
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#D8E7F3',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#0F4070',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 8
  },
  errorToast: {
    borderColor: '#FECACA'
  },
  toastIcon: {
    width: 34,
    height: 34,
    borderRadius: 13,
    backgroundColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorToastIcon: {
    backgroundColor: '#DC2626'
  },
  toastText: {
    flex: 1,
    minWidth: 0,
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700'
  }
});
