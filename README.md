# MediQuick

A React Native medical appointment booking application.

## Getting Started

### Prerequisites
- Node.js >= 22.11.0
- React Native development environment set up

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

**Important:** You need to run both the API server and the React Native app.

#### 1. Start the JSON Server API (in one terminal):
```bash
npm run api
```
This will start the mock API server at `http://localhost:3001`

#### 2. Start the React Native Metro bundler (in another terminal):
```bash
npm start
```

#### 3. Run on your platform (in a third terminal):

For Android:
```bash
npm run android
```

For iOS:
```bash
npm run ios
```

## API Resources

The JSON Server provides the following endpoints:
- `GET/POST http://localhost:3001/users`
- `GET/POST http://localhost:3001/doctors`
- `GET/POST/PUT/DELETE http://localhost:3001/appointments`

Data is stored in `mockapi-seed.json` and persists during development.

## Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run api` - Start JSON Server mock API
- `npm run lint` - Run ESLint
- `npm test` - Run tests
