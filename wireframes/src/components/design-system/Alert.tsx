import React from 'react';
import './Alert.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Alert({ variant = 'info', title, children, icon, className = '' }: AlertProps) {
  const classNames = ['alert', `alert-${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="alert">
      {icon && <span className="alert-icon">{icon}</span>}
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        {children}
      </div>
    </div>
  );
}
