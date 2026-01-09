/**
 * DashboardScreen
 * Home screen with overview stats and quick actions
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, colors } from '../../theme';
import { Card, Avatar, StatusBadge } from '../../components/ui';

export function DashboardScreen() {
  const theme = useTheme();

  const todayStats = {
    lessons: 5,
    completed: 2,
    upcoming: 3,
    revenue: 375,
  };

  const upcomingLessons = [
    { id: '1', student: 'Emma Thompson', time: '3:00 PM', subject: 'Piano', isNext: true },
    { id: '2', student: 'Michael Chen', time: '4:30 PM', subject: 'Guitar', isNext: false },
    { id: '3', student: 'Sofia Rodriguez', time: '5:30 PM', subject: 'Violin', isNext: false },
  ];

  const quickActions = [
    { icon: 'add-circle-outline' as const, label: 'Add Student', color: colors.primary[500] },
    { icon: 'calendar-outline' as const, label: 'Schedule', color: colors.success[500] },
    { icon: 'receipt-outline' as const, label: 'Invoice', color: colors.warning[500] },
    { icon: 'chatbubble-outline' as const, label: 'Message', color: colors.info[500] },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.base }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.foreground.muted }]}>
              Good afternoon
            </Text>
            <Text style={[styles.title, { color: theme.colors.foreground.default }]}>
              Dashboard
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Avatar name="Jane Doe" size="md" />
          </TouchableOpacity>
        </View>

        {/* Today's Overview */}
        <Card style={styles.overviewCard}>
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground.default }]}>
            Today's Overview
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {todayStats.lessons}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.foreground.muted }]}>
                Total Lessons
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success[500] }]}>
                {todayStats.completed}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.foreground.muted }]}>
                Completed
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.warning[500] }]}>
                {todayStats.upcoming}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.foreground.muted }]}>
                Upcoming
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.foreground.default }]}>
                ${todayStats.revenue}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.foreground.muted }]}>
                Revenue
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.quickAction,
                { backgroundColor: theme.colors.background.surface },
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={[styles.quickActionLabel, { color: theme.colors.foreground.default }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Lessons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.foreground.default }]}>
              Upcoming Lessons
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <Card padding="none">
            {upcomingLessons.map((lesson, index) => (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonItem,
                  index < upcomingLessons.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border.subtle,
                  },
                ]}
              >
                <Avatar name={lesson.student} size="sm" />
                <View style={styles.lessonInfo}>
                  <Text style={[styles.lessonStudent, { color: theme.colors.foreground.default }]}>
                    {lesson.student}
                  </Text>
                  <Text style={[styles.lessonSubject, { color: theme.colors.foreground.muted }]}>
                    {lesson.subject}
                  </Text>
                </View>
                <View style={styles.lessonTime}>
                  {lesson.isNext && (
                    <View style={[styles.nextBadge, { backgroundColor: colors.success[100] }]}>
                      <Text style={[styles.nextText, { color: colors.success[700] }]}>Next</Text>
                    </View>
                  )}
                  <Text style={[styles.timeText, { color: theme.colors.foreground.secondary }]}>
                    {lesson.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  overviewCard: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  lessonStudent: {
    fontSize: 15,
    fontWeight: '500',
  },
  lessonSubject: {
    fontSize: 13,
    marginTop: 2,
  },
  lessonTime: {
    alignItems: 'flex-end',
  },
  nextBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  nextText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 24,
  },
});
