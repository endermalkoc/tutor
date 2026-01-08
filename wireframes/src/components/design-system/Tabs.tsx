import React from 'react';
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
