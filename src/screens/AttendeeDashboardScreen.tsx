import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAttendeeDashboard } from '../services/attendeeService';

const qrCodeImage = require('../assets/qr-pe.webp');

export function AttendeeDashboardScreen() {
  const [dashboardData,setDashboardData] = useState<any>(null);
  useEffect(() => {fetchDashboard();},[]);

  const fetchDashboard = async () => {
  try{
        const token =
          await AsyncStorage.getItem('token');
        const uid =
          await AsyncStorage.getItem('uid');
        if(!token || !uid){
          return;
        }
        const response = await getAttendeeDashboard(uid,token);
        console.log(response)
        if(response.success){
          setDashboardData(response.data[0]);
        }
      }
      catch(error){
        console.log(error);
      }
  };

  return (
    <Screen>
      <LinearGradient
        colors={['#08244D', '#004EA8', '#1684D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroIcon}>
          <Ionicons name="person-circle-outline" size={28} color={theme.colors.orange} />
        </View>
        <Text style={styles.eyebrow}>Attendee Dashboard</Text>
        <Text style={styles.title}>Welcome to NOSHE 2026</Text>
        <Text style={styles.subtitle}>
          Keep this pass ready at registration, sessions, and attendee help desks.
        </Text>
      </LinearGradient>

      <View style={styles.passCard}>
        <View style={styles.qrWrap}>
          <Image source={{ uri: dashboardData?.qr_code }} style={styles.qrImage} resizeMode="contain"/>
          {/* <Image source={qrCodeImage} style={styles.qrImage} resizeMode="contain" /> */}
        </View>

        <Text style={styles.passLabel}>Digital Delegate Pass</Text>
        {/* <Text style={styles.passName}>{attendee?.name ?? 'NOSHE Attendee'}</Text> */}
        <Text style={styles.passName}>{dashboardData?.name || 'NOSHE Attendee'}</Text>
        {/* <Text style={styles.passId}>{attendee?.registrationId ?? 'NOSHE26-0000'}</Text> */}

        <View style={styles.infoList}>
          <InfoRow icon="call-outline" label="Mobile" value={`+91 ${dashboardData?.mobile_no ?? '----------'}`} />
          <InfoRow icon="calendar-outline" label="Event" value="NOSHE 2026, 3rd - 4th July 2026" />
          <InfoRow icon="location-outline" label="Venue" value="NTPC PMI, Noida" />
        </View>
      </View>

      <View style={styles.notice}>
        <Ionicons name="information-circle-outline" size={20} color={theme.colors.orange} />
        <Text style={styles.noticeText}>
          Show this QR pass at the attendee desk for badge verification and event support.
        </Text>
      </View>
    </Screen>
  );
}

function InfoRow({
  icon,
  label,
  value
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={17} color={theme.colors.navy} />
      </View>
      <View style={styles.infoCopy}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 26,
    padding: 18,
    gap: 8,
    overflow: 'hidden',
    ...theme.shadow
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 4
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.white,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '700'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    lineHeight: 20
  },
  passCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 26,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8F0F8',
    ...theme.shadow
  },
  qrWrap: {
    width: 190,
    height: 190,
    borderRadius: 24,
    backgroundColor: '#F7FBFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDECF8'
  },
  qrImage: {
    width: 156,
    height: 156
  },
  passLabel: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 18
  },
  passName: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    marginTop: 4
  },
  passId: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 2
  },
  infoList: {
    alignSelf: 'stretch',
    gap: 10,
    marginTop: 20
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 18,
    backgroundColor: '#F7FBFF',
    borderWidth: 1,
    borderColor: '#E3EEF8'
  },
  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white
  },
  infoCopy: {
    flex: 1,
    minWidth: 0
  },
  infoLabel: {
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  infoValue: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
    marginTop: 2
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FFE0C7'
  },
  noticeText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 20
  }
});
