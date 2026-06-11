import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Speaker } from '../types';
import { theme } from '../theme/theme';

export function SpeakerCard({ speaker, onPress }: { speaker: Speaker; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.avatar}>
        {speaker.avatarUrl ? (
          <Image source={{ uri: speaker.avatarUrl }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.initials}>{speaker.initials}</Text>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{speaker.name}</Text>
        <Text style={styles.role}>{speaker.designation}</Text>
        <Text style={styles.company}>{speaker.company}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...theme.shadow
  },
  pressed: {
    opacity: 0.88
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 22,
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
    fontWeight: '700',
    fontSize: 17
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 3
  },
  name: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700'
  },
  role: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17
  },
  company: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '600'
  }
});
