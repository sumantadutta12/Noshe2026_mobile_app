import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';
import { EventInfo } from '../types';

const eventTheme = 'Stronger SHE for Building a Brighter Tomorrow';

export function EventCard({ event }: { event: EventInfo }) {
  return (
    <LinearGradient
      colors={['#06152E', '#063E83', '#0A78C8']}
      locations={[0, 0.62, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <LinearGradient
        colors={[
          'rgba(4, 13, 30, 0.38)',
          'rgba(5, 30, 65, 0.2)',
          'rgba(0, 78, 168, 0.08)'
        ]}
        locations={[0, 0.58, 1]}
        style={styles.overlay}
      />
      <View style={styles.accentGlow} />
      <View style={styles.accentGlowSoft} />

      <View style={styles.cardContent}>
        {/* <View style={styles.heroTopline}>
          <View style={styles.toplineRule} />
          <Text style={styles.toplineText}>National Conference</Text>
        </View> */}

        <View style={styles.titleBlock}>
          <Text style={styles.name}>{event.name}</Text>
          <Text style={styles.tagline}>{event.tagline}</Text>
          <View style={styles.themeBlock}>
            <Text style={styles.themeLabel}>Theme</Text>
            <Text style={styles.themeText}>{eventTheme}</Text>
          </View>
        </View>

        <View style={styles.infoPanel}>
          <InfoRow icon="calendar-outline" text={event.date} />
          <View style={styles.infoDivider} />
          <InfoRow icon="location-outline" text={`Venue: ${event.venue}, ${event.address}`} />
        </View>
      </View>
    </LinearGradient>
  );
}

function InfoRow({
  icon,
  text
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={14} color={theme.colors.orange} />
      </View>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 318,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.88)',
    shadowColor: '#08234A',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 22 },
    shadowRadius: 36,
    elevation: 12
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  accentGlow: {
    position: 'absolute',
    right: -48,
    top: 56,
    width: 165,
    height: 165,
    borderRadius: 83,
    backgroundColor: 'rgba(243,112,33,0.2)'
  },
  accentGlowSoft: {
    position: 'absolute',
    left: -52,
    bottom: -58,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(22,132,216,0.2)'
  },
  cardContent: {
    padding: 20,
    paddingTop: 24,
    gap: 17
  },
  heroTopline: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingTop: 2
  },
  toplineRule: {
    width: 34,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.orange
  },
  toplineText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  titleBlock: {
    gap: 7,
    maxWidth: 306
  },
  name: {
    color: theme.colors.white,
    fontSize: 32,
    lineHeight: 37,
    fontWeight: '700',
    letterSpacing: 0
  },
  tagline: {
    color: '#EEF6FF',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    maxWidth: 292
  },
  themeBlock: {
    marginTop: 5,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.orange,
    paddingLeft: 10,
    gap: 3
  },
  themeLabel: {
    color: '#FFC229',
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '800',
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  themeText: {
    color: theme.colors.white,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '600',
    maxWidth: 296
  },
  infoPanel: {
    marginTop: 6,
    borderRadius: 20,
    padding: 14,
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9
  },
  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(243,112,33,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(243,112,33,0.24)'
  },
  infoText: {
    flex: 1,
    color: theme.colors.white,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '700'
  },
  infoDivider: {
    height: 1,
    marginLeft: 39,
    backgroundColor: 'rgba(255,255,255,0.13)'
  },
});
