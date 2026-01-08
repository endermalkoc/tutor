import React from 'react';
import './SearchInput.css';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Size variant */
  inputSize?: 'sm' | 'md' | 'lg';
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ inputSize = 'md', className = '', placeholder = 'Search...', ...props }, ref) => {
    const classNames = [
      'search-input-container',
      inputSize !== 'md' && `search-input-${inputSize}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classNames}>
        <i className="ph ph-magnifying-glass search-input-icon" />
        <input
          ref={ref}
          type="text"
          className="search-input"
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
