import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { CTAButton } from '../components/CTAButton';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { event } from '../data/events';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;
type Objective = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const objectives: Objective[] = [
  {
    title: 'Promote a Culture of Prevention',
    subtitle:
      'Encourage organizations to foster a proactive, "Zero Harm" safety culture, establishing a deep-rooted value system for operational protection.',
    icon: 'heart-outline'
  },
  {
    title: 'Advance ESG Integration',
    subtitle:
      'Highlight strategic frameworks that seamlessly merge Environmental, Social, and Governance compliance platforms with workplace health systems.',
    icon: 'scale-outline'
  },
  {
    title: 'Harness Digital Innovation',
    subtitle:
      'Explore the transformative power of Artificial Intelligence and digitalization to elevate occupational health monitoring and predictive safety frameworks.',
    icon: 'hardware-chip-outline'
  },
  {
    title: 'Drive Environmental Stewardship',
    subtitle:
      'Map out actionable climate response pathways, evaluating green innovations, circular economy mechanics, and source-to-sink protection models.',
    icon: 'leaf-outline'
  }
];

export function AboutEventScreen({ navigation }: Props) {
  return (
    <Screen>
      <Header eyebrow="About NOSHE 2026" title={event.name} subtitle={event.tagline} />
    

      <View style={styles.section}>
        <Text style={styles.sectionEyebrow}>About the Organiser</Text>
        <Text style={styles.sectionTitle}>NTPC Limited</Text>
        <Text style={styles.body}>
          NTPC Limited, India\'s largest integrated energy company, has been a cornerstone of the nation\'s economic growth since its establishment in 1975. With an installed capacity of over 80 GW, NTPC generates approximately 25% of India\'s total electricity, powering every fourth bulb in the country.
        </Text>
        <Text style={styles.body}>
          The company focuses on delivering power that is economical, efficient and environmentally sustainable, offering a diversified energy mix that includes solar, wind, hydro, floating solar, gas, and coal.
        </Text>
        <Text style={styles.body}>
          NTPC is leading India's energy transition with a target to increase non-fossil fuel-based capacity to 45-50% of its total portfolio by 2032, including 60 GW of renewable energy. Its efforts in renewable energy are evident with over 7 GW of operational renewable capacity and 20 GW in the pipeline.
        </Text>
        <Text style={styles.body}>
          The company has also pioneered green hydrogen initiatives, including the green hydrogen-PNG blending project at Kawas and a hydrogen fuel cell EV trial in Ladakh. Furthermore, NTPC is investing in carbon capture, green ammonia and pumped storage projects to reduce its carbon footprint.
        </Text>
        <Text style={styles.body}>
          Globally, NTPC has expanded its presence with power projects in Bangladesh and Sri Lanka and advises several countries through the International Solar Alliance. Recognized for its excellence, NTPC ranks among the top Indian PSUs and global energy companies, continuing its commitment to national development, sustainability and social responsibility.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionEyebrow}>Conference Focus</Text>
        <Text style={styles.sectionTitle}>Key Objectives</Text>
        <Text style={styles.sectionSubtitle}>
          NOSHE 2026 focuses on practical, future-ready approaches that strengthen safety culture, ESG integration,
          digital transformation, and environmental responsibility.
        </Text>
      </View>

      <View style={styles.objectivesGrid}>
        {objectives.map((objective) => (
          <View key={objective.title} style={styles.objectiveCard}>
            <View style={styles.objectiveIcon}>
              <Ionicons name={objective.icon} size={20} color={theme.colors.white} />
            </View>
            <Text style={styles.objectiveCardTitle}>{objective.title}</Text>
            <Text style={styles.objectiveCardBody}>{objective.subtitle}</Text>
          </View>
        ))}
      </View>

    
     
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  body: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 24
  },
  section: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: 0
  },
  sectionEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  sectionTitle: {
    color: theme.colors.navy,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
    marginTop: 6
  },
  sectionSubtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    fontWeight: '500'
  },
  objectivesGrid: {
    marginTop: theme.spacing.md,
    gap: 12
  },
  objectiveCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...theme.shadow
  },
  objectiveIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  objectiveCardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700'
  },
  objectiveCardBody: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    fontWeight: '500'
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: theme.spacing.lg
  },
  stat: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    ...theme.shadow
  },
  value: {
    color: theme.colors.navy,
    fontSize: 24,
    fontWeight: '900'
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '800'
  }
});
