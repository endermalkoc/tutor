import React, { useState, useRef, useEffect } from 'react';
import './Combobox.css';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (value: string) => void;
  onCreateNew?: () => void;
  createNewLabel?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  onChange,
  onCreateNew,
  createNewLabel = 'Create new',
  className = '',
  disabled = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const comboboxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opt.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleCreateNew = () => {
    onCreateNew?.();
    setIsOpen(false);
    setSearchTerm('');
  };

  const classNames = ['combobox', isOpen && 'open', disabled && 'disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} ref={comboboxRef}>
      <button
        type="button"
        className="combobox-trigger"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? (
          <span className="combobox-selected-value">{selectedOption.label}</span>
        ) : (
          <span className="combobox-placeholder">{placeholder}</span>
        )}
        <i className="ph ph-caret-up-down combobox-chevron" />
      </button>

      <div className="combobox-popover" role="listbox">
        <div className="combobox-search">
          <input
            ref={searchInputRef}
            type="text"
            className="input"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="combobox-list">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`combobox-item ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              <i className="ph ph-check combobox-check-icon" />
              <div className="combobox-item-content">
                <div className="combobox-item-label">{option.label}</div>
                {option.description && (
                  <div className="combobox-item-description">{option.description}</div>
                )}
              </div>
            </div>
          ))}

          {filteredOptions.length === 0 && (
            <div className="combobox-empty">No results found</div>
          )}

          {onCreateNew && (
            <>
              <div className="combobox-divider" />
              <div className="combobox-item create-new" onClick={handleCreateNew}>
                <i className="ph ph-plus" />
                <span>{createNewLabel}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline form for creating new items within combobox context
export interface InlineFormProps {
  title: string;
  onCancel: () => void;
  children: React.ReactNode;
  className?: string;
}

export function InlineForm({ title, onCancel, children, className = '' }: InlineFormProps) {
  const classNames = ['inline-form', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="inline-form-header">
        <span className="inline-form-title">{title}</span>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
      <div className="inline-form-content">{children}</div>
    </div>
  );
}
