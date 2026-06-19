import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState, useEffect } from 'react';
import { Alert,BackHandler, Modal, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDashboardData ,logout, getWaitingList} from '../services/adminService';
import {scanAttendee } from '../services/scannerService';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminDashboard'>;
type AttendanceType = 'participants' | 'checkedIn';
type AttendanceStat = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  key: AttendanceType;
};

const attendanceStats = [
  { label: 'Total register', value: '186', icon: 'people-outline' },
  { label: 'Total Checked-in', value: '124', icon: 'sunny-outline' }
] as const;

const attendanceTimes = [
  { name: 'Dr. Ananya Rao', role: 'Speaker', time: '10:02 AM', status: 'Checked in' },
  { name: 'Vikram Mehta', role: 'Delegate', time: '10:18 AM', status: 'Checked in' },
  { name: 'Nisha Menon', role: 'Speaker', time: '11:05 AM', status: 'Checked in' },
  { name: 'Amitabh Sen', role: 'Delegate', time: '12:12 PM', status: 'Checked in' }
] as const;

export function AdminDashboardScreen({ navigation }: Props) {
  const [selectedTab, setSelectedTab] = useState('registered');
  const [selectedType, setSelectedType] =
  useState<AttendanceType>('participants');
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchDashboard();}, []);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannerActive, setScannerActive] = useState(false);
  const [latestScan, setLatestScan] = useState<string | null>(null);
  const attendanceStats: AttendanceStat[] = [
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

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        if (scannerActive) {
          setScannerActive(false);
        }

        return true;
      });

      return () => subscription.remove();
    }, [scannerActive])
  );

  const hasCameraPermission = permission?.granted ?? false;

  const handleOpenScanner = useCallback(async () => {
    if (!hasCameraPermission) {
      const response = await requestPermission();

      if (!response.granted) {
        return;
      }
    }

    setLatestScan(null);
    setScannerActive(true);
  }, [hasCameraPermission, requestPermission]);

  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
     try {
        setScannerActive(false);
        console.log('Scanned Value:', data);
        const response = await scanAttendee(data);

      if (response.success) {
          // setLatestScan(response.data);
        await fetchDashboard();
          Alert.alert(
            'Success',
            response.message || 'Attendee scanned successfully'
          );
        } else {
          Alert.alert(
            'Failed',
            response.message || 'Invalid QR Code'
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  const handleCloseScanner = useCallback(() => {
    setScannerActive(false);
  }, []);

  
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
      else if(response?.code && response?.code =="TOKEN_EXPIRED"){
           await confirmLogout();
      }
    } catch (error:any) {
      if (
        error?.response &&
        error.response.data?.code === "TOKEN_EXPIRED"
    ) {
      await confirmLogout();
    }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
   const confirmLogout = async() => {
    try {

    const adminid = await AsyncStorage.getItem('adminuid');
    if (adminid) {
      await logout( adminid);
    }
    await AsyncStorage.multiRemove(['adminToken','adminuid']);

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
   }

   const handleLogout = () => {
    Alert.alert(
      'Are you sure?',
      'Do you want to logout from the admin dashboard?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: confirmLogout
        }
      ]
    );
   };
  
  if (loading) {
  return (
    <Screen>
      <Text>Loading...</Text>
    </Screen>
  );
}

  const selectedAttendance = Array.isArray(dashboardData?.[0]?.[selectedType])
    ? dashboardData[0][selectedType]
    : [];
  const attendancePlaceholder =
    selectedType === 'participants'
      ? 'Registered attendees will appear here once data is available.'
      : 'Checked-in attendees will appear here after QR scans are completed.';
  const approvalRequests =
    dashboardData?.[0]?.waitingForApproval ||
    dashboardData?.[0]?.approvalRequests ||
    dashboardData?.[0]?.pendingApprovals ||
    [];
  const approvalCount = Array.isArray(approvalRequests) ? approvalRequests.length : 0;

  return (
    <Screen
      refreshable
      floating={
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.logoutFooter}>
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
        </SafeAreaView>
      }
    >
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
        onPress={() => navigation.navigate('ApprovalRequests')}
        style={({ pressed }) => [styles.approvalCard, pressed && styles.pressed]}
      >
        <View style={styles.approvalIcon}>
          <Ionicons name="time-outline" size={24} color={theme.colors.orange} />
        </View>
        <View style={styles.approvalCopy}>
          <Text style={styles.approvalEyebrow}>Registration Requests</Text>
          <Text style={styles.approvalTitle}>Waiting for approval</Text>
        </View>
        <View style={styles.approvalMeta}>
          {/* <Text style={styles.approvalCount}>{approvalCount}</Text> */}
          <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
        </View>
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

      <View style={styles.scannerCard}>
        <View style={styles.scannerHeader}>
          <View style={styles.scannerIcon}>
            <Ionicons name="qr-code-outline" size={22} color={theme.colors.orange} />
          </View>
          <View style={styles.scannerCopy}>
            <Text style={styles.scannerEyebrow}>QR Code Scanner</Text>
            <Text style={styles.scannerTitle}>Attendee Check-in</Text>
          </View>
        </View>

        <View style={styles.scannerPlaceholder}>
          <Ionicons name="scan-outline" size={34} color={theme.colors.navy} />
          <Text style={styles.scannerHelp}>
            Open the full-screen scanner to verify attendee QR passes at check-in.
          </Text>
        </View>

        {/* {latestScan ? (
          <View style={styles.scanResult}>
            <Text style={styles.scanResultLabel}>Last scanned QR</Text>
            <Text style={styles.scanResultValue} numberOfLines={2}>{latestScan}</Text>
          </View>
        ) : null} */}

        <View style={styles.scannerActions}>
          <Pressable
            onPress={handleOpenScanner}
            style={({ pressed }) => [styles.scanButton, pressed && styles.pressed]}
          >
            <Ionicons name="camera-outline" size={18} color={theme.colors.white} />
            <Text style={styles.scanButtonText}>{latestScan ? 'Scan Again' : 'Open Scanner'}</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={scannerActive && hasCameraPermission}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={handleCloseScanner}
      >
        <StatusBar hidden animated />
        <View style={styles.fullScanner}>
          <CameraView
            style={styles.fullCamera}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={handleBarcodeScanned}
          />
          <View style={styles.scannerShade} />

          <SafeAreaView style={styles.fullScannerContent}>
            <View style={styles.fullScannerHeader}>
              <Pressable
                onPress={handleCloseScanner}
                style={({ pressed }) => [styles.headerIconButton, pressed && styles.pressed]}
              >
                <Ionicons name="arrow-back" size={30} color={theme.colors.white} />
              </Pressable>
              <View style={styles.fullScannerTitleWrap}>
                <Text style={styles.fullScannerTitle}>Scan Attendee QR</Text>
                <Text style={styles.fullScannerSubtitle}>NOSHE 2026 check-in pass</Text>
              </View>
              <View style={styles.headerIconSpacer} />
            </View>

            <View style={styles.fullScanFrameWrap}>
              <View style={styles.fullScanFrame}>
                <View style={styles.scanCornerTopLeft} />
                <View style={styles.scanCornerTopRight} />
                <View style={styles.scanCornerBottomLeft} />
                <View style={styles.scanCornerBottomRight} />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>Check-in Time</Text>
          <Text style={styles.sectionTitle}>Total Attendance</Text>
        </View>
      </View>

      <View style={styles.attendanceList}>
        {selectedAttendance.length > 0 ? (
          selectedAttendance.map((item: any, index: number) => (
            <View key={index} style={styles.attendanceCard}>
              <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{item.registered_date ? (((item.registered_date.split(" ")[0]).split('-')).reverse()).join('-') : "N/A"}</Text>
            </View>
            <View style={styles.attendanceCopy}>
              <Text style={styles.attendeeName}>{item.name}</Text>
              <Text style={styles.attendeeRole}>{item.email_id}</Text>
            </View>
          </View>))
        ) : (
          <View style={styles.attendancePlaceholder}>
            <View style={styles.attendancePlaceholderIcon}>
              <Ionicons name="calendar-clear-outline" size={24} color={theme.colors.orange} />
            </View>
            <Text style={styles.attendancePlaceholderTitle}>No attendance data</Text>
            <Text style={styles.attendancePlaceholderText}>{attendancePlaceholder}</Text>
          </View>
        )}
      </View>
      <View style={styles.footerSpacer} />
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
  approvalCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 14,
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
  approvalIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  approvalCopy: {
    flex: 1,
    minWidth: 0
  },
  approvalEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  approvalTitle: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    marginTop: 2
  },
  approvalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  approvalCount: {
    minWidth: 32,
    minHeight: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F3F8FD',
    color: theme.colors.navy,
    fontSize: 14,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center'
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
  logoutFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.spacing.md,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(244,250,255,0.96)',
    borderTopWidth: 1,
    borderTopColor: '#DCEAF5'
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
  scannerCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
    gap: 13
  },
  scannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  scannerIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  scannerCopy: {
    flex: 1,
    minWidth: 0
  },
  scannerEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  scannerTitle: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    marginTop: 1
  },
  fullScanner: {
    flex: 1,
    backgroundColor: '#05070A'
  },
  fullCamera: {
    ...StyleSheet.absoluteFillObject
  },
  scannerShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)'
  },
  fullScannerContent: {
    flex: 1,
    paddingHorizontal: 24
  },
  fullScannerHeader: {
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIconSpacer: {
    width: 44
  },
  fullScannerTitleWrap: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 4
  },
  fullScannerTitle: {
    color: theme.colors.white,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '800',
    textAlign: 'center'
  },
  fullScannerSubtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center'
  },
  fullScanFrameWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24
  },
  fullScanFrame: {
    width: '86%',
    maxWidth: 360,
    aspectRatio: 1,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)'
  },
  scanCornerTopLeft: {
    position: 'absolute',
    left: 28,
    top: 28,
    width: 54,
    height: 54,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderColor: '#8A22FF',
    borderTopLeftRadius: 18
  },
  scanCornerTopRight: {
    position: 'absolute',
    right: 28,
    top: 28,
    width: 54,
    height: 54,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderColor: '#8A22FF',
    borderTopRightRadius: 18
  },
  scanCornerBottomLeft: {
    position: 'absolute',
    left: 28,
    bottom: 28,
    width: 54,
    height: 54,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#8A22FF',
    borderBottomLeftRadius: 18
  },
  scanCornerBottomRight: {
    position: 'absolute',
    right: 28,
    bottom: 28,
    width: 54,
    height: 54,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#8A22FF',
    borderBottomRightRadius: 18
  },
  scannerPlaceholder: {
    minHeight: 150,
    borderRadius: 18,
    backgroundColor: '#F3F8FD',
    borderWidth: 1,
    borderColor: '#E2ECF6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10
  },
  scannerHelp: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
    textAlign: 'center'
  },
  scanResult: {
    borderRadius: 16,
    backgroundColor: '#ECFDF3',
    borderWidth: 1,
    borderColor: '#C9F0D5',
    padding: 12,
    gap: 4
  },
  scanResultLabel: {
    color: '#247B3B',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  scanResultValue: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500'
  },
  scannerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    flexWrap: 'wrap'
  },
  scanButton: {
    minHeight: 46,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.navy,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  scanButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700'
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
  attendancePlaceholder: {
    minHeight: 166,
    backgroundColor: theme.colors.white,
    borderRadius: 19,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  attendancePlaceholderIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF',
    marginBottom: 10
  },
  attendancePlaceholderTitle: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center'
  },
  attendancePlaceholderText: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5
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
  },
  footerSpacer: {
    height: 102
  }
});
