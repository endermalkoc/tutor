/**
 * Navigation Type Definitions
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root stack includes all modal screens and the main tabs
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  AddStudent: undefined;
  EditStudent: { id: string };
  ScheduleLesson: { studentId: string };
};

// Main bottom tab navigator
export type MainTabParamList = {
  DashboardTab: undefined;
  StudentsTab: NavigatorScreenParams<StudentsStackParamList>;
  CalendarTab: undefined;
  InvoicesTab: undefined;
  SettingsTab: undefined;
};

// Students stack within the students tab
export type StudentsStackParamList = {
  StudentsList: undefined;
  StudentDetail: { id: string };
};

// Screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type StudentsStackScreenProps<T extends keyof StudentsStackParamList> =
  StackScreenProps<StudentsStackParamList, T>;
