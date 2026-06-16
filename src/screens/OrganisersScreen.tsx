import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const organiserOverview = [
  'NTPC Limited is India\'s largest integrated power utility, driving the nation\'s growth with clean, reliable, and affordable energy for over five decades. Established in 1975, NTPC has evolved from a thermal power generator into a diversified energy major with a presence across the entire value chain from conventional and renewable generation to coal mining, power trading, e-mobility, and green hydrogen.',
  'With an installed capacity ~90 GW, NTPC powers every fourth light in India while advancing the country\'s clean energy ambitions. The company is leading the charge toward a sustainable future, targeting 60 GW of renewable energy capacity by 2032 and investing in emerging technologies such as nuclear power, battery energy storage, carbon capture, and green chemicals.',
  'As a Maharatna company under the Ministry of Power, Government of India, NTPC stands for excellence in engineering, safety, and sustainability. Our operations consistently deliver higher reliability and plant loading than national averages, reflecting our unwavering focus on performance and environmental stewardship.',
  'Beyond power generation, NTPC is committed to empowering communities, nurturing innovation, and building a resilient energy ecosystem that supports India\'s rapid economic growth. With people at its core and sustainability at its heart, NTPC continues to energize India\'s progress responsibly and relentlessly.'
];

const organisers = [
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
      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <View style={styles.overviewIcon}>
            <Ionicons name="flash-outline" size={22} color={theme.colors.orange} />
          </View>
          <View style={styles.overviewTitleWrap}>
            <Text style={styles.cardEyebrow}>Organised By</Text>
            <Text style={styles.overviewTitle}>NTPC Limited</Text>
          </View>
        </View>
        <View style={styles.overviewDivider} />
        <View style={styles.overviewBody}>
          {organiserOverview.map((paragraph) => (
            <Text key={paragraph} style={styles.overviewText}>
              {paragraph}
            </Text>
          ))}
        </View>
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
  overviewCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EEF7',
    overflow: 'hidden',
    ...theme.shadow
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  overviewIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: '#FFF2E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE0C7'
  },
  overviewTitleWrap: {
    flex: 1,
    minWidth: 0
  },
  overviewTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    marginTop: 3
  },
  overviewDivider: {
    height: 1,
    backgroundColor: '#E7EEF7',
    marginVertical: 14
  },
  overviewBody: {
    gap: 13
  },
  overviewText: {
    color: '#173B63',
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '400',
    textAlign: 'justify'
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
