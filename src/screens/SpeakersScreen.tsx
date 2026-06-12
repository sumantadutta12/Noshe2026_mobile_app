import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { Screen } from '../components/Screen';
import { sessions } from '../data/sessions';
import { speakers } from '../data/speakers';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { Speaker } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Speakers'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function SpeakersScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const linkedSessions = selectedSpeaker
    ? sessions.filter((session) => session.speakerIds.includes(selectedSpeaker.id))
    : [];

  return (
    <Screen refreshable header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}>
      <LinearGradient
        colors={['#F7FBFF', '#EDF6FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroIcon}>
          <Ionicons name="mic-outline" size={27} color={theme.colors.navy} />
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>Faculty</Text>
          <Text style={styles.title}>Speakers</Text>
          <Text style={styles.subtitle}>Meet the experts leading NOSHE 2026 conversations.</Text>
        </View>
      </LinearGradient>

      <View style={styles.speakerList}>
        {speakers.map((speaker) => (
          <SpeakerListCard
            key={speaker.id}
            speaker={speaker}
            onPress={() => setSelectedSpeaker(speaker)}
          />
        ))}
      </View>
      <Modal
        animationType="slide"
        visible={Boolean(selectedSpeaker)}
        onRequestClose={() => setSelectedSpeaker(null)}
        presentationStyle="fullScreen"
      >
        {selectedSpeaker ? (
          <SafeAreaView style={styles.modal}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.modalContent,
                {
                  paddingTop: Math.max(12, insets.top + 8),
                  paddingBottom: theme.spacing.xl + Math.max(insets.bottom, theme.spacing.lg)
                }
              ]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close speaker details"
                onPress={() => setSelectedSpeaker(null)}
                style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
              >
                <Ionicons name="close" size={24} color="#111827" />
              </Pressable>

              <View style={styles.modalAvatar}>
                {selectedSpeaker.avatarUrl ? (
                  <Image source={{ uri: selectedSpeaker.avatarUrl }} style={styles.modalAvatarImage} />
                ) : (
                  <Text style={styles.modalInitials}>{selectedSpeaker.initials}</Text>
                )}
              </View>

              <Text style={styles.modalName}>{selectedSpeaker.name}</Text>
              <Text style={styles.modalRole}>{selectedSpeaker.designation}</Text>
              <Text style={styles.modalCompany}>{selectedSpeaker.company}</Text>

              <View style={styles.modalSection}>
                <Text style={styles.modalHeading}>Sessions by Speaker</Text>
                {linkedSessions.map((session) => (
                  <View key={session.id} style={styles.modalSessionCard}>
                    <Text style={styles.modalSessionTitle}>{session.title}</Text>

                    <View style={styles.sessionMetaRow}>
                      <Ionicons name="calendar" size={16} color="#A7AFBB" />
                      <Text style={styles.sessionMeta}>{session.day} : {session.date}</Text>
                    </View>

                    <View style={styles.sessionMetaRow}>
                      <Ionicons name="time" size={16} color="#A7AFBB" />
                      <Text style={styles.sessionMeta}>
                        {session.date}, {getSessionTimeRange(session.time, session.duration)} (IST)
                      </Text>
                    </View>

                    {session.hall ? (
                      <View style={styles.sessionMetaRow}>
                        <Ionicons name="location" size={16} color="#A7AFBB" />
                        <Text style={styles.sessionMeta}>{session.hall}</Text>
                      </View>
                    ) : null}

                    <View style={styles.trackPill}>
                      <View style={styles.trackDot} />
                      <Text style={styles.trackText}>{session.track}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        ) : null}
      </Modal>
    </Screen>
  );
}

function SpeakerListCard({ onPress, speaker }: { onPress: () => void; speaker: Speaker }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.speakerCard, pressed && styles.pressed]}>
      <View style={styles.speakerAvatarWrap}>
        {speaker.avatarUrl ? (
          <Image source={{ uri: speaker.avatarUrl }} style={styles.speakerAvatar} />
        ) : (
          <Text style={styles.speakerInitials}>{speaker.initials}</Text>
        )}
      </View>
      <View style={styles.speakerInfo}>
        <Text style={styles.speakerName}>{speaker.name}</Text>
        <Text style={styles.speakerRole}>{speaker.designation}</Text>
        <Text style={styles.speakerCompany}>{speaker.company}</Text>
      </View>
      <View style={styles.speakerArrow}>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.navy} />
      </View>
    </Pressable>
  );
}

function getSessionTimeRange(time: string, duration: string) {
  const endTime = addDuration(time, duration);
  return endTime ? `${time} - ${endTime}` : time;
}

function addDuration(time: string, duration: string) {
  const timeMatch = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!timeMatch) return '';

  const hoursMatch = duration.match(/(\d+)\s*Hour/i);
  const minutesMatch = duration.match(/(\d+)\s*Minute/i);
  const durationMinutes =
    (hoursMatch ? Number(hoursMatch[1]) * 60 : 0) + (minutesMatch ? Number(minutesMatch[1]) : 0);

  let hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  const period = timeMatch[3].toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours24 = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  const endPeriod = endHours24 >= 12 ? 'PM' : 'AM';
  const endHours12 = endHours24 % 12 || 12;

  return `${endHours12}:${String(endMinutes).padStart(2, '0')} ${endPeriod}`;
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#DDECF8',
    ...theme.shadow
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3EEF8'
  },
  heroCopy: {
    flex: 1,
    minWidth: 0
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    fontWeight: '400'
  },
  speakerList: {
    gap: 12
  },
  speakerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 13,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  speakerAvatarWrap: {
    width: 62,
    height: 62,
    borderRadius: 21,
    backgroundColor: '#F6FAFE',
    borderWidth: 1,
    borderColor: '#E2ECF6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  speakerAvatar: {
    width: '100%',
    height: '100%'
  },
  speakerInitials: {
    color: theme.colors.navy,
    fontSize: 16,
    fontWeight: '600'
  },
  speakerInfo: {
    flex: 1,
    minWidth: 0
  },
  speakerName: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600'
  },
  speakerRole: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
    marginTop: 3
  },
  speakerCompany: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    marginTop: 2
  },
  speakerArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F8FD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    flex: 1,
    backgroundColor: '#F3F8FD'
  },
  modalContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 34,
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    marginBottom: -8
  },
  pressed: {
    opacity: 0.72
  },
  modalAvatar: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 22,
    borderWidth: 4,
    borderColor: theme.colors.white,
    shadowColor: '#0F4070',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 5
  },
  modalAvatarImage: {
    width: '100%',
    height: '100%'
  },
  modalInitials: {
    color: theme.colors.white,
    fontSize: 38,
    fontWeight: '600'
  },
  modalName: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '500',
    textAlign: 'center'
  },
  modalRole: {
    color: theme.colors.muted,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 16,
    fontWeight: '400',
    textAlign: 'center'
  },
  modalCompany: {
    color: theme.colors.orange,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center'
  },
  modalSection: {
    alignSelf: 'stretch',
    marginTop: 44,
    gap: 12
  },
  modalHeading: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
    marginBottom: 2
  },
  modalSessionCard: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#E8F0F8',
    borderRadius: 20,
    padding: 16,
    gap: 14,
    backgroundColor: theme.colors.white,
    shadowColor: '#0F4070',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  modalSessionTitle: {
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600'
  },
  sessionMetaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6
  },
  sessionMeta: {
    flex: 1,
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400'
  },
  trackPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: theme.radius.pill,
    backgroundColor: '#EFE9FF',
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginLeft: 22,
    marginTop: -12
  },
  trackDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B7CFF'
  },
  trackText: {
    color: '#303047',
    fontSize: 12,
    fontWeight: '500'
  }
});
