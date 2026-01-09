/**
 * StudentCard Component
 * Mobile-optimized card for displaying student info in lists
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, colors } from '../../../theme';
import { Avatar, StatusBadge, Tag } from '../../../components/ui';
import type { Student } from '../../../types';

interface StudentCardProps {
  student: Student;
  onPress: () => void;
}

export function StudentCard({ student, onPress }: StudentCardProps) {
  const theme = useTheme();

  const fullName = `${student.firstName} ${student.lastName}`;

  // Format next lesson display
  const getNextLessonDisplay = () => {
    if (!student.nextLesson) {
      return null;
    }

    const { date, time, isToday } = student.nextLesson;

    return (
      <View style={styles.nextLesson}>
        {isToday && (
          <View style={[styles.todayIndicator, { backgroundColor: colors.success[500] }]} />
        )}
        <Ionicons
          name="calendar-outline"
          size={14}
          color={isToday ? colors.success[600] : theme.colors.foreground.muted}
        />
        <Text
          style={[
            styles.nextLessonText,
            {
              color: isToday ? colors.success[600] : theme.colors.foreground.muted,
              fontWeight: isToday ? '600' : '400',
            },
          ]}
        >
          {isToday ? `Today ${time}` : `${date} ${time}`}
        </Text>
      </View>
    );
  };

  // Get credits display with color coding
  const getCreditsDisplay = () => {
    if (student.credits === undefined) return null;

    let color = theme.colors.foreground.secondary;
    if (student.credits <= 0) {
      color = colors.error[500];
    } else if (student.credits <= 2) {
      color = colors.warning[500];
    }

    return (
      <View style={styles.credits}>
        <Text style={[styles.creditsValue, { color }]}>{student.credits}</Text>
        <Text style={[styles.creditsLabel, { color: theme.colors.foreground.muted }]}>
          credits
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background.surface,
          ...theme.shadows.sm,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Avatar name={fullName} imageUrl={student.avatarUrl} size="md" />
        <View style={styles.info}>
          <Text
            style={[styles.name, { color: theme.colors.foreground.default }]}
            numberOfLines={1}
          >
            {fullName}
          </Text>
          {student.familyName && (
            <Text
              style={[styles.family, { color: theme.colors.foreground.muted }]}
              numberOfLines={1}
            >
              {student.familyName}
            </Text>
          )}
        </View>
        <StatusBadge status={student.status} size="sm" />
      </View>

      {/* Meta row */}
      <View
        style={[styles.meta, { borderTopColor: theme.colors.border.subtle }]}
      >
        {getNextLessonDisplay()}
        {getCreditsDisplay()}
      </View>

      {/* Tags */}
      {student.tags && student.tags.length > 0 && (
        <View style={styles.tags}>
          {student.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} size="sm">
              {tag}
            </Tag>
          ))}
          {student.tags.length > 3 && (
            <Text
              style={[styles.moreTag, { color: theme.colors.foreground.muted }]}
            >
              +{student.tags.length - 3}
            </Text>
          )}
        </View>
      )}

      {/* Chevron indicator */}
      <View style={styles.chevron}>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={theme.colors.foreground.faint}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  family: {
    fontSize: 13,
    marginTop: 2,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  nextLesson: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  nextLessonText: {
    fontSize: 13,
    marginLeft: 6,
  },
  credits: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  creditsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  creditsLabel: {
    fontSize: 12,
    marginLeft: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  moreTag: {
    fontSize: 12,
    marginLeft: 4,
    alignSelf: 'center',
  },
  chevron: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -9,
  },
});
