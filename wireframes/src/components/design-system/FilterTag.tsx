import './FilterTag.css';

export interface FilterTagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function FilterTag({ children, onRemove, className = '' }: FilterTagProps) {
  const classNames = ['filter-tag', className].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {children}
      {onRemove && (
        <button type="button" className="filter-tag-remove" onClick={onRemove} aria-label="Remove filter">
          <i className="ph ph-x" />
        </button>
      )}
    </span>
  );
}

export interface ActiveFiltersProps {
  children: React.ReactNode;
  onClearAll?: () => void;
  className?: string;
}

export function ActiveFilters({ children, onClearAll, className = '' }: ActiveFiltersProps) {
  const classNames = ['active-filters', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="active-filters-list">{children}</div>
      {onClearAll && (
        <button type="button" className="clear-filters-btn" onClick={onClearAll}>
          Clear all
        </button>
      )}
    </div>
  );
}
