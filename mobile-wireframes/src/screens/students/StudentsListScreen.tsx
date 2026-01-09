/**
 * StudentsListScreen
 * Main students list with search, filtering, and cards
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../../theme';
import { SearchInput, EmptyState, StatusFilter, ListSkeleton } from '../../components/ui';
import { StudentCard } from './components/StudentCard';
import type { StudentsStackScreenProps } from '../../navigation/types';
import type { Student, StudentStatus } from '../../types';

// Mock data matching web wireframe
const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Thompson',
    type: 'child',
    status: 'active',
    familyName: 'Thompson Family',
    credits: 8,
    nextLesson: { date: 'Today', time: '3:00 PM', isToday: true },
    subjects: ['Piano', 'Music Theory'],
    tags: ['Recital Prep', 'Advanced'],
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    type: 'adult',
    status: 'active',
    email: 'michael.chen@email.com',
    credits: 4,
    nextLesson: { date: 'Tomorrow', time: '5:30 PM', isToday: false },
    subjects: ['Guitar'],
    tags: ['Beginner'],
  },
  {
    id: '3',
    firstName: 'Sofia',
    lastName: 'Rodriguez',
    type: 'child',
    status: 'trial',
    familyName: 'Rodriguez Family',
    credits: 2,
    nextLesson: { date: 'Wed', time: '4:00 PM', isToday: false },
    subjects: ['Violin'],
    tags: ['Trial Period'],
  },
  {
    id: '4',
    firstName: 'James',
    lastName: 'Wilson',
    type: 'adult',
    status: 'active',
    email: 'j.wilson@email.com',
    credits: 12,
    nextLesson: { date: 'Thu', time: '6:00 PM', isToday: false },
    subjects: ['Drums', 'Percussion'],
    tags: ['Intermediate', 'Jazz'],
  },
  {
    id: '5',
    firstName: 'Olivia',
    lastName: 'Brown',
    type: 'child',
    status: 'waiting',
    familyName: 'Brown Family',
    credits: 0,
    subjects: ['Piano'],
    tags: ['Waitlist'],
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Martinez',
    type: 'adult',
    status: 'lead',
    email: 'd.martinez@email.com',
    credits: 0,
    subjects: ['Voice'],
    tags: ['New Lead'],
  },
  {
    id: '7',
    firstName: 'Ava',
    lastName: 'Johnson',
    type: 'child',
    status: 'active',
    familyName: 'Johnson Family',
    credits: 6,
    nextLesson: { date: 'Fri', time: '3:30 PM', isToday: false },
    subjects: ['Flute'],
    tags: ['Orchestra'],
  },
  {
    id: '8',
    firstName: 'Robert',
    lastName: 'Taylor',
    type: 'adult',
    status: 'inactive',
    email: 'r.taylor@email.com',
    credits: 1,
    subjects: ['Bass Guitar'],
    tags: ['On Break'],
  },
];

type Props = StudentsStackScreenProps<'StudentsList'>;

export function StudentsListScreen({ navigation }: Props) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filter students based on search and status
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((student) => {
      // Status filter
      if (statusFilter !== 'all' && student.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const family = student.familyName?.toLowerCase() || '';
        const email = student.email?.toLowerCase() || '';

        return fullName.includes(query) || family.includes(query) || email.includes(query);
      }

      return true;
    });
  }, [searchQuery, statusFilter]);

  // Status counts for filter badges
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MOCK_STUDENTS.length };
    MOCK_STUDENTS.forEach((student) => {
      counts[student.status] = (counts[student.status] || 0) + 1;
    });
    return counts;
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleStudentPress = (studentId: string) => {
    navigation.navigate('StudentDetail', { id: studentId });
  };

  const renderItem = ({ item }: { item: Student }) => (
    <StudentCard student={item} onPress={() => handleStudentPress(item.id)} />
  );

  const renderEmpty = () => {
    if (searchQuery || statusFilter !== 'all') {
      return (
        <EmptyState
          icon="search-outline"
          title="No students found"
          description="Try adjusting your search or filters"
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('all');
          }}
        />
      );
    }

    return (
      <EmptyState
        icon="people-outline"
        title="No students yet"
        description="Add your first student to get started"
        actionLabel="Add Student"
        onAction={() => navigation.getParent()?.navigate('AddStudent')}
      />
    );
  };

  const ListHeader = (
    <View style={styles.listHeader}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search students..."
          containerStyle={styles.searchInput}
        />
      </View>

      {/* Status Filter */}
      <StatusFilter
        value={statusFilter}
        onChange={setStatusFilter}
        counts={statusCounts}
        style={styles.statusFilter}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.base }]}>
        {ListHeader}
        <ListSkeleton count={5} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.base }]}>
      <FlatList
        data={filteredStudents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchInput: {
    marginBottom: 8,
  },
  statusFilter: {
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
});
