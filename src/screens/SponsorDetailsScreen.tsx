import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { CTAButton } from '../components/CTAButton';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { sponsors } from '../data/sponsors';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SponsorDetails'>;

export function SponsorDetailsScreen({ route }: Props) {
  const sponsor = sponsors.find((item) => item.id === route.params.sponsorId);
  if (!sponsor) return null;

  return (
    <Screen>
      <View style={styles.logo}>
        <Text style={styles.logoText}>{sponsor.name.slice(0, 2).toUpperCase()}</Text>
      </View>
      <Header eyebrow={sponsor.category} title={sponsor.name} subtitle={sponsor.website} />
      <View style={styles.card}>
        <Text style={styles.heading}>Partner profile</Text>
        <Text style={styles.body}>{sponsor.description}</Text>
      </View>
      <CTAButton title="Visit partner booth" icon={<Ionicons name="storefront-outline" size={18} color={theme.colors.white} />} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 116,
    height: 116,
    borderRadius: 28,
    backgroundColor: theme.colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: theme.colors.orange,
    fontSize: 34,
    fontWeight: '900'
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  heading: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  body: {
    color: theme.colors.muted,
    lineHeight: 23,
    marginTop: 8
  }
});
