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
import './HomeworkTab.css';

type HomeworkStatus = 'pending' | 'submitted' | 'graded' | 'overdue' | 'late';

interface Homework {
  id: string;
  title: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  status: HomeworkStatus;
  grade?: string;
}

interface HomeworkStats {
  total: number;
  submitted: number;
  pending: number;
  overdue: number;
}

// Mock data
const mockHomework: Homework[] = [
  { id: 'h1', title: 'Chopin Nocturne Practice', subject: 'Piano', assignedDate: 'Jan 6', dueDate: 'Jan 10', status: 'pending' },
  { id: 'h2', title: 'Scales Practice Week 1', subject: 'Piano', assignedDate: 'Jan 3', dueDate: 'Jan 6', status: 'graded', grade: 'A' },
  { id: 'h3', title: 'Music Theory Chapter 5', subject: 'Music Theory', assignedDate: 'Dec 27', dueDate: 'Jan 3', status: 'graded', grade: 'A-' },
  { id: 'h4', title: 'Recital Piece Memorization', subject: 'Piano', assignedDate: 'Dec 20', dueDate: 'Dec 27', status: 'graded', grade: 'A+' },
  { id: 'h5', title: 'Sight Reading Exercise 12', subject: 'Piano', assignedDate: 'Dec 16', dueDate: 'Dec 20', status: 'late', grade: 'B+' },
  { id: 'h6', title: 'Pedaling Technique Sheet', subject: 'Piano', assignedDate: 'Dec 13', dueDate: 'Dec 16', status: 'graded', grade: 'A' },
];

const mockStats: HomeworkStats = {
  total: 24,
  submitted: 20,
  pending: 3,
  overdue: 1,
};

const statusConfig: Record<HomeworkStatus, { label: string; variant: 'success' | 'default' | 'warning' | 'error' | 'indigo' }> = {
  pending: { label: 'Pending', variant: 'indigo' },
  submitted: { label: 'Submitted', variant: 'success' },
  graded: { label: 'Graded', variant: 'default' },
  overdue: { label: 'Overdue', variant: 'error' },
  late: { label: 'Late', variant: 'warning' },
};

export function HomeworkTab() {
  const [statusFilter, setStatusFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="homework-tab">
      {/* Filters */}
      <div className="homework-filters">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="graded">Graded</option>
          <option value="overdue">Overdue</option>
        </Select>

        <Select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Subjects</option>
          <option value="piano">Piano</option>
          <option value="theory">Music Theory</option>
        </Select>

        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Time</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
        </Select>

        <div className="search-container">
          <i className="ph ph-magnifying-glass search-icon" />
          <Input
            type="text"
            placeholder="Search homework..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <Button variant="primary" className="assign-btn">
          <i className="ph ph-plus" />
          Assign Work
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="homework-stats">
        <div className="stat-item">
          <span className="stat-value">{mockStats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item stat-item--submitted">
          <span className="stat-value">{mockStats.submitted}</span>
          <span className="stat-label">Submitted</span>
        </div>
        <div className="stat-item stat-item--pending">
          <span className="stat-value">{mockStats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-item stat-item--overdue">
          <span className="stat-value">{mockStats.overdue}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      {/* Homework Table */}
      <div className="homework-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell sortable>Title</TableHeaderCell>
              <TableHeaderCell sortable>Subject</TableHeaderCell>
              <TableHeaderCell sortable>Assigned</TableHeaderCell>
              <TableHeaderCell sortable sortDirection="asc">Due Date</TableHeaderCell>
              <TableHeaderCell sortable>Status</TableHeaderCell>
              <TableHeaderCell>Grade</TableHeaderCell>
              <TableHeaderCell className="actions-col" />
            </TableRow>
          </TableHead>
          <TableBody>
            {mockHomework.map(hw => (
              <TableRow key={hw.id}>
                <TableCell>
                  <strong className="homework-title">{hw.title}</strong>
                </TableCell>
                <TableCell>{hw.subject}</TableCell>
                <TableCell>{hw.assignedDate}</TableCell>
                <TableCell>{hw.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[hw.status].variant}>
                    {statusConfig[hw.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`grade-badge ${hw.grade ? '' : 'grade-badge--empty'}`}>
                    {hw.grade || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="row-actions">
                    <button className="action-btn" title="View">
                      <i className="ph ph-eye" />
                    </button>
                    <button className="action-btn" title="Edit">
                      <i className="ph ph-pencil" />
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
            Showing <strong>1-6</strong> of <strong>{mockStats.total}</strong>
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
              <button className="page-btn">&rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
