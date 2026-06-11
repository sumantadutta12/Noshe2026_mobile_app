import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const organisers = [
  {
    title: 'Organised By',
    name: 'NTPC Limited',
    description:
      'NTPC Limited, India\'s largest integrated energy company, has been a cornerstone of the nation\'s economic growth since its establishment in 1975. With an installed capacity of over 80 GW, NTPC generates approximately 25% of India\'s total electricity, powering every fourth bulb in the country.\n\nThe company focuses on delivering power that is economical, efficient and environmentally sustainable, offering a diversified energy mix that includes solar, wind, hydro, floating solar, gas, and coal.\n\nNTPC is leading India\'s energy transition with a target to increase non-fossil fuel-based capacity to 45-50% of its total portfolio by 2032, including 60 GW of renewable energy. Its efforts in renewable energy are evident with over 7 GW of operational renewable capacity and 20 GW in the pipeline.\n\nThe company has also pioneered green hydrogen initiatives, including the green hydrogen-PNG blending project at Kawas and a hydrogen fuel cell EV trial in Ladakh. Furthermore, NTPC is investing in carbon capture, green ammonia and pumped storage projects to reduce its carbon footprint.\n\nGlobally, NTPC has expanded its presence with power projects in Bangladesh and Sri Lanka and advises several countries through the International Solar Alliance. Recognized for its excellence, NTPC ranks among the top Indian PSUs and global energy companies, continuing its commitment to national development, sustainability and social responsibility.'
  },
  {
    title: 'Knowledge & Industry Partners',
    name: 'Occupational Health and Safety Community',
    description: 'Policy makers, experts, industry leaders and HSE professionals across sectors.'
  }
];

export function OrganisersScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>NOSHE 2026</Text>
        <Text style={styles.title}>About the Organiser</Text>
        <Text style={styles.subtitle}>NTPC Limited and its partnership network for the event.</Text>
      </View>
      {organisers.map((item) => (
        <View key={item.title} style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name="business-outline" size={22} color={theme.colors.orange} />
          </View>
          <View style={styles.copy}>
            <Text style={styles.cardEyebrow}>{item.title}</Text>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardBody}>{item.description}</Text>
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
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
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    flexDirection: 'row',
    gap: 12,
    ...theme.shadow
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: theme.colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  copy: {
    flex: 1,
    gap: 4
  },
  cardEyebrow: {
    color: theme.colors.orange,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700'
  },
  cardBody: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500'
  }
});
