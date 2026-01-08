import { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Badge,
  Button,
  Input,
  Select,
} from '../../../components/design-system';
import './LessonsTab.css';

type LessonStatus = 'attended' | 'cancelled' | 'noshow' | 'rescheduled';

interface Lesson {
  id: string;
  date: string;
  time: string;
  duration: string;
  status: LessonStatus;
  notes?: string;
}

interface LessonsStats {
  total: number;
  attended: number;
  cancelled: number;
  noshow: number;
}

// Mock data
const mockLessons: Lesson[] = [
  { id: 'l1', date: 'Mon, Jan 6', time: '3:00 - 3:30 PM', duration: '30 min', status: 'attended', notes: 'Worked on Chopin Nocturne Op. 9 No. 2. Excellent progress on dynamics.' },
  { id: 'l2', date: 'Fri, Jan 3', time: '3:00 - 3:30 PM', duration: '30 min', status: 'attended', notes: 'Review of scales and arpeggios. Worked on C major and G major.' },
  { id: 'l3', date: 'Mon, Dec 30', time: '3:00 - 3:30 PM', duration: '30 min', status: 'cancelled', notes: 'Holiday break - cancelled by student' },
  { id: 'l4', date: 'Fri, Dec 27', time: '3:00 - 3:30 PM', duration: '30 min', status: 'attended', notes: 'Prepared for winter recital. Final run-through of performance piece.' },
  { id: 'l5', date: 'Mon, Dec 23', time: '3:00 - 3:30 PM', duration: '30 min', status: 'attended', notes: 'Recital prep continues. Worked on memorization and stage presence.' },
  { id: 'l6', date: 'Fri, Dec 20', time: '3:00 - 3:30 PM', duration: '30 min', status: 'attended', notes: 'Introduced new piece: Bach Prelude in C Major. Good sight reading.' },
  { id: 'l7', date: 'Mon, Dec 16', time: '3:00 - 3:30 PM', duration: '30 min', status: 'noshow', notes: 'Student did not attend. Parent notified.' },
  { id: 'l8', date: 'Fri, Dec 13', time: '3:00 - 3:30 PM', duration: '30 min', status: 'attended', notes: 'Worked on pedaling technique. Great improvement in control.' },
];

const mockStats: LessonsStats = {
  total: 45,
  attended: 40,
  cancelled: 3,
  noshow: 2,
};

const statusConfig: Record<LessonStatus, { label: string; variant: 'success' | 'default' | 'warning' | 'error' | 'indigo' }> = {
  attended: { label: 'Attended', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'default' },
  noshow: { label: 'No-show', variant: 'warning' },
  rescheduled: { label: 'Rescheduled', variant: 'indigo' },
};

export function LessonsTab() {
  const [timeFilter, setTimeFilter] = useState('last-3-months');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="lessons-tab">
      {/* Filters */}
      <div className="lessons-filters">
        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="last-3-months">Last 3 Months</option>
          <option value="this-year">This Year</option>
          <option value="custom">Custom Range...</option>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="attended">Attended</option>
          <option value="cancelled">Cancelled</option>
          <option value="noshow">No-show</option>
          <option value="rescheduled">Rescheduled</option>
        </Select>

        <div className="search-container">
          <i className="ph ph-magnifying-glass search-icon" />
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <Button variant="secondary" className="export-btn">
          <i className="ph ph-download" />
          Export
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="lessons-stats">
        <div className="stat-item">
          <span className="stat-value">{mockStats.total}</span>
          <span className="stat-label">Total Lessons</span>
        </div>
        <div className="stat-item stat-item--attended">
          <span className="stat-value">{mockStats.attended}</span>
          <span className="stat-label">Attended</span>
        </div>
        <div className="stat-item stat-item--cancelled">
          <span className="stat-value">{mockStats.cancelled}</span>
          <span className="stat-label">Cancelled</span>
        </div>
        <div className="stat-item stat-item--noshow">
          <span className="stat-value">{mockStats.noshow}</span>
          <span className="stat-label">No-show</span>
        </div>
      </div>

      {/* Lessons Table */}
      <div className="lessons-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell sortable sortDirection="desc">Date</TableHeaderCell>
              <TableHeaderCell sortable>Time</TableHeaderCell>
              <TableHeaderCell sortable>Duration</TableHeaderCell>
              <TableHeaderCell sortable>Status</TableHeaderCell>
              <TableHeaderCell>Notes</TableHeaderCell>
              <TableHeaderCell className="actions-col" />
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLessons.map(lesson => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.date}</TableCell>
                <TableCell>{lesson.time}</TableCell>
                <TableCell>{lesson.duration}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[lesson.status].variant}>
                    {statusConfig[lesson.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="notes-preview" title={lesson.notes}>
                    {lesson.notes || '—'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="row-actions">
                    <button className="action-btn" title="Edit notes">
                      <i className="ph ph-pencil" />
                    </button>
                    <button className="action-btn" title="More actions">
                      <i className="ph ph-dots-three" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing <strong>1-8</strong> of <strong>{mockStats.total}</strong>
          </div>
          <div className="pagination-controls">
            <div className="page-size-selector">
              <label>Show</label>
              <select defaultValue="25">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="page-nav">
              <button className="page-btn" disabled>&larr;</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">&rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
