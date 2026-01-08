import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Button } from '../../../components/design-system';
import './StudentHeader.css';

export interface Guardian {
  id: string;
  name: string;
  relationship: string;
}

export interface StudentHeaderProps {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    initials: string;
    type: 'child' | 'adult';
    status: 'active' | 'trial' | 'waiting' | 'lead' | 'inactive';
    email?: string;
    phone?: string;
    smsCapable?: boolean;
    primaryGuardian?: Guardian;
    teachingSince?: string;
    nextLesson?: {
      date: string;
      isToday?: boolean;
    };
  };
  onScheduleLesson?: () => void;
  onEdit?: () => void;
  onSendMessage?: () => void;
  onChangeStatus?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

const statusVariantMap: Record<string, 'success' | 'indigo' | 'warning' | 'cyan' | 'default'> = {
  active: 'success',
  trial: 'indigo',
  waiting: 'warning',
  lead: 'cyan',
  inactive: 'default',
};

export function StudentHeader({
  student,
  onScheduleLesson,
  onEdit,
  onSendMessage,
  onChangeStatus,
  onArchive,
  onDelete,
}: StudentHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const fullName = `${student.firstName} ${student.lastName}`;
  const statusLabel = student.status.charAt(0).toUpperCase() + student.status.slice(1);
  const typeLabel = student.type === 'child' ? 'Child' : 'Adult';

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="student-header">
      <div className="student-header-content">
        <div className="student-identity">
          <Avatar initials={student.initials} size="xl" />
          <div className="student-info">
            <div className="student-name-row">
              <h1 className="student-name">{fullName}</h1>
              {student.nextLesson && (
                <div className={`next-lesson-badge ${student.nextLesson.isToday ? 'today' : ''}`}>
                  <i className="ph ph-calendar" />
                  {student.nextLesson.date}
                </div>
              )}
            </div>
            <div className="student-badges">
              <Badge variant="primary">{typeLabel}</Badge>
              <Badge variant={statusVariantMap[student.status]}>{statusLabel}</Badge>
            </div>
            <div className="student-meta">
              {student.email && (
                <span className="meta-item">
                  <i className="ph ph-envelope" />
                  <a href={`mailto:${student.email}`} className="meta-link">{student.email}</a>
                </span>
              )}
              {student.phone && (
                <span className="meta-item">
                  <i className="ph ph-phone" />
                  <a href={`tel:${student.phone}`} className="meta-link">{student.phone}</a>
                  {student.smsCapable && (
                    <i className="ph ph-chat-circle sms-icon" title="SMS Capable" />
                  )}
                </span>
              )}
              {(student.email || student.phone) && student.primaryGuardian && (
                <span className="meta-divider" />
              )}
              {student.primaryGuardian && student.type === 'child' && (
                <span className="student-family">
                  <i className="ph ph-house" />
                  {student.primaryGuardian.relationship}:{' '}
                  <Link to={`/guardians/${student.primaryGuardian.id}`} className="family-link">
                    {student.primaryGuardian.name}
                  </Link>
                </span>
              )}
              {student.teachingSince && (
                <>
                  <span className="meta-divider" />
                  <span className="relationship-duration">{student.teachingSince}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="header-actions" ref={menuRef}>
          <Button variant="primary" onClick={onScheduleLesson}>
            <i className="ph ph-calendar-plus" />
            Schedule Lesson
          </Button>
          <div className="dropdown">
            <Button
              variant="secondary"
              className="btn-icon"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="More actions"
            >
              <i className="ph ph-dots-three-outline-vertical" />
            </Button>
            {menuOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => { onSendMessage?.(); setMenuOpen(false); }}>
                  <i className="ph ph-paper-plane-tilt" />
                  Send Message
                </button>
                <button className="dropdown-item" onClick={() => { onEdit?.(); setMenuOpen(false); }}>
                  <i className="ph ph-pencil" />
                  Edit Student
                </button>
                <button className="dropdown-item" onClick={() => { onChangeStatus?.(); setMenuOpen(false); }}>
                  <i className="ph ph-swap" />
                  Change Status
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={() => { onArchive?.(); setMenuOpen(false); }}>
                  <i className="ph ph-archive" />
                  Archive Student
                </button>
                <button className="dropdown-item danger" onClick={() => { onDelete?.(); setMenuOpen(false); }}>
                  <i className="ph ph-trash" />
                  Delete Student
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
