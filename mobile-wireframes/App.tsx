/**
 * TutorStudio Mobile - Main App Entry
 * React Native Expo wireframes for tutoring management
 */

import React from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider, useTheme } from './src/theme';
import { RootNavigator } from './src/navigation';

function AppContent() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <RootNavigator />
    </>
  );
}

function AppWithProviders() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default function App() {
  // On web, skip GestureHandlerRootView as it can cause issues
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <AppWithProviders />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppWithProviders />
    </GestureHandlerRootView>
  );
}
