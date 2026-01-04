# Lists

## Overview
Lists are a core UI component used throughout the platform to display collections of data (students, sessions, invoices, etc.) with interactive features for customization and data exploration.

## Key Features

### Column Selection
- Users can select which columns to display in the list
- Column visibility preferences should be saved per user
- Common columns should be displayed by default
- Users can show/hide columns via a column selector interface

### Sorting

**Two Types of Sortable Columns:**

1. **Always Sortable Columns** - Can be sorted even when column is hidden
   - Defined per list type (typically key columns like Name, Date, etc.)
   - Accessible via sort dropdown/menu in toolbar
   - Allows sorting by important fields without cluttering the view

2. **Visible Column Sorting** - Can only be sorted when column is visible
   - All other columns fall into this category
   - Sort by clicking column header
   - Column must be shown in column selector to enable sorting

**Sorting Behavior:**
- Click column header to sort ascending
- Click again to sort descending
- Click a third time to remove sort and return to default
- Only one column can be sorted at a time (single-column sorting)
- Sort direction indicators (up/down arrows) displayed in column header
- Default sort order defined per list type
- Active sort persists across page refreshes (saved in user preferences)

**Sort Controls:**
- **Column Headers** - Click to sort visible columns
- **Sort Dropdown** (optional) - Access always-sortable columns from toolbar, useful when those columns are hidden
- **Clear Sort** - Button to reset to default sort order

### Searching
- Global search across all visible columns
- Real-time search as user types
- Search should filter the list dynamically
- Clear search functionality
- Search should work with current filters

### Pagination

**Items Per Page:**
- Configurable page size with options: 10, 25, 50, 100
- Default page size: 25 items
- Page size selection persists across sessions (saved in user preferences)
- Dropdown or button group control for selecting items per page
- Total count displayed (e.g., "Showing 1-25 of 247 items")

**Page Navigation:**
- First page button (jump to first page)
- Previous page button (go to previous page)
- Next page button (go to next page)
- Last page button (jump to last page)
- Current page indicator (e.g., "Page 3 of 10")
- Buttons disabled when not applicable (Previous/First disabled on first page, Next/Last disabled on last page)

**Direct Page Navigation:**
- Page number input field allowing users to jump directly to a specific page
- Enter key or "Go" button to navigate to entered page
- Validation to prevent navigation to invalid page numbers (< 1 or > total pages)
- Current page pre-filled in input field

**Pagination Behavior:**
- Pagination controls displayed at bottom of list
- Optional: Pagination controls also at top of list for long lists
- Page state persists during filtering and sorting
- When filters change and current page becomes invalid, reset to page 1
- Keyboard navigation support (arrow keys, Enter)

## User Stories

### Column Customization
- As a user, I want to select which columns are visible so I can focus on relevant information
- As a user, I want my column preferences saved so I don't have to reconfigure them each time

### Sorting
- As a user, I want to sort lists by any column so I can organize data according to my needs
- As a user, I want to see sort direction indicators so I know how the list is ordered

### Searching
- As a user, I want to search across list data so I can quickly find specific records
- As a user, I want search results to update in real-time so I can refine my query quickly

### Pagination
- As a user, I want to control how many items are displayed per page so I can view more or fewer records at once
- As a user, I want to navigate between pages easily so I can browse through large datasets
- As a user, I want to jump to a specific page directly so I can quickly access records I know are on that page
- As a user, I want my page size preference saved so I don't have to change it every session

## Technical Considerations
- Performance optimization for large datasets
- Debouncing for search input
- Pagination support
- State management for user preferences
- Accessibility (keyboard navigation, screen readers)

## Dependencies
- User settings/preferences storage
- Backend API support for filtering and sorting
