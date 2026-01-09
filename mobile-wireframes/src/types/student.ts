/**
 * Student and related entity types
 * Matches the web wireframe data structures
 */

export type StudentStatus = 'active' | 'trial' | 'waiting' | 'lead' | 'inactive';

export type StudentType = 'child' | 'adult';

export interface Guardian {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  phoneType?: 'mobile' | 'home' | 'work';
  smsEnabled?: boolean;
  relationship: 'mother' | 'father' | 'guardian' | 'other';
  isPrimaryBilling?: boolean;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  type: StudentType;
  status: StudentStatus;
  email?: string;
  phone?: string;
  avatarUrl?: string;

  // For children
  birthDate?: string;
  age?: number;
  guardians?: Guardian[];
  familyId?: string;
  familyName?: string;

  // Lesson settings
  lessonDuration?: number;
  subjects?: string[];
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';

  // Credits & billing
  credits?: number;

  // Next lesson
  nextLesson?: {
    date: string;
    time: string;
    isToday?: boolean;
  };

  // Tags
  tags?: string[];

  // Notes
  notes?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentFilters {
  search: string;
  status: StudentStatus | 'all';
  tags: string[];
}

export interface LessonSettings {
  duration: number;
  category: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  subjects: string[];
  notes?: string;
}

export interface BillingSettings {
  method: 'package' | 'hourly' | 'monthly';
  rate: number;
  packageCredits?: number;
  invoiceSchedule?: 'weekly' | 'bi-weekly' | 'monthly';
}
