import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { Screen } from '../components/Screen';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Members'>,
  NativeStackScreenProps<RootStackParamList>
>;

const chiefMember = {
  name: 'Shri. Gurdeep Singh',
  role: 'Chairman & Managing Director',
  company: 'NTPC Ltd.',
  image: require('../assets/Gurdeep.jpg')
};

const patrons = [
  {
    name: 'Shri. Ravindra Kumar',
    role: 'Director (Operations)',
    company: 'NTPC Ltd.',
    image: require('../assets/Ravindra.jpg')
  },
  {
    name: 'Shri. Anil Kumar Jadli',
    role: 'Director (HR)',
    company: 'NTPC Ltd.',
    image: require('../assets/Anil-Kumar.png')
  }
];

const steeringCommittee = [
  {
    name: 'Shri. Vijay Goel',
    role: 'Executive Director - Safety',
    company: 'NTPC Ltd.',
    image: require('../assets/Vijay-Goel.png')
  },
  {
    name: 'Shri. T K Bandyopadhyay',
    role: 'Executive Director - SEA (Sustainable, Environment, Ash Management)',
    company: 'NTPC Ltd.',
    image: require('../assets/T-K-Bandyopadhyay.png')
  },
  {
    name: 'Ms. Rachana Singh Bhal',
    role: 'Executive Director - PMI',
    company: 'NTPC Ltd.',
    image: require('../assets/Rachana-Singh-Bhal.jpg')
  },
  {
    name: 'Dr. Basanta Kumar Behera',
    role: 'GM (Chief Medical Officer)',
    company: 'NTPC Ltd.',
    image: require('../assets/Basanta-Kumar-Behera.jpg')
  }
];

export function SponsorsScreen({ navigation }: Props) {
  return (
    <Screen refreshable header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>NOSHE 2026</Text>
        <Text style={styles.title}>Members</Text>
        <Text style={styles.subtitle}>Chief patrons, patrons, and steering committee members.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chief Patron & Chief Guest</Text>
        <View style={styles.featuredCard}>
          <Image source={chiefMember.image} style={styles.featuredImage} />
          <Text style={styles.featuredName}>{chiefMember.name}</Text>
          <Text style={styles.role}>{chiefMember.role}</Text>
          <Text style={styles.company}>{chiefMember.company}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patrons</Text>
        <View style={styles.grid}>
          {patrons.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steering Committee</Text>
        <View style={styles.grid}>
          {steeringCommittee.map((member) => (
            <MemberCard key={member.name} member={member} compact />
          ))}
        </View>
      </View>
    </Screen>
  );
}

function MemberCard({
  compact,
  member
}: {
  compact?: boolean;
  member: { name: string; role: string; company: string; image: ImageSourcePropType };
}) {
  return (
    <View style={[styles.memberCard, compact && styles.compactCard]}>
      <Image source={member.image} style={[styles.memberImage, compact && styles.compactImage]} />
      <Text style={styles.memberName}>{member.name}</Text>
      <Text style={styles.memberRole}>{member.role}</Text>
      <Text style={styles.memberCompany}>{member.company}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...theme.shadow
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    fontWeight: '500'
  },
  section: {
    gap: 12
  },
  sectionTitle: {
    color: '#5C6BC0',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  featuredCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...theme.shadow
  },
  featuredImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.background
  },
  featuredName: {
    color: '#5C6BC0',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center'
  },
  role: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center'
  },
  company: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12
  },
  memberCard: {
    width: '48%',
    minHeight: 236,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...theme.shadow
  },
  compactCard: {
    minHeight: 218
  },
  memberImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: theme.colors.background
  },
  compactImage: {
    width: 88,
    height: 88,
    borderRadius: 44
  },
  memberName: {
    color: '#5C6BC0',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center'
  },
  memberRole: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center'
  },
  memberCompany: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center'
  }
});
