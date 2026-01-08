import { Link } from 'react-router-dom';
import {
  SectionCard,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Badge,
} from '../../../components/design-system';
import './RecentLessonsSection.css';

export type LessonStatus = 'attended' | 'cancelled' | 'no-show' | 'scheduled';

export interface Lesson {
  id: string;
  date: string;
  time: string;
  duration: string;
  status: LessonStatus;
  notes?: string;
}

export interface RecentLessonsSectionProps {
  lessons: Lesson[];
  viewAllLink?: string;
  className?: string;
}

const statusVariantMap: Record<LessonStatus, 'success' | 'warning' | 'error' | 'default'> = {
  attended: 'success',
  cancelled: 'warning',
  'no-show': 'error',
  scheduled: 'default',
};

const statusLabelMap: Record<LessonStatus, string> = {
  attended: 'Attended',
  cancelled: 'Cancelled',
  'no-show': 'No Show',
  scheduled: 'Scheduled',
};

export function RecentLessonsSection({
  lessons,
  viewAllLink = 'lessons',
  className = '',
}: RecentLessonsSectionProps) {
  return (
    <SectionCard
      title="Recent Lessons"
      variant="secondary"
      headerActions={
        <Link to={viewAllLink} className="view-all-link">
          View All
          <i className="ph ph-arrow-right" />
        </Link>
      }
      className={className}
    >
      <div className="recent-lessons-content">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Time</TableHeaderCell>
              <TableHeaderCell>Duration</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Notes</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map(lesson => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.date}</TableCell>
                <TableCell>{lesson.time}</TableCell>
                <TableCell>{lesson.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant={statusVariantMap[lesson.status]}
                    className={`lesson-status lesson-status--${lesson.status}`}
                  >
                    {statusLabelMap[lesson.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lesson.notes ? (
                    <span className="lesson-note" title={lesson.notes}>
                      {lesson.notes}
                    </span>
                  ) : (
                    <span className="lesson-note-empty">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SectionCard>
  );
}
