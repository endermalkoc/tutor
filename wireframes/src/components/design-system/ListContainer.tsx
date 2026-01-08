import './ListContainer.css';

export interface ListContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ListContainer({ children, className = '' }: ListContainerProps) {
  const classNames = ['list-container', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}
