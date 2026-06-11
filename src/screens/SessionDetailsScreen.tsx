import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { CTAButton } from '../components/CTAButton';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { SpeakerCard } from '../components/SpeakerCard';
import { sessions } from '../data/sessions';
import { speakers } from '../data/speakers';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SessionDetails'>;

export function SessionDetailsScreen({ route, navigation }: Props) {
  const session = sessions.find((item) => item.id === route.params.sessionId);
  if (!session) return null;
  const linkedSpeakers = speakers.filter((speaker) => session.speakerIds.includes(speaker.id));

  return (
    <Screen>
      <Header eyebrow={session.track} title={session.title} subtitle={`${session.date} • ${session.time}`} />
      <View style={styles.metaCard}>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={20} color={theme.colors.orange} />
          <Text style={styles.meta}>{session.hall}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={20} color={theme.colors.orange} />
          <Text style={styles.meta}>{session.day}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={20} color={theme.colors.orange} />
          <Text style={styles.meta}>{session.duration}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About this session</Text>
        <Text style={styles.body}>{session.summary}</Text>
      </View>
      <CTAButton title={session.bookmarked ? 'Bookmarked' : 'Bookmark session'} icon={<Ionicons name="bookmark-outline" size={18} color={theme.colors.white} />} />
      <Text style={styles.sectionTitle}>Speakers</Text>
      {linkedSpeakers.map((speaker) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          onPress={() => navigation.navigate('SpeakerDetails', { speakerId: speaker.id })}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  metaCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: 12,
    ...theme.shadow
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  meta: {
    color: theme.colors.text,
    fontWeight: '800'
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  body: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 23
  }
});
