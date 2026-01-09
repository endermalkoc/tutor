/**
 * Skeleton Component
 * Loading placeholders for content
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle, Dimensions } from 'react-native';
import { useTheme } from '../../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = 4,
  style,
}: SkeletonProps) {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: theme.colors.border.default,
          opacity,
        },
        style,
      ]}
    />
  );
}

// Skeleton presets for common patterns
export function SkeletonText({
  lines = 1,
  lastLineWidth = 0.6,
  spacing = 8,
}: {
  lines?: number;
  lastLineWidth?: number;
  spacing?: number;
}) {
  return (
    <View>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? `${lastLineWidth * 100}%` : '100%'}
          height={14}
          style={{ marginBottom: i < lines - 1 ? spacing : 0 }}
        />
      ))}
    </View>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton width={size} height={size} borderRadius={size / 2} />;
}

// Student Card Skeleton
export function StudentCardSkeleton() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.studentCard,
        {
          backgroundColor: theme.colors.background.surface,
          ...theme.shadows.sm,
        },
      ]}
    >
      <View style={styles.studentCardHeader}>
        <SkeletonAvatar size={44} />
        <View style={styles.studentCardInfo}>
          <Skeleton width={120} height={16} />
          <Skeleton width={80} height={12} style={{ marginTop: 6 }} />
        </View>
        <Skeleton width={60} height={24} borderRadius={12} />
      </View>
      <View style={styles.studentCardBody}>
        <View style={styles.studentCardRow}>
          <Skeleton width={100} height={14} />
          <Skeleton width={70} height={14} />
        </View>
      </View>
    </View>
  );
}

// List Skeleton
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <StudentCardSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  studentCard: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  studentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentCardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  studentCardBody: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  studentCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
