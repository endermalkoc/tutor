import { useState, ReactNode } from 'react';
import { Button } from './Button';
import './SectionCard.css';

export interface SectionCardProps {
  /** Section title displayed in the header */
  title: string;
  /** Visual variant - primary has shadow, secondary is flat */
  variant?: 'primary' | 'secondary';
  /** Whether the card can be collapsed */
  collapsible?: boolean;
  /** Default collapsed state (only works if collapsible is true) */
  defaultCollapsed?: boolean;
  /** Summary text to show when collapsed */
  collapsedSummary?: string;
  /** Whether to show the edit button in header */
  editable?: boolean;
  /** Controlled editing state (use with onEditChange for controlled mode) */
  editing?: boolean;
  /** Callback when edit mode changes */
  onEditChange?: (editing: boolean) => void;
  /** Callback when save is clicked in edit mode */
  onSave?: () => void;
  /** Callback when cancel is clicked in edit mode */
  onCancel?: () => void;
  /** Content to display in view mode */
  children: ReactNode;
  /** Content to display in edit mode (form fields) */
  editContent?: ReactNode;
  /** Additional actions to show in header (besides edit button) */
  headerActions?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export function SectionCard({
  title,
  variant = 'secondary',
  collapsible = false,
  defaultCollapsed = false,
  collapsedSummary,
  editable = false,
  editing: controlledEditing,
  onEditChange,
  onSave,
  onCancel,
  children,
  editContent,
  headerActions,
  className = '',
}: SectionCardProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [internalEditing, setInternalEditing] = useState(false);

  // Support both controlled and uncontrolled editing mode
  const isControlled = controlledEditing !== undefined;
  const isEditing = isControlled ? controlledEditing : internalEditing;

  const handleToggleCollapse = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  const handleEdit = () => {
    if (isControlled) {
      onEditChange?.(true);
    } else {
      setInternalEditing(true);
    }
    // Expand if collapsed
    if (collapsed) {
      setCollapsed(false);
    }
  };

  const handleCancel = () => {
    if (isControlled) {
      onEditChange?.(false);
    } else {
      setInternalEditing(false);
    }
    onCancel?.();
  };

  const handleSave = () => {
    if (isControlled) {
      onEditChange?.(false);
    } else {
      setInternalEditing(false);
    }
    onSave?.();
  };

  const cardClasses = [
    'section-card',
    `section-card--${variant}`,
    collapsed && 'section-card--collapsed',
    isEditing && 'section-card--editing',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={cardClasses}>
      <div className="section-card-header" onClick={collapsible ? handleToggleCollapse : undefined}>
        <h2 className="section-card-title">{title}</h2>
        <div className="section-card-actions" onClick={(e) => e.stopPropagation()}>
          {headerActions}
          {editable && !isEditing && (
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <i className="ph ph-pencil" />
              Edit
            </Button>
          )}
          {collapsible && (
            <button
              className="section-card-collapse-btn"
              onClick={handleToggleCollapse}
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Expand section' : 'Collapse section'}
            >
              <i className={`ph ph-caret-${collapsed ? 'down' : 'up'}`} />
            </button>
          )}
        </div>
      </div>

      {collapsed && collapsedSummary && (
        <div className="section-card-collapsed-summary">
          <span className="collapsed-summary-text">{collapsedSummary}</span>
          <button className="collapsed-summary-link" onClick={() => setCollapsed(false)}>
            Show more
          </button>
        </div>
      )}

      {!collapsed && (
        <div className="section-card-content">
          {isEditing && editContent ? (
            <div className="section-card-edit-form">
              {editContent}
              <div className="section-card-form-actions">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="section-card-view-mode">{children}</div>
          )}
        </div>
      )}
    </section>
  );
}
