import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import { Alert } from 'react-native';
import { sendOtp,verifyLogin } from '../services/authServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const eventLogo = require('../assets/NTPC-logo.png');
const otpLength = 6;
const resendDuration = 30;

export function AuthScreen({ navigation, route }: Props) {
  const { login } = useAttendeeAuth();
  const loginMode = route.params?.mode ?? 'attendee';
  const isAdminLogin = loginMode === 'admin';
  const [email, setEmail] = useState('');
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [emailFocused, setEmailFocused] = useState(false);
  const [focusedOtpIndex, setFocusedOtpIndex] = useState<number | null>(null);
  const [resendSeconds, setResendSeconds] = useState(resendDuration);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);  const isOtpComplete = otp.every(Boolean);

  useEffect(() => {
    if (!otpVisible || resendSeconds <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [otpVisible, resendSeconds]);

  const handleSendOtp = async () => {
    try {
      if (!isEmailValid) {
        return;
      }

      console.log('Sending OTP to:', email);
      const response = await sendOtp(email);
      console.log(response);

      if (response.success) {
        setOtpVisible(true);
        setOtp(Array(otpLength).fill(''));
        setResendSeconds(resendDuration);

        setTimeout(() => {
          otpRefs.current[0]?.focus();
        }, 120);
        Alert.alert('Success',response.message);
      }
      else
      {
        Alert.alert('Error',response.message);
      }
      
    }catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
        'Failed to send OTP'
      );

      console.log(error);
    }
  };
    // setOtp(Array(otpLength).fill(''));
    // setResendSeconds(resendDuration);
    // setTimeout(() => otpRefs.current[0]?.focus(), 120);
  

  const handleOtpChange = (value: string, index: number) => {
    const nextDigit = value.replace(/\D/g, '').slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = nextDigit;
    setOtp(nextOtp);

    if (nextDigit && index < otpLength - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async() => {
    try {
        if (resendSeconds > 0) {
          return;
        }

        const response = await sendOtp(email);

        if (response.success) {
          setOtp(Array(otpLength).fill(''));
          setResendSeconds(resendDuration);

          Alert.alert(
            'Success',
            response.message || 'OTP resent successfully'
          );

          setTimeout(() => {
            otpRefs.current[0]?.focus();
          }, 120);
        } else {
          Alert.alert(
            'Error',
            response.message || 'Failed to resend OTP'
          );
        }
      } catch (error: any) {
        Alert.alert(
          'Error',
          error?.response?.data?.message ||
          'Failed to resend OTP'
        );

        console.log(error);
    }
  };

  const handleVerify = async () => {
    try {
      if (!isOtpComplete) {
        return;
      }

      const enteredOtp = otp.join('');
      console.log({email,otp: enteredOtp});

      const response = await verifyLogin(
        email,
        enteredOtp
      );

      if (response.success) {
        Alert.alert('Success',response.message || 'Login successful');
        await AsyncStorage.setItem('token',response.data[0].token);
        await AsyncStorage.setItem('name',response.data[0].name);
        await AsyncStorage.setItem('uid',response.data[0].uid);
        if (isAdminLogin) {
          navigation.replace('MainTabs',{screen: 'Home',});
          return;
        }
        login(email);

        navigation.replace('AttendeeDashboard');
      } else {
        Alert.alert('Invalid OTP', response.message || 'OTP verification failed');
      }
    } catch (error: any) {
      Alert.alert('Error', error?.response?.message || 'Verification failed');
      console.log(error);
  }
};

  return (
    <Screen style={styles.screen}>
      <LinearGradient
        colors={['#F8FBFF', '#EEF6FF', '#FFFFFF']}
        locations={[0, 0.52, 1]}
        style={styles.hero}
      >
        <View style={styles.logoShell}>
          <Image
            source={eventLogo}
            style={styles.logoImage}
            resizeMode="contain"
            accessible
            accessibilityLabel="NOSHE 2026 logo"
          />
        </View>
        <View style={styles.heroCopy}>
          <View style={styles.eyebrowRow}>
            <View style={[styles.eyebrowDot, isAdminLogin && styles.adminEyebrowDot]} />
            <Text style={styles.heroEyebrow}>{isAdminLogin ? 'NOSHE 2026 Admin' : 'NOSHE 2026'}</Text>
          </View>
          <Text style={styles.heroTitle}>{isAdminLogin ? 'Admin Login' : 'Attendee Login'}</Text>
          <Text style={styles.heroText}>
            {isAdminLogin
              ? 'Use your authorised admin mobile number to continue with OTP verification.'
              : 'Use your registered email id to continue with OTP verification.'}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.loginCard}>
        <LinearGradient
          colors={['#8B3DFF', '#2878D8', '#28A36A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardAccent}
        />
        <View style={styles.cardTop}>
          <View style={styles.cardTitleBlock}>
            <Text style={styles.cardTitle}>Email Id</Text>
            <Text style={styles.cardHint}>
              Enter your registered email id to receive the OTP.
            </Text>
          </View>
          <View style={styles.lockBadge}>
            <Ionicons name={isAdminLogin ? 'shield-checkmark' : 'lock-closed'} size={14} color="#7C3AED" />
          </View>
        </View>

        <View style={styles.mobileRow}>
          {/* <View style={styles.countryBox}>
            <Text style={styles.countryText}>+91</Text>
          </View> */}
          <TextInput value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (otpVisible) {
                setOtpVisible(false);
                setOtp(Array(otpLength).fill(''));
              }
            }}
            placeholder="Enter Email ID"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={() => setEmailFocused(false)}
            onFocus={() => setEmailFocused(true)}

            style={[
              styles.emailInput,
              emailFocused && styles.inputFocused,
            ]}
          />
        </View>

        {!otpVisible ? (
          <GradientButton
            title="Send OTP"
            disabled={!isEmailValid}
            onPress={handleSendOtp}
          />
        ) : (
          <View style={styles.otpSection}>
            <Text style={styles.otpLabel}>OTP</Text>
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(input) => {
                    otpRefs.current[index] = input;
                  }}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
                  onBlur={() => setFocusedOtpIndex(null)}
                  onFocus={() => setFocusedOtpIndex(index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  style={[
                    styles.otpInput,
                    focusedOtpIndex === index && styles.otpInputFocused,
                    Boolean(digit) && styles.otpInputFilled
                  ]}
                  textAlign="center"
                  textAlignVertical="center"
                />
              ))}
            </View>
            <Pressable
              disabled={resendSeconds > 0}
              onPress={handleResendOtp}
              style={styles.resendButton}
            >
              <Text style={[styles.resendText, resendSeconds === 0 && styles.resendReady]}>
                {resendSeconds > 0
                  ? `Resend OTP in ${resendSeconds} seconds`
                  : 'Resend OTP'}
              </Text>
            </Pressable>
            <GradientButton
              title="Verify & Continue"
              disabled={!isOtpComplete}
              iconName="arrow-forward"
              onPress={handleVerify}
            />
          </View>
        )}
      </View>

      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.backLink, pressed && styles.buttonPressed]}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={18} color={theme.colors.navy} />
        <Text style={styles.backLinkText}>Back</Text>
      </Pressable>
    </Screen>
  );
}

function GradientButton({
  disabled,
  iconName,
  onPress,
  title
}: {
  disabled?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled
      ]}
    >
      <LinearGradient
        colors={disabled ? ['#D8DEE8', '#B8C1D0'] : ['#8B3DFF', '#6D28D9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.buttonGradient}
      >
        <Text style={styles.buttonText}>{title}</Text>
        {iconName ? <Ionicons name={iconName} size={20} color={theme.colors.white} /> : null}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF'
  },
  hero: {
    marginHorizontal: -theme.spacing.md,
    marginTop: -theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 16
  },
  logoShell: {
    minHeight: 98,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#E7EEF8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#15406F',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3
  },
  logoImage: {
    width: '100%',
    height: 74
  },
  heroCopy: {
    gap: 7
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  eyebrowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#28A36A'
  },
  adminEyebrowDot: {
    backgroundColor: theme.colors.orange
  },
  heroEyebrow: {
    color: '#7C3AED',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 0
  },
  heroTitle: {
    color: '#111827',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '600',
    letterSpacing: 0
  },
  heroText: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400'
  },
  loginCard: {
    marginTop: -10,
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    padding: 16,
    gap: 17,
    overflow: 'hidden',
    shadowColor: '#0F4070',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 4
  },
  cardAccent: {
    height: 4,
    marginHorizontal: -16,
    marginTop: -16,
    marginBottom: 1
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12
  },
  cardTitleBlock: {
    flex: 1,
    minWidth: 0
  },
  cardTitle: {
    color: '#111827',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600'
  },
  cardHint: {
    color: '#98A2B3',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
    marginTop: 8
  },
  lockBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F4EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8DDFD'
  },
  mobileRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%'
  },
  countryBox: {
    width: 74,
    minHeight: 58,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E4ECF6',
    backgroundColor: '#F8FBFE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countryText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '500'
  },
  emailInput: {
    flex: 1,
    minWidth: 0,
    minHeight: 58,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E4ECF6',
    backgroundColor: '#F8FBFE',
    paddingHorizontal: 14,
    color: '#111827',
    fontSize: 16,
    fontWeight: '400'
  },
  inputFocused: {
    borderColor: '#8B3DFF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  otpSection: {
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0ECF8',
    paddingTop: 2
  },
  otpLabel: {
    color: '#111827',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    marginTop: 0
  },
  otpRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between'
  },
  otpInput: {
    flex: 1,
    minWidth: 0,
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E4ECF6',
    backgroundColor: '#F8FBFE',
    color: '#111827',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 24,
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  otpInputFocused: {
    borderColor: '#111827',
    backgroundColor: '#FFFFFF',
    shadowColor: '#111827',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 2
  },
  otpInputFilled: {
    borderColor: '#CBB8F6',
    backgroundColor: '#FCFAFF'
  },
  resendButton: {
    alignSelf: 'flex-start',
    minHeight: 30,
    justifyContent: 'center'
  },
  resendText: {
    color: '#7C3AED',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500'
  },
  resendReady: {
    color: '#5B21B6'
  },
  button: {
    minHeight: 58,
    borderRadius: 19,
    overflow: 'hidden',
    shadowColor: '#6D28D9',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 9 },
    shadowRadius: 16,
    elevation: 4
  },
  buttonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600'
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92
  },
  buttonDisabled: {
    shadowOpacity: 0,
    elevation: 0
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
