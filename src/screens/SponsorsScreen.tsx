import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    name: 'Shri. Kasina Chandramouli',
    role: 'ED (Safety, Sustainability, Environment & Ash Management)',
    company: 'NTPC Ltd.',
    image: require('../assets/Shri-Kasina-Chandramouli.png')
  },
  {
    name: 'Ms. Rachana Singh Bhal',
    role: 'ED (HR-Strategic HR & Talent Management)',
    company: 'NTPC Ltd.',
    image: require('../assets/Ms. Rachana Singh Bhal.png')
  },
  {
    name: 'Dr. Basanta Kumar Behera',
    role: 'GM (Chief Medical Officer)',
    company: 'NTPC Ltd.',
    image: require('../assets/Dr. Basanta Kumar Behera.png')
  },
  {
    name: 'Shri. Vinod Rattan',
    role: 'GM (Environment)',
    company: 'NTPC Ltd.',
    image: require('../assets/Shri-Vinod-Rattan.png')
  },
  {
    name: 'Shri. Chandan Shahi',
    role: 'GM (Safety)',
    company: 'NTPC Ltd.',
    image: require('../assets/Shri-Chandan-Shahi.png')
  }
];

export function SponsorsScreen({ navigation }: Props) {
  return (
    <Screen refreshable header={<AppHeader onProfilePress={() => navigation.navigate('More')} />}>
      <LinearGradient
        colors={['#F7FBFF', '#EDF6FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroIcon}>
          <Ionicons name="people-circle-outline" size={28} color={theme.colors.navy} />
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>NOSHE 2026</Text>
          <Text style={styles.title}>Members</Text>
          <Text style={styles.subtitle}>Chief patrons, patrons, and steering committee members.</Text>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <SectionHeader title="Chief Patron & Chief Guest" />
        <View style={styles.featuredCard}>
          <LinearGradient
            colors={['#FFF6EF', '#EAF4FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredImageRing}
          >
            <Image source={chiefMember.image} style={styles.featuredImage} resizeMode="contain" />
          </LinearGradient>
          <View style={styles.featuredCopy}>
            <Text style={styles.featuredName}>{chiefMember.name}</Text>
            <Text style={styles.role}>{chiefMember.role}</Text>
            <Text style={styles.company}>{chiefMember.company}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Patrons" />
        <View style={styles.grid}>
          {patrons.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Steering Committee" />
        <View style={styles.grid}>
          {steeringCommittee.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </View>
      </View>
    </Screen>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionRule} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
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
      <View style={[styles.memberImageWrap, compact && styles.compactImageWrap]}>
        <Image
          source={member.image}
          style={[styles.memberImage, compact && styles.compactImage]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.memberName}>{member.name}</Text>
      <Text style={styles.memberRole}>{member.role}</Text>
      <Text style={styles.memberCompany}>{member.company}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#DDECF8',
    ...theme.shadow
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3EEF8'
  },
  heroCopy: {
    flex: 1,
    minWidth: 0
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    fontWeight: '400'
  },
  section: {
    gap: 12
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDEAF5'
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  featuredCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6EEF7',
    ...theme.shadow
  },
  featuredImageRing: {
    width: 158,
    height: 158,
    borderRadius: 79,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  featuredImage: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: theme.colors.white,
    borderWidth: 3,
    borderColor: theme.colors.white
  },
  featuredCopy: {
    alignItems: 'center',
    marginTop: 14
  },
  featuredName: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    textAlign: 'center'
  },
  role: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    marginTop: 7,
    textAlign: 'center'
  },
  company: {
    color: theme.colors.orange,
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
    minHeight: 230,
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  compactCard: {
    minHeight: 210
  },
  memberImageWrap: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: '#F6FAFE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2ECF6',
    overflow: 'hidden'
  },
  compactImageWrap: {
    width: 94,
    height: 94,
    borderRadius: 47
  },
  memberImage: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.white
  },
  compactImage: {
    width: 84,
    height: 84,
    borderRadius: 42
  },
  memberName: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center'
  },
  memberRole: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    marginTop: 8,
    textAlign: 'center'
  },
  memberCompany: {
    color: theme.colors.orange,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center'
  }
});
