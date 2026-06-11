import { Ionicons } from '@expo/vector-icons';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { CTAButton } from '../components/CTAButton';
import { Screen } from '../components/Screen';
import { event } from '../data/events';
import { theme } from '../theme/theme';

const venueAddress = 'NTPC Power Management Institute, Sector 16A, Noida, Uttar Pradesh';

function openVenueMap() {
  const query = encodeURIComponent(venueAddress);
  const url = Platform.select({
    ios: `maps:0,0?q=${query}`,
    android: `geo:0,0?q=${query}`
  });

  if (url) {
    Linking.openURL(url).catch(() => {
      const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
      Linking.openURL(fallbackUrl).catch(() => undefined);
    });
  }
}

export function VenueScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Conference Venue</Text>
        <Text style={styles.title}>{event.venue}</Text>
        <Text style={styles.subtitle}>Power Management Institute (PMI), Noida is the host venue for NOSHE 2026.</Text>
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationIcon}>
          <Ionicons name="location-outline" size={24} color={theme.colors.white} />
        </View>
        <View style={styles.locationCopy}>
          <Text style={styles.locationLabel}>Location</Text>
          <Text style={styles.locationTitle}>NTPC Power Management Institute</Text>
          <Text style={styles.locationText}>{event.address}</Text>
        </View>
      </View>

      <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <Text style={styles.mapHeaderTitle}>Venue map</Text>
          <CTAButton
            title="Get directions"
            onPress={openVenueMap}
            icon={<Ionicons name="navigate-outline" size={18} color={theme.colors.white} />}
            style={styles.directionsButton}
          />
        </View>
        <View style={styles.mapPreview}>
          <View style={styles.mapOverlay}>
            <View style={styles.mapMarker}>
              <Ionicons name="location-sharp" size={18} color={theme.colors.white} />
            </View>
            <Text style={styles.mapPinLabel}>NTPC Power Management Institute</Text>
          </View>
          <View style={styles.mapFooter}>
            <Ionicons name="location-outline" size={18} color={theme.colors.orange} />
            <Text style={styles.mapFooterText}>{event.address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoHeading}>Nearby hotels</Text>
        <Text style={styles.infoBody}>Lodhi Hotel, The Oberoi New Delhi, Bloomrooms Link Road, and business hotels near JLN Stadium.</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoHeading}>Transport info</Text>
        <Text style={styles.infoBody}>Metro: JLN Stadium. Airport transfer and local cab pickup zones will be available near Gate 3.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.navy,
    borderRadius: 22,
    padding: theme.spacing.lg,
    gap: 12,
    ...theme.shadow
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.white,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '900'
  },
  subtitle: {
    color: '#D8E3FF',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4
  },
  locationCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    ...theme.shadow,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  locationIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationCopy: {
    flex: 1,
    gap: 6
  },
  locationLabel: {
    color: theme.colors.orange,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  locationTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800'
  },
  locationText: {
    color: theme.colors.muted,
    lineHeight: 20,
    marginTop: 4
  },
  mapCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
    ...theme.shadow,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  mapHeaderTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800'
  },
  directionsButton: {
    minWidth: 130
  },
  mapPreview: {
    minHeight: 220,
    borderRadius: theme.radius.md,
    backgroundColor: '#E9EFFA',
    borderWidth: 1,
    borderColor: theme.colors.line,
    overflow: 'hidden'
  },
  mapOverlay: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(2, 14, 49, 0.18)',
    justifyContent: 'flex-end'
  },
  mapMarker: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm
  },
  mapPinLabel: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22
  },
  mapFooter: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10
  },
  mapFooterText: {
    color: theme.colors.muted,
    flex: 1,
    lineHeight: 20
  },
  infoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow
  },
  infoHeading: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800'
  },
  infoBody: {
    color: theme.colors.muted,
    lineHeight: 20,
    marginTop: 8
  }
});
