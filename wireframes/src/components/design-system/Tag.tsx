import React from 'react';
import './Tag.css';

export type TagColor =
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'indigo'
  | 'outline';

export interface TagProps {
  color?: TagColor;
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ color = 'outline', children, onRemove, className = '' }: TagProps) {
  const classNames = ['tag', `tag-${color}`, className].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {children}
      {onRemove && (
        <button type="button" className="tag-remove" onClick={onRemove} aria-label="Remove">
          &times;
        </button>
      )}
    </span>
  );
}

// Tag list container
export interface TagListProps {
  children: React.ReactNode;
  className?: string;
}

export function TagList({ children, className = '' }: TagListProps) {
  const classNames = ['tag-list', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}
