import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CTAButton } from '../components/CTAButton';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

const delegateTypes = ['Individual Delegate', 'Corporate Group Pass', 'Student / Research Pass'];
const dietaryOptions = ['No preference', 'Vegetarian', 'Non-Vegetarian', 'Vegan'];

export function TicketsScreen() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [designation, setDesignation] = useState('');
  const [delegateType, setDelegateType] = useState(delegateTypes[0]);
  const [city, setCity] = useState('');
  const [dietary, setDietary] = useState(dietaryOptions[0]);
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);

  const cycleOption = (options: string[], current: string, setter: (value: string) => void) => {
    const currentIndex = options.indexOf(current);
    const nextIndex = (currentIndex + 1) % options.length;
    setter(options[nextIndex]);
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroEyebrow}>NOSHE 2026 Registration</Text>
          <Text style={styles.heroTitle}>Reserve your delegate place for NOSHE 2026</Text>
          <Text style={styles.heroText}>
            Share your details with the conference team for delegate confirmation, communication, and participation coordination.
          </Text>
        </View>
        <View style={styles.heroPanel}>
          <View style={styles.panelItem}>
            <View style={styles.panelIcon}>
              <Ionicons name="calendar-outline" size={18} color={theme.colors.white} />
            </View>
            <Text style={styles.panelText}>3rd - 4th July 2026</Text>
          </View>
          <View style={styles.panelItem}>
            <View style={styles.panelIcon}>
              <Ionicons name="location-outline" size={18} color={theme.colors.white} />
            </View>
            <Text style={styles.panelText}>NTPC PMI, Noida</Text>
          </View>
          <View style={styles.panelItem}>
            <View style={styles.panelIcon}>
              <Ionicons name="people-outline" size={18} color={theme.colors.white} />
            </View>
            <Text style={styles.panelText}>OSH, ESG, health and safety professionals</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Register Now</Text>
        <Text style={styles.sectionTitle}>Delegate Information</Text>
      </View>

      <View style={styles.formCard}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Full Name *</Text>
          <TextInput value={fullName} onChangeText={setFullName} placeholder="Enter full name" style={styles.input} placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Phone Number *</Text>
          <TextInput value={phone} onChangeText={setPhone} placeholder="Enter phone number" keyboardType="phone-pad" style={styles.input} placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email ID *</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Enter email address" keyboardType="email-address" autoCapitalize="none" style={styles.input} placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Organisation *</Text>
          <TextInput value={organisation} onChangeText={setOrganisation} placeholder="Company / institution name" style={styles.input} placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Designation *</Text>
          <TextInput value={designation} onChangeText={setDesignation} placeholder="Enter designation" style={styles.input} placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Delegate Type *</Text>
          <Pressable style={styles.selectInput} onPress={() => cycleOption(delegateTypes, delegateType, setDelegateType)}>
            <Text style={styles.selectText}>{delegateType}</Text>
            <Ionicons name="chevron-down" size={18} color={theme.colors.muted} />
          </Pressable>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>City *</Text>
          <TextInput value={city} onChangeText={setCity} placeholder="Enter city" style={styles.input} placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Dietary Preference</Text>
          <Pressable style={styles.selectInput} onPress={() => cycleOption(dietaryOptions, dietary, setDietary)}>
            <Text style={styles.selectText}>{dietary}</Text>
            <Ionicons name="chevron-down" size={18} color={theme.colors.muted} />
          </Pressable>
        </View>

        <View style={styles.fieldGroup}> 
          <Text style={styles.fieldLabel}>Message / Requirement</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Share any special requirement or note"
            style={[styles.input, styles.textArea]}
            placeholderTextColor={theme.colors.muted}
            multiline
            numberOfLines={4}
          />
        </View>

        <Pressable style={styles.checkboxRow} onPress={() => setAgree((prev) => !prev)}>
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree ? <Ionicons name="checkmark" size={16} color={theme.colors.white} /> : null}
          </View>
          <Text style={styles.checkboxLabel}>
            I agree to be contacted by the NOSHE 2026 organising team regarding my registration.
          </Text>
        </Pressable>

        <CTAButton title="Submit Registration" onPress={() => null} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.navy,
    borderRadius: 22,
    padding: theme.spacing.md,
    gap: theme.spacing.lg,
    ...theme.shadow
  },
  heroCopy: {
    gap: 10
  },
  heroEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800'
  },
  heroText: {
    color: '#D8E3FF',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 2
  },
  heroPanel: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    padding: theme.spacing.md,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)'
  },
  panelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6
  },
  panelIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panelText: {
    color: theme.colors.white,
    fontSize: 13,
    flex: 1,
    lineHeight: 18
  },
  sectionHeader: {
    marginTop: theme.spacing.lg,
    gap: 6
  },
  sectionEyebrow: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800'
  },
  formCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow,
    marginTop: theme.spacing.sm
  },
  fieldGroup: {
    gap: 8
  },
  fieldLabel: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '700'
  },
  input: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: 14
  },
  selectInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectText: {
    color: theme.colors.text,
    fontSize: 14,
    flex: 1
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top'
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: theme.spacing.sm,
    backgroundColor: '#FFF7ED',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: '#FDE3C4'
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxChecked: {
    backgroundColor: theme.colors.orange,
    borderColor: theme.colors.orange
  },
  checkboxLabel: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 20,
    flex: 1
  }
});
