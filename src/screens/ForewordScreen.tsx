import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

export function ForewordScreen() {
  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Foreword</Text>
        <Text style={styles.title}>Creating a Resilient Workplace</Text>
        <Text style={styles.body}>
          NOSHE 2026 brings together leaders and practitioners to strengthen occupational
          health, safety, environment and business continuity for a changing climate.
        </Text>
        <Text style={styles.body}>
          The forum is designed to encourage practical collaboration across industry,
          policy, research, emergency preparedness, ESG, wellness and workplace culture.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    gap: 12,
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
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '800'
  },
  body: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500'
  }
});
