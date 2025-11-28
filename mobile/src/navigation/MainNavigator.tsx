import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacing } from '../constants/theme';
import TodayScreen from '../screens/main/TodayScreen';
import InsightsScreen from '../screens/main/InsightsScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

export type MainTabParamList = {
  Today: undefined;
  Insights: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: colors.honeyDeep,
        tabBarInactiveTintColor: colors.gray600,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.gray200,
          paddingTop: spacing[2],
          paddingBottom: spacing[2],
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({ color, size }) => (
            // Placeholder - will add proper icon later
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <InsightsIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Temporary icon placeholders
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size / 2 }} />
);

const InsightsIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, backgroundColor: color, borderRadius: 4 }} />
);

const SettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, backgroundColor: color }} />
);

// Need to import View for the icon placeholders
import { View } from 'react-native';

export default MainNavigator;
