import React from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'indigo'
  | 'cyan';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const classNames = ['badge', `badge-${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children}</span>;
}

// Status dot for inline status indicators
export type StatusDotVariant = 'success' | 'warning' | 'error' | 'neutral';

export interface StatusDotProps {
  variant?: StatusDotVariant;
  className?: string;
}

export function StatusDot({ variant = 'neutral', className = '' }: StatusDotProps) {
  const classNames = ['status-dot', variant, className].filter(Boolean).join(' ');
  return <span className={classNames} />;
}
