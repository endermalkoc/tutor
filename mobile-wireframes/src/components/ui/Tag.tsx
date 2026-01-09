/**
 * Tag Component
 * Removable tags for categorization
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, colors } from '../../theme';

interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  color?: string;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Tag({
  children,
  onRemove,
  color,
  size = 'md',
  style,
}: TagProps) {
  const theme = useTheme();

  // Default tag colors
  const tagColors = [
    { bg: colors.primary[100], text: colors.primary[700] },
    { bg: colors.success[100], text: colors.success[700] },
    { bg: colors.warning[100], text: colors.warning[700] },
    { bg: colors.info[100], text: colors.info[700] },
    { bg: colors.indigo[100], text: colors.indigo[700] },
    { bg: colors.cyan[100], text: colors.cyan[700] },
  ];

  // Get color based on content hash for consistency
  const getTagColor = () => {
    if (color) {
      return { bg: `${color}20`, text: color };
    }
    const str = typeof children === 'string' ? children : '';
    const index = str.charCodeAt(0) % tagColors.length;
    return tagColors[index];
  };

  const { bg, text } = getTagColor();

  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: bg,
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
      {onRemove && (
        <TouchableOpacity
          onPress={onRemove}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
          style={styles.removeButton}
        >
          <Ionicons name="close" size={size === 'sm' ? 12 : 14} color={text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

// Tag Input with multiple tags
interface TagInputProps {
  tags: string[];
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
}

export function TagInput({
  tags,
  onAddTag,
  onRemoveTag,
  placeholder = 'Add tag...',
  label,
  style,
}: TagInputProps) {
  const theme = useTheme();

  return (
    <View style={[styles.tagInputContainer, style]}>
      {label && (
        <Text
          style={[styles.label, { color: theme.colors.foreground.secondary }]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.tagsContainer,
          {
            borderColor: theme.colors.border.default,
            backgroundColor: theme.colors.background.surface,
          },
        ]}
      >
        {tags.map((tag) => (
          <Tag key={tag} onRemove={onRemoveTag ? () => onRemoveTag(tag) : undefined}>
            {tag}
          </Tag>
        ))}
        <TouchableOpacity
          onPress={() => onAddTag?.('New Tag')}
          style={[styles.addButton, { borderColor: theme.colors.border.default }]}
        >
          <Ionicons
            name="add"
            size={14}
            color={theme.colors.foreground.muted}
          />
          <Text
            style={[styles.addText, { color: theme.colors.foreground.muted }]}
          >
            {placeholder}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  text: {
    fontWeight: '500',
  },
  removeButton: {
    marginLeft: 4,
  },
  tagInputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    minHeight: 44,
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 6,
  },
  addText: {
    fontSize: 12,
    marginLeft: 4,
  },
});
