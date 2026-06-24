import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const personalInformationText = [
  'We do not require personal information to obtain access to most of our website.',
  'We collect personal information from our visitors on a voluntary basis. Personal information may include name, title, company, address, phone number, email address, and other relevant data. Questions or comments submitted by visitors may also include in personal information.',
  'We collect and use personal information for business purposes in order :',
  '1. To Download Product Information, Order Products And Take Advantage Of Certain Other Features Of Our Website.\n2. To Provide Information Or Interactive Services Through This Website, To Your E-mail Address Or, Where You Wish It To Be Sent By Post, To Your Name And Postal Address.\n3. To Seek Your Feedback Or To Contact You In Relation To Those Services Offered On Our Website.\n4. To Process Orders Or Applications Submitted By You.\n5. To Administer Or Otherwise Carry Out Our Obligations In Relation To Any Agreement You Have With Us.\n6. To Anticipate And Resolve Problems With Any Goods Or Services Supplied To You.\n7. To Create Products Or Services That May Meet Your Needs.\n8. To Process And Respond To Requests, Improve Our Operations, And Communicate With Visitors About Our Products, Services And Businesses.\n9. To Allow You To Subscribe To Our News Letter.',
  'We will not use or share, either within NTPC or with a third party, any information collected at this page for direct marketing purposes. Because of the nature of the Internet, we may transmit the information to another country, but among NTPC and its affiliates, for purposes other than direct marketing, such as for storage, or for carrying out the processing detailed above, or because of where our servers are located, but we do not provide or use personal information to unrelated businesses for direct marketing purposes.',
  'To the extent required or permitted by law, we may also collect, use and disclose personal information in connection with security related or law enforcement investigations or in the course of cooperating with authorities or complying with legal requirements.',
  'We may also remove all the personally identifiable information and use the rest for historical, statistical or scientific purposes.',
  'If you e-mail us, you are voluntarily releasing information to us. Your e-mail address will be used by NTPC to respond to you. We will not use the information that can identify you, such as your e-mail address, for direct marketing purposes.',
  'In addition, we may have collected similar information from you in the past. By entering this website you are consenting to the terms of our information privacy policy and to our continued use of previously collected information. By submitting your personal information to us, you will be treated as having given your permission for the processing of your personal data as set out in this policy.',
];

const sections = [
  {
    title: 'Personal Information',
    body: personalInformationText.join('\n\n'),
  },
  {
    title: 'How Personal Information Is Used',
    body:
      "At this web site, information sent by your web browser, may be automatically collected. This information typically includes your domain name (the site after the @ in your e-mail address). It may also contain your user name (the name before the @ in your e-mail address). Other examples of information collected by our server include the Internet protocol (IP) address used to connect the visitor's computer to the Internet, operating system and platform, the average time spent on our website, pages viewed, information searched for, access times, websites visited before and after visiting our website, and other relevant statistics.\n\nAll such information will be used only to assist us in providing an effective service on this website. We may from time to time supply the owners or operators of third party websites from which it is possible to link to our website with information relating to the number of users linking to our website from such third party website. You cannot be identified from this information.\n\nWe use the information we automatically receive from your web browser to see which pages you visit within our website, which website you visited before coming to ours, and where you go after you leave. We at NTPC develop statistics that are helpful to understand how our visitors can use this website. We use this information in the aggregate to measure the use of our website and to administer and improve our website. This statistical data is interpreted by NTPC in its continuing effort to present the website content that visitors are seeking in a format they find most helpful.",
  },
  {
    title: 'Information placed on your computer',
    body:
      "We may store some information such as cookies on your computer when you look at our website. Cookies are pieces of information that a website transfers to the hard drive of a visitor's computer for record-keeping purposes. This information facilitates your use of our website and ensures that you do not need to re-enter your details every time you visit it. You can erase or choose to block this information from your computer if you want to; please refer to your browser settings to do so. Erasing or blocking such information may limit the range of features available to the visitor on our website. We also use such information to provide visitors a personalised experience on our website. We may use such information to allow visitors to use the website without logging on upon returning, to auto-populate email forms, to make improvements and to better tailor our website to our visitors' needs. This information can verify that visitors meet the criteria required to process their requests",
  },
  {
    title: 'Security',
    body:
      'We have implemented technology and policies, with the objective of protecting your privacy from unauthorized access and improper use, and periodically review the same.',
  },
  {
    title: 'Third Parties',
    body:
      '1. For your convenience, this page may contain certain hyperlinks to other NTPC company pages as well as to websites outside NTPC. In addition, you may have linked to our website from another website. We are not responsible for the privacy policies and practices of other websites, even if you access those using links from our website. We can make no promises or guarantees regarding data collection on the hyper-linked pages and on websites that are not owned by NTPC. We recommend that you check the policy of each website you visit, or link from, and contact the owners or operators of such websites if you have any concerns or questions.',
  },
  {
    title: 'Contacting Us',
    body:
      'We aim to keep our information about you as accurate as possible. If you would like to review or change the details you have supplied us with, please contact us as set out below. If you wish to change or delete any of the personal information you have entered whilst visiting our website or if you have any questions about our privacy statement.',
  },
];

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
          <Ionicons name="shield-checkmark-outline" size={28} color={theme.colors.orange} />
        </View>
        <Text style={styles.heroEyebrow}>NOSHE 2026</Text>
        <Text style={styles.heroTitle}>Privacy Policy</Text>
      </LinearGradient>

      <View style={styles.introCard}>
        <Text style={styles.introText}>
          We at NTPC respect the privacy of everyone who visits this website and are committed to maintain the privacy
          and security of the personal information of all visitors to this website. Our policy on the collection and use
          of personal information and other information is outlined below.
        </Text>
      </View>

      <View style={styles.sectionStack}>
        {sections.map((section) => (
          <View key={section.title} style={styles.policyCard}>
            <Text style={styles.policyTitle}>{section.title}</Text>
            <Text style={styles.policyText}>{section.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.policyTitle}>Contact</Text>
        <Text style={styles.policyText}>
          For any questions regarding privacy, data protection, correction of personal information, or requests related
          to this privacy policy, please contact NTPC through the official Contact Us section available on the website
          or application.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 210,
    borderRadius: 28,
    padding: 26,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    shadowColor: '#08234A',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 6,
  },
  heroGlow: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 174,
    height: 174,
    borderRadius: 87,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  heroIcon: {
    width: 66,
    height: 66,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    marginBottom: 28,
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 2,
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    marginTop: 8,
  },
  introCard: {
    backgroundColor: '#FFF6EF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FFE2CF',
  },
  introText: {
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: '400',
  },
  sectionStack: {
    gap: 16,
  },
  policyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8F0F8',
    shadowColor: '#0F4070',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2,
  },
  policyTitle: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
  policyText: {
    color: theme.colors.muted,
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '400',
    marginTop: 12,
  },
  contactCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#D6E9FF',
  },
});
