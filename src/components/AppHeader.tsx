import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../theme/theme';

const nosheLogo = require('../assets/ntpc-logo-1.png');
const ntpcLogo = require('../assets/NTPC-logo.png');

type Props = {
  onProfilePress?: () => void;
};

export function AppHeader({ onProfilePress }: Props) {
  return (
    <View style={styles.topHeader}>
      <View style={styles.brand}>
        <Image
          source={nosheLogo}
          style={styles.nosheLogo}
          resizeMode="contain"
          accessible
          accessibilityLabel="NOSHE 2026 logo"
        />
        <Image
          source={ntpcLogo}
          style={styles.ntpcLogo}
          resizeMode="contain"
          accessible
          accessibilityLabel="NTPC logo"
        />
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
    gap: 14,
    minWidth: 0
  },
  nosheLogo: {
    width: 118,
    height: 54
  },
  ntpcLogo: {
    width: 138,
    height: 62
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
