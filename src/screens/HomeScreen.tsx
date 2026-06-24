import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { CTAButton } from '../components/CTAButton';
import { EventCard } from '../components/EventCard';
import { QuickActionCard } from '../components/QuickActionCard';
import { Screen } from '../components/Screen';
import { event } from '../data/events';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import { downloadBrochure } from '../utils/downloadBrochure';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const conferenceDays = [
  {
    day: 'DAY 1',
    date: '3rd July 2026',
    colors: ['#6576D9', '#263EAA'],
    sessions: [
      {
        time: '10:00 - 11:30',
        label: 'Inaugural Session',
        title: 'Opening remarks and conference inauguration'
      },
      {
        time: '12:00 - 13:00',
        label: 'Opening Plenary Session',
        title: 'Strategies for integrating ESG framework with SHE for sustainable workplace'
      },
      {
        time: '14:00 - 15:15',
        label: 'Plenary Session 2',
        title: 'Environmental protection and management from source to sink approach'
      },
      {
        time: '15:45 - 17:00',
        label: 'Plenary Session 3: Safety',
        title: 'Beyond Compliance: Building a Resilient Safety Culture Powered by Values.'
      },
      {
        time: '17:00 - 18:15',
        label: 'Plenary Session 4: Health',
        title: 'Occupational health and safety: a strategic approach to workplace wellness'
      },
      {
        time: '18:15 - 19:00',
        label: 'High Tea',
        title: ''
      }
    ]
  },
  {
    day: 'DAY 2',
    date: '4th July 2026',
    colors: ['#1F5A84', '#1978B7'],
    sessions: [
      {
        time: '09:00 - 10:00',
        label: 'Mental Health :Practice of Meditation & Self Realisation.',
        title: 'Focused morning session for reflection and readiness'
      },
      {
        time: '10:00 - 11:00',
        label: 'Plenary Session 5: Safety',
        title: "Navigating the new risk frontier : Mastering Safety portfolio's in a technology transition regime in Power Sector"
      },
      {
        time: '11:00 - 12:00',
        label: 'Technical Session 1: Environment',
        title: 'Credible ESG systems : Data, Assurance, and Digital compliance platforms'
      },
      {
        time: '12:20 - 13:30',
        label: 'Technical Session 2: Safety',
        title: 'Emergency preparedness: Amalgamation of Experience, Framework and Technology'
      },
      {
        time: '14:30 - 15:30',
        label: 'Technical Session 3 : Safety & Health',
        title: 'Transforming workplace Occupational health & Safety through AI & Digital Innovation'
      },
      {
        time: '15:50 - 17:15',
        label: 'Closing Plenary & Valedictory Session',
        title: 'Reflections: Pathway to organisational sustainability - SHE context'
      }
    ]
  }
] as const;

type Sector = {
  title: string;
  image: ImageSourcePropType;
  accent: string;
};

const sectoralParticipation: Sector[] = [
  {
    title: 'POWER',
    image: require('../assets/sectoral/Power.png'),
    accent: '#1684D8'
  },
  {
    title: 'CONSTRUCTION',
    image: require('../assets/sectoral/Construction.png'),
    accent: '#F37021'
  },
  {
    title: 'OIL & GAS',
    image: require('../assets/sectoral/Oil -Gas.png'),
    accent: '#F2B705'
  },
  {
    title: 'CHEMICALS & PETROCHEMICALS',
    image: require('../assets/sectoral/chemicals-Petrochemicals.png'),
    accent: '#6D5BD0'
  },
  {
    title: 'IRON / STEEL / ALUMINIUM',
    image: require('../assets/sectoral/IRON-Steel-Aluminumi.png'),
    accent: '#9AA0A6'
  },
  {
    title: 'HEALTHCARE & PHARMA',
    image: require('../assets/sectoral/Healthcare-Pharma.png'),
    accent: '#7AC943'
  },
  {
    title: 'MANUFACTURING',
    image: require('../assets/sectoral/Manufacturing.png'),
    accent: '#15BDEB'
  },
  {
    title: 'LOGISTICS & TRANSPORTATION',
    image: require('../assets/sectoral/Logistcs-Transportation.png'),
    accent: '#F7941D'
  },
  {
    title: 'HSE & OTHERS',
    image: require('../assets/sectoral/HSE-Others.png'),
    accent: '#009444'
  },
  {
    title: 'MINING',
    image: require('../assets/sectoral/MINING.png'),
    accent: '#3EA7E0'
  },
  {
    title: 'ENVIRONMENT & SUSTAINABILITY',
    image: require('../assets/sectoral/Environment-Sustainability.png'),
    accent: '#39B54A'
  },
  {
    title: 'REGULATORS',
    image: require('../assets/sectoral/Regulators.png'),
    accent: '#354B7C'
  },
  {
    title: 'CONSULTANTS',
    image: require('../assets/sectoral/consultant.png'),
    accent: '#F37021'
  },
  {
    title: 'ACADEMIA',
    image: require('../assets/sectoral/academy.png'),
    accent: '#31BBD3'
  }
];

const eventStartTime = new Date('2026-07-03T10:00:00+05:30').getTime();

export function HomeScreen({ navigation }: Props) {
  const [countdown, setCountdown] = useState(() => getCountdownParts());
  useEffect(() => {checkAdminLogin();}, []);
  
  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdownParts()), 1000); return () => clearInterval(timer);}, []);

  const checkAdminLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('adminToken');
      if (token) {
        navigation.replace('AdminDashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadBrochure = async () => {
    try {
      await downloadBrochure();
    } catch {
      Alert.alert('Download failed', 'Unable to open the brochure. Please try again.');
    }
  };
  
  return (
    <Screen refreshable header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}>
      <EventCard event={event} />
      {!countdown.isFinished ? (
        <View style={styles.countdownShell}>
          <LinearGradient
            colors={['#05326F', '#0A63BB', '#1598E8']}
            locations={[0, 0.58, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumCountdown}
          >
            <View style={styles.countGlow} />
            <View style={styles.countGlowSmall} />
            <View style={styles.countTopRow}>
              <View>
                <Text style={styles.countEyebrow}>NOSHE 2026</Text>
                <Text style={styles.countHeading}>Event starts in</Text>
              </View>
            </View>
            <View style={styles.countdownGrid}>
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds }
              ].map((item) => (
                <View key={item.label} style={styles.countdownCard}>
                  <Text style={styles.countdownValue}>{item.value}</Text>
                  <Text style={styles.countdownLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
            <CTAButton
              title="Register Now"
              style={styles.countRegister}
              textStyle={styles.homeButtonText}
              onPress={() => navigation.navigate('Tickets')}
            />
            <CTAButton
              title="Download Brochure"
              variant="ghost"
              icon={<Ionicons name="download-outline" size={18} color={theme.colors.navy} />}
              style={styles.countBrochure}
              textStyle={styles.homeButtonText}
              onPress={handleDownloadBrochure}
            />
          </LinearGradient>
        </View>
      ) : null}
      <Text style={styles.sectionLabel}>Event Snapshot</Text>
      <View style={styles.statsGrid}>
        {[
          { value: '250+', label: 'Conference Delegates', icon: 'people-outline' },
          { value: '50+', label: 'Conference Speakers', icon: 'mic-outline' },
          { value: '10', label: 'Conference Sessions', icon: 'calendar-number-outline' }
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <LinearGradient
              colors={['#FFF7F0', '#FFE9DB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statIcon}
            >
              <Ionicons
                name={stat.icon as keyof typeof Ionicons.glyphMap}
                size={21}
                color={theme.colors.orange}
              />
            </LinearGradient>
            <CounterText value={stat.value} style={styles.statValue} />
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionLabel}>Quick Access</Text>
      <View style={styles.quickGrid}>
        <QuickActionCard
          title="Agenda"
          icon={<Ionicons name="calendar-outline" size={23} color={theme.colors.orange} />}
          onPress={() => navigation.navigate('Agenda')}
        />
        <QuickActionCard
          title="Contact"
          icon={<Ionicons name="call-outline" size={23} color={theme.colors.orange} />}
          onPress={() => navigation.navigate('Contact')}
        />
        <QuickActionCard
          title="Venue"
          icon={<Ionicons name="location-outline" size={23} color={theme.colors.orange} />}
          onPress={() => navigation.navigate('Venue')}
        />
        <QuickActionCard
          title="Committee"
          icon={<Ionicons name="people-circle-outline" size={23} color={theme.colors.orange} />}
          onPress={() => navigation.navigate('Members')}
        />
      </View>
      <View style={styles.topicSection}>
        <Text style={styles.topicEyebrow}>Conference Details</Text>
        <Text style={styles.topicTitle}>Topic & Time Overview</Text>
        <Text style={styles.topicSubtitle}>
          A quick view of the key sessions planned across both conference days.
        </Text>
        <View style={styles.dayStack}>
          {conferenceDays.map((day) => (
            <View key={day.day} style={styles.dayCard}>
              <LinearGradient
                colors={day.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dayHeader}
              >
                <View>
                  <Text style={styles.dayLabel}>{day.day}</Text>
                  <Text style={styles.dayDate}>{day.date}</Text>
                </View>
                <View style={styles.dayIcon}>
                  <Ionicons name="calendar" size={24} color={theme.colors.white} />
                </View>
              </LinearGradient>
              <View style={styles.timeline}>
                {day.sessions.map((session, index) => (
                  <View key={`${day.day}-${session.time}`} style={styles.timelineItem}>
                    <View style={styles.timeRail}>
                      <Text style={styles.timePill}>{session.time}</Text>
                      <View style={styles.timelineDotOuter}>
                        <View style={styles.timelineDotInner} />
                      </View>
                      {index < day.sessions.length - 1 ? <View style={styles.timelineLine} /> : null}
                    </View>
                    <View style={styles.sessionContent}>
                      <Text style={styles.sessionLabel}>{session.label}</Text>
                      {session.title ? <Text style={styles.sessionTitle}>{session.title}</Text> : null}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectorSection}>
        <Text style={styles.sectorHeading}>Sectoral Participation</Text>
        <View style={styles.sectorStack}>
          {sectoralParticipation.map((sector) => (
            <LinearGradient
              key={sector.title}
              colors={['#003F8F', '#005CAF', '#1598E8']}
              locations={[0, 0.55, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sectorCard}
            >
              <View style={styles.sectorShade} />
              <View style={styles.sectorIconWrap}>
                <Image
                  source={sector.image}
                  style={[styles.sectorIcon, { tintColor: sector.accent }]}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.sectorTitle} numberOfLines={1} adjustsFontSizeToFit>
                {sector.title}
              </Text>
            </LinearGradient>
          ))}
        </View>
      </View>
    </Screen>
  );
}

function CounterText({ style, value }: { style: object; value: string }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState('0');
  const target = Number.parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const listener = animatedValue.addListener(({ value: current }) => {
      setDisplayValue(`${Math.floor(current)}${suffix}`);
    });

    Animated.timing(animatedValue, {
      toValue: Number.isNaN(target) ? 0 : target,
      duration: 900,
      useNativeDriver: false
    }).start();

    return () => animatedValue.removeListener(listener);
  }, [animatedValue, suffix, target]);

  return <Text style={style}>{displayValue}</Text>;
}

function getCountdownParts() {
  const totalSeconds = Math.floor((eventStartTime - Date.now()) / 1000);
  const remainingSeconds = Math.max(0, totalSeconds);
  const days = Math.floor(remainingSeconds / 86400);
  const hours = Math.floor((remainingSeconds % 86400) / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return {
    isFinished: totalSeconds <= 0,
    days: formatCountdownValue(days),
    hours: formatCountdownValue(hours),
    minutes: formatCountdownValue(minutes),
    seconds: formatCountdownValue(seconds)
  };
}

function formatCountdownValue(value: number) {
  return String(value).padStart(2, '0');
}

const styles = StyleSheet.create({
  sectionLabel: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    marginTop: 4
  },
  countdownShell: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 30,
    padding: 7,
    borderWidth: 1,
    borderColor: '#DCEAF8',
    shadowColor: '#0B356C',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 26,
    elevation: 7
  },
  premiumCountdown: {
    borderRadius: 25,
    padding: 17,
    gap: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)'
  },
  countGlow: {
    position: 'absolute',
    right: -34,
    top: -72,
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: 'rgba(255,255,255,0.22)'
  },
  countGlowSmall: {
    position: 'absolute',
    left: -52,
    bottom: -78,
    width: 154,
    height: 154,
    borderRadius: 77,
    backgroundColor: 'rgba(243,112,33,0.16)'
  },
  countTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  countEyebrow: {
    color: '#BFE4FF',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1.3,
    textTransform: 'uppercase'
  },
  countHeading: {
    color: theme.colors.white,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    marginTop: 2
  },
  countdownGrid: {
    flexDirection: 'row',
    gap: 8
  },
  countdownCard: {
    flex: 1,
    minHeight: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    shadowColor: '#071326',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 4
  },
  countdownValue: {
    color: theme.colors.orange,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700'
  },
  countdownLabel: {
    color: theme.colors.navy,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    marginTop: 2
  },
  countRegister: {
    minHeight: 48,
    borderRadius: 18,
    marginTop: 2,
    shadowColor: theme.colors.orange,
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 5
  },
  countBrochure: {
    minHeight: 48,
    borderRadius: 18,
    marginTop: -7,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderColor: 'rgba(255,255,255,0.82)'
  },
  homeButtonText: {
    fontWeight: '600'
  },
  topicSection: {
    backgroundColor: '#F8FAFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E7EDF8',
    padding: 16,
    gap: 12,
    overflow: 'hidden',
    shadowColor: '#1C3A66',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3
  },
  topicEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  topicTitle: {
    color: theme.colors.text,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '600',
    letterSpacing: 0
  },
  topicSubtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400'
  },
  dayStack: {
    gap: 14,
    marginTop: 4
  },
  dayCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5EAF4',
    shadowColor: '#1E2F4D',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2
  },
  dayHeader: {
    minHeight: 112,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dayLabel: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.8
  },
  dayDate: {
    color: theme.colors.white,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '600',
    marginTop: 10,
    letterSpacing: 0
  },
  dayIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeline: {
    paddingVertical: 8
  },
  timelineItem: {
    flexDirection: 'row',
    paddingRight: 14,
    minHeight: 104,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F7'
  },
  timeRail: {
    width: 120,
    alignItems: 'flex-end',
    paddingTop: 23,
    paddingRight: 16,
    position: 'relative'
  },
  timePill: {
    minWidth: 104,
    overflow: 'hidden',
    borderRadius: 9,
    backgroundColor: '#F0F3FB',
    color: '#123CA0',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 9,
    paddingVertical: 8
  },
  timelineDotOuter: {
    position: 'absolute',
    right: -9,
    top: 31,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFF0E7',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  timelineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.orange
  },
  timelineLine: {
    position: 'absolute',
    right: -1,
    top: 40,
    bottom: -1,
    width: 1,
    backgroundColor: '#DEE6F4'
  },
  sessionContent: {
    flex: 1,
    minWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: '#DEE6F4',
    paddingLeft: 22,
    paddingTop: 24,
    paddingBottom: 18
  },
  sessionLabel: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  sessionTitle: {
    color: '#071326',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    marginTop: 8
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 11
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    minHeight: 134,
    backgroundColor: theme.colors.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E2EDF8',
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0B356C',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  statIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  statValue: {
    color: theme.colors.navy,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '700'
  },
  statLabel: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 11
  },
  sectorSection: {
    gap: 14
  },
  sectorHeading: {
    color: theme.colors.orange,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700'
  },
  sectorStack: {
    gap: 14
  },
  sectorCard: {
    minHeight: 184,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 22,
    shadowColor: '#0B356C',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 6
  },
  sectorShade: {
    position: 'absolute',
    right: -24,
    top: -42,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255,255,255,0.22)'
  },
  sectorIconWrap: {
    width: 176,
    height: 148,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -4
  },
  sectorIcon: {
    width: 168,
    height: 148,
    opacity: 0.95
  },
  sectorTitle: {
    color: theme.colors.white,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0,
    width: '100%'
  }
});
