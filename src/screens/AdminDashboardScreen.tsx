import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDashboardData ,logout} from '../services/adminService';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminDashboard'>;



const attendanceTimes = [
  { name: 'Dr. Ananya Rao', role: 'Speaker', time: '10:02 AM', status: 'Checked in' },
  { name: 'Vikram Mehta', role: 'Delegate', time: '10:18 AM', status: 'Checked in' },
  { name: 'Nisha Menon', role: 'Speaker', time: '11:05 AM', status: 'Checked in' },
  { name: 'Amitabh Sen', role: 'Delegate', time: '12:12 PM', status: 'Checked in' }
] as const;

export function AdminDashboardScreen({ navigation }: Props) {
  const [selectedTab, setSelectedTab] = useState('registered');
  const [selectedType, setSelectedType] =
  useState('participants');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchDashboard();}, []);
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => subscription.remove();
    }, [])
  );
 console.log("5",dashboardData)
   const attendanceStats = [
    {
      label: 'Total Register',
      value: dashboardData?.[0]?.participants?.length?.toString() || '0',
      icon: 'people-outline',
      key: 'participants'
    },
    {
      label: 'Total Checked-in',
      value: dashboardData?.[0]?.checkedIn?.length?.toString() || '0',
      icon: 'sunny-outline',
      key: 'checkedIn'
    }
  ];

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('adminToken');
      if ( !token) {
        return;
      }
      const response = await getDashboardData( token);
      console.log('Dashboard API', response);
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

   const handleLogout = async() => {
    try {

    const adminid = await AsyncStorage.getItem('adminuid');
    if (adminid) {
      await logout( adminid);
    }
    await AsyncStorage.removeMany(['adminToken','adminuid']);

    Alert.alert(
      'Success',
      'Logged out successfully'
    );
    navigation.replace('MainTabs', { screen: 'More' });

  } catch (error) {
    console.log(error);
    Alert.alert(
      'Error',
      'Logout failed'
    );

  }
  };
  
  if (loading) {
  return (
    <Screen>
      <Text>Loading...</Text>
    </Screen>
  );
}

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
        onPress={handleLogout}
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
          <Pressable key={item.label} onPress={() => setSelectedType(item.key)}
            style={[styles.statCard, selectedType === item.key && { borderColor: theme.colors.orange, borderWidth: 2 }]}>
            <View style={styles.statIcon}>
              <Ionicons name={item.icon} size={22} color={theme.colors.orange} />
            </View>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </Pressable>
        ))}
    </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>Check-in Time</Text>
          <Text style={styles.sectionTitle}>{selectedType === 'participants' ? 'Registered Participants' : 'Checked-In Participants'}</Text>
        </View>
      </View>

      <View style={styles.attendanceList}>
        {dashboardData?.[0]?.[selectedType]?.map(
          (item: any, index: number) => (
            <View key={index} style={styles.attendanceCard}>
              <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{item.registered_date ? (((item.registered_date.split(" ")[0]).split('-')).reverse()).join('-') : "N/A"}</Text>
            </View>
            <View style={styles.attendanceCopy}>
              <Text style={styles.attendeeName}>{item.name}</Text>
              <Text style={styles.attendeeRole}>{item.email_id}</Text>
            </View>
          </View>))}
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
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '500',
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
    gap: 18
  },
  statCard: {
    flex: 1,
    minHeight: 122,
    backgroundColor: theme.colors.white,
    borderRadius: 18,
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
    borderRadius: 15,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700'
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  sectionHeader: {
    marginTop: 2
  },
  sectionEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    marginTop: 1
  },
  attendanceList: {
    gap: 12
  },
  attendanceCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 19,
    padding: 12,
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
    width: 76,
    minHeight: 54,
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
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    marginTop: 2
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: theme.radius.pill,
    backgroundColor: '#ECFDF3',
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.success
  },
  statusText: {
    color: '#247B3B',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500'
  }
});
