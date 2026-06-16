import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  DoctorsList: undefined;
  DoctorDetails: { doctorId: string };
  BookAppointment: {
    doctorId: string;
    doctorName: string;
    availableTimes: string[];
  };
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Appointments: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};
