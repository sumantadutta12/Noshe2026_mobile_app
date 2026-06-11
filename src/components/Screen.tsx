import { PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

type Props = PropsWithChildren<{
  floating?: ReactNode;
  header?: ReactNode;
  refreshable?: boolean;
  scroll?: boolean;
  style?: ViewStyle;
}>;

export function Screen({ children, floating, header, refreshable = false, scroll = true, style }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // API integration point: replace this delay with screen-specific data reloads.
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  if (!scroll) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={[styles.container, style]}>
        {header}
        {children}
        {floating}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.container, style]}>
      {header}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          refreshable ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.orange}
              colors={[theme.colors.orange, theme.colors.navy]}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
      {floating}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md
  }
});
