import React from 'react';
import './Select.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error = false, className = '', children, ...props }, ref) => {
    const selectClasses = ['select', error && 'error', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="select-wrapper">
        <select ref={ref} className={selectClasses} {...props}>
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

// Option component (for convenience)
export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export function Option({ children, ...props }: OptionProps) {
  return <option {...props}>{children}</option>;
}
