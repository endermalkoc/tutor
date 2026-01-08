import React, { useEffect } from 'react';
import './Toast.css';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  show: boolean;
  variant?: ToastVariant;
  children: React.ReactNode;
  onClose?: () => void;
  duration?: number; // auto-dismiss duration in ms, 0 = no auto-dismiss
  className?: string;
}

export function Toast({
  show,
  variant = 'default',
  children,
  onClose,
  duration = 5000,
  className = '',
}: ToastProps) {
  useEffect(() => {
    if (show && duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const classNames = [
    'toast',
    variant !== 'default' && `toast-${variant}`,
    show && 'show',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert">
      <div className="toast-content">{children}</div>
      {onClose && (
        <button type="button" className="toast-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
}
