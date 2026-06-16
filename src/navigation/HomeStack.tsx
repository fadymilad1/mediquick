import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookAppointmentScreen } from '../modules/appointments';
import {
  DoctorDetailsScreen,
  DoctorsListScreen,
} from '../modules/doctors';
import { useTheme } from '../hooks';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen
        name="DoctorsList"
        component={DoctorsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetailsScreen}
        options={{ title: 'Doctor profile' }}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ title: 'Book appointment' }}
      />
    </Stack.Navigator>
  );
}
