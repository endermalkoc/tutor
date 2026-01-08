import { NavTabs, LinkTab } from '../../../components/design-system';

export interface StudentDetailTabsProps {
  studentId: string;
  className?: string;
}

const tabs = [
  { label: 'Overview', path: '' },
  { label: 'Lessons', path: '/lessons' },
  { label: 'Homework', path: '/homework' },
  { label: 'Messages', path: '/messages' },
  { label: 'Billing & Invoices', path: '/invoices' },
  { label: 'Transactions', path: '/transactions' },
  { label: 'Files', path: '/files' },
];

export function StudentDetailTabs({ studentId, className = '' }: StudentDetailTabsProps) {
  const basePath = `/students/${studentId}`;

  return (
    <NavTabs className={className} aria-label="Student details">
      {tabs.map((tab) => (
        <LinkTab
          key={tab.path}
          to={`${basePath}${tab.path}`}
          end={tab.path === ''}
        >
          {tab.label}
        </LinkTab>
      ))}
    </NavTabs>
  );
}
