import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
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

type Sector = {
  title: string;
  image: ImageSourcePropType;
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

const sectoralParticipation: Sector[] = [
  {
    title: 'Power',
    image: require('../assets/sectoral/Power.png')
  },
  {
    title: 'Oil & Gas',
    image: require('../assets/sectoral/Oil -Gas.png')
  },
  {
    title: 'Mining',
    image: require('../assets/sectoral/MINING.png')
  },
  {
    title: 'Manufacturing',
    image: require('../assets/sectoral/Manufacturing.png')
  },
  {
    title: 'Iron, Steel & Aluminium',
    image: require('../assets/sectoral/IRON-Steel-Aluminumi.png')
  },
  {
    title: 'Chemicals & Petrochemicals',
    image: require('../assets/sectoral/chemicals-Petrochemicals.png')
  },
  {
    title: 'Construction',
    image: require('../assets/sectoral/Construction.png')
  },
  {
    title: 'Logistics & Transportation',
    image: require('../assets/sectoral/Logistcs-Transportation.png')
  },
  {
    title: 'Healthcare & Pharma',
    image: require('../assets/sectoral/Healthcare-Pharma.png')
  },
  {
    title: 'Environment & Sustainability',
    image: require('../assets/sectoral/Environment-Sustainability.png')
  },
  {
    title: 'Academy',
    image: require('../assets/sectoral/academy.png')
  },
  {
    title: 'Consultant',
    image: require('../assets/sectoral/consultant.png')
  },
  {
    title: 'Regulators',
    image: require('../assets/sectoral/Regulators.png')
  },
  {
    title: 'HSE & Others',
    image: require('../assets/sectoral/HSE-Others.png')
  }
];

const ntpcLogo = require('../assets/ntpc-logo-1.png');

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

      <View style={styles.sectorSection}>
        <View style={styles.sectorHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>Industry Reach</Text>
            <Text style={styles.sectionTitle}>Sectoral Participation</Text>
          </View>
          {/* <View style={styles.sectorBadge}>
            <Text style={styles.sectorBadgeText}>{sectoralParticipation.length}+</Text>
          </View> */}
        </View>
        <Text style={styles.sectionSubtitle}>
          A broad participation mix from core industries, regulators, institutions, and
          specialist HSE partners.
        </Text>

        <View style={styles.sectorGrid}>
          {sectoralParticipation.map((sector) => (
            <View key={sector.title} style={styles.sectorCard}>
              <View style={styles.sectorImageWrap}>
                <Image source={sector.image} style={styles.sectorImage} resizeMode="contain" />
              </View>
              <Text style={styles.sectorTitle}>{sector.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.ntpcLogoSection}>
        <Text style={styles.ntpcEyebrow}>Organised By</Text>
        <View style={styles.ntpcLogoCard}>
          <Image source={ntpcLogo} style={styles.ntpcLogo} resizeMode="contain" />
        </View>
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
  sectorSection: {
    marginTop: theme.spacing.xl,
    backgroundColor: '#F7FBFF',
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDECF8',
    overflow: 'hidden',
    shadowColor: '#0F4070',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3
  },
  sectorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12
  },
  sectorBadge: {
    minWidth: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  sectorBadgeText: {
    color: theme.colors.white,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800'
  },
  sectorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16
  },
  sectorCard: {
    width: '48%',
    minHeight: 176,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  sectorImageWrap: {
    width: 116,
    height: 116,
    borderRadius: 32,
    backgroundColor: '#EFF7FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDECF8',
    marginBottom: 12,
    overflow: 'hidden'
  },
  sectorImage: {
    width: 98,
    height: 98
  },
  sectorTitle: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    textAlign: 'center'
  },
  ntpcLogoSection: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
    gap: 12
  },
  ntpcEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  ntpcLogoCard: {
    width: '100%',
    minHeight: 120,
    borderRadius: 24,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#E2EDF8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#0F4070',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3
  },
  ntpcLogo: {
    width: 210,
    height: 76
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
