import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';

export function ContactScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Validation', 'Please fill all required fields.');
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      Alert.alert('Validation', 'Please enter a valid email address.');
      return;
    }

    Alert.alert('Submitted', 'Your message has been submitted.');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>CONFERENCE SECRETARIAT</Text>
        <Text style={styles.heroTitle}>Contact Team: NOSHE 2026</Text>
        <Text style={styles.heroSubtitle}>
          Reach the official NOSHE 2026 conference secretariat for event coordination and support.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>First Name *</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Last Name *</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email *</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            placeholderTextColor={theme.colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, '').slice(0, 13))}
            placeholder="Enter phone number"
            placeholderTextColor={theme.colors.muted}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Message *</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Enter message"
            placeholderTextColor={theme.colors.muted}
            style={[styles.input, styles.messageInput]}
            multiline
            textAlignVertical="top"
          />
        </View>

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.navy,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: 12,
    ...theme.shadow,
  },
  heroEyebrow: {
    color: theme.colors.orange,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: '#D8E3FF',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '400',
  },
  form: {
    gap: 18,
    marginTop: theme.spacing.md,
  },
  fieldGroup: {
    gap: 9,
  },
  fieldLabel: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
  },
  input: {
    minHeight: 56,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.line,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 15,
  },
  messageInput: {
    minHeight: 150,
    paddingTop: theme.spacing.md,
  },
  submitButton: {
    minHeight: 56,
    borderRadius: theme.radius.md,
    marginTop: 4,
    backgroundColor: theme.colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: theme.colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.86,
  },
});
