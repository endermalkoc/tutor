import { ReactNode } from 'react';
import './DataGrid.css';

export interface DataItem {
  /** Label displayed above the value */
  label: string;
  /** Value to display (can be a string or React node for complex content) */
  value: ReactNode;
  /** Whether the value should span full width */
  fullWidth?: boolean;
  /** Whether to show empty state styling when value is missing */
  isEmpty?: boolean;
}

export interface DataGridProps {
  /** Array of data items to display */
  items: DataItem[];
  /** Number of columns in the grid (default: 3) */
  columns?: 2 | 3 | 4;
  /** Additional CSS class */
  className?: string;
}

export function DataGrid({ items, columns = 3, className = '' }: DataGridProps) {
  const gridClass = ['data-grid', columns !== 3 && `data-grid--${columns}col`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClass}>
      {items.map((item, index) => (
        <DataGridItem key={index} {...item} />
      ))}
    </div>
  );
}

export interface DataGridItemProps extends DataItem {}

export function DataGridItem({ label, value, fullWidth = false, isEmpty = false }: DataGridItemProps) {
  const itemClass = ['data-item', fullWidth && 'data-item--full-width'].filter(Boolean).join(' ');

  const valueClass = ['data-value', isEmpty && 'data-value--empty'].filter(Boolean).join(' ');

  // Handle empty value display
  const displayValue = isEmpty || value === null || value === undefined || value === ''
    ? <span className="data-value--empty">Not provided</span>
    : value;

  return (
    <div className={itemClass}>
      <span className="data-label">{label}</span>
      <span className={valueClass}>{displayValue}</span>
    </div>
  );
}
