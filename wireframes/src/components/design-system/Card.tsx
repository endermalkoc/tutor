import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

export function Card({ children, hoverable = false, className = '' }: CardProps) {
  const classNames = ['card', hoverable && 'card-hoverable', className]
    .filter(Boolean)
    .join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  const classNames = ['card-header', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  const classNames = ['card-title', className].filter(Boolean).join(' ');
  return <h3 className={classNames}>{children}</h3>;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  const classNames = ['card-body', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  const classNames = ['card-footer', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

// Metric card variant
export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export function MetricCard({ label, value, change, className = '' }: MetricCardProps) {
  const classNames = ['card', 'metric-card', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {change && (
        <div className={`metric-change ${change.positive ? 'positive' : 'negative'}`}>
          {change.positive ? '↑' : '↓'} {change.value}
        </div>
      )}
    </div>
  );
}
