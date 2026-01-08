import React from 'react';
import { Sidebar, NavItem } from './Sidebar';
import './AppLayout.css';

export interface AppLayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  user?: {
    name: string;
    email: string;
    initials: string;
  };
}

// Default navigation items
const defaultNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Students', href: '/students' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Invoices', href: '/invoices' },
  { label: 'Settings', href: '/settings' },
];

// Default user
const defaultUser = {
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  initials: 'SJ',
};

export function AppLayout({
  children,
  navItems = defaultNavItems,
  user = defaultUser,
}: AppLayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar navItems={navItems} user={user} />
      <main className="main-content">{children}</main>
    </div>
  );
}
