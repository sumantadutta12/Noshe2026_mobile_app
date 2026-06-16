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
    title: 'Drive a Culture of Prevention',
    subtitle:
      'Champion a proactive "Zero Harm" culture across organizations, establishing total safety, health and employee well-being as fundamental, deep-rooted values.',
    icon: 'heart-outline'
  },
  {
    title: 'Drive Environmental Stewardship',
    subtitle:
      'Map out actionable climate response pathways, evaluating green innovations, circular economy mechanics, and "Source-to-Sink" protection models.',
    icon: 'leaf-outline'
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
    title: 'Enhancing Knowledge Sharing',
    subtitle:
      'Provide a forum for industry leaders, policymakers, researchers, and practitioners to exchange insights, innovations, and success stories in Occupational, Safety, Health and Environment.',
    icon: 'people-outline'
  }
];

export function AboutEventScreen({ navigation }: Props) {
  return (
    <Screen>
      <Header eyebrow="About NOSHE 2026" title={event.name} subtitle={event.tagline} />
    



      <View style={styles.section}>
        <Text style={styles.sectionEyebrow}>Conference Focus</Text>
        <Text style={styles.sectionTitle}>Key Objectives</Text>
        <Text style={styles.sectionSubtitle}>
          NOSHE 2026 focuses on prevention, environmental stewardship, ESG integration,
          digital innovation, and knowledge sharing across the SHE ecosystem.
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
