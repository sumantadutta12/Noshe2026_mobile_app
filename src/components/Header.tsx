import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function Header({ eyebrow, title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900'
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22
  }
});
