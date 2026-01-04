# Filtering & Search

## Overview
Filtering and search capabilities allow tutors to quickly find specific students or groups of students in the student management list.

## Search

### Global Search Bar
- Located at top of student list
- Searches across multiple fields simultaneously
- Real-time results as user types
- Minimum 2 characters to trigger search

### Searchable Fields
- Student First Name
- Student Last Name
- Student Full Name
- Email Address
- Phone Number
- Family Name
- Student Notes
- Referrer
- School Name

### Search Behavior
- Case-insensitive
- Partial matching (contains, not exact match)
- Highlights matching text in results
- Results update in real-time as user types
- Can be combined with filters

### Search Features
- **Clear Search** - Option to clear search term
- **Result Count** - Shows "X students found"

## Status Filter

Quick filter to show students by enrollment status:

- **All Students** - No status filter applied (default)
- **Active** - Currently enrolled with regular sessions
- **Trial** - In trial period, evaluating fit
- **Waiting** - Waiting to start or resume lessons
- **Lead** - Prospective student, not yet enrolled
- **Inactive** - No longer taking lessons

**Behavior:**
- Single-select (only one status filter active at a time, or "All")
- Filter persists across page refreshes
- Can be combined with search and tag filters

## Tag Filters

Filter students by assigned tags:

### Single Tag Selection
- Show students with a specific tag
- Select from list of available tags
- Tags shown with their colors

### Multiple Tag Selection
- Select multiple tags to filter by
- **OR logic** - Shows students with ANY of the selected tags
- Clear all tag selections to show all students

### Tag Filter Display
- Active tag filters shown as colored indicators
- Option to remove individual tag filters
- Clear all tags option

## Filter Combination

### Using Multiple Filters Together
Filters work together with AND logic:
- Search + Status: Shows students matching search AND having selected status
- Search + Tags: Shows students matching search AND having any selected tag
- Status + Tags: Shows students with selected status AND any selected tag
- All three: Shows students matching search AND status AND tags

### Active Filter Display
- Clear indication of which filters are active
- Option to clear individual filters
- "Clear All Filters" option to reset all at once

### Result Count
- Shows "X of Y students" (matching vs. total)
- Updates in real-time as filters change

## Filter Performance

### Optimization
- Server-side filtering for large datasets
- Real-time filter updates
- Indexed fields for fast filtering

### Integration with Other Features
- Pagination works with filters
- Export respects current filters
- Bulk actions respect current filters

## Mobile Filtering

### Mobile Optimizations
- Simplified filter interface
- Status filter easily accessible
- Tag filters in expandable section
- Filter indicators scroll horizontally
- Touch-friendly filter controls

## Filter State

- Filters persist across page refreshes
- Saved in user preferences
- Reset to default option available

## Integration Points

- **Student Entity** - Primary filter source
- **Tag Entity** - Tag-based filters
- **Lists UI** - Filter controls ([Lists UI Requirements](../../ui-requirements/lists.md))

## Notes

- Filtering is essential for managing large student rosters
- Combine search + status + tags for powerful data access
- Keep filtering simple and fast for best user experience
- Mobile filtering should be simplified but functional
