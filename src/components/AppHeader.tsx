import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

const headerLogo = require('../assets/logo-1.png');

type Props = {
  onProfilePress?: () => void;
};

export function AppHeader({ onProfilePress }: Props) {
  return (
    <View style={styles.topHeader}>
      <View style={styles.brand}>
        <Image
          source={headerLogo}
          style={styles.logoImage}
          resizeMode="contain"
          accessible
          accessibilityLabel="NOSHE logo"
        />
        <View style={styles.brandCopy}>
          <Text style={styles.brandTitle}>NOSHE2026</Text>
          <Text style={styles.brandSubtitle}>Event Companion</Text>
        </View>
      </View>
      <Pressable
        onPress={onProfilePress}
        style={({ pressed }) => [styles.userButton, pressed && styles.pressed]}
        accessibilityRole="button"
          accessibilityLabel="Open more menu"
      >
        <Ionicons name="person-outline" size={22} color={theme.colors.navy} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.line
  },
  brand: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 0
  },
  logoImage: {
    width: 42,
    height: 42
  },
  brandCopy: {
    flex: 1,
    minWidth: 0
  },
  brandTitle: {
    color: theme.colors.navy,
    fontSize: 18,
    fontWeight: '900'
  },
  brandSubtitle: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2
  },
  userButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow
  },
  pressed: {
    opacity: 0.82
  }
});
