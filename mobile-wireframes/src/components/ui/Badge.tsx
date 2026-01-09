/**
 * Badge Component
 * Status indicators and labels
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, colors } from '../../theme';
import { StudentStatus } from '../../types';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
}: BadgeProps) {
  const theme = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: colors.primary[100],
          text: colors.primary[700],
        };
      case 'success':
        return {
          background: colors.success[100],
          text: colors.success[700],
        };
      case 'warning':
        return {
          background: colors.warning[100],
          text: colors.warning[700],
        };
      case 'error':
        return {
          background: colors.error[100],
          text: colors.error[700],
        };
      case 'info':
        return {
          background: colors.info[100],
          text: colors.info[700],
        };
      default:
        return {
          background: theme.colors.background.muted,
          text: theme.colors.foreground.secondary,
        };
    }
  };

  const { background, text } = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: background,
          paddingVertical: size === 'sm' ? 2 : 4,
          paddingHorizontal: size === 'sm' ? 6 : 8,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: text,
            fontSize: size === 'sm' ? 11 : 12,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

// Status Badge - Specific variant for student statuses
interface StatusBadgeProps {
  status: StudentStatus;
  size?: BadgeSize;
  style?: ViewStyle;
}

export function StatusBadge({ status, size = 'md', style }: StatusBadgeProps) {
  const getVariant = (): BadgeVariant => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trial':
        return 'info';
      case 'waiting':
        return 'warning';
      case 'lead':
        return 'primary';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  const getLabel = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Badge variant={getVariant()} size={size} style={style}>
      {getLabel()}
    </Badge>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});
