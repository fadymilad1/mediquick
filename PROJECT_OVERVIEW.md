# MediQuick - Project Overview

## 🎨 Animations

**Yes, animations are implemented using React Native Reanimated v3**

### Animation Usage:
- **Button Component**: Press animations with spring physics
  - Scale effect on press (0.97 → 1.0)
  - Uses `withSpring()` for natural feel
  
- **Skeleton Component**: Loading shimmer effect
  - Opacity animation with repeat
  - Uses `withTiming()` for smooth transitions
  - 800ms duration with infinite loop

### Animation Hooks:
- `useSharedValue` - For animated values
- `useAnimatedStyle` - For animated styles
- `withSpring` - Spring-based animations
- `withTiming` - Time-based animations
- `withRepeat` - Looping animations

---

## 🪝 Custom Hooks

### Global Hooks (`src/hooks/`)
1. **useTheme** - Theme management
   - Returns current colors (light/dark)
   - Returns isDark boolean
   - Memoized for performance

2. **useDebounce** - Input debouncing
   - Generic type support
   - Configurable delay (default 400ms)
   - Used for search optimization

### Module-Specific Hooks

#### Auth Module (`src/modules/auth/hooks/`)
- **useAuth** - Authentication operations
  - Login functionality
  - Registration functionality
  - Logout functionality
  - Loading states
  - Error handling

#### Doctors Module (`src/modules/doctors/hooks/`)
- **useDoctorsList** - Fetch all doctors
  - Loading state
  - Error handling
  - Search functionality
  - Specialty filtering

- **useDoctorDetails** - Fetch single doctor
  - Loading state
  - Error handling
  - Doctor by ID

#### Appointments Module (`src/modules/appointments/hooks/`)
- **useAppointmentsList** - User's appointments
  - Fetch appointments with doctor details
  - Loading state
  - Error handling
  - Auto-refresh

- **useBookAppointment** - Book new appointment
  - Create appointment
  - Loading state
  - Success/error handling

---

## 🧭 Navigation

**Stack:** React Navigation v7

### Navigation Structure:

```
RootNavigator (Native Stack)
├── Auth Stack (when not authenticated)
│   ├── Login Screen
│   └── Register Screen
│
└── Main Tabs (when authenticated)
    ├── Home Tab (Stack Navigator)
    │   ├── Doctors List Screen
    │   └── Doctor Details Screen
    │
    ├── Appointments Tab
    │   └── Appointments List Screen
    │
    └── Profile Tab
        └── Profile Screen
```

### Navigation Features:
- **Conditional Navigation**: Auth vs Main based on authentication state
- **Nested Navigation**: Stack inside tabs for Home flow
- **Theme Integration**: Dark/Light theme support
- **Type Safety**: Full TypeScript navigation types
- **Persistence**: Auth state persists with AsyncStorage
- **Custom Tab Icons**: Emoji-based tab icons with active states

### Navigation Libraries:
- `@react-navigation/native` - Core navigation
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator
- `react-native-screens` - Native screen optimization
- `react-native-safe-area-context` - Safe area handling

---

## 🏗️ State Management

**Library:** Zustand v5

### Stores:
1. **authStore** - User authentication
   - User data
   - Authentication status
   - Login/logout actions
   - AsyncStorage persistence

2. **themeStore** - Theme preferences
   - Light/Dark mode
   - Theme toggle
   - AsyncStorage persistence

---

## 🌐 API & Data

**HTTP Client:** Axios v1.16.1
**Mock API:** JSON Server (local development)

### API Features:
- Centralized API client with interceptors
- Error handling
- 15s timeout
- Platform-specific URLs (Android: 10.0.2.2, iOS: localhost)

### Resources:
- Users (authentication)
- Doctors (browse & details)
- Appointments (CRUD operations)

---

## 🎨 UI Components

### Reusable Components (`src/components/`)
- **Button** - Animated press button
- **Input** - Text input with validation
- **Card** - Content card container
- **LoadingSpinner** - Loading indicator
- **Skeleton** - Animated loading placeholder
- **EmptyState** - Empty list state
- **ErrorState** - Error display
- **ScreenContainer** - Screen wrapper with safe area

---

## 🎨 Theme System

### Features:
- Light & Dark mode support
- Centralized color palette
- Typography system
- Spacing system
- Border radius constants

### Theme Files:
- `colors.ts` - Color definitions
- `typography.ts` - Font styles
- `spacing.ts` - Spacing scale

---

## 📦 Key Dependencies

### Core:
- React Native 0.85.3
- React 19.2.3
- TypeScript 5.8.3

### Navigation:
- @react-navigation/native ^7.2.4
- @react-navigation/native-stack ^7.15.1
- @react-navigation/bottom-tabs ^7.16.1

### State & Storage:
- zustand ^5.0.13
- @react-native-async-storage/async-storage ^1.23.1

### Animations:
- react-native-reanimated ^4.3.1
- react-native-gesture-handler ^2.31.2

### API:
- axios ^1.16.1
- json-server ^1.0.0-beta.15 (dev)

---

## 📁 Project Structure

```
MediQuick/
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── config/          # App configuration
│   ├── hooks/           # Global custom hooks
│   ├── modules/         # Feature modules
│   │   ├── auth/        # Authentication
│   │   ├── doctors/     # Doctor browsing
│   │   ├── appointments/# Appointment booking
│   │   └── profile/     # User profile
│   ├── navigation/      # Navigation setup
│   ├── services/        # API services
│   ├── store/           # Zustand stores
│   ├── theme/           # Theme system
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── android/             # Android native code
├── ios/                 # iOS native code
└── mockapi-seed.json    # Mock API data
```

---

## 🚀 Development Workflow

1. Start JSON Server: `npm run api`
2. Start Metro: `npm start`
3. Run app: `npm run android` or `npm run ios`

---

## ✨ Best Practices Used

- ✅ Feature-based architecture (modules)
- ✅ Custom hooks for business logic
- ✅ Centralized API client
- ✅ Type-safe navigation
- ✅ Theme system with dark mode
- ✅ Animated UI components
- ✅ Error boundary patterns
- ✅ Loading states
- ✅ Input validation
- ✅ Persistent authentication
