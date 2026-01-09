/**
 * ListItem Component
 * Standard list row with optional actions
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface ListItemProps {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  borderBottom?: boolean;
  style?: ViewStyle;
}

export function ListItem({
  title,
  subtitle,
  left,
  right,
  onPress,
  showChevron = true,
  borderBottom = true,
  style,
}: ListItemProps) {
  const theme = useTheme();

  const content = (
    <View
      style={[
        styles.container,
        borderBottom && { borderBottomColor: theme.colors.border.subtle, borderBottomWidth: 1 },
        style,
      ]}
    >
      {left && <View style={styles.left}>{left}</View>}
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: theme.colors.foreground.default }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.subtitle, { color: theme.colors.foreground.muted }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {right && <View style={styles.right}>{right}</View>}
      {onPress && showChevron && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={theme.colors.foreground.faint}
          style={styles.chevron}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

// Divider for separating list sections
export function ListDivider() {
  const theme = useTheme();

  return (
    <View
      style={[styles.divider, { backgroundColor: theme.colors.border.subtle }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  left: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  right: {
    marginLeft: 12,
  },
  chevron: {
    marginLeft: 8,
  },
  divider: {
    height: 8,
  },
});
