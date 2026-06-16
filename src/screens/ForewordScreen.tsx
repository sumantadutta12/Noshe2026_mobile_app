import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { event } from '../data/events';
import { theme } from '../theme/theme';

const forewords = [
  {
    name: 'Ravindra Kumar',
    role: 'Patron, NOSHE 2026 &\nDirector (Operations), NTPC Ltd',
    image: require('../assets/Ravindra.jpg'),
    accent: '#F37021',
    title: 'A platform for stronger SHE excellence',
    intro:
      'It gives me immense pleasure to host the 2nd Conference on NTPC Occupational Safety, Health and Environment (NOSHE-2026), being organized by NTPC Limited on 3rd to 4th July 2026 at the Power Management Institute (PMI), Noida.',
    paragraphs: [
      'As India advances in its journey of energy transition, the power sector is undergoing a rapid transformation driven by renewable energy integration, with thermal capacity remaining its backbone. In this evolving landscape necessitated by environmental and climate concerns, strong and synergistic Safety, Health, and Environment (SHE) practices are essential for sustainable growth and operational excellence.',
      "As India's largest integrated power utility with an installed capacity of over 90 GW, NTPC remains committed to environmental stewardship and the energy transition, with a target of achieving 60 GW of renewable energy capacity by 2032 and 30 GW of nuclear energy capacity by 2047.",
      'NOSHE conference is an effort in the direction to provide a platform for knowledge sharing on SHE excellence and formulating plan for better tomorrow. The theme of this year\'s conference, "Stronger SHE for building a brighter tomorrow", reflects our commitment to safe, healthy, and environmentally responsible workplaces.',
      'The conference will bring together industry leaders, policymakers, academicians, regulators, and SHE professionals to discuss emerging challenges, innovative solutions, and best practices in occupational health, safety, environmental management, emergency preparedness, disaster resilience, and ESG integration.',
      'I cordially invite you to participate in NOSHE 2026. Your presence and insights will enrich the deliberations and contribute to building a safer, more sustainable, and resilient future.',
      'I look forward to welcoming you to NOSHE 2026.'
    ]
  },
  {
    name: 'Anil Kumar Jadli',
    role: 'Patron, NOSHE 2026 &\nDirector (HR), NTPC Ltd.',
    image: require('../assets/Anil-Kumar.png'),
    accent: '#0A63BB',
    title: 'People-centric safety for sustainable growth',
    intro:
      'In an era marked by rapid industrial transformation and increasing focus on sustainability, the importance of integrating occupational health, safety, and environmental stewardship into organizational culture has become paramount.',
    paragraphs: [
      'As we progress towards a resilient and future-ready workforce, people-centric strategies and safe workplaces form the cornerstone of sustainable growth.',
      'At NTPC, we firmly believe that human capital is our greatest strength, and fostering a culture of safety, well-being, and environmental responsibility is essential to achieving excellence. NOSHE 2026 aims to bring together industry leaders, HR professionals, safety experts, policymakers, and domain specialists to deliberate on emerging challenges, share best practices, and explore innovative approaches in the areas of workplace safety, health, and environment.',
      'The theme of this year\'s conference, "Stronger SHE for building a brighter tomorrow", aptly reflects the importance of integrating safety, health, and environmental responsibility with organizational excellence and human well-being.',
      'At NTPC, we firmly believe that our people are our greatest asset. Ensuring their safety, health, and overall well-being is central to our Human Resource philosophy. A robust Safety, Health, and Environment (SHE) framework not only enhances workplace efficiency but also fosters trust, motivation, and a culture of care across the organization.',
      `I take this opportunity to cordially invite you to NOSHE 2026, being organized by NTPC Limited on 3rd to 4th July 2026 at the ${event.venue}, ${event.address} and grace the conference and actively participate in the deliberations. Your presence and valuable insights will greatly contribute to enriching the discussions and advancing our collective vision of a safe, healthy, and sustainable workplace.`
    ]
  }
] as const;

export function ForewordScreen() {
  return (
    <Screen>
      <LinearGradient
        colors={['#08244D', '#004EA8', '#1684D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroIcon}>
          <Ionicons name="document-text-outline" size={23} color={theme.colors.white} />
        </View>
        <Text style={styles.eyebrow}>Foreword</Text>
        <Text style={styles.heroTitle}>Messages from the Patrons</Text>
        <Text style={styles.heroText}>
          Reflections on NOSHE 2026, the SHE agenda, and the shared path toward safer,
          healthier, and environmentally responsible workplaces.
        </Text>
      </LinearGradient>

      <View style={styles.messageStack}>
        {forewords.map((item) => (
          <View key={item.name} style={styles.messageCard}>
            <View style={styles.cardAccent} />
            <View style={styles.profileRow}>
              <View style={styles.profileCopy}>
                <Text style={[styles.messageKicker, { color: item.accent }]}>Patron Message</Text>
                <Text style={styles.messageTitle}>{item.title}</Text>
              </View>
              <Image source={item.image} style={styles.portrait} resizeMode="cover" />
            </View>

            <View style={[styles.introBox, { borderLeftColor: item.accent }]}>
              <Text style={styles.introText}>{item.intro}</Text>
            </View>

            <View style={styles.paragraphStack}>
              {item.paragraphs.map((paragraph) => (
                <Text key={paragraph} style={styles.body}>
                  {paragraph}
                </Text>
              ))}
            </View>

            <View style={styles.signature}>
              <View style={[styles.signatureRule, { backgroundColor: item.accent }]} />
              <Text style={styles.signatureName}>{item.name}</Text>
              <Text style={styles.signatureRole}>{item.role}</Text>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 26,
    padding: 20,
    gap: 10,
    overflow: 'hidden',
    ...theme.shadow
  },
  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  eyebrow: {
    color: '#DDEBFA',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '800'
  },
  heroText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 22
  },
  messageStack: {
    gap: 16
  },
  messageCard: {
    position: 'relative',
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EEF7',
    overflow: 'hidden',
    ...theme.shadow
  },
  cardAccent: {
    position: 'absolute',
    right: -54,
    bottom: -82,
    width: 138,
    height: 260,
    backgroundColor: '#EAF6FD',
    transform: [{ rotate: '18deg' }]
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14
  },
  profileCopy: {
    flex: 1,
    minWidth: 0
  },
  messageKicker: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase'
  },
  messageTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    marginTop: 6
  },
  portrait: {
    width: 104,
    height: 124,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: theme.colors.white,
    backgroundColor: '#E7EEF6'
  },
  introBox: {
    borderLeftWidth: 4,
    backgroundColor: '#F7FBFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 16
  },
  introText: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600'
  },
  paragraphStack: {
    gap: 12,
    marginTop: 14
  },
  body: {
    color: '#173B63',
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '400',
    textAlign: 'justify'
  },
  signature: {
    marginTop: 20,
    gap: 6
  },
  signatureRule: {
    width: 42,
    height: 3,
    borderRadius: 2,
    marginBottom: 4
  },
  signatureName: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800'
  },
  signatureRole: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500'
  }
});
