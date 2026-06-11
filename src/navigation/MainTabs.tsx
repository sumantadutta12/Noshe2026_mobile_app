import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { AgendaScreen } from '../screens/AgendaScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SpeakersScreen } from '../screens/SpeakersScreen';
import { SponsorsScreen } from '../screens/SponsorsScreen';
import { theme } from '../theme/theme';
import { MainTabParamList } from './types';

const Tabs = createBottomTabNavigator<MainTabParamList>();

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

function AnimatedTabIcon({
  color,
  focused,
  name
}: {
  color: string;
  focused: boolean;
  name: keyof MainTabParamList;
}) {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: focused ? 1 : 0,
      friction: 8,
      tension: 140,
      useNativeDriver: true
    }).start();
  }, [focused, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2]
  });
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04]
  });

  return (
    <Animated.View
      style={[
        styles.iconWrap,
        focused && styles.activeIconWrap,
        {
          transform: [{ translateY }, { scale }]
        }
      ]}
    >
      <Ionicons
        name={focused ? tabIcons[name].active : tabIcons[name].inactive}
        color={color}
        size={focused ? 21 : 19}
      />
    </Animated.View>
  );
}

function AnimatedTabLabel({
  color,
  focused,
  label
}: {
  color: string;
  focused: boolean;
  label: string;
}) {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: true
    }).start();
  }, [focused, progress]);

  const dotOpacity = progress;
  const dotScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1]
  });

  return (
    <View style={styles.labelWrap}>
      <Text style={[styles.tabLabel, { color }, focused && styles.activeLabel]}>
        {label}
      </Text>
      <Animated.View
        style={[
          styles.activeDot,
          styles.activeDotVisible,
          {
            opacity: dotOpacity,
            transform: [{ scale: dotScale }]
          }
        ]}
      />
    </View>
  );
}

export function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.navy,
        tabBarInactiveTintColor: '#6B7280',
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabel: ({ color, focused }) => (
          <AnimatedTabLabel color={color} focused={focused} label={route.name} />
        ),
        tabBarIcon: ({ color, focused }) => (
          <AnimatedTabIcon color={color} focused={focused} name={route.name} />
        )
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Agenda" component={AgendaScreen} />
      <Tabs.Screen name="Speakers" component={SpeakersScreen} />
      <Tabs.Screen name="Members" component={SponsorsScreen} />
      <Tabs.Screen name="More" component={ProfileScreen} />
    </Tabs.Navigator>
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
    shadowColor: '#0F172A',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 22,
    elevation: 12
  },
  tabItem: {
    paddingVertical: 0
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
  labelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 19
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
