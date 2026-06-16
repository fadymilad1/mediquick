# MediQuick - Complete File Explanations

## 📁 Root Files

### `index.js`
**Entry point of the React Native app**
- Imports gesture handler (must be first)
- Registers the App component with React Native
- Uses app name from app.json

### `App.tsx`
**Root component of the application**
- Wraps app with GestureHandlerRootView (for animations)
- Wraps app with SafeAreaProvider (for safe areas)
- Sets StatusBar style based on theme (light/dark)
- Renders RootNavigator (main navigation)

### `app.json`
**App metadata**
- App name and display name
- Used by React Native CLI and build tools

### `package.json`
**Project dependencies and scripts**
- Lists all npm packages
- Defines scripts: start, android, ios, api, lint, test
- Specifies Node.js version requirement

### `tsconfig.json`
**TypeScript configuration**
- Extends React Native's default TypeScript config
- Includes Jest types for testing
- Specifies which files to compile

### `babel.config.js`
**JavaScript transpiler configuration**
- Uses React Native preset
- Includes Reanimated plugin (must be last)
- Transforms modern JS to compatible code

### `metro.config.js`
**Metro bundler configuration**
- Blocks native folders from bundling (android/ios in node_modules)
- Optimizes bundle size and build speed

### `.eslintrc.js`
**Code linting rules**
- Extends React Native's ESLint config
- Enforces code quality and style

### `.prettierrc.js`
**Code formatting rules**
- Single quotes
- No parentheses for single arrow function params
- Trailing commas everywhere

### `jest.config.js`
**Testing framework configuration**
- Uses React Native Jest preset
- Configures test environment

### `.gitignore`
**Git ignore patterns**
- Excludes node_modules, build folders, OS files
- Keeps repository clean

### `.watchmanconfig`
**Watchman configuration**
- File watching for hot reload
- Empty config uses defaults

### `mockapi-seed.json`
**JSON Server database**
- Mock data for users, doctors, appointments
- Auto-generates IDs
- Persists changes during development

### `Gemfile`
**Ruby dependencies (iOS)**
- CocoaPods version for iOS builds

---

## 📂 src/components/

### `Button.tsx`
**Animated button component**
- Press animation with spring physics
- Loading state with spinner
- Variant support (primary/secondary/outline)
- Disabled state
- Uses Reanimated for smooth animations

### `Input.tsx`
**Text input component**
- Label and placeholder support
- Error message display
- Secure text entry for passwords
- Themed styling
- Accessible

### `Card.tsx`
**Container card component**
- Rounded corners
- Shadow/elevation
- Themed background
- Padding and spacing
- Used for doctor cards, appointment cards

### `LoadingSpinner.tsx`
**Loading indicator**
- ActivityIndicator wrapper
- Full screen or inline mode
- Themed colors
- Optional text message

### `Skeleton.tsx`
**Loading placeholder with shimmer**
- Animated opacity pulse
- Customizable width/height
- Used while loading content
- Smooth Reanimated animation

### `EmptyState.tsx`
**Empty list placeholder**
- Icon/emoji display
- Title and message
- Optional action button
- Used when no data available

### `ErrorState.tsx`
**Error display component**
- Error icon
- Error message
- Retry button
- Used when API calls fail

### `ScreenContainer.tsx`
**Screen wrapper component**
- Safe area handling
- Themed background
- Consistent padding
- Scroll support option

### `index.ts`
**Component exports**
- Barrel export for all components
- Simplifies imports: `import { Button } from '../components'`

---

## 📂 src/config/

### `api.ts`
**API configuration**
- Base URL for API (platform-specific)
- Android: 10.0.2.2:3001 (emulator to host)
- iOS: localhost:3001
- Endpoint constants (users, doctors, appointments)

---

## 📂 src/hooks/

### `useTheme.ts`
**Theme hook**
- Returns current theme colors (light/dark)
- Returns isDark boolean
- Memoized for performance
- Reads from themeStore

### `useDebounce.ts`
**Debounce hook**
- Delays value updates
- Used for search inputs
- Prevents excessive API calls
- Configurable delay (default 400ms)

### `index.ts`
**Hook exports**
- Barrel export for all hooks

---

## 📂 src/modules/auth/

### `api/authApi.ts`
**Authentication API calls**
- `loginUser()` - Validates email/password, returns user
- `registerUser()` - Creates new user, checks for duplicates
- Uses apiClient for HTTP requests

### `hooks/useAuth.ts`
**Authentication hook**
- Login function with loading/error states
- Register function with loading/error states
- Logout function
- Updates authStore on success

### `screens/LoginScreen.tsx`
**Login screen UI**
- Email and password inputs
- Login button
- Link to register screen
- Form validation
- Error handling

### `screens/RegisterScreen.tsx`
**Registration screen UI**
- Name, email, password, phone inputs
- Register button
- Link to login screen
- Form validation
- Error handling

### `index.ts`
**Auth module exports**
- Exports screens for navigation

---

## 📂 src/modules/doctors/

### `api/doctorsApi.ts`
**Doctors API calls**
- `getDoctors()` - Fetches all doctors
- `getDoctorById()` - Fetches single doctor
- Uses apiClient

### `hooks/useDoctors.ts`
**Doctors hooks**
- `useDoctorsList()` - Fetches doctors, handles search/filter
- `useDoctorDetails()` - Fetches single doctor by ID
- Loading and error states

### `components/DoctorCard.tsx`
**Doctor list item**
- Doctor image, name, specialty
- Rating display
- Touchable to navigate to details
- Themed styling

### `screens/DoctorsListScreen.tsx`
**Doctors list screen**
- Search bar
- Specialty filter
- FlatList of doctors
- Loading skeleton
- Empty state
- Navigation to details

### `screens/DoctorDetailsScreen.tsx`
**Doctor details screen**
- Doctor image, name, specialty, rating
- About section
- Available time slots
- Book appointment button
- Navigation to booking screen

### `index.ts`
**Doctors module exports**

---

## 📂 src/modules/appointments/

### `api/appointmentsApi.ts`
**Appointments API calls**
- `getAppointments()` - Fetches user's appointments
- `getAppointmentById()` - Fetches single appointment
- `createAppointment()` - Books new appointment
- `updateAppointment()` - Updates appointment
- `deleteAppointment()` - Cancels appointment
- `getDoctorById()` - Helper to get doctor details

### `hooks/useAppointments.ts`
**Appointments hooks**
- `useAppointmentsList()` - Fetches appointments with doctor data
- `useBookAppointment()` - Creates new appointment
- Loading and error states
- Auto-refresh after booking

### `components/AppointmentCard.tsx`
**Appointment list item**
- Doctor info
- Date and time
- Status badge
- Cancel button
- Themed styling

### `screens/AppointmentsListScreen.tsx`
**Appointments list screen**
- FlatList of appointments
- Loading state
- Empty state
- Pull to refresh
- Cancel functionality

### `screens/BookAppointmentScreen.tsx`
**Booking screen**
- Date picker
- Time slot selection
- Confirm button
- Validation
- Success/error handling

### `index.ts`
**Appointments module exports**

---

## 📂 src/modules/profile/

### `screens/ProfileScreen.tsx`
**User profile screen**
- User info display
- Theme toggle (light/dark)
- Logout button
- Settings options

### `index.ts`
**Profile module exports**

---

## 📂 src/navigation/

### `RootNavigator.tsx`
**Root navigation container**
- NavigationContainer wrapper
- Theme integration (light/dark)
- Conditional navigation (Auth vs Main)
- Hydrates stores on mount
- Shows loading while hydrating

### `AuthStack.tsx`
**Authentication stack navigator**
- Login screen
- Register screen
- Stack navigation between them

### `MainTabs.tsx`
**Bottom tab navigator**
- Home tab (doctors)
- Appointments tab
- Profile tab
- Custom tab icons (emojis)
- Themed tab bar

### `HomeStack.tsx`
**Home stack navigator**
- Doctors list screen
- Doctor details screen
- Book appointment screen
- Stack navigation flow

### `types.ts`
**Navigation type definitions**
- TypeScript types for all navigators
- Screen params
- Type-safe navigation

### `index.ts`
**Navigation exports**

---

## 📂 src/services/

### `apiClient.ts`
**Axios HTTP client**
- Base URL configuration
- 15s timeout
- JSON headers
- Response interceptor for error handling
- Centralized error messages

### `authService.ts`
**Auth service re-export**
- Re-exports from auth module API
- Keeps services organized

### `doctorsService.ts`
**Doctors service re-export**
- Re-exports from doctors module API

### `appointmentsService.ts`
**Appointments service re-export**
- Re-exports from appointments module API

### `index.ts`
**Services barrel export**

---

## 📂 src/store/

### `authStore.ts`
**Zustand authentication store**
- User state
- isAuthenticated flag
- Login/logout actions
- AsyncStorage persistence
- Hydration from storage

### `themeStore.ts`
**Zustand theme store**
- Theme mode (light/dark)
- Toggle theme action
- AsyncStorage persistence
- Hydration from storage

### `index.ts`
**Store exports**

---

## 📂 src/theme/

### `colors.ts`
**Color palette**
- Light theme colors
- Dark theme colors
- Primary, background, text, border, etc.
- Consistent color system

### `typography.ts`
**Text styles**
- Font sizes
- Font weights
- Line heights
- Heading and body styles

### `spacing.ts`
**Spacing scale**
- Consistent spacing values (xs, sm, md, lg, xl)
- Used for padding, margins, gaps

### `index.ts`
**Theme exports**
- Barrel export for theme system
- Also exports radius constants

---

## 📂 src/types/

### `models.ts`
**TypeScript type definitions**
- User type
- Doctor type
- Appointment type
- AppointmentWithDoctor type
- Shared across the app

---

## 📂 src/utils/

### `date.ts`
**Date utilities**
- Format date for display
- Parse date strings
- Date comparison helpers

### `debounce.ts`
**Debounce utility function**
- Delays function execution
- Used by useDebounce hook

### `storage.ts`
**AsyncStorage helpers**
- Save/load data
- Type-safe wrappers
- Error handling

### `validation.ts`
**Form validation**
- Email validation
- Password validation
- Phone validation
- Required field checks

### `index.ts`
**Utils barrel export**

---

## 📂 android/

**Android native code**
- Gradle build files
- AndroidManifest.xml
- Native modules
- App icons and resources
- Build configuration

---

## 📂 ios/

**iOS native code**
- Xcode project
- Info.plist
- Podfile (CocoaPods)
- Native modules
- App icons and resources
- Build configuration

---

## 📂 __tests__/

**Test files**
- Unit tests
- Integration tests
- Component tests
- Uses Jest

---

## File Organization Summary

```
MediQuick/
├── Root Config Files (babel, metro, typescript, etc.)
├── src/
│   ├── components/     → Reusable UI components
│   ├── config/         → App configuration
│   ├── hooks/          → Custom React hooks
│   ├── modules/        → Feature modules (auth, doctors, appointments, profile)
│   │   └── [module]/
│   │       ├── api/        → API calls
│   │       ├── hooks/      → Module-specific hooks
│   │       ├── components/ → Module-specific components
│   │       └── screens/    → Module screens
│   ├── navigation/     → Navigation setup
│   ├── services/       → API service layer
│   ├── store/          → Zustand state management
│   ├── theme/          → Design system (colors, typography, spacing)
│   ├── types/          → TypeScript types
│   └── utils/          → Utility functions
├── android/            → Android native code
└── ios/                → iOS native code
```

---

## Key Patterns

1. **Barrel Exports**: Each folder has `index.ts` for clean imports
2. **Feature Modules**: Each feature is self-contained (api, hooks, components, screens)
3. **Separation of Concerns**: API → Hooks → Components → Screens
4. **Type Safety**: TypeScript throughout
5. **Theming**: Centralized theme system
6. **State Management**: Zustand with persistence
7. **Reusability**: Shared components and hooks
