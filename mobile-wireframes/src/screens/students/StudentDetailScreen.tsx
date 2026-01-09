/**
 * StudentDetailScreen
 * Comprehensive student profile with tabs
 */

import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, colors } from '../../theme';
import { Avatar, StatusBadge, Button, Card, Tag, SectionHeader } from '../../components/ui';
import type { StudentsStackScreenProps } from '../../navigation/types';
import type { Student, Guardian } from '../../types';

// Mock student data
const MOCK_STUDENT: Student & { guardians: Guardian[] } = {
  id: '1',
  firstName: 'Emma',
  lastName: 'Thompson',
  type: 'child',
  status: 'active',
  familyId: 'f1',
  familyName: 'Thompson Family',
  birthDate: '2015-03-15',
  age: 10,
  credits: 8,
  nextLesson: { date: 'Today', time: '3:00 PM', isToday: true },
  subjects: ['Piano', 'Music Theory'],
  skillLevel: 'intermediate',
  lessonDuration: 45,
  tags: ['Recital Prep', 'Advanced', 'Spring Recital'],
  notes: 'Working on Fur Elise for spring recital. Practice hand position exercises.',
  guardians: [
    {
      id: 'g1',
      firstName: 'Sarah',
      lastName: 'Thompson',
      relationship: 'mother',
      email: 'sarah.thompson@email.com',
      phone: '(555) 123-4567',
      phoneType: 'mobile',
      smsEnabled: true,
      isPrimaryBilling: true,
    },
    {
      id: 'g2',
      firstName: 'John',
      lastName: 'Thompson',
      relationship: 'father',
      phone: '(555) 987-6543',
      phoneType: 'mobile',
      smsEnabled: false,
    },
  ],
};

type Props = StudentsStackScreenProps<'StudentDetail'>;

type TabKey = 'overview' | 'lessons' | 'homework' | 'messages' | 'invoices';

export function StudentDetailScreen({ navigation, route }: Props) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const { id } = route.params;

  // In real app, fetch student by ID
  const student = MOCK_STUDENT;
  const fullName = `${student.firstName} ${student.lastName}`;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: fullName,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {/* Open action sheet */}}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, fullName, theme.colors.primary]);

  const tabs: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'overview', label: 'Overview', icon: 'person-outline' },
    { key: 'lessons', label: 'Lessons', icon: 'calendar-outline' },
    { key: 'homework', label: 'Homework', icon: 'book-outline' },
    { key: 'messages', label: 'Messages', icon: 'chatbubble-outline' },
    { key: 'invoices', label: 'Invoices', icon: 'receipt-outline' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.base }]}>
      {/* Header Card */}
      <View style={[styles.headerCard, { backgroundColor: theme.colors.background.surface }]}>
        <View style={styles.headerTop}>
          <Avatar name={fullName} size="xl" />
          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={[styles.name, { color: theme.colors.foreground.default }]}>
                {fullName}
              </Text>
              <StatusBadge status={student.status} />
            </View>
            {student.familyName && (
              <Text style={[styles.family, { color: theme.colors.foreground.muted }]}>
                {student.familyName}
              </Text>
            )}
            {student.nextLesson && (
              <View style={styles.nextLesson}>
                <View style={[styles.todayDot, { backgroundColor: colors.success[500] }]} />
                <Text style={[styles.nextLessonText, { color: colors.success[600] }]}>
                  Next: {student.nextLesson.isToday ? 'Today' : student.nextLesson.date} at {student.nextLesson.time}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            icon="calendar-outline"
            size="sm"
            onPress={() => {}}
            style={styles.actionButton}
          >
            Schedule
          </Button>
          <Button
            icon="chatbubble-outline"
            variant="secondary"
            size="sm"
            onPress={() => {}}
            style={styles.actionButton}
          >
            Message
          </Button>
          <Button
            icon="create-outline"
            variant="outline"
            size="sm"
            onPress={() => {}}
            style={styles.actionButton}
          >
            Edit
          </Button>
        </View>
      </View>

      {/* Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabBar, { backgroundColor: theme.colors.background.surface }]}
        contentContainerStyle={styles.tabBarContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tab,
              activeTab === tab.key && {
                borderBottomColor: theme.colors.primary,
                borderBottomWidth: 2,
              },
            ]}
          >
            <Ionicons
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? theme.colors.primary : theme.colors.foreground.muted}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: activeTab === tab.key
                    ? theme.colors.primary
                    : theme.colors.foreground.muted,
                  fontWeight: activeTab === tab.key ? '600' : '400',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'overview' && (
          <OverviewTab student={student} />
        )}
        {activeTab === 'lessons' && (
          <PlaceholderTab icon="calendar-outline" title="Lessons" />
        )}
        {activeTab === 'homework' && (
          <PlaceholderTab icon="book-outline" title="Homework" />
        )}
        {activeTab === 'messages' && (
          <PlaceholderTab icon="chatbubble-outline" title="Messages" />
        )}
        {activeTab === 'invoices' && (
          <PlaceholderTab icon="receipt-outline" title="Invoices" />
        )}
      </ScrollView>
    </View>
  );
}

// Overview Tab Component
function OverviewTab({ student }: { student: Student & { guardians: Guardian[] } }) {
  const theme = useTheme();

  return (
    <View>
      {/* Credits Card */}
      <Card style={styles.section}>
        <View style={styles.creditsRow}>
          <View>
            <Text style={[styles.creditsLabel, { color: theme.colors.foreground.muted }]}>
              Available Credits
            </Text>
            <Text style={[styles.creditsValue, { color: theme.colors.foreground.default }]}>
              {student.credits}
            </Text>
          </View>
          <Button size="sm" variant="outline" onPress={() => {}}>
            Add Credits
          </Button>
        </View>
      </Card>

      {/* Lesson Settings */}
      <SectionHeader title="Lesson Settings" action="Edit" onAction={() => {}} />
      <Card style={styles.section}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.colors.foreground.muted }]}>
            Duration
          </Text>
          <Text style={[styles.settingValue, { color: theme.colors.foreground.default }]}>
            {student.lessonDuration} minutes
          </Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.colors.foreground.muted }]}>
            Skill Level
          </Text>
          <Text style={[styles.settingValue, { color: theme.colors.foreground.default }]}>
            {student.skillLevel?.charAt(0).toUpperCase()}{student.skillLevel?.slice(1)}
          </Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.colors.foreground.muted }]}>
            Subjects
          </Text>
          <View style={styles.subjectTags}>
            {student.subjects?.map((subject) => (
              <Tag key={subject} size="sm">{subject}</Tag>
            ))}
          </View>
        </View>
      </Card>

      {/* Guardians (for children) */}
      {student.type === 'child' && student.guardians && (
        <>
          <SectionHeader title="Guardians" action="Add" onAction={() => {}} />
          {student.guardians.map((guardian) => (
            <Card key={guardian.id} style={styles.section}>
              <View style={styles.guardianHeader}>
                <Avatar name={`${guardian.firstName} ${guardian.lastName}`} size="sm" />
                <View style={styles.guardianInfo}>
                  <Text style={[styles.guardianName, { color: theme.colors.foreground.default }]}>
                    {guardian.firstName} {guardian.lastName}
                  </Text>
                  <Text style={[styles.guardianRelation, { color: theme.colors.foreground.muted }]}>
                    {guardian.relationship.charAt(0).toUpperCase()}{guardian.relationship.slice(1)}
                    {guardian.isPrimaryBilling && ' · Primary Billing'}
                  </Text>
                </View>
              </View>
              {guardian.email && (
                <View style={styles.contactRow}>
                  <Ionicons name="mail-outline" size={16} color={theme.colors.foreground.muted} />
                  <Text style={[styles.contactText, { color: theme.colors.foreground.secondary }]}>
                    {guardian.email}
                  </Text>
                </View>
              )}
              {guardian.phone && (
                <View style={styles.contactRow}>
                  <Ionicons name="call-outline" size={16} color={theme.colors.foreground.muted} />
                  <Text style={[styles.contactText, { color: theme.colors.foreground.secondary }]}>
                    {guardian.phone}
                  </Text>
                  {guardian.smsEnabled && (
                    <View style={[styles.smsBadge, { backgroundColor: colors.success[100] }]}>
                      <Text style={[styles.smsText, { color: colors.success[700] }]}>SMS</Text>
                    </View>
                  )}
                </View>
              )}
            </Card>
          ))}
        </>
      )}

      {/* Tags */}
      {student.tags && student.tags.length > 0 && (
        <>
          <SectionHeader title="Tags" action="Edit" onAction={() => {}} />
          <Card style={styles.section}>
            <View style={styles.tagsContainer}>
              {student.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </View>
          </Card>
        </>
      )}

      {/* Notes */}
      {student.notes && (
        <>
          <SectionHeader title="Notes" action="Add Note" onAction={() => {}} />
          <Card style={styles.section}>
            <Text style={[styles.noteText, { color: theme.colors.foreground.secondary }]}>
              {student.notes}
            </Text>
          </Card>
        </>
      )}
    </View>
  );
}

// Placeholder Tab Component
function PlaceholderTab({ icon, title }: { icon: keyof typeof Ionicons.glyphMap; title: string }) {
  const theme = useTheme();

  return (
    <View style={styles.placeholder}>
      <Ionicons name={icon} size={48} color={theme.colors.foreground.faint} />
      <Text style={[styles.placeholderText, { color: theme.colors.foreground.muted }]}>
        {title} content coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  family: {
    fontSize: 14,
    marginTop: 4,
  },
  nextLesson: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  todayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  nextLessonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    maxHeight: 48,
  },
  tabBarContent: {
    paddingHorizontal: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  tabLabel: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  creditsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditsLabel: {
    fontSize: 13,
  },
  creditsValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  subjectTags: {
    flexDirection: 'row',
    gap: 4,
  },
  guardianHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  guardianInfo: {
    marginLeft: 12,
  },
  guardianName: {
    fontSize: 15,
    fontWeight: '600',
  },
  guardianRelation: {
    fontSize: 13,
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  contactText: {
    fontSize: 14,
  },
  smsBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  smsText: {
    fontSize: 10,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  placeholderText: {
    fontSize: 15,
    marginTop: 12,
  },
});
