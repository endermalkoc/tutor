# Student Detail - Lessons Tab

## Purpose

The Lessons tab displays the student's complete lesson attendance history, including dates, durations, attendance status, and lesson notes.

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ FILTERS & SEARCH                                                │
│ [Date Range ▼] [Status ▼] [Search notes...]                     │
├─────────────────────────────────────────────────────────────────┤
│ ATTENDANCE SUMMARY                                              │
│ Total: 45  |  Attended: 40  |  Cancelled: 3  |  No-show: 2      │
├─────────────────────────────────────────────────────────────────┤
│ LESSONS LIST                                                    │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Date        Time           Duration   Status    Notes       │ │
│ │ Jan 6       3:00-3:30 PM   30 min     Attended  Worked on...│ │
│ │ Jan 3       3:00-3:30 PM   30 min     Attended  Review of...│ │
│ │ Dec 30      3:00-3:30 PM   30 min     Cancelled             │ │
│ │ ...                                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PAGINATION                                                      │
│ Showing 1-25 of 45                    [< Prev] [1] [2] [Next >] │
└─────────────────────────────────────────────────────────────────┘
```

---

## Filters & Search

### Date Range Filter

| Option | Description |
|--------|-------------|
| All Time | No date filtering (default) |
| This Month | Current calendar month |
| Last Month | Previous calendar month |
| Last 3 Months | Rolling 3-month window |
| Last 6 Months | Rolling 6-month window |
| This Year | Current calendar year |
| Custom | Date picker for start and end date |

### Status Filter

Multi-select filter for attendance status:
- Attended
- Cancelled
- No-show
- Rescheduled

Default: All statuses selected

### Search

- Searches within lesson notes text
- Real-time filtering as user types
- Minimum 2 characters to trigger search

---

## Attendance Summary

Quick statistics displayed above the list:

| Metric | Description |
|--------|-------------|
| Total | Total number of lessons in filtered range |
| Attended | Count of lessons marked as attended |
| Cancelled | Count of cancelled lessons |
| No-show | Count of no-show lessons |

Summary updates dynamically based on active filters.

---

## Lessons List

### Columns

| Column | Description | Sortable |
|--------|-------------|----------|
| Date | Lesson date (e.g., "Mon, Jan 6") | Yes (default, descending) |
| Time | Start and end time (e.g., "3:00 - 3:30 PM") | Yes |
| Duration | Lesson length (e.g., "30 min") | Yes |
| Status | Attendance badge | Yes |
| Notes | Truncated lesson notes with expand option | No |

### Default Sort

- Sorted by Date, descending (most recent first)

### Status Badges

| Status | Color | Description |
|--------|-------|-------------|
| Attended | Green | Student attended the lesson |
| Cancelled | Gray | Lesson was cancelled in advance |
| No-show | Amber | Student didn't attend without notice |
| Rescheduled | Blue | Lesson was moved to different time |

---

## Row Actions

Actions available on each lesson row (visible on hover or via menu):

| Action | Description |
|--------|-------------|
| View Details | Opens lesson detail panel/modal |
| Edit Notes | Opens inline note editor |
| Change Status | Quick status change dropdown |
| Delete | Removes lesson record (with confirmation) |

---

## Lesson Details Panel

When viewing lesson details (click row or "View Details"):

### Display Fields

| Field | Description |
|-------|-------------|
| Date & Time | Full date and time range |
| Duration | Lesson length |
| Status | Current attendance status |
| Location | Where lesson took place (if tracked) |
| Lesson Type | Individual or Group |
| Rate Applied | Billing rate for this lesson |
| Invoice | Link to invoice if lesson was invoiced |

### Lesson Notes

- Full notes text (not truncated)
- Created/updated timestamp
- Edit button to modify notes

### Actions in Detail Panel

| Action | Description |
|--------|-------------|
| Edit Status | Change attendance status |
| Edit Notes | Modify lesson notes |
| View Invoice | Navigate to related invoice (if exists) |
| Close | Close detail panel |

---

## Add/Edit Notes

### Inline Note Editing

1. User clicks "Edit Notes" on a lesson row
2. Notes cell expands to textarea
3. User types/modifies notes
4. Save and Cancel buttons appear
5. On save: Update persisted, return to view mode
6. On cancel: Discard changes, return to view mode

### Note Features

- Plain text (no rich formatting)
- Auto-save draft while typing (optional)
- Timestamp updated on save
- No character limit (but reasonable UI constraints)

---

## Empty State

If no lessons exist:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    📅                                           │
│                                                                 │
│              No lessons recorded yet                            │
│                                                                 │
│     Lessons will appear here after they're scheduled            │
│              and marked with attendance.                        │
│                                                                 │
│              [Schedule a Lesson]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Filtered Empty State

If filters return no results:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              No lessons match your filters                      │
│                                                                 │
│              [Clear Filters]                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pagination

- Default: 25 lessons per page
- Options: 25, 50, 100
- Shows: "Showing X-Y of Z lessons"
- Navigation: Previous, Next, page numbers
- Persists filter state when paginating

---

## Bulk Actions

When multiple lessons are selected (via checkboxes):

| Action | Description |
|--------|-------------|
| Change Status | Apply status to all selected lessons |
| Delete | Remove selected lessons (with confirmation) |
| Export | Download selected lessons as CSV |

---

## Export

Export lesson history for reporting or records:

| Format | Description |
|--------|-------------|
| CSV | Spreadsheet-compatible format |
| PDF | Formatted report |

Export respects current filters (exports filtered data, not all data).

---

## Data Refresh

- Data loads when tab is selected
- Pull-to-refresh or refresh button for manual update
- Auto-refresh not implemented (manual refresh required)

---

## Accessibility

- Table follows accessible table patterns
- Sort controls are keyboard accessible
- Filter dropdowns are keyboard navigable
- Status badges have text labels (not color-only)
- Pagination controls are keyboard accessible
