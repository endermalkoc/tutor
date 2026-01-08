import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tabs.css';

// Standard Tabs (underline style)
export interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className = '' }: TabsProps) {
  const classNames = ['tabs', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface TabProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Tab({ active = false, onClick, children, className = '' }: TabProps) {
  const classNames = ['tab', active && 'active', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

// Filter Tabs (pill/segmented style)
export interface FilterTabsProps {
  children: React.ReactNode;
  className?: string;
}

export function FilterTabs({ children, className = '' }: FilterTabsProps) {
  const classNames = ['filter-tabs', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface FilterTabProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function FilterTab({ active = false, onClick, children, className = '' }: FilterTabProps) {
  const classNames = ['filter-tab', active && 'active', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

// Navigation Tabs (router-aware, uses NavLink)
export interface NavTabsProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function NavTabs({ children, className = '', 'aria-label': ariaLabel }: NavTabsProps) {
  const classNames = ['nav-tabs', className].filter(Boolean).join(' ');
  return (
    <nav className={classNames} role="tablist" aria-label={ariaLabel}>
      {children}
    </nav>
  );
}

export interface LinkTabProps {
  to: string;
  end?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LinkTab({ to, end = false, children, className = '' }: LinkTabProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        ['link-tab', isActive && 'active', className].filter(Boolean).join(' ')
      }
      role="tab"
    >
      {children}
    </NavLink>
  );
}
