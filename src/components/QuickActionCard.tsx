import { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

export function QuickActionCard({
  title,
  icon,
  onPress
}: {
  title: string;
  icon: ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <LinearGradient
          colors={['#FFF7F0', '#FFE7D7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBadge}
        >
          {icon}
        </LinearGradient>
        <View style={styles.arrowBadge}>
          <Ionicons name="chevron-forward" size={14} color={theme.colors.navy} />
        </View>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.titleUnderline} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 96,
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0ECF8',
    padding: 15,
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#0B356C',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3
  },
  pressed: {
    opacity: 0.9,
    transform: [{ translateY: 1 }, { scale: 0.99 }]
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE0CB'
  },
  arrowBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F2F8FF',
    borderWidth: 1,
    borderColor: '#E1EDF8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600'
  },
  titleUnderline: {
    width: 22,
    height: 2,
    borderRadius: 2,
    backgroundColor: theme.colors.orange,
    marginTop: 7
  }
});
