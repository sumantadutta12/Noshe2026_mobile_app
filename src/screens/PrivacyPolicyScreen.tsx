import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const policySections = [
  {
    title: 'Information we collect',
    body:
      'NOSHE 2026 may collect registration details such as name, organisation, designation, contact information, attendee type, payment or registration reference, and event preferences submitted through the app or event team.'
  },
  {
    title: 'Camera and QR scanning',
    body:
      'The app requests camera access only for attendee QR scanning and check-in verification. Camera frames are used for scanning in real time and are not stored by the app.'
  },
  {
    title: 'Check-in and attendee services',
    body:
      'QR scan results, registration IDs, check-in status, and attendance timestamps may be used by authorised event administrators to manage entry, badges, attendee support, and event operations.'
  },
  {
    title: 'How information is used',
    body:
      'Information is used to process registrations, provide attendee access, show QR passes, manage event participation, send event updates, respond to support requests, and improve event operations.'
  },
  {
    title: 'Data sharing',
    body:
      'Data may be shared with event organisers, authorised event staff, venue or operations partners, and service providers only when needed to deliver NOSHE 2026 services or meet legal requirements.'
  },
  {
    title: 'Data security and retention',
    body:
      'Reasonable safeguards are used to protect attendee information. Data is retained only as long as needed for event operations, records, support, compliance, or legitimate organiser requirements.'
  },
  {
    title: 'Your choices',
    body:
      'You can deny camera permission, but QR scanning and admin check-in features may not work. For correction, access, or deletion requests, contact the NOSHE 2026 support team.'
  }
] as const;

export function PrivacyPolicyScreen() {
  return (
    <Screen refreshable>
      <LinearGradient
        colors={['#08244D', '#004EA8', '#1684D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroGlow} />
        <View style={styles.heroIcon}>
          <Ionicons name="shield-checkmark-outline" size={24} color={theme.colors.orange} />
        </View>
        <Text style={styles.eyebrow}>NOSHE 2026</Text>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.subtitle}>
          How attendee, registration, camera, and check-in information is handled in this app.
        </Text>
      </LinearGradient>

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Last updated: 12 June 2026</Text>
        <Text style={styles.noticeText}>
          This policy applies to the NOSHE 2026 mobile app and event-related attendee services.
        </Text>
      </View>

      <View style={styles.sectionStack}>
        {policySections.map((section) => (
          <View key={section.title} style={styles.policyCard}>
            <Text style={styles.policyTitle}>{section.title}</Text>
            <Text style={styles.policyText}>{section.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Contact</Text>
        <Text style={styles.contactText}>
          For privacy questions or data requests, please contact the NOSHE 2026 organising team through the Contact Us section in the app.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: 18,
    minHeight: 190,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#08234A',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 6
  },
  heroGlow: {
    position: 'absolute',
    right: -48,
    top: -54,
    width: 172,
    height: 172,
    borderRadius: 86,
    backgroundColor: 'rgba(243,112,33,0.24)'
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.74)',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 0.9,
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginTop: 4
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    marginTop: 8
  },
  noticeCard: {
    backgroundColor: '#FFF6EF',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFE2CF'
  },
  noticeTitle: {
    color: theme.colors.orange,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700'
  },
  noticeText: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    marginTop: 5
  },
  sectionStack: {
    gap: 11
  },
  policyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  policyTitle: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700'
  },
  policyText: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 21,
    fontWeight: '400',
    marginTop: 7
  },
  contactCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#D6E9FF'
  },
  contactTitle: {
    color: theme.colors.navy,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700'
  },
  contactText: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 21,
    fontWeight: '400',
    marginTop: 7
  }
});
