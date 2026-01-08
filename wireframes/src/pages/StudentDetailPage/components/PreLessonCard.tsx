import { useState } from 'react';
import { Button } from '../../../components/design-system';
import './PreLessonCard.css';

export interface PreLessonItem {
  label: string;
  value: string;
}

export interface PreLessonCardProps {
  /** Title displayed in the header */
  title?: string;
  /** Items to display in the grid */
  items: PreLessonItem[];
  /** Whether the card starts collapsed */
  defaultCollapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

export function PreLessonCard({
  title = "Preparing for Tomorrow's Lesson",
  items,
  defaultCollapsed = false,
  onCollapseChange,
  className = '',
}: PreLessonCardProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapseChange?.(newState);
  };

  const cardClasses = ['prelesson-card', collapsed && 'prelesson-card--collapsed', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses}>
      <div className="prelesson-header">
        <div className="prelesson-title">
          <i className="ph ph-lightbulb" />
          {title}
        </div>
        <Button variant="ghost" size="sm" onClick={handleToggle} aria-expanded={!collapsed}>
          <i className={`ph ph-caret-${collapsed ? 'down' : 'up'}`} />
        </Button>
      </div>
      {!collapsed && (
        <div className="prelesson-content">
          <div className="prelesson-grid">
            {items.map((item, index) => (
              <div key={index} className="prelesson-item">
                <span className="prelesson-label">{item.label}</span>
                <span className="prelesson-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
