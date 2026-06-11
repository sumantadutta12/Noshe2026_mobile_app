import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { SessionCard } from '../components/SessionCard';
import { sessions } from '../data/sessions';
import { speakers } from '../data/speakers';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SpeakerDetails'>;

export function SpeakerDetailsScreen({ route, navigation }: Props) {
  const speaker = speakers.find((item) => item.id === route.params.speakerId);
  if (!speaker) return null;
  const linkedSessions = sessions.filter((session) => session.speakerIds.includes(speaker.id));

  return (
    <Screen>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          {speaker.avatarUrl ? (
            <Image source={{ uri: speaker.avatarUrl }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.initials}>{speaker.initials}</Text>
          )}
        </View>
        <Header title={speaker.name} subtitle={`${speaker.designation}, ${speaker.company}`} />
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Bio</Text>
        <Text style={styles.body}>{speaker.bio}</Text>
      </View>
      <Text style={styles.heading}>Linked sessions</Text>
      {linkedSessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          speakers={[speaker]}
          onPress={() => navigation.navigate('SessionDetails', { sessionId: session.id })}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 18,
    gap: theme.spacing.md,
    ...theme.shadow
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 32,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  initials: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: '700'
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  heading: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700'
  },
  body: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8
  }
});
