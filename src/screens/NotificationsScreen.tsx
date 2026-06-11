import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { notifications } from '../data/notifications';
import { theme } from '../theme/theme';

export function NotificationsScreen() {
  return (
    <Screen>
      <Header eyebrow="Updates" title="Notifications" subtitle="Event alerts, reminders, and registration updates." />
      {notifications.map((item) => (
        <View key={item.id} style={[styles.card, item.unread && styles.unread]}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: 6,
    borderWidth: 1,
    borderColor: theme.colors.line
  },
  unread: {
    borderColor: theme.colors.orange,
    backgroundColor: theme.colors.orangeSoft
  },
  type: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '900'
  },
  title: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '900'
  },
  message: {
    color: theme.colors.muted,
    lineHeight: 22
  },
  time: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700'
  }
});
