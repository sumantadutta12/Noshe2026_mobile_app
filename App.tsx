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
import { Text, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';

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
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={theme.colors.navy} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
