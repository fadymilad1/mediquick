import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppointmentsListScreen } from '../modules/appointments';
import { ProfileScreen } from '../modules/profile';
import { useTheme } from '../hooks';
import { HomeStack } from './HomeStack';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ label, focused, color }: { label: string; focused: boolean; color: string }) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Appointments: '📅',
    Profile: '👤',
  };
  return (
    <Text style={{ fontSize: focused ? 22 : 20, color }}>
      {icons[label] ?? '•'}
    </Text>
  );
}

export function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color }) => (
          <TabIcon label={route.name} focused={focused} color={color} />
        ),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Doctors' }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsListScreen}
        options={{ title: 'Appointments', headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile', headerShown: false }}
      />
    </Tab.Navigator>
  );
}
