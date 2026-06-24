import { Ionicons } from '@expo/vector-icons';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { CTAButton } from '../components/CTAButton';
import { Screen } from '../components/Screen';
import { event } from '../data/events';
import { theme } from '../theme/theme';

const venueAddress = `${event.venue}, ${event.address}`;
const venueMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(venueAddress)}&output=embed`;
const venueMapHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <style>
      html, body, iframe {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        border: 0;
        overflow: hidden;
        background: #E9EFFA;
      }
    </style>
  </head>
  <body>
    <iframe
      src="${venueMapEmbedUrl}"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen>
    </iframe>
  </body>
</html>
`;
const venueOverview = [
  'PMI is the apex training institute of one of the largest and best power companies in the world, which powers the growth of the fastest-growing major economy in the world-the Indian economy.',
  'Located in the National Capital Region, well connected to Delhi by a state-of-the-art expressway, the Institute has a sprawling 10-acre campus in Sector-16A, NOIDA, in the center of fast-growing IT parks and knowledge hubs which are home to MNCs from across the globe. It faces the green belt along the banks of the Yamuna, and the famous Okhla Bird Sanctuary is only 5 km away. PMI is well connected to all major markets and commercial centers of the National Capital Region.',
  'The Institute is capable of conducting up to 13 programs simultaneously on any particular day. The lecture rooms, conference and seminar rooms are equipped with the very latest in teaching aids and audio-visual facilities. Syndicate rooms for small group activities are also available. For large gatherings and conferences, the Institute has a plush 500-seater auditorium.',
  'PMI draws on diverse sources to bring together thought leaders in its calm and serene environs, from practicing professionals in the large in-house talent pool of NTPC, to industry experts, consultants, and academics from leading business schools. This creates a learning environment that simultaneously educates and enriches.'
];

function openVenueMap() {
  const query = encodeURIComponent(venueAddress);
  const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const url = Platform.select({
    ios: `maps:0,0?q=${query}`,
    android: `geo:0,0?q=${query}`
  });

  if (url) {
    Linking.openURL(url).catch(() => {
      Linking.openURL(fallbackUrl).catch(() => undefined);
    });
  } else {
    Linking.openURL(fallbackUrl).catch(() => undefined);
  }
}

export function VenueScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Conference Venue</Text>
        <Text style={styles.title}>NTPC PMI, Noida</Text>
        {/* <Text style={styles.subtitle}>{event.address}</Text> */}
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationIcon}>
          <Ionicons name="location-outline" size={24} color={theme.colors.white} />
        </View>
        <View style={styles.locationCopy}>
          <Text style={styles.locationLabel}>Location</Text>
          <Text style={styles.locationTitle}>{event.venue}</Text>
          <Text style={styles.locationText}>{event.address}</Text>
        </View>
      </View>

      {/* <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <View style={styles.overviewIcon}>
            <Ionicons name="business-outline" size={22} color={theme.colors.orange} />
          </View>
          <View style={styles.overviewTitleWrap}>
            <Text style={styles.overviewEyebrow}>About the venue</Text>
            <Text style={styles.overviewTitle}>Power Management Institute (PMI)</Text>
          </View>
        </View>
        <View style={styles.overviewDivider} />
        <View style={styles.overviewBody}>
          {venueOverview.map((paragraph) => (
            <Text key={paragraph} style={styles.overviewText}>
              {paragraph}
            </Text>
          ))}
        </View>
      </View> */}

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
          <WebView
            source={{ html: venueMapHtml }}
            style={styles.mapWebView}
            originWhitelist={['*']}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            scalesPageToFit
          />
        </View>
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
  overviewCard: {
    position: 'relative',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.line,
    overflow: 'hidden',
    ...theme.shadow
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  overviewIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: '#FFF2E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE0C7'
  },
  overviewTitleWrap: {
    flex: 1,
    minWidth: 0
  },
  overviewEyebrow: {
    color: theme.colors.orange,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7
  },
  overviewTitle: {
    color: theme.colors.text,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '800',
    marginTop: 3
  },
  overviewDivider: {
    height: 1,
    backgroundColor: '#E7EEF7',
    marginVertical: 14
  },
  overviewBody: {
    gap: 13
  },
  overviewText: {
    color: '#173B63',
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '400',
    textAlign: 'justify'
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
  mapWebView: {
    width: '100%',
    height: 360,
    backgroundColor: '#E9EFFA'
  },
  mapOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 220,
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
