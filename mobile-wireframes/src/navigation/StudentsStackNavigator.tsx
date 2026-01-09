/**
 * Students Stack Navigator
 * Navigation for students tab (list and detail views)
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

import { StudentsListScreen } from '../screens/students/StudentsListScreen';
import { StudentDetailScreen } from '../screens/students/StudentDetailScreen';
import type { StudentsStackParamList } from './types';

const Stack = createStackNavigator<StudentsStackParamList>();

export function StudentsStackNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.surface,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
          color: theme.colors.foreground.default,
        },
        headerTintColor: theme.colors.primary,
        cardStyle: {
          backgroundColor: theme.colors.background.base,
        },
      }}
    >
      <Stack.Screen
        name="StudentsList"
        component={StudentsListScreen}
        options={({ navigation }) => ({
          headerTitle: 'Students',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.getParent()?.getParent()?.navigate('AddStudent')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ marginRight: 16 }}
            >
              <Ionicons
                name="add-circle"
                size={28}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="StudentDetail"
        component={StudentDetailScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
