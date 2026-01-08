import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

// Breadcrumb components
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const classNames = ['breadcrumb', className].filter(Boolean).join(' ');

  return (
    <nav className={classNames} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {item.href ? (
            <Link to={item.href} className="breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
        </span>
      ))}
    </nav>
  );
}

// Page Header
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions, className = '' }: PageHeaderProps) {
  const classNames = ['page-header', className].filter(Boolean).join(' ');

  return (
    <header className={classNames}>
      <div className="page-header-content">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className="page-title-group">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}
