import { Ionicons } from '@expo/vector-icons';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const visitUrl = 'https://www.ntpc.co.in';
const qrImage = require('../assets/qr-scaner.jpg');

const contacts = [
  {
    name: 'Shri. Palash Chakrabortty',
    role: 'DGM (Safety)',
    phone: '+91 8210087062'
  },
  {
    name: 'Shri. Nishant Parmar',
    role: 'Sr. Manager (Environment)',
    phone: '+91 8770573347'
  },
  {
    name: 'Shri. Rahul Gautam',
    role: 'Dt. Manager (HR)',
    phone: '+91 9425276600'
  },
  {
    name: 'Dr. Amritanjay Pandey',
    role: 'Medical Officer',
    phone: '+91 8296737372'
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

      <View style={styles.visitCard}>
        <View style={styles.qrFrame}>
          <Image source={qrImage} style={styles.qrImage} resizeMode="contain" />
        </View>
        <Pressable
          style={({ pressed }) => [styles.visitButton, pressed && styles.pressed]}
          onPress={() => Linking.openURL(visitUrl).catch(() => undefined)}
          accessibilityRole="button"
          accessibilityLabel="Visit us"
        >
          <Ionicons name="open-outline" size={18} color={theme.colors.white} />
          <Text style={styles.visitButtonText}>VISIT US</Text>
        </Pressable>
      </View>

      <View style={styles.secretariatHeader}>
        <View style={styles.headerRule} />
        <Text style={styles.secretariatTitle}>Conference Secretariat</Text>
        <View style={styles.headerRule} />
      </View>

      <View style={styles.cards}>
        {contacts.map((contact) => (
          <View key={contact.phone} style={styles.card}>
            <View style={styles.cardBadge}>
              <Ionicons name="person-outline" size={20} color={theme.colors.white} />
            </View>
            <Text style={styles.cardName}>{contact.name}</Text>
            <Text style={styles.cardRole}>{contact.role}</Text>
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
  visitCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EEF7',
    ...theme.shadow
  },
  qrFrame: {
    width: 184,
    height: 184,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7EEF7',
    overflow: 'hidden'
  },
  qrImage: {
    width: 176,
    height: 176
  },
  visitButton: {
    minWidth: 174,
    minHeight: 46,
    borderRadius: 6,
    backgroundColor: '#0782C6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 18
  },
  visitButtonText: {
    color: theme.colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800'
  },
  secretariatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4
  },
  headerRule: {
    flex: 1,
    height: 1,
    backgroundColor: '#DCEAF7'
  },
  secretariatTitle: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  card: {
    width: '48%',
    minHeight: 178,
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow,
    alignItems: 'center',
    gap: 8
  },
  cardBadge: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardName: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
    textAlign: 'center'
  },
  cardRole: {
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    fontWeight: '600'
  },
  phoneRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: theme.radius.pill,
    backgroundColor: '#FFF7F0',
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  phoneText: {
    color: theme.colors.orange,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800'
  },
  pressed: {
    opacity: 0.86
  }
});
