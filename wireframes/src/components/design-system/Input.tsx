import React from 'react';
import './Input.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize = 'md', error = false, className = '', ...props }, ref) => {
    const classNames = [
      'input',
      inputSize !== 'md' && `input-${inputSize}`,
      error && 'error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <input ref={ref} className={classNames} {...props} />;
  }
);

Input.displayName = 'Input';

// Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = '', ...props }, ref) => {
    const classNames = ['textarea', error && 'error', className]
      .filter(Boolean)
      .join(' ');

    return <textarea ref={ref} className={classNames} {...props} />;
  }
);

Textarea.displayName = 'Textarea';

// Form group wrapper
export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
}

export function FormGroup({ children, className = '', error = false }: FormGroupProps) {
  const classNames = ['form-group', error && 'has-error', className]
    .filter(Boolean)
    .join(' ');
  return <div className={classNames}>{children}</div>;
}

// Form label
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export function FormLabel({ required = false, children, className = '', ...props }: FormLabelProps) {
  const classNames = ['form-label', className].filter(Boolean).join(' ');
  return (
    <label className={classNames} {...props}>
      {children}
      {required && <span className="required"> *</span>}
    </label>
  );
}

// Form hint text
export interface FormHintProps {
  children: React.ReactNode;
  className?: string;
}

export function FormHint({ children, className = '' }: FormHintProps) {
  const classNames = ['form-hint', className].filter(Boolean).join(' ');
  return <span className={classNames}>{children}</span>;
}

// Form error message
export interface FormErrorProps {
  children: React.ReactNode;
  className?: string;
}

export function FormError({ children, className = '' }: FormErrorProps) {
  const classNames = ['form-error', className].filter(Boolean).join(' ');
  return <span className={classNames}>{children}</span>;
}
