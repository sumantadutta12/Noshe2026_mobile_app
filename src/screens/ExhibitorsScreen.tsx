import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const exhibitors = ['PPE Innovation Zone', 'Safety Simulation Lab', 'Emergency Equipment Pavilion', 'Digital HSE Startup Row'];

export function ExhibitorsScreen() {
  return (
    <Screen>
      <Header eyebrow="Expo" title="Exhibitors" subtitle="Explore solution providers and live demonstration zones." />
      {exhibitors.map((item, index) => (
        <View key={item} style={styles.card}>
          <Text style={styles.booth}>Booth {String(index + 1).padStart(2, '0')}</Text>
          <Text style={styles.title}>{item}</Text>
          <Text style={styles.copy}>Visit for demos, product briefings, and expert consultations.</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow
  },
  booth: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '900'
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6
  },
  copy: {
    color: theme.colors.muted,
    lineHeight: 21,
    marginTop: 6
  }
});
