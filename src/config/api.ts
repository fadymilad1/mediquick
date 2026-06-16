/**
 * JSON Server local API base URL (resources: users, doctors, appointments).
 * Start the server with: npm run api
 * @see https://github.com/typicode/json-server
 * 
 * Note: Use 10.0.2.2 for Android emulator (maps to host machine's localhost)
 * For iOS simulator, localhost works fine
 * For physical devices, use your computer's IP address
 */
import { Platform } from 'react-native';

const getApiUrl = () => {
  if (__DEV__) {
    // Android emulator uses 10.0.2.2 to access host machine
    return Platform.OS === 'android' 
      ? 'http://10.0.2.2:3001/' 
      : 'http://localhost:3001/';
  }
  // Production URL would go here
  return 'http://localhost:3001/';
};

export const API_BASE_URL = getApiUrl();

export const ENDPOINTS = {
  users: 'users',
  doctors: 'doctors',
  appointments: 'appointments',
} as const;
