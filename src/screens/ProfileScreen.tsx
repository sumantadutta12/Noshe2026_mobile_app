import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
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
        <MoreCard
          icon="log-out-outline"
          title="Logout"
          subtitle="Sign out from the event companion app"
          tone="danger"
          onPress={() => navigation.navigate('Auth')}
        />
      </View>

      <Text style={styles.version}>ver 0.0.1</Text>
    </Screen>
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
    gap: 10
  },
  moreCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...theme.shadow
  },
  pressed: {
    opacity: 0.86
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: theme.colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center'
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
    fontWeight: '700'
  },
  cardSubtitle: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
    fontWeight: '500'
  },
  dangerText: {
    color: '#DC2626'
  },
  version: {
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4
  }
});
