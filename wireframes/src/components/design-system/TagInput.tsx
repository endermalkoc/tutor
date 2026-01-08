import { useState, useRef, KeyboardEvent } from 'react';
import { Tag, TagList } from './Tag';
import type { TagColor } from './Tag';
import './TagInput.css';

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  tagColor?: TagColor;
  className?: string;
  disabled?: boolean;
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Type and press Enter...',
  tagColor = 'outline',
  className = '',
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]);
      setInputValue('');
    } else {
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const classNames = ['tag-input-container', disabled && 'disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={handleContainerClick}>
      {value.length > 0 && (
        <TagList className="tag-input-tags">
          {value.map((tag, index) => (
            <Tag
              key={`${tag}-${index}`}
              color={tagColor}
              onRemove={disabled ? undefined : () => removeTag(index)}
            >
              {tag}
            </Tag>
          ))}
        </TagList>
      )}
      <input
        ref={inputRef}
        type="text"
        className="tag-input-field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={value.length === 0 ? placeholder : ''}
        disabled={disabled}
      />
    </div>
  );
}
