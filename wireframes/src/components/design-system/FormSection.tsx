import React from 'react';
import './FormSection.css';

export interface FormSectionProps {
  title: string;
  badge?: string;
  badgeVariant?: 'required' | 'optional';
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

export function FormSection({
  title,
  badge,
  badgeVariant = 'required',
  children,
  className = '',
  noBorder = false,
}: FormSectionProps) {
  const classNames = ['form-section', noBorder && 'no-border', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classNames}>
      <div className="form-section-header">
        <h2 className="form-section-title">{title}</h2>
        {badge && (
          <span className={`form-section-badge ${badgeVariant}`}>{badge}</span>
        )}
      </div>
      <div className="form-section-content">{children}</div>
    </section>
  );
}

// Expandable section with toggle
export interface ExpandToggleProps {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  className?: string;
}

export function ExpandToggle({ label, expanded, onToggle, className = '' }: ExpandToggleProps) {
  const classNames = ['expand-toggle', expanded && 'expanded', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classNames} onClick={onToggle}>
      <i className={`ph ${expanded ? 'ph-minus' : 'ph-plus'}`} />
      <span>{label}</span>
    </button>
  );
}

export interface ExpandableContentProps {
  expanded: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableContent({ expanded, children, className = '' }: ExpandableContentProps) {
  const classNames = ['expandable-content', expanded && 'visible', className]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}

// Form row for layout
export interface FormRowProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function FormRow({ children, columns = 2, className = '' }: FormRowProps) {
  const classNames = [
    'form-row',
    columns === 1 && 'single',
    columns === 3 && 'triple',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}

// Fieldset for grouped radio/checkbox options
export interface FieldsetProps {
  legend: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Fieldset({ legend, required = false, children, className = '' }: FieldsetProps) {
  const classNames = ['form-fieldset', className].filter(Boolean).join(' ');

  return (
    <fieldset className={classNames}>
      <legend className={`form-legend ${required ? 'required' : ''}`}>
        {legend}
        {required && <span className="required-indicator"> *</span>}
      </legend>
      {children}
    </fieldset>
  );
}
