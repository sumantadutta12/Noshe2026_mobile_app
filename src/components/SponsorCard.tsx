import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Sponsor } from '../types';
import { theme } from '../theme/theme';

export function SponsorCard({ sponsor, onPress }: { sponsor: Sponsor; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>{sponsor.name.slice(0, 2).toUpperCase()}</Text>
      </View>
      <Text style={styles.name}>{sponsor.name}</Text>
      <Text style={styles.category}>{sponsor.category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 160,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: theme.spacing.md,
    gap: 10,
    justifyContent: 'center',
    ...theme.shadow
  },
  pressed: {
    opacity: 0.88
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: theme.colors.orange,
    fontSize: 18,
    fontWeight: '900'
  },
  name: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900'
  },
  category: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '800'
  }
});
