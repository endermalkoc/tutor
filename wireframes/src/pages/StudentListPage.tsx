import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout';
import {
  Button,
  Badge,
  Tag,
  TagList,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Pagination,
  FilterTabs,
  FilterTab,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  SearchInput,
  Toolbar,
  ToolbarRow,
  BulkActions,
  FilterTag,
  ActiveFilters,
  Dropdown,
  DropdownHeader,
  DropdownCheckboxItem,
  ListContainer,
} from '../components/design-system';
import './StudentListPage.css';

// Types
type StudentStatus = 'active' | 'trial' | 'waiting' | 'lead' | 'inactive';
type SortColumn = 'name' | 'status' | 'age' | 'credits' | 'next-lesson';
type SortDirection = 'asc' | 'desc';

interface Student {
  id: number;
  name: string;
  status: StudentStatus;
  age: number;
  family: string;
  tags: Array<{ label: string; color: 'outline' | 'green' | 'yellow' | 'orange' }>;
  credits: number;
  nextLesson: string;
  notes: string;
  email: string;
}

// Mock data
const students: Student[] = [
  {
    id: 1,
    name: 'Emily Chen',
    status: 'active',
    age: 14,
    family: 'Chen Family',
    tags: [{ label: 'Piano', color: 'outline' }, { label: 'Advanced', color: 'orange' }],
    credits: 2,
    nextLesson: 'Today, 3:00 PM',
    notes: 'Preparing for recital in March',
    email: 'emily@example.com',
  },
  {
    id: 2,
    name: 'Marcus Williams',
    status: 'trial',
    age: 12,
    family: 'Williams Family',
    tags: [{ label: 'Piano', color: 'outline' }, { label: 'Beginner', color: 'green' }],
    credits: 0,
    nextLesson: 'Tomorrow, 4:30 PM',
    notes: 'Second trial lesson',
    email: 'marcus@example.com',
  },
  {
    id: 3,
    name: 'Sophie Martinez',
    status: 'active',
    age: 16,
    family: 'Martinez Family',
    tags: [{ label: 'Piano', color: 'outline' }, { label: 'Advanced', color: 'orange' }],
    credits: 1,
    nextLesson: 'Jan 8, 2:00 PM',
    notes: 'Working on Chopin Nocturne',
    email: 'sophie@example.com',
  },
  {
    id: 4,
    name: 'Alex Thompson',
    status: 'waiting',
    age: 10,
    family: 'Thompson Family',
    tags: [{ label: 'Piano', color: 'outline' }, { label: 'Beginner', color: 'green' }],
    credits: 0,
    nextLesson: '—',
    notes: 'Waitlisted for time slot',
    email: 'alex@example.com',
  },
  {
    id: 5,
    name: 'Ada Malkoc',
    status: 'active',
    age: 13,
    family: 'Garcia Family',
    tags: [{ label: 'Piano', color: 'outline' }, { label: 'Intermediate', color: 'yellow' }],
    credits: 3,
    nextLesson: 'Jan 6, 5:00 PM',
    notes: 'Focus on sight reading',
    email: 'isabella@example.com',
  },
  {
    id: 6,
    name: 'James Lee',
    status: 'lead',
    age: 15,
    family: 'Lee Family',
    tags: [{ label: 'Piano', color: 'outline' }],
    credits: 0,
    nextLesson: '—',
    notes: 'Scheduling consultation',
    email: 'james@example.com',
  },
  {
    id: 7,
    name: 'Olivia Brown',
    status: 'active',
    age: 11,
    family: 'Brown Family',
    tags: [{ label: 'Piano', color: 'outline' }, { label: 'Beginner', color: 'green' }],
    credits: 1,
    nextLesson: 'Jan 7, 3:30 PM',
    notes: 'Focus on music theory',
    email: 'olivia@example.com',
  },
  {
    id: 8,
    name: 'Ethan Davis',
    status: 'inactive',
    age: 17,
    family: 'Davis Family',
    tags: [{ label: 'Piano', color: 'outline' }, { label: 'Advanced', color: 'orange' }],
    credits: 0,
    nextLesson: '—',
    notes: 'Paused for college apps',
    email: 'ethan@example.com',
  },
];

const statusBadgeVariant: Record<StudentStatus, 'success' | 'indigo' | 'warning' | 'cyan' | 'default'> = {
  active: 'success',
  trial: 'indigo',
  waiting: 'warning',
  lead: 'cyan',
  inactive: 'default',
};

const statusLabels: Record<StudentStatus, string> = {
  active: 'Active',
  trial: 'Trial',
  waiting: 'Waiting',
  lead: 'Lead',
  inactive: 'Inactive',
};

const availableTags = ['Piano', 'Beginner', 'Intermediate', 'Advanced', 'Recital Prep'];

type ColumnKey = 'status' | 'age' | 'family' | 'tags' | 'credits' | 'next-lesson' | 'notes' | 'contact';

const columnLabels: Record<ColumnKey, string> = {
  status: 'Status',
  age: 'Age',
  family: 'Family',
  tags: 'Tags',
  credits: 'Credits',
  'next-lesson': 'Next Lesson',
  notes: 'Notes',
  contact: 'Contact',
};

const defaultVisibleColumns: Record<ColumnKey, boolean> = {
  status: true,
  age: true,
  family: true,
  tags: true,
  credits: true,
  'next-lesson': true,
  notes: false,
  contact: false,
};

// Helper: Format next lesson with visual indicator
function NextLessonDisplay({ nextLesson }: { nextLesson: string }) {
  if (nextLesson === '—') {
    return <span className="text-muted">—</span>;
  }

  const isToday = nextLesson.toLowerCase().includes('today');
  const isTomorrow = nextLesson.toLowerCase().includes('tomorrow');

  if (isToday) {
    return (
      <span className="lesson-indicator lesson-today">
        <span className="pulse-dot" />
        {nextLesson}
      </span>
    );
  }

  if (isTomorrow) {
    return (
      <span className="lesson-indicator lesson-tomorrow">
        {nextLesson}
      </span>
    );
  }

  return <span>{nextLesson}</span>;
}

// Helper: Format credits with visual treatment
function CreditsDisplay({ credits }: { credits: number }) {
  if (credits === 0) {
    return <span className="credits-value credits-zero">0</span>;
  }

  const className = credits <= 1 ? 'credits-low' : 'credits-good';

  return (
    <span className={`credits-value ${className}`}>
      {credits}
    </span>
  );
}

// Loading skeleton component
function TableSkeleton() {
  return (
    <div className="skeleton-container">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-cell skeleton-checkbox" />
          <div className="skeleton-cell skeleton-name" />
          <div className="skeleton-cell skeleton-badge" />
          <div className="skeleton-cell skeleton-text-short" />
          <div className="skeleton-cell skeleton-text" />
          <div className="skeleton-cell skeleton-text" />
          <div className="skeleton-cell skeleton-text-short" />
          <div className="skeleton-cell skeleton-text" />
        </div>
      ))}
    </div>
  );
}

// Empty state component
function EmptyState({
  hasFilters,
  onClearFilters
}: {
  hasFilters: boolean;
  onClearFilters: () => void;
}) {
  if (hasFilters) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">
          <i className="ph ph-magnifying-glass" />
        </div>
        <h3>No students found</h3>
        <p>Try adjusting your search or filters to find what you're looking for</p>
        <Button variant="secondary" size="md" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-illustration">
        <i className="ph ph-music-notes-simple" />
      </div>
      <h3>No students yet</h3>
      <p>Add your first student to get started with lesson scheduling and progress tracking</p>
      <Link to="/students/add" className="btn btn-primary btn-md">
        <i className="ph ph-plus" />
        Add Student
      </Link>
    </div>
  );
}

export function StudentListPage() {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState<StudentStatus | 'all'>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };

  const toggleColumn = (column: ColumnKey, checked: boolean) => {
    setVisibleColumns({ ...visibleColumns, [column]: checked });
  };

  const openTagModal = () => {
    setTempSelectedTags([...activeTags]);
    setTagModalOpen(true);
  };

  const applyTagFilters = () => {
    setActiveTags(tempSelectedTags);
    setTagModalOpen(false);
  };

  const clearSearch = () => setSearchTerm('');
  const clearStatusFilter = () => setActiveStatus('all');
  const removeTag = (tag: string) => setActiveTags(activeTags.filter((t) => t !== tag));

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveStatus('all');
    setActiveTags([]);
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        student.name.toLowerCase().includes(search) ||
        student.family.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (activeStatus !== 'all' && student.status !== activeStatus) {
      return false;
    }

    // Tag filter (any match)
    if (activeTags.length > 0) {
      const studentTagLabels = student.tags.map(t => t.label);
      const hasMatchingTag = activeTags.some(tag => studentTagLabels.includes(tag));
      if (!hasMatchingTag) return false;
    }

    return true;
  });

  // Computed
  const hasFilters = Boolean(searchTerm) || activeStatus !== 'all' || activeTags.length > 0;
  const isAllSelected = filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length;
  const isIndeterminate = selectedStudents.length > 0 && selectedStudents.length < filteredStudents.length;
  const isEmpty = filteredStudents.length === 0;

  // Bulk actions (stub)
  const bulkAssignTag = () => alert('Assign tag to selected students');
  const bulkSetStatus = () => alert('Set status for selected students');
  const bulkSendEmail = () => alert('Send email to selected students');
  const bulkDownload = () => alert('Export selected students');

  return (
    <div className="student-list-page">
      <PageHeader
        title="Students"
        subtitle="247 total students"
        actions={
          <Link to="/students/add" className="btn btn-primary btn-md">
            <i className="ph ph-plus" />
            Add Student
          </Link>
        }
      />

      <ListContainer>
        <Toolbar>
          {/* Search and Controls */}
          <ToolbarRow>
            <SearchInput
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-flex"
            />

            <FilterTabs>
              <FilterTab active={activeStatus === 'all'} onClick={() => setActiveStatus('all')}>
                All
              </FilterTab>
              <FilterTab active={activeStatus === 'active'} onClick={() => setActiveStatus('active')}>
                Active
              </FilterTab>
              <FilterTab active={activeStatus === 'trial'} onClick={() => setActiveStatus('trial')}>
                Trial
              </FilterTab>
              <FilterTab active={activeStatus === 'waiting'} onClick={() => setActiveStatus('waiting')}>
                Waiting
              </FilterTab>
              <FilterTab active={activeStatus === 'lead'} onClick={() => setActiveStatus('lead')}>
                Lead
              </FilterTab>
              <FilterTab active={activeStatus === 'inactive'} onClick={() => setActiveStatus('inactive')}>
                Inactive
              </FilterTab>
            </FilterTabs>

            <Button variant="secondary" size="md" onClick={openTagModal}>
              <i className="ph ph-tag" />
              Tags
            </Button>

            <Dropdown
              trigger={
                <Button variant="secondary" size="md">
                  <i className="ph ph-dots-three-vertical" />
                  Columns
                </Button>
              }
            >
              <DropdownHeader>Visible Columns</DropdownHeader>
              <DropdownCheckboxItem label="Name" checked disabled onChange={() => {}} />
              {(Object.keys(visibleColumns) as ColumnKey[]).map((col) => (
                <DropdownCheckboxItem
                  key={col}
                  label={columnLabels[col]}
                  checked={visibleColumns[col]}
                  onChange={(checked) => toggleColumn(col, checked)}
                />
              ))}
            </Dropdown>

            {hasFilters && (
              <Button variant="ghost" size="md" onClick={clearAllFilters}>
                <i className="ph ph-x" />
                Clear Filters
              </Button>
            )}
          </ToolbarRow>

          {/* Active Filters */}
          {hasFilters && (
            <ToolbarRow>
              <ActiveFilters onClearAll={clearAllFilters}>
                {searchTerm && <FilterTag onRemove={clearSearch}>"{searchTerm}"</FilterTag>}
                {activeStatus !== 'all' && (
                  <FilterTag onRemove={clearStatusFilter}>{statusLabels[activeStatus]}</FilterTag>
                )}
                {activeTags.map((tag) => (
                  <FilterTag key={tag} onRemove={() => removeTag(tag)}>
                    {tag}
                  </FilterTag>
                ))}
              </ActiveFilters>
            </ToolbarRow>
          )}

          {/* Bulk Actions */}
          {selectedStudents.length > 0 && (
            <ToolbarRow>
              <BulkActions selectedCount={selectedStudents.length}>
                <Button variant="ghost" size="sm" onClick={bulkAssignTag}>
                  Assign Tag
                </Button>
                <Button variant="ghost" size="sm" onClick={bulkSetStatus}>
                  Set Status
                </Button>
                <Button variant="ghost" size="sm" onClick={bulkSendEmail}>
                  Send Email
                </Button>
                <Button variant="ghost" size="sm" onClick={bulkDownload}>
                  Export
                </Button>
              </BulkActions>
            </ToolbarRow>
          )}
        </Toolbar>

        {/* Loading State */}
        {isLoading && <TableSkeleton />}

        {/* Empty State */}
        {!isLoading && isEmpty && (
          <EmptyState hasFilters={hasFilters} onClearFilters={clearAllFilters} />
        )}

        {/* Desktop Table */}
        {!isLoading && !isEmpty && (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell checkbox>
                  <Checkbox
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all"
                  />
                </TableHeaderCell>
                <TableHeaderCell
                  sortable
                  sortDirection={sortColumn === 'name' ? sortDirection : null}
                  onSort={() => handleSort('name')}
                >
                  Name
                </TableHeaderCell>
                {visibleColumns.status && (
                  <TableHeaderCell
                    sortable
                    sortDirection={sortColumn === 'status' ? sortDirection : null}
                    onSort={() => handleSort('status')}
                    className="col-status"
                  >
                    Status
                  </TableHeaderCell>
                )}
                {visibleColumns.age && (
                  <TableHeaderCell
                    sortable
                    sortDirection={sortColumn === 'age' ? sortDirection : null}
                    onSort={() => handleSort('age')}
                    className="col-age"
                  >
                    Age
                  </TableHeaderCell>
                )}
                {visibleColumns.family && <TableHeaderCell className="col-family">Family</TableHeaderCell>}
                {visibleColumns.tags && <TableHeaderCell className="col-tags">Tags</TableHeaderCell>}
                {visibleColumns.credits && (
                  <TableHeaderCell
                    sortable
                    sortDirection={sortColumn === 'credits' ? sortDirection : null}
                    onSort={() => handleSort('credits')}
                    className="col-credits"
                  >
                    Credits
                  </TableHeaderCell>
                )}
                {visibleColumns['next-lesson'] && (
                  <TableHeaderCell
                    sortable
                    sortDirection={sortColumn === 'next-lesson' ? sortDirection : null}
                    onSort={() => handleSort('next-lesson')}
                    className="col-next-lesson"
                  >
                    Next Lesson
                  </TableHeaderCell>
                )}
                {visibleColumns.notes && <TableHeaderCell className="col-notes">Notes</TableHeaderCell>}
                {visibleColumns.contact && <TableHeaderCell className="col-contact">Contact</TableHeaderCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} selected={selectedStudents.includes(student.id)}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/students/${student.id}`} className="student-name">
                      {student.name}
                    </Link>
                  </TableCell>
                  {visibleColumns.status && (
                    <TableCell className="col-status">
                      <Badge variant={statusBadgeVariant[student.status]}>
                        {statusLabels[student.status]}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.age && (
                    <TableCell className="col-age">
                      <span className="data-value">{student.age}</span>
                    </TableCell>
                  )}
                  {visibleColumns.family && <TableCell className="col-family">{student.family}</TableCell>}
                  {visibleColumns.tags && (
                    <TableCell className="col-tags">
                      <TagList>
                        {student.tags.map((tag) => (
                          <Tag key={tag.label} color={tag.color}>
                            {tag.label}
                          </Tag>
                        ))}
                      </TagList>
                    </TableCell>
                  )}
                  {visibleColumns.credits && (
                    <TableCell className="col-credits">
                      <CreditsDisplay credits={student.credits} />
                    </TableCell>
                  )}
                  {visibleColumns['next-lesson'] && (
                    <TableCell className="col-next-lesson">
                      <NextLessonDisplay nextLesson={student.nextLesson} />
                    </TableCell>
                  )}
                  {visibleColumns.notes && (
                    <TableCell className="col-notes">
                      <div className="notes-preview">{student.notes}</div>
                    </TableCell>
                  )}
                  {visibleColumns.contact && (
                    <TableCell className="col-contact">
                      <a href={`mailto:${student.email}`}>{student.email}</a>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Mobile Cards */}
        {!isLoading && !isEmpty && (
          <div className="mobile-cards">
            {filteredStudents.map((student) => (
              <div
                className={`student-card ${selectedStudents.includes(student.id) ? 'selected' : ''}`}
                key={student.id}
              >
                <div className="card-header">
                  <div>
                    <Link to={`/students/${student.id}`} className="card-name">
                      {student.name}
                    </Link>
                    <Badge variant={statusBadgeVariant[student.status]}>
                      {statusLabels[student.status]}
                    </Badge>
                  </div>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                  />
                </div>
                <div className="card-details">
                  <div className="card-row">
                    <span className="card-label">Age</span>
                    <span>
                      {student.age} &middot; {student.tags.map((t) => t.label).join(' · ')}
                    </span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Next</span>
                    {student.nextLesson.toLowerCase().includes('today') ? (
                      <span className="card-lesson-today">
                        <span className="pulse-dot" />
                        {student.nextLesson}
                      </span>
                    ) : (
                      <span>{student.nextLesson}</span>
                    )}
                  </div>
                  <div className="card-row">
                    <span className="card-label">Credits</span>
                    <CreditsDisplay credits={student.credits} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isEmpty && (
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            totalItems={247}
            itemsPerPage={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </ListContainer>

      {/* Tag Filter Modal */}
      <Modal open={tagModalOpen} onClose={() => setTagModalOpen(false)}>
        <ModalHeader onClose={() => setTagModalOpen(false)}>
          <ModalTitle>Filter by Tags</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-secondary mb-4">
            Select tags to filter students. Students with any of the selected tags will be shown.
          </p>
          <div className="checkbox-list">
            {availableTags.map((tag) => (
              <Checkbox
                key={tag}
                label={tag}
                checked={tempSelectedTags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTempSelectedTags([...tempSelectedTags, tag]);
                  } else {
                    setTempSelectedTags(tempSelectedTags.filter((t) => t !== tag));
                  }
                }}
              />
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" size="md" onClick={() => setTagModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={applyTagFilters}>
            Apply
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
