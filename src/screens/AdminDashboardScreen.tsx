import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminDashboard'>;

const attendanceStats = [
  { label: 'Total Attended', value: '186', icon: 'people-outline' },
  { label: 'Morning Check-in', value: '124', icon: 'sunny-outline' },
  { label: 'Afternoon Check-in', value: '62', icon: 'time-outline' }
] as const;

const attendanceTimes = [
  { name: 'Dr. Ananya Rao', role: 'Speaker', time: '10:02 AM', status: 'Checked in' },
  { name: 'Vikram Mehta', role: 'Delegate', time: '10:18 AM', status: 'Checked in' },
  { name: 'Nisha Menon', role: 'Speaker', time: '11:05 AM', status: 'Checked in' },
  { name: 'Amitabh Sen', role: 'Delegate', time: '12:12 PM', status: 'Checked in' }
] as const;

export function AdminDashboardScreen({ navigation }: Props) {
  return (
    <Screen refreshable>
      <LinearGradient
        colors={['#08244D', '#004EA8', '#1684D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroGlow} />
        <Text style={styles.eyebrow}>Admin Dashboard</Text>
        <Text style={styles.title}>Attendance Overview</Text>
        <Text style={styles.subtitle}>Live snapshot of attendee check-ins for NOSHE 2026.</Text>
      </LinearGradient>

      <Pressable
        onPress={() => navigation.replace('MainTabs', { screen: 'More' })}
        style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
      >
        <View style={styles.logoutIcon}>
          <Ionicons name="log-out-outline" size={19} color="#DC2626" />
        </View>
        <View style={styles.logoutCopy}>
          <Text style={styles.logoutTitle}>Logout</Text>
          <Text style={styles.logoutText}>Exit admin dashboard</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
      </Pressable>

      <View style={styles.statsGrid}>
        {attendanceStats.map((item) => (
          <View key={item.label} style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons
                name={item.icon}
                size={22}
                color={theme.colors.orange}
              />
            </View>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>Check-in Time</Text>
          <Text style={styles.sectionTitle}>Recent Attendance</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{attendanceTimes.length}</Text>
        </View>
      </View>

      <View style={styles.attendanceList}>
        {attendanceTimes.map((item) => (
          <View key={`${item.name}-${item.time}`} style={styles.attendanceCard}>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.attendanceCopy}>
              <Text style={styles.attendeeName}>{item.name}</Text>
              <Text style={styles.attendeeRole}>{item.role}</Text>
            </View>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: 18,
    minHeight: 170,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#08234A',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 6
  },
  heroGlow: {
    position: 'absolute',
    right: -50,
    top: -48,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(243,112,33,0.22)'
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.white,
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '600',
    marginTop: 5
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    marginTop: 8
  },
  logoutButton: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#F4D6D6',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  logoutIcon: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECACA'
  },
  logoutCopy: {
    flex: 1,
    minWidth: 0
  },
  logoutTitle: {
    color: '#DC2626',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600'
  },
  logoutText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    marginTop: 3
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }]
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    minHeight: 130,
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '600'
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    textAlign: 'center'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    marginTop: 3
  },
  countBadge: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  countBadgeText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '600'
  },
  attendanceList: {
    gap: 10
  },
  attendanceCard: {
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
  timeBadge: {
    width: 72,
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: '#F3F8FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2ECF6'
  },
  timeText: {
    color: theme.colors.navy,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600'
  },
  attendanceCopy: {
    flex: 1,
    minWidth: 0
  },
  attendeeName: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600'
  },
  attendeeRole: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    marginTop: 2
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: theme.radius.pill,
    backgroundColor: '#ECFDF3',
    paddingHorizontal: 9,
    paddingVertical: 6
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.success
  },
  statusText: {
    color: '#247B3B',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500'
  }
});
