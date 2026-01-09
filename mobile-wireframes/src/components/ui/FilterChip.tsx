/**
 * FilterChip Component
 * Toggleable filter chips for status and tag filtering
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, colors } from '../../theme';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  count?: number;
  style?: ViewStyle;
}

export function FilterChip({
  label,
  selected = false,
  onPress,
  count,
  style,
}: FilterChipProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        {
          backgroundColor: selected
            ? theme.colors.primary
            : theme.colors.background.surface,
          borderColor: selected
            ? theme.colors.primary
            : theme.colors.border.default,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected
              ? theme.colors.foreground.onAccent
              : theme.colors.foreground.default,
          },
        ]}
      >
        {label}
      </Text>
      {count !== undefined && (
        <View
          style={[
            styles.countBadge,
            {
              backgroundColor: selected
                ? 'rgba(255,255,255,0.2)'
                : theme.colors.background.muted,
            },
          ]}
        >
          <Text
            style={[
              styles.count,
              {
                color: selected
                  ? theme.colors.foreground.onAccent
                  : theme.colors.foreground.secondary,
              },
            ]}
          >
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Filter Chip Group for horizontal scrolling chips
interface FilterChipGroupProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function FilterChipGroup({ children, style }: FilterChipGroupProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.group, style]}
    >
      {children}
    </ScrollView>
  );
}

// Status Filter Chips - predefined for student statuses
interface StatusFilterProps {
  value: string;
  onChange: (status: string) => void;
  counts?: Record<string, number>;
  style?: ViewStyle;
}

export function StatusFilter({
  value,
  onChange,
  counts = {},
  style,
}: StatusFilterProps) {
  const statuses = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'trial', label: 'Trial' },
    { key: 'waiting', label: 'Waiting' },
    { key: 'lead', label: 'Lead' },
    { key: 'inactive', label: 'Inactive' },
  ];

  return (
    <FilterChipGroup style={style}>
      {statuses.map((status) => (
        <FilterChip
          key={status.key}
          label={status.label}
          selected={value === status.key}
          onPress={() => onChange(status.key)}
          count={counts[status.key]}
        />
      ))}
    </FilterChipGroup>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 22,
    alignItems: 'center',
  },
  count: {
    fontSize: 12,
    fontWeight: '600',
  },
  group: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
