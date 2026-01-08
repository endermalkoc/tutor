import React from 'react';
import './Checkbox.css';

// Checkbox component
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    if (label) {
      return (
        <label className={`checkbox-wrapper ${className}`} htmlFor={checkboxId}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="checkbox"
            {...props}
          />
          <span className="checkbox-label">{label}</span>
        </label>
      );
    }

    return (
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        className={`checkbox ${className}`}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Radio component
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    if (label) {
      return (
        <label className={`radio-wrapper ${className}`} htmlFor={radioId}>
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className="radio"
            {...props}
          />
          <span className="radio-label">{label}</span>
        </label>
      );
    }

    return (
      <input
        ref={ref}
        type="radio"
        id={radioId}
        className={`radio ${className}`}
        {...props}
      />
    );
  }
);

Radio.displayName = 'Radio';

// Radio Group
export interface RadioGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({ children, orientation = 'vertical', className = '' }: RadioGroupProps) {
  const classNames = ['radio-group', orientation === 'horizontal' && 'horizontal', className]
    .filter(Boolean)
    .join(' ');
  return <div className={classNames}>{children}</div>;
}

// Switch component
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked = false, onChange, disabled = false, className = '' }: SwitchProps) {
  const classNames = ['switch', checked && 'active', disabled && 'disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={classNames}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
    />
  );
}
