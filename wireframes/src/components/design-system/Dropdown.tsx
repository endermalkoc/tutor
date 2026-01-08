import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, children, align = 'right', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const classNames = ['dropdown', className].filter(Boolean).join(' ');
  const menuClasses = ['dropdown-menu', `dropdown-align-${align}`, open && 'open']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} ref={containerRef}>
      <div
        className="dropdown-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {trigger}
      </div>
      <div className={menuClasses}>{children}</div>
    </div>
  );
}

export interface DropdownHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownHeader({ children, className = '' }: DropdownHeaderProps) {
  const classNames = ['dropdown-header', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function DropdownItem({ children, onClick, disabled = false, className = '' }: DropdownItemProps) {
  const classNames = ['dropdown-item', disabled && 'disabled', className].filter(Boolean).join(' ');
  return (
    <div className={classNames} onClick={disabled ? undefined : onClick}>
      {children}
    </div>
  );
}

export interface DropdownCheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function DropdownCheckboxItem({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}: DropdownCheckboxItemProps) {
  const id = `dropdown-checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const classNames = ['dropdown-checkbox-item', disabled && 'disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export interface DropdownDividerProps {
  className?: string;
}

export function DropdownDivider({ className = '' }: DropdownDividerProps) {
  const classNames = ['dropdown-divider', className].filter(Boolean).join(' ');
  return <div className={classNames} />;
}
