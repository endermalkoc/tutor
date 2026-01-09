/**
 * Type exports
 */

export * from './student';

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
  StudentDetail: { id: string };
  AddStudent: undefined;
  EditStudent: { id: string };
  ScheduleLesson: { studentId: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Students: undefined;
  Calendar: undefined;
  Invoices: undefined;
  Settings: undefined;
};

export type StudentsStackParamList = {
  StudentsList: undefined;
  StudentDetail: { id: string };
  AddStudent: undefined;
  EditStudent: { id: string };
};
