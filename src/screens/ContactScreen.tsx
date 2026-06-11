import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const contacts = [
  {
    name: 'Shri. Palash Chakrabortty',
    role: 'DGM (Safety), CC EOC',
    company: 'NTPC Ltd.',
    phone: '+91 8210087062'
  },
  {
    name: 'Shri. Nishant Parmar',
    role: 'Sr. Manager (CC-EMG)',
    company: 'NTPC Ltd.',
    phone: '+91 8770573347'
  },
  {
    name: 'Shri. Narendra Kumar Sharma',
    role: 'AGM, PMI',
    company: 'NTPC Ltd.',
    phone: '+91 9650994074'
  }
];

export function ContactScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Conference Secretariat</Text>
        <Text style={styles.heroTitle}>Contact Team: NOSHE 2026</Text>
        <Text style={styles.heroSubtitle}>
          Reach the official NOSHE 2026 conference secretariat for event coordination and support.
        </Text>
      </View>

      <View style={styles.cards}>
        {contacts.map((contact) => (
          <View key={contact.phone} style={styles.card}>
            <View style={styles.cardBadge}>
              <Ionicons name="person-circle-outline" size={32} color={theme.colors.white} />
            </View>
            <Text style={styles.cardName}>{contact.name}</Text>
            <Text style={styles.cardRole}>{contact.role}</Text>
            <Text style={styles.cardCompany}>{contact.company}</Text>
            <Pressable style={styles.phoneRow} onPress={() => Linking.openURL(`tel:${contact.phone.replace(/\s+/g, '')}`)}>
              <Ionicons name="call-outline" size={18} color={theme.colors.orange} />
              <Text style={styles.phoneText}>{contact.phone}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.navy,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: 10,
    ...theme.shadow
  },
  heroEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '900'
  },
  heroSubtitle: {
    color: '#D8E3FF',
    fontSize: 14,
    lineHeight: 22
  },
  cards: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow,
    gap: 12
  },
  cardBadge: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardName: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800'
  },
  cardRole: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 2
  },
  cardCompany: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  phoneRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  phoneText: {
    color: theme.colors.orange,
    fontSize: 15,
    fontWeight: '700'
  }
});
