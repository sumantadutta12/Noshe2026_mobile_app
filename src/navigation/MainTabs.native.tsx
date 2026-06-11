import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import TabView from 'react-native-bottom-tabs';
import { AgendaScreen } from '../screens/AgendaScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SpeakersScreen } from '../screens/SpeakersScreen';
import { SponsorsScreen } from '../screens/SponsorsScreen';
import { theme } from '../theme/theme';
import { MainTabParamList, RootStackParamList } from './types';

type TabRoute = {
  key: keyof MainTabParamList;
  title: keyof MainTabParamList;
};

const tabRoutes: TabRoute[] = [
  { key: 'Home', title: 'Home' },
  { key: 'Agenda', title: 'Agenda' },
  { key: 'Speakers', title: 'Speakers' },
  { key: 'Members', title: 'Members' },
  { key: 'More', title: 'More' }
];

const tabIcons: Record<
  keyof MainTabParamList,
  { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Agenda: { active: 'calendar', inactive: 'calendar-outline' },
  Speakers: { active: 'people', inactive: 'people-outline' },
  Members: { active: 'people-circle', inactive: 'people-circle-outline' },
  More: { active: 'grid', inactive: 'grid-outline' }
};

type MainTabsProps = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

export function MainTabs({ navigation }: MainTabsProps) {
  const [index, setIndex] = useState(0);
  const routeNames = useMemo(() => tabRoutes.map((item) => item.key), []);

  const navigate = useCallback(
    (name: keyof MainTabParamList | keyof RootStackParamList, params?: object) => {
      const tabIndex = routeNames.indexOf(name as keyof MainTabParamList);
      if (tabIndex >= 0) {
        setIndex(tabIndex);
        return;
      }

      (navigation.navigate as (screen: string, params?: object) => void)(name, params);
    },
    [navigation, routeNames]
  );

  const tabNavigation = useMemo(
    () => ({
      ...navigation,
      navigate
    }),
    [navigate, navigation]
  );

  const renderScreen = useCallback(
    ({ route }: { route: TabRoute }) => {
      const props = {
        navigation: tabNavigation,
        route: { key: route.key, name: route.key, params: undefined }
      };

      switch (route.key) {
        case 'Home':
          return <HomeScreen {...(props as any)} />;
        case 'Agenda':
          return <AgendaScreen {...(props as any)} />;
        case 'Speakers':
          return <SpeakersScreen {...(props as any)} />;
        case 'Members':
          return <SponsorsScreen {...(props as any)} />;
        case 'More':
          return <ProfileScreen {...(props as any)} />;
        default:
          return null;
      }
    },
    [tabNavigation]
  );

  return (
    <TabView
      labeled
      navigationState={{ index, routes: tabRoutes }}
      onIndexChange={setIndex}
      renderScene={renderScreen}
      tabBar={() => (
        <View style={styles.tabBar}>
          {tabRoutes.map((route, routeIndex) => {
            const focused = index === routeIndex;
            const color = focused ? theme.colors.navy : '#6B7280';

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityLabel={`${route.title} tab`}
                onPress={() => setIndex(routeIndex)}
                style={({ pressed }) => [
                  styles.tabItem,
                  focused && styles.activeTabItem,
                  pressed && styles.pressed
                ]}
              >
                <View style={[styles.iconWrap, focused && styles.activeIconWrap]}>
                  <Ionicons
                    name={focused ? tabIcons[route.key].active : tabIcons[route.key].inactive}
                    color={color}
                    size={focused ? 21 : 19}
                  />
                </View>
                <View style={styles.labelWrap}>
                  <Text style={[styles.tabLabel, { color }, focused && styles.activeLabel]}>
                    {route.title}
                  </Text>
                  <View style={[styles.activeDot, focused && styles.activeDotVisible]} />
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
      tabBarActiveTintColor={theme.colors.navy}
      tabBarInactiveTintColor="#6B7280"
      tabBarStyle={{ backgroundColor: theme.colors.white }}
      tabLabelStyle={{ fontSize: 11, fontWeight: '500' }}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    minHeight: 66,
    paddingTop: 7,
    paddingBottom: 7,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F8',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    shadowColor: '#0F172A',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 22,
    elevation: 12
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  activeTabItem: {
    transform: [{ translateY: -1 }]
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }]
  },
  iconWrap: {
    width: 42,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1
  },
  activeIconWrap: {
    backgroundColor: '#EAF4FF',
    borderWidth: 1,
    borderColor: '#D6E9FF'
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 0.1
  },
  activeLabel: {
    fontWeight: '700'
  },
  labelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 19
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
    backgroundColor: 'transparent'
  },
  activeDotVisible: {
    backgroundColor: theme.colors.navy
  }
});
