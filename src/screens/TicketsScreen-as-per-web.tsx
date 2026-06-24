import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CTAButton } from '../components/CTAButton';
import { Screen } from '../components/Screen';
import { getApiErrorMessage } from '../api/axiosInstance';
import { submitRegistration } from '../services/registrationService';
import { theme } from '../theme/theme';

const participatingOptions = ['Select', 'Delegate', 'Speaker', 'Sponsor', 'Exhibitor'];
const titleOptions = ['Mr', 'Shri', 'Mrs', 'Smt', 'Ms', 'Dr', 'Prof'];
const groupOptions = ['Select', 'Individual', 'Corporate', 'Student', 'Guest'];

type DropdownKey = 'participatingAs' | 'title' | 'group';

type ErrorState = {
  participatingAs: string;
  title: string;
  firstName: string;
  lastName: string;
  group: string;
  email: string;
  mobile: string;
  organization: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  otp: string;
};

const emptyErrors: ErrorState = {
  participatingAs: '',
  title: '',
  firstName: '',
  lastName: '',
  group: '',
  email: '',
  mobile: '',
  organization: '',
  city: '',
  state: '',
  country: '',
  pinCode: '',
  otp: '',
};

export function TicketsScreen() {
  const [participatingAs, setParticipatingAs] = useState('Select');
  const [title, setTitle] = useState('Mr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState('Select');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [pinCode, setPinCode] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>(emptyErrors);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...emptyErrors };

    if (participatingAs === 'Select') {
      newErrors.participatingAs = 'Participating As is required';
      valid = false;
    }

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (group === 'Select') {
      newErrors.group = 'Group is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
      valid = false;
    } else if (!/^\d{10,13}$/.test(mobile)) {
      newErrors.mobile = 'Enter 10 to 13 digits';
      valid = false;
    }

    if (!organization.trim()) {
      newErrors.organization = 'Organization / Institution is required';
      valid = false;
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    }

    if (!country.trim()) {
      newErrors.country = 'Country is required';
      valid = false;
    }

    if (!pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required';
      valid = false;
    } else if (!/^\d{4,10}$/.test(pinCode)) {
      newErrors.pinCode = 'Enter a valid pin code';
      valid = false;
    }

    if (!otp.trim()) {
      newErrors.otp = 'OTP is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const clearForm = () => {
    setParticipatingAs('Select');
    setTitle('Mr');
    setFirstName('');
    setLastName('');
    setGroup('Select');
    setEmail('');
    setMobile('');
    setOrganization('');
    setDesignation('');
    setAddress('');
    setCity('');
    setState('');
    setCountry('India');
    setPinCode('');
    setOtp('');
    setErrors(emptyErrors);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);

    setErrors((prev) => ({
      ...prev,
      email: text && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(text) ? 'Invalid email address' : '',
    }));
  };

  const handleGetOtp = () => {
    if (!email.trim() || !mobile.trim()) {
      Alert.alert('Validation', 'Please enter email and mobile before requesting OTP.');
      return;
    }

    Alert.alert('OTP', 'OTP request is ready for API integration.');
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: 'OTP is required' }));
      Alert.alert('Validation', 'Please enter OTP.');
      return;
    }

    Alert.alert('OTP', 'OTP verification is ready for API integration.');
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        Alert.alert('Validation Error', 'Please correct the highlighted fields.');
        return;
      }

      setLoading(true);

      const payload = {
        participatingAs,
        title,
        firstName,
        lastName,
        group,
        email,
        mobile,
        organization,
        designation,
        address,
        city,
        state,
        country,
        pinCode,
        otp,
      };

      const response = await submitRegistration(payload);

      Alert.alert('Success', response.message || 'Registration submitted successfully');
      clearForm();
    } catch (error: any) {
      Alert.alert('Error', getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const renderDropdown = (
    key: DropdownKey,
    value: string,
    options: string[],
    onSelect: (value: string) => void,
  ) => {
    const isOpen = openDropdown === key;

    return (
      <>
        <Pressable
          style={styles.selectInput}
          onPress={() => setOpenDropdown((current) => (current === key ? null : key))}
        >
          <Text style={styles.selectText}>{value}</Text>
          <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={theme.colors.muted} />
        </Pressable>
        {isOpen ? (
          <View style={styles.dropdownList}>
            {options.map((option) => (
              <Pressable
                key={option}
                style={[styles.dropdownOption, option === value && styles.dropdownOptionActive]}
                onPress={() => {
                  onSelect(option);
                  setOpenDropdown(null);
                }}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </>
    );
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>NOSHE 2026 REGISTRATION</Text>
        <Text style={styles.heroTitle}>Reserve your delegate place for NOSHE 2026</Text>
        <View style={styles.heroDatePanel}>
          <View style={styles.heroDateIcon}>
            <Ionicons name="calendar-outline" size={26} color={theme.colors.white} />
          </View>
          <Text style={styles.heroDateText}>3rd - 4th July 2026</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>REGISTER NOW</Text>
        <Text style={styles.sectionTitle}>Delegate Information</Text>
      </View>

      <View style={styles.formCard}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Participating As *</Text>
          {renderDropdown('participatingAs', participatingAs, participatingOptions, setParticipatingAs)}
          {errors.participatingAs ? <Text style={styles.errorText}>{errors.participatingAs}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Title *</Text>
          {renderDropdown('title', title, titleOptions, setTitle)}
          {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>First Name *</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Last Name *</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Group *</Text>
          {renderDropdown('group', group, groupOptions, setGroup)}
          {errors.group ? <Text style={styles.errorText}>{errors.group}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email *</Text>
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Mobile *</Text>
          <TextInput
            value={mobile}
            onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, '').slice(0, 13))}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Organization / Institution *</Text>
          <TextInput
            value={organization}
            onChangeText={setOrganization}
            placeholder="Organization / Institution"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.organization ? <Text style={styles.errorText}>{errors.organization}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Designation</Text>
          <TextInput
            value={designation}
            onChangeText={setDesignation}
            placeholder="Enter designation"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            style={[styles.input, styles.textArea]}
            placeholderTextColor={theme.colors.muted}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>City *</Text>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="Enter city"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>State *</Text>
          <TextInput
            value={state}
            onChangeText={setState}
            placeholder="Enter state"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Country *</Text>
          <TextInput
            value={country}
            onChangeText={setCountry}
            placeholder="Enter country"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.country ? <Text style={styles.errorText}>{errors.country}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Pin Code *</Text>
          <TextInput
            value={pinCode}
            onChangeText={(text) => setPinCode(text.replace(/[^0-9]/g, '').slice(0, 10))}
            placeholder="Enter pin code"
            keyboardType="number-pad"
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
          />
          {errors.pinCode ? <Text style={styles.errorText}>{errors.pinCode}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>OTP *</Text>
          <TextInput
            value={otp}
            onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 8))}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            style={styles.input}
            placeholderTextColor={theme.colors.white}
          />
          {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}
        </View>

        <CTAButton title="Get OTP" onPress={handleGetOtp} style={styles.actionButton} textStyle={styles.actionButtonText} />
        <CTAButton title="Verify OTP" onPress={handleVerifyOtp} style={styles.actionButton} textStyle={styles.actionButtonText} />
        <CTAButton
          title={loading ? 'Submitting...' : 'Submit'}
          onPress={loading ? undefined : handleSubmit}
          style={styles.actionButton}
          textStyle={styles.actionButtonText}
        />
        <CTAButton title="Reset" onPress={clearForm} variant="secondary" style={styles.resetButton} textStyle={styles.resetText} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.navy,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
    ...theme.shadow,
  },
  heroEyebrow: {
    color: theme.colors.orange,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  heroDatePanel: {
    minHeight: 104,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  heroDateIcon: {
    width: 58,
    height: 58,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroDateText: {
    color: theme.colors.white,
    fontSize: 18,
    lineHeight: 26,
    flex: 1,
  },
  sectionHeader: {
    gap: 8,
  },
  sectionEyebrow: {
    color: theme.colors.orange,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 58,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
  },
  selectInput: {
    minHeight: 58,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    color: theme.colors.text,
    fontSize: 16,
    flex: 1,
  },
  dropdownList: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderTopWidth: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownOption: {
    minHeight: 72,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  dropdownOptionActive: {
    backgroundColor: '#F3F4F6',
  },
  dropdownOptionText: {
    color: '#000000',
    fontSize: 16,
  },
  textArea: {
    minHeight: 140,
    paddingTop: theme.spacing.md,
    textAlignVertical: 'top',
  },
  actionButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
  },
  resetText: {
    color: theme.colors.navy,
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 2,
    fontSize: 12,
  },
});
