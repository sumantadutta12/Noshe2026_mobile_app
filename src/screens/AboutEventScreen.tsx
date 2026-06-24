import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const ntpcImage = require('../assets/slide-3.jpeg');

const whyAttendItems = [
  {
    number: '01',
    icon: 'shield-checkmark-outline',
    title: 'Move from Reactive to Proactive Safety',
    body:
      'Go beyond standard risk assessments. We are diving into how top organizations are building deep safety cultures that aim for "Zero Harm" by focusing on human values and behavioral psychology.',
  },
  {
    number: '02',
    icon: 'analytics-outline',
    title: 'De-risk Your ESG Strategy',
    body:
      'Environmental, Social, and Governance (ESG) targets are moving fast. You will get a clear look at how to build audit-ready, transparent compliance platforms that turn complex data into a real competitive advantage.',
  },
  {
    number: '03',
    icon: 'hardware-chip-outline',
    title: 'Demystify AI and Digital Tools',
    body:
      'Skip the hype. This is a practical look at how predictive AI and digital innovations are actually being used on the ground to prevent incidents and monitor occupational health in real time.',
  },
  {
    number: '04',
    icon: 'leaf-outline',
    title: 'Practical Climate Adaptation',
    body:
      "Climate change isn't a future problem; it affects daily operations right now. Learn how leading companies are redesigning their emergency preparedness and adopting circular economy models to protect both their people and their bottom line.",
  },
  {
    number: '05',
    icon: 'people-outline',
    title: 'Connect with the Right People',
    body:
      'The biggest value often happens between sessions. You will be networking with peers and experts who face the exact same operational headaches you do, giving you a chance to share notes and bring back proven solutions to your team.',
  },
];

export function AboutEventScreen({}: Props) {
  return (
    <Screen>
      <View style={styles.introSection}>
        <Text style={styles.eyebrow}>ABOUT US</Text>
        <Text style={styles.pageTitle}>NTPC LIMITED</Text>
        <Image source={ntpcImage} style={styles.ntpcImage} resizeMode="cover" />
        <Text style={styles.bodyText}>
     NTPC Limited is India’s largest integrated power utility, driving the nation’s growth with
clean, reliable, and affordable energy for over five decades. Established in 1975, NTPC has
evolved from a thermal power generator into a diversified energy major with a presence
across the entire value chain from conventional and renewable generation to coal mining,
power trading, e-mobility, and green hydrogen.


        </Text>
         <Text style={styles.bodyText}>
       With an installed capacity ~90 GW, NTPC powers every fourth light in India while advancing
the country’s clean energy ambitions. The company is leading the charge toward a
sustainable future, targeting 60 GW of renewable energy capacity by 2032 and investing in
emerging technologies such as nuclear power, battery energy storage, carbon capture, and
green chemicals.
        </Text>
        <Text style={styles.bodyText}>
         As a Maharatna company under the Ministry of Power, Government of India, NTPC stands
for excellence in engineering, safety, and sustainability. Our operations consistently deliver
higher reliability and plant loading than national averages, reflecting our unwavering focus
on performance and environmental stewardship.
Beyond power generation, NTPC is committed to empowering communities, nurturing
innovation, and building a resilient energy ecosystem that supports India’s rapid economic
growth. With people at its core and sustainability at its heart, NTPC continues to energize
India’s progress responsibly and relentlessly.
        </Text>
      </View>

      <View style={styles.whySection}>
        <Text style={styles.eyebrow}>ABOUT NOSHE</Text>
        <Text style={styles.sectionTitle}>Why Attend?</Text>
        <Text style={styles.bodyText}>
          If you look at the challenges we are facing right now, it is clear that standard compliance checklists aren't
          enough anymore. Managing Safety, Health, and the Environment (SHE) requires a completely different level of
          agility.
        </Text>
        <Text style={styles.bodyText}>
          This year, under the theme{' '}
          <Text style={styles.boldText}>"Stronger SHE for Building a Brighter Tomorrow"</Text> NOSHE 2026 isn't just
          about reviewing regulations. It's a hands-on look at how to build a workplace that can withstand economic
          shifts, regulatory changes, and a volatile climate. We are bringing together the people who are actually
          shaping the industry: policy makers, safety directors, environmental engineers, and corporate leadership from
          across the globe.
        </Text>
        <Text style={styles.reasonHeading}>Here is why you need to be in the room:</Text>
      </View>

      <View style={styles.reasonStack}>
        {whyAttendItems.map((item) => (
          <View key={item.number} style={styles.reasonCard}>
            <View style={styles.iconBadge}>
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={28} color={theme.colors.white} />
            </View>
            <Text style={styles.reasonTitle}>{item.title}</Text>
            <Text style={styles.reasonBody}>{item.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.finalCallout}>
        <Text style={styles.finalText}>
          The landscape is changing rapidly. Don't wait for a major incident or a regulatory penalty to adapt. Join us
          at NOSHE 2026 to get the insights, tech strategies, and peer connections you need to build a safer, more
          resilient organization.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  introSection: {
    gap: 16,
  },
  whySection: {
    gap: 12,
    marginTop: 10,
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  pageTitle: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  sectionTitle: {
    color: theme.colors.navy,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
  },
  ntpcImage: {
    width: '100%',
    height: 250,
    borderRadius: 6,
    backgroundColor: theme.colors.white,
  },
  bodyText: {
    color: theme.colors.muted,
    fontSize: 16,
    lineHeight: 27,
    fontWeight: '400',
  },
  boldText: {
    color: '#000000',
    fontWeight: '700',
  },
  reasonHeading: {
    color: theme.colors.orange,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    marginTop: 10,
  },
  reasonStack: {
    gap: 18,
  },
  reasonCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DDECF8',
    shadowColor: '#0B356C',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  iconBadge: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  reasonTitle: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  reasonBody: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '400',
    marginTop: 12,
  },
  finalCallout: {
    backgroundColor: theme.colors.white,
    borderLeftWidth: 8,
    borderLeftColor: theme.colors.navy,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#0B356C',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
  },
  finalText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
  },
});
