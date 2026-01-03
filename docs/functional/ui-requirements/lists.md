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
- Lists should support sorting by any column
- Single-column sorting (click column header to sort)
- Multi-column sorting (optional advanced feature)
- Sort direction indicators (ascending/descending)
- Default sort order defined per list type

### Searching
- Global search across all visible columns
- Real-time search as user types
- Search should filter the list dynamically
- Clear search functionality
- Search should work with current filters

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

## Technical Considerations
- Performance optimization for large datasets
- Debouncing for search input
- Pagination support
- State management for user preferences
- Accessibility (keyboard navigation, screen readers)

## Dependencies
- User settings/preferences storage
- Backend API support for filtering and sorting
