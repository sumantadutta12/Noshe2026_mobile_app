import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { Screen } from '../components/Screen';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'More'>,
  NativeStackScreenProps<RootStackParamList>
>;

const primaryItems = [
  {
    title: 'About NOSHE 2026',
    subtitle: 'Event vision, theme, and conference overview',
    icon: 'information-circle-outline',
    route: 'About'
  },
  {
    title: 'Foreword',
    subtitle: 'Message from the event leadership',
    icon: 'document-text-outline',
    route: 'Foreword'
  },
  {
    title: 'Organisers',
    subtitle: 'Organising partners and event committee',
    icon: 'business-outline',
    route: 'Organisers'
  },
  {
    title: 'Delegate Registration',
    subtitle: 'Registration categories and delegate access',
    icon: 'ticket-outline',
    route: 'Tickets'
  },
  {
    title: 'Venue',
    subtitle: 'Location, directions, hotels and transport',
    icon: 'location-outline',
    route: 'Venue'
  }
] as const;

export function ProfileScreen({ navigation }: Props) {
  return (
    <Screen refreshable header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}>
      <LinearGradient
        colors={['#08244D', '#004EA8', '#1684D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.loginPanel}
      >
        <View style={styles.loginGlow} />
        <View style={styles.loginPanelHeader}>
          <View>
            <Text style={styles.loginEyebrow}>Secure Access</Text>
            <Text style={styles.loginTitle}>Login to continue</Text>
          </View>
          <View style={styles.loginHeaderIcon}>
            <Ionicons name="shield-checkmark" size={22} color={theme.colors.orange} />
          </View>
        </View>
        <Text style={styles.loginText}>
          Access attendee services or enter the admin area with OTP verification.
        </Text>
        <View style={styles.loginActions}>
          <AccessButton
            icon="person-circle-outline"
            title="Login"
            subtitle="Attendee access"
            onPress={() => navigation.navigate('Auth', { mode: 'attendee' })}
          />
          <AccessButton
            icon="briefcase-outline"
            title="Admin Login"
            subtitle="Admin access"
            onPress={() => navigation.navigate('AdminLogin')}
            highlighted
          />
        </View>
      </LinearGradient>

      <View style={styles.menu}>
        {primaryItems.map((item) => (
          <MoreCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate(item.route)}
          />
        ))}
      </View>

      <View style={styles.menu}>
        <MoreCard
          icon="call-outline"
          title="Contact Us"
          subtitle="Reach the NOSHE 2026 support desk"
          onPress={() => navigation.navigate('Contact')}
        />
      </View>

      <Text style={styles.version}>ver 0.0.1</Text>
    </Screen>
  );
}

function AccessButton({
  highlighted,
  icon,
  onPress,
  subtitle,
  title
}: {
  highlighted?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  subtitle: string;
  title: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.accessButton,
        highlighted && styles.accessButtonHighlighted,
        pressed && styles.pressed
      ]}
    >
      <View style={[styles.accessIcon, highlighted && styles.accessIconHighlighted]}>
        <Ionicons
          name={icon}
          size={21}
          color={highlighted ? theme.colors.white : theme.colors.orange}
        />
      </View>
      <View style={styles.accessCopy}>
        <Text style={[styles.accessTitle, highlighted && styles.accessTitleHighlighted]}>{title}</Text>
        <Text style={[styles.accessSubtitle, highlighted && styles.accessSubtitleHighlighted]}>
          {subtitle}
        </Text>
      </View>
      <Ionicons
        name="arrow-forward"
        size={18}
        color={highlighted ? theme.colors.white : theme.colors.navy}
      />
    </Pressable>
  );
}

function MoreCard({
  icon,
  onPress,
  subtitle,
  tone,
  title
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  subtitle: string;
  tone?: 'danger';
  title: string;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.moreCard, pressed && styles.pressed]}>
      <View style={[styles.cardIcon, tone === 'danger' && styles.dangerIcon]}>
        <Ionicons name={icon} size={22} color={tone === 'danger' ? '#DC2626' : theme.colors.orange} />
      </View>
      <View style={styles.cardCopy}>
        <Text style={[styles.cardTitle, tone === 'danger' && styles.dangerText]}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menu: {
    gap: 11
  },
  moreCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  pressed: {
    opacity: 0.86
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  dangerIcon: {
    backgroundColor: '#FEE2E2'
  },
  cardCopy: {
    flex: 1,
    minWidth: 0
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600'
  },
  cardSubtitle: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
    fontWeight: '400'
  },
  dangerText: {
    color: '#DC2626'
  },
  loginPanel: {
    borderRadius: 28,
    padding: 18,
    gap: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    shadowColor: '#08234A',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 6
  },
  loginGlow: {
    position: 'absolute',
    right: -48,
    top: -54,
    width: 172,
    height: 172,
    borderRadius: 86,
    backgroundColor: 'rgba(243,112,33,0.24)'
  },
  loginPanelHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12
  },
  loginEyebrow: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 0.9,
    textTransform: 'uppercase'
  },
  loginTitle: {
    color: theme.colors.white,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '600',
    marginTop: 3
  },
  loginHeaderIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400'
  },
  loginActions: {
    gap: 10
  },
  accessButton: {
    minHeight: 68,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)'
  },
  accessButtonHighlighted: {
    backgroundColor: 'rgba(243,112,33,0.96)',
    borderColor: 'rgba(255,255,255,0.24)'
  },
  accessIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: theme.colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  accessIconHighlighted: {
    backgroundColor: 'rgba(255,255,255,0.18)'
  },
  accessCopy: {
    flex: 1,
    minWidth: 0
  },
  accessTitle: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600'
  },
  accessTitleHighlighted: {
    color: theme.colors.white
  },
  accessSubtitle: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    marginTop: 2
  },
  accessSubtitleHighlighted: {
    color: 'rgba(255,255,255,0.78)'
  },
  version: {
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 4
  }
});
