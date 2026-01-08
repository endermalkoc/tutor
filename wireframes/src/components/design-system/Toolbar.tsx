import React from 'react';
import './Toolbar.css';

export interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className = '' }: ToolbarProps) {
  const classNames = ['toolbar', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface ToolbarRowProps {
  children: React.ReactNode;
  className?: string;
}

export function ToolbarRow({ children, className = '' }: ToolbarRowProps) {
  const classNames = ['toolbar-row', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface ToolbarGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ToolbarGroup({ children, className = '' }: ToolbarGroupProps) {
  const classNames = ['toolbar-group', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface BulkActionsProps {
  selectedCount: number;
  children: React.ReactNode;
  className?: string;
}

export function BulkActions({ selectedCount, children, className = '' }: BulkActionsProps) {
  const classNames = ['bulk-actions', className].filter(Boolean).join(' ');
  return (
    <div className={classNames}>
      <span className="bulk-actions-label">
        <strong>{selectedCount}</strong> selected
      </span>
      {children}
    </div>
  );
}
