import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

export function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: theme.colors.text,
    fontSize: 19,
    fontWeight: '900'
  },
  action: {
    color: theme.colors.orange,
    fontSize: 13,
    fontWeight: '800'
  }
});
