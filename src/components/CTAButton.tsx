import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
  style?: ViewStyle;
};

export function CTAButton({ title, onPress, variant = 'primary', icon, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        style
      ]}
    >
      {icon}
      <Text style={[styles.text, variant !== 'primary' && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: theme.spacing.lg
  },
  primary: {
    backgroundColor: theme.colors.orange
  },
  secondary: {
    backgroundColor: theme.colors.orangeSoft
  },
  ghost: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  pressed: {
    opacity: 0.86
  },
  text: {
    color: theme.colors.white,
    fontWeight: '800',
    fontSize: 15
  },
  secondaryText: {
    color: theme.colors.navy
  }
});
