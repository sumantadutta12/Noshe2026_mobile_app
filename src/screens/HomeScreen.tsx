import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { CTAButton } from '../components/CTAButton';
import { EventCard } from '../components/EventCard';
import { QuickActionCard } from '../components/QuickActionCard';
import { Screen } from '../components/Screen';
import { event } from '../data/events';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const conferenceDays = [
  {
    day: 'DAY 1',
    date: '03rd July 2026',
    colors: ['#6576D9', '#263EAA'],
    sessions: [
      {
        time: '10:00 - 11:30',
        label: 'INAUGURAL SESSION',
        title: 'Opening remarks and conference inauguration'
      },
      {
        time: '12:00 - 13:00',
        label: 'PLENARY 1: OPENING PLENARY',
        title: 'Strategies for integrating ESG framework with SHE for sustainable workplace'
      },
      {
        time: '14:00 - 15:15',
        label: 'TECHNICAL SESSION 1: ENVIRONMENT',
        title: 'Environmental protection and management from source to sink approach'
      },
      {
        time: '15:45 - 17:00',
        label: 'PLENARY 2: INDUSTRY PLENARY (SAFETY)',
        title: 'Zero Harm: shaping workplace safety through culture and values'
      },
      {
        time: '17:00 - 18:15',
        label: 'PLENARY 3: HEALTH',
        title: 'Occupational health and safety: a strategic approach to workplace wellness'
      }
    ]
  },
  {
    day: 'DAY 2',
    date: '04th July 2026',
    colors: ['#1F5A84', '#1978B7'],
    sessions: [
      {
        time: '09:00 - 09:30',
        label: 'MEDITATION & SELF REALISATION SESSION',
        title: 'Focused morning session for reflection and readiness'
      },
      {
        time: '09:30 - 10:30',
        label: 'TECHNICAL SESSION 2: TECHNICAL SAFETY',
        title: 'Sustainability, climate action, circular economy and green innovations'
      },
      {
        time: '10:30 - 11:30',
        label: 'TECHNICAL SESSION 3: AI (HEALTH & SAFETY)',
        title: 'Transforming workplace occupational health and safety through AI and digital innovation'
      },
      {
        time: '11:50 - 13:00',
        label: 'PLENARY 4: SAFETY',
        title: 'Emergency preparedness: amalgamation of experience, framework and technology'
      }
    ]
  }
] as const;

const specialAttractions = [
  {
    icon: 'podium',
    title: 'High-Level Conference',
    body: 'Focused on cutting-edge ESG frameworks, AI-driven workplace safety, and global green compliance.'
  },
  {
    icon: 'people-outline',
    title: 'Networking & B2B Engagement',
    body: 'Structured opportunities to collaborate with decision-makers from top-tier energy, manufacturing, and technology sectors.'
  }
] as const;

const specialAttractionsImage = require('../assets/slide-2.jpeg');
const eventStartTime = new Date('2026-07-03T10:00:00+05:30').getTime();
const eventTimeLabel = '10:00 AM onwards';

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
            <Text style={styles.countHeading}>Event starts in</Text>
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
            <View style={styles.timeChipRow}>
              <View style={styles.timeChip}>
                <View style={styles.timeIconCircle}>
                  <Ionicons name="time-outline" size={12} color={theme.colors.white} />
                </View>
                <Text style={styles.timeChipText}>{eventTimeLabel}</Text>
              </View>
              <View style={styles.timeChip}>
                <View style={styles.timeIconCircle}>
                  <Ionicons name="location-outline" size={12} color={theme.colors.white} />
                </View>
                <Text style={styles.timeChipText}>PMI Noida</Text>
              </View>
            </View>

            <CTAButton title="Register Now" style={styles.countRegister} onPress={() => navigation.navigate('Tickets')} />
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
          title="Speakers"
          icon={<Ionicons name="people-outline" size={23} color={theme.colors.orange} />}
          onPress={() => navigation.navigate('Speakers')}
        />
        <QuickActionCard
          title="Venue"
          icon={<Ionicons name="location-outline" size={23} color={theme.colors.orange} />}
          onPress={() => navigation.navigate('Venue')}
        />
        <QuickActionCard
          title="Members"
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
                      <Text style={styles.sessionTitle}>{session.title}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
      <LinearGradient
        colors={['#10233F', '#0A1A31']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.specialSection}
      >
        <ImageBackground
          source={specialAttractionsImage}
          resizeMode="cover"
          imageStyle={styles.specialImage}
          style={styles.specialVisual}
        >
          <LinearGradient
            colors={['rgba(7, 16, 31, 0.08)', 'rgba(7, 16, 31, 0.72)']}
            style={styles.specialImageOverlay}
          />
          <View style={styles.visualTagRow}>
            {['Insight-led safety', 'ESG integration', 'Industry collaboration'].map((item) => (
              <View key={item} style={styles.visualTag}>
                <Text style={styles.visualTagText}>{item}</Text>
              </View>
            ))}
          </View>
        </ImageBackground>
        <View style={styles.specialCopy}>
          <Text style={styles.specialEyebrow}>Special Attractions</Text>
          <Text style={styles.specialTitle}>
            Insight-led safety, ESG, and industry collaboration.
          </Text>
          <Text style={styles.specialText}>
            A focused conference experience shaped around practical knowledge, live technology
            discovery, and meaningful business conversations.
          </Text>
        </View>
        <View style={styles.specialCards}>
          {specialAttractions.map((item) => (
            <View key={item.title} style={styles.specialCard}>
              <LinearGradient
                colors={['#F47A3D', '#5B6FE8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.specialIcon}
              >
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={22}
                  color={theme.colors.white}
                />
              </LinearGradient>
              <View style={styles.specialCardCopy}>
                <Text style={styles.specialCardTitle}>{item.title}</Text>
                <Text style={styles.specialCardText}>{item.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>
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
    backgroundColor: theme.colors.white,
    borderRadius: 28,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2EDF8',
    shadowColor: '#0B356C',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 4
  },
  premiumCountdown: {
    borderRadius: 24,
    padding: 16,
    gap: 13,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)'
  },
  countGlow: {
    position: 'absolute',
    right: -18,
    top: -54,
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  countHeading: {
    color: theme.colors.white,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600'
  },
  countdownGrid: {
    flexDirection: 'row',
    gap: 8
  },
  countdownCard: {
    flex: 1,
    minHeight: 82,
    borderRadius: 8,
    backgroundColor: '#F8FBFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    shadowColor: '#071326',
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3
  },
  countdownValue: {
    color: '#C8A58E',
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '800'
  },
  countdownLabel: {
    color: theme.colors.text,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700'
  },
  timeChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10
  },
  timeChip: {
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  timeIconCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)'
  },
  timeChipText: {
    color: theme.colors.white,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '800'
  },
  countRegister: {
    minHeight: 46,
    borderRadius: 16,
    marginTop: 1
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
  specialSection: {
    borderRadius: 24,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#071326',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 24,
    elevation: 6
  },
  specialVisual: {
    minHeight: 210,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)'
  },
  specialImage: {
    borderRadius: 18
  },
  specialImageOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  visualTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 'auto'
  },
  visualTag: {
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(9, 20, 38, 0.64)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  visualTagText: {
    color: theme.colors.white,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500'
  },
  specialCopy: {
    gap: 10
  },
  specialEyebrow: {
    color: '#FFC229',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase'
  },
  specialTitle: {
    color: theme.colors.white,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '600',
    letterSpacing: 0
  },
  specialText: {
    color: '#DDE8F8',
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '400'
  },
  specialCards: {
    gap: 12
  },
  specialCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)'
  },
  specialIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  specialCardCopy: {
    flex: 1,
    minWidth: 0,
    gap: 6
  },
  specialCardTitle: {
    color: theme.colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600'
  },
  specialCardText: {
    color: '#DDE8F8',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400'
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
  }
});
