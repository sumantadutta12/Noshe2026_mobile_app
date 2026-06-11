import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Session, Speaker } from '../types';
import { joinNames } from '../utils/format';
import { theme } from '../theme/theme';

type Props = {
  session: Session;
  speakers: Speaker[];
  onPress?: () => void;
};

export function SessionCard({ session, speakers, onPress }: Props) {
  const names = joinNames(speakers.map((speaker) => speaker.name));

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.time}>{session.time}</Text>
          <Text style={styles.hall}>{session.hall}</Text>
        </View>
        <View style={styles.bookmark}>
          <Ionicons
            name={session.bookmarked ? 'bookmark' : 'bookmark-outline'}
            color={session.bookmarked ? theme.colors.orange : theme.colors.muted}
            size={20}
          />
        </View>
      </View>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.speaker}>{names}</Text>
      <View style={styles.trackPill}>
        <Text style={styles.track}>{session.track}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow
  },
  pressed: {
    opacity: 0.88
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  time: {
    color: theme.colors.orange,
    fontSize: 13,
    fontWeight: '900'
  },
  hall: {
    color: theme.colors.muted,
    marginTop: 3,
    fontSize: 12
  },
  bookmark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '900'
  },
  speaker: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  trackPill: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.orangeSoft,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  track: {
    color: theme.colors.navy,
    fontSize: 12,
    fontWeight: '800'
  }
});
