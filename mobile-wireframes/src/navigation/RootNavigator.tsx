/**
 * Root Navigator
 * Main navigation structure for the app
 */

import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme';

import { MainTabNavigator } from './MainTabNavigator';
import { AddStudentScreen } from '../screens/students/AddStudentScreen';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background.base,
          },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Add Student',
            headerTitleStyle: {
              fontWeight: '600',
              color: theme.colors.foreground.default,
            },
            headerStyle: {
              backgroundColor: theme.colors.background.surface,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
