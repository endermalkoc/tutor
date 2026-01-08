import React from 'react';
import './Table.css';

export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = '' }: TableProps) {
  const classNames = ['table', className].filter(Boolean).join(' ');
  return (
    <div className="table-wrapper">
      <table className={classNames}>{children}</table>
    </div>
  );
}

export interface TableHeadProps {
  children: React.ReactNode;
}

export function TableHead({ children }: TableHeadProps) {
  return <thead>{children}</thead>;
}

export interface TableBodyProps {
  children: React.ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}

export interface TableRowProps {
  children: React.ReactNode;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, selected = false, className = '', onClick }: TableRowProps) {
  const classNames = [selected && 'selected', className].filter(Boolean).join(' ');
  return (
    <tr className={classNames} onClick={onClick}>
      {children}
    </tr>
  );
}

export type SortDirection = 'asc' | 'desc' | null;

export interface TableHeaderCellProps {
  children: React.ReactNode;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  className?: string;
  checkbox?: boolean;
}

export function TableHeaderCell({
  children,
  sortable = false,
  sortDirection = null,
  onSort,
  className = '',
  checkbox = false,
}: TableHeaderCellProps) {
  const classNames = [
    sortable && 'sortable',
    sortDirection === 'asc' && 'sorted-asc',
    sortDirection === 'desc' && 'sorted-desc',
    checkbox && 'checkbox-col',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <th className={classNames} onClick={sortable ? onSort : undefined}>
      {children}
    </th>
  );
}

export interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  mono?: boolean;
}

export function TableCell({ children, className = '', mono = false }: TableCellProps) {
  const classNames = [mono && 'mono', className].filter(Boolean).join(' ');
  return <td className={classNames}>{children}</td>;
}

// Table action buttons
export interface TableActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function TableActionButton({ children, className = '', ...props }: TableActionButtonProps) {
  const classNames = ['table-action-btn', className].filter(Boolean).join(' ');
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

export interface TableActionsProps {
  children: React.ReactNode;
}

export function TableActions({ children }: TableActionsProps) {
  return <div className="table-actions">{children}</div>;
}
