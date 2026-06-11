import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { Screen } from '../components/Screen';
import { SpeakerCard } from '../components/SpeakerCard';
import { sessions } from '../data/sessions';
import { speakers } from '../data/speakers';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';
import { Speaker } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Speakers'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function SpeakersScreen({ navigation }: Props) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const linkedSessions = selectedSpeaker
    ? sessions.filter((session) => session.speakerIds.includes(selectedSpeaker.id))
    : [];

  return (
    <Screen refreshable header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Faculty</Text>
        <Text style={styles.title}>Speakers</Text>
        <Text style={styles.subtitle}>Meet the experts leading NOSHE 2026 conversations.</Text>
      </View>
      {speakers.map((speaker) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          onPress={() => setSelectedSpeaker(speaker)}
        />
      ))}
      <Modal
        animationType="slide"
        visible={Boolean(selectedSpeaker)}
        onRequestClose={() => setSelectedSpeaker(null)}
        presentationStyle="fullScreen"
      >
        {selectedSpeaker ? (
          <SafeAreaView style={styles.modal}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close speaker details"
              onPress={() => setSelectedSpeaker(null)}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
            >
              <Ionicons name="close" size={24} color="#111827" />
            </Pressable>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalContent}
            >
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
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...theme.shadow
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    fontWeight: '500'
  },
  modal: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  modalContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 34,
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white
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
    marginBottom: 22
  },
  modalAvatarImage: {
    width: '100%',
    height: '100%'
  },
  modalInitials: {
    color: theme.colors.white,
    fontSize: 38,
    fontWeight: '800'
  },
  modalName: {
    color: '#111111',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '300',
    textAlign: 'center'
  },
  modalRole: {
    color: '#222222',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 16,
    textAlign: 'center'
  },
  modalCompany: {
    color: '#222222',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center'
  },
  modalSection: {
    alignSelf: 'stretch',
    marginTop: 44
  },
  modalHeading: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    marginBottom: 14
  },
  modalSessionCard: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#DDE3EA',
    borderRadius: 5,
    padding: 18,
    gap: 18,
    backgroundColor: theme.colors.white
  },
  modalSessionTitle: {
    color: '#111111',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700'
  },
  sessionMetaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6
  },
  sessionMeta: {
    flex: 1,
    color: '#1F2933',
    fontSize: 15,
    lineHeight: 21
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
    fontWeight: '600'
  }
});
