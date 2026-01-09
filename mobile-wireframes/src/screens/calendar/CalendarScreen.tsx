/**
 * CalendarScreen
 * Calendar view for lesson scheduling
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

export function CalendarScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.base }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground.default }]}>
          Calendar
        </Text>
      </View>
      <View style={styles.placeholder}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.background.muted }]}>
          <Ionicons name="calendar-outline" size={48} color={theme.colors.foreground.faint} />
        </View>
        <Text style={[styles.placeholderTitle, { color: theme.colors.foreground.default }]}>
          Calendar View
        </Text>
        <Text style={[styles.placeholderText, { color: theme.colors.foreground.muted }]}>
          Schedule and manage lessons with a full calendar interface
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
