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
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const eventLogo = require('../assets/NTPC-logo.png');
const otpLength = 6;
const resendDuration = 30;

export function AuthScreen({ navigation }: Props) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [mobileFocused, setMobileFocused] = useState(false);
  const [focusedOtpIndex, setFocusedOtpIndex] = useState<number | null>(null);
  const [resendSeconds, setResendSeconds] = useState(resendDuration);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const isMobileValid = mobileNumber.length === 10;
  const isOtpComplete = otp.every(Boolean);

  useEffect(() => {
    if (!otpVisible || resendSeconds <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [otpVisible, resendSeconds]);

  const handleSendOtp = () => {
    if (!isMobileValid) {
      return;
    }

    setOtpVisible(true);
    setOtp(Array(otpLength).fill(''));
    setResendSeconds(resendDuration);
    setTimeout(() => otpRefs.current[0]?.focus(), 120);
  };

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

  const handleResendOtp = () => {
    if (resendSeconds > 0) {
      return;
    }

    setOtp(Array(otpLength).fill(''));
    setResendSeconds(resendDuration);
    otpRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    if (isOtpComplete) {
      navigation.replace('MainTabs', { screen: 'Home' });
    }
  };

  return (
    <Screen style={styles.screen}>
      <LinearGradient
        colors={['#F5FAFF', '#EEF6FF', '#FFFFFF']}
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
            <View style={styles.eyebrowDot} />
            <Text style={styles.heroEyebrow}>NOSHE 2026</Text>
          </View>
          <Text style={styles.heroTitle}>Attendee Login</Text>
          <Text style={styles.heroText}>
            Use your registered mobile number to continue with OTP verification.
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
            <Text style={styles.cardTitle}>Mobile number</Text>
            <Text style={styles.cardHint}>
              Enter a valid 10 digit mobile number to receive the demo OTP.
            </Text>
          </View>
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={14} color="#7C3AED" />
          </View>
        </View>

        <View style={styles.mobileRow}>
          <View style={styles.countryBox}>
            <Text style={styles.countryText}>+91</Text>
          </View>
          <TextInput
            value={mobileNumber}
            onChangeText={(value) => {
              setMobileNumber(value.replace(/\D/g, '').slice(0, 10));
              if (otpVisible) {
                setOtpVisible(false);
                setOtp(Array(otpLength).fill(''));
              }
            }}
            placeholder="Enter your mobile number"
            keyboardType="number-pad"
            autoComplete="tel"
            maxLength={10}
            onBlur={() => setMobileFocused(false)}
            onFocus={() => setMobileFocused(true)}
            style={[styles.mobileInput, mobileFocused && styles.inputFocused]}
            placeholderTextColor="#9AA8BA"
          />
        </View>

        {!otpVisible ? (
          <GradientButton
            title="Send OTP"
            disabled={!isMobileValid}
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
    paddingTop: 16,
    paddingBottom: 30,
    gap: 18
  },
  logoShell: {
    minHeight: 102,
    borderRadius: 14,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#E7EEF8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#15406F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 28,
    elevation: 5
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
  heroEyebrow: {
    color: '#7C3AED',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0
  },
  heroTitle: {
    color: '#111827',
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '800',
    letterSpacing: 0
  },
  heroText: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500'
  },
  loginCard: {
    marginTop: -10,
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ECE7F7',
    padding: 16,
    gap: 17,
    overflow: 'hidden',
    shadowColor: '#22324C',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 34,
    elevation: 8
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
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700'
  },
  cardHint: {
    color: '#98A2B3',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
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
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E7E1F2',
    backgroundColor: '#FAFBFD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countryText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700'
  },
  mobileInput: {
    flex: 1,
    minWidth: 0,
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E7E1F2',
    backgroundColor: '#FAFBFD',
    paddingHorizontal: 18,
    color: '#111827',
    fontSize: 18,
    fontWeight: '600'
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
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '700',
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
    borderColor: '#E7E1F2',
    backgroundColor: '#FAFBFD',
    color: '#111827',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    includeFontPadding: false,
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
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600'
  },
  resendReady: {
    color: '#5B21B6'
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#6D28D9',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 20,
    elevation: 5
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
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700'
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92
  },
  buttonDisabled: {
    shadowOpacity: 0,
    elevation: 0
  }
});
