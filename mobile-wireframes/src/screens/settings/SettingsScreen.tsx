/**
 * SettingsScreen
 * App settings and preferences
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useThemeContext } from '../../theme';
import { Card, ListItem, SectionHeader, Avatar } from '../../components/ui';

export function SettingsScreen() {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeContext();

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        { icon: 'moon-outline' as const, title: 'Dark Mode', toggle: true },
        { icon: 'notifications-outline' as const, title: 'Notifications', subtitle: 'Manage push notifications' },
        { icon: 'calendar-outline' as const, title: 'Calendar Settings', subtitle: 'Week start, time format' },
      ],
    },
    {
      title: 'Business',
      items: [
        { icon: 'business-outline' as const, title: 'Business Profile', subtitle: 'Name, logo, contact info' },
        { icon: 'cash-outline' as const, title: 'Billing & Rates', subtitle: 'Default rates, payment methods' },
        { icon: 'document-text-outline' as const, title: 'Invoice Templates', subtitle: 'Customize invoice appearance' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline' as const, title: 'Help Center', subtitle: 'FAQs and tutorials' },
        { icon: 'chatbubbles-outline' as const, title: 'Contact Support', subtitle: 'Get help from our team' },
        { icon: 'information-circle-outline' as const, title: 'About', subtitle: 'Version 1.0.0' },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.base }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground.default }]}>
          Settings
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Avatar name="Jane Doe" size="lg" />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.colors.foreground.default }]}>
                Jane Doe
              </Text>
              <Text style={[styles.profileEmail, { color: theme.colors.foreground.muted }]}>
                jane.doe@tutorstudio.com
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.foreground.faint} />
          </View>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <View key={section.title}>
            <SectionHeader title={section.title} />
            <Card style={styles.sectionCard} padding="none">
              {section.items.map((item, index) => (
                <View
                  key={item.title}
                  style={[
                    styles.settingItem,
                    index < section.items.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.colors.border.subtle,
                    },
                  ]}
                >
                  <View style={[styles.settingIcon, { backgroundColor: theme.colors.background.muted }]}>
                    <Ionicons name={item.icon} size={20} color={theme.colors.foreground.secondary} />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={[styles.settingTitle, { color: theme.colors.foreground.default }]}>
                      {item.title}
                    </Text>
                    {item.subtitle && (
                      <Text style={[styles.settingSubtitle, { color: theme.colors.foreground.muted }]}>
                        {item.subtitle}
                      </Text>
                    )}
                  </View>
                  {item.toggle ? (
                    <Switch
                      value={isDark}
                      onValueChange={toggleTheme}
                      trackColor={{ false: theme.colors.border.default, true: theme.colors.primary }}
                      thumbColor="#fff"
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={18} color={theme.colors.foreground.faint} />
                  )}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Sign Out */}
        <Card style={styles.signOutCard}>
          <View style={styles.signOutRow}>
            <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
            <Text style={[styles.signOutText, { color: theme.colors.error }]}>
              Sign Out
            </Text>
          </View>
        </Card>

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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  profileCard: {
    marginHorizontal: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionCard: {
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  signOutCard: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 40,
  },
});
