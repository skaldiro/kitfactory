import type { ExpoConfig } from 'expo/config';

import tokens from './design/tokens.json';

// Phones first (founder's call, Nov 21): tablets and web wait for decisions 9 and 12.
const config: ExpoConfig = {
  name: 'Kitmunk',
  slug: 'kitmunk',
  owner: 'kitfactory',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'kitmunk',
  userInterfaceStyle: 'light',
  backgroundColor: tokens.color.mist,
  ios: {
    supportsTablet: false,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: tokens.color.flare,
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-splash-screen',
      {
        backgroundColor: tokens.color.mist,
        image: './assets/images/splash-icon.png',
        imageWidth: 76,
      },
    ],
  ],
  extra: {
    eas: {
      // The kitmunk project in the kitfactory Expo organization. Not a secret.
      projectId: 'd9327ad3-f3b5-45fe-9615-1d64c6647675',
    },
  },
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
