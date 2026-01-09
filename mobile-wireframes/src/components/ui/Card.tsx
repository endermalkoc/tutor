/**
 * Card Component
 * Container for grouped content with consistent styling
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
}

export function Card({
  children,
  onPress,
  style,
  padding = 'md',
  elevated = true,
}: CardProps) {
  const theme = useTheme();

  const getPadding = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'sm':
        return 12;
      case 'lg':
        return 20;
      default:
        return 16;
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.borderRadius.xl,
    padding: getPadding(),
    ...(elevated ? theme.shadows.md : {}),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[cardStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.header,
        { borderBottomColor: theme.colors.border.subtle },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardFooter({ children, style }: CardFooterProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.footer,
        { borderTopColor: theme.colors.border.subtle },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  content: {
    // Content inherits padding from Card
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
});
