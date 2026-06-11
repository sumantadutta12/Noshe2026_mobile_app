import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';
import { EventInfo } from '../types';

const slideImages = [
  require('../assets/slide-1.jpeg'),
  require('../assets/slide-2.jpeg'),
  require('../assets/slide-3.jpeg')
];

const eventTime = '10:00 AM - 7:00 PM';

export function EventCard({ event }: { event: EventInfo }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveSlide((index) => (index + 1) % slideImages.length),
      4500
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={slideImages[activeSlide]}
      style={styles.card}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          'rgba(5, 15, 35, 0.92)',
          'rgba(6, 28, 62, 0.72)',
          'rgba(0, 78, 168, 0.48)'
        ]}
        locations={[0, 0.58, 1]}
        style={styles.overlay}
      />
      <View style={styles.glassPanel} />
      <View style={styles.accentGlow} />

      <View style={styles.cardContent}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={13} color={theme.colors.white} />
          <Text style={styles.badgeText}>Occupational Safety, Health & Environment</Text>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.name}>{event.name}</Text>
          <Text style={styles.tagline}>{event.tagline}</Text>
        </View>

        <View style={styles.infoPanel}>
          <InfoRow icon="calendar-outline" text={event.date} />
          <View style={styles.infoDivider} />
          <InfoRow icon="time-outline" text={eventTime} />
          <View style={styles.infoDivider} />
          <InfoRow icon="location-outline" text={`Venue: ${event.venue}`} />
        </View>
      </View>

      <View style={styles.indicatorRow}>
        {slideImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeSlide ? styles.indicatorActive : styles.indicatorInactive
            ]}
          />
        ))}
      </View>
    </ImageBackground>
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
    minHeight: 300,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.82)',
    shadowColor: '#08234A',
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 34,
    elevation: 10
  },
  image: {
    borderRadius: 24
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  glassPanel: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 40,
    height: 126,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  accentGlow: {
    position: 'absolute',
    right: -42,
    top: 58,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(243,112,33,0.18)'
  },
  cardContent: {
    padding: 20,
    gap: 14
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    maxWidth: '100%',
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600'
  },
  titleBlock: {
    gap: 6
  },
  name: {
    color: theme.colors.white,
    fontSize: 35,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: 0
  },
  tagline: {
    color: '#EEF6FF',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    maxWidth: 300
  },
  infoPanel: {
    marginTop: 10,
    borderRadius: 20,
    padding: 13,
    gap: 9,
    backgroundColor: 'rgba(9,31,61,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9
  },
  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    flex: 1,
    color: theme.colors.white,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600'
  },
  infoDivider: {
    height: 1,
    marginLeft: 35,
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
    paddingBottom: 15
  },
  indicator: {
    height: 7,
    borderRadius: 4
  },
  indicatorActive: {
    width: 22,
    backgroundColor: theme.colors.orange
  },
  indicatorInactive: {
    width: 7,
    backgroundColor: 'rgba(255,255,255,0.5)'
  }
});
