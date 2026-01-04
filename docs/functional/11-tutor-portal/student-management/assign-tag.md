# Assign Tag

## Overview
The Assign Tag feature allows tutors to apply organizational tags to one or more students for grouping, filtering, and bulk operations.

## Access
**Toolbar Button**: "Assign Tag" button (enabled when one or more students are selected)

## Workflow

### Step 1: Select Students
1. Use checkboxes to select one or more students
2. Selected count displays in toolbar
3. "Assign Tag" button becomes enabled

### Step 2: Open Tag Selector
1. Click "Assign Tag" button
2. Tag assignment dialog opens

### Step 3: Choose or Create Tag

**Option A: Select Existing Tag**
- List of existing tags displayed
- Tags shown with their colors
- Search/filter tags by name
- Select one or more tags to apply

**Option B: Create New Tag**
- Click "Create New Tag" button
- Enter tag name
- Choose tag color from palette
- Optionally add tag description
- Tag is created and immediately available for selection

### Step 4: Apply Tags
1. Click "Apply" button
2. Tags are applied to all selected students
3. Success message: "Tags applied to [X] students"
4. Student list updates to show new tags

## Tag Management

### Tag Properties
| Property | Required | Description |
|----------|----------|-------------|
| Name | Yes | Tag display name (e.g., "Math - Advanced") |
| Color | Yes | Visual color for the tag (hex code or color picker) |
| Description | No | Optional description of tag purpose |
| Is Active | Yes | Whether tag is active (default: true) |

### Tag Organization
- Tags are studio-specific (not shared across studios)
- Tags can be organized by category (optional future feature)
- Color-coded for visual identification
- Searchable and filterable

### Common Tag Examples
- Subject/Level: "Math - Advanced", "English - Beginner"
- Programs: "Summer Camp 2024", "Scholarship Student"
- Status: "Payment Plan", "VIP Student"
- Location: "Downtown Studio", "Online Only"
- Schedule: "Monday Students", "Weekend Students"

## Tag Display

### In Student List
- Tags shown as colored chips/badges in Group Tags column
- Multiple tags displayed per student
- Truncated with "+" indicator if too many to display
- Hover shows all tags
- Click tag to filter list by that tag

### In Student Detail
- All tags displayed with full names
- Ability to add/remove tags from detail view
- Tag history (when tags were added/removed)

## Bulk Tag Operations

### Add Tags
- Adds tags to selected students
- Doesn't remove existing tags
- Students can have multiple tags

### Remove Tags
- Remove specific tags from selected students
- Other tags remain unchanged
- Confirmation required

### Replace Tags
- Remove all existing tags
- Apply new tag(s)
- Useful for changing student groupings
- Confirmation required due to destructive nature

## Tag Filtering

### Quick Filter
- Click any tag in student list
- List filters to show only students with that tag
- Multiple tags can be selected (AND or OR logic)
- Active filters displayed in filter bar

### Advanced Tag Filtering
- Filter by multiple tags with AND/OR logic
- Include students with "any of these tags"
- Include students with "all of these tags"
- Exclude students with specific tags

## Tag Reporting

### Tag Usage
- View how many students have each tag
- Identify unused tags for cleanup
- Tag usage statistics in reports

### Tag-Based Lists
- Generate reports by tag
- Export students by tag
- Schedule based on tags

## Business Rules

1. **Tag Names**: Must be unique within a studio
2. **Multiple Tags**: Students can have multiple tags simultaneously
3. **Tag Deletion**: Cannot delete tags in use (must reassign students first or force delete with confirmation)
4. **Color Uniqueness**: Colors don't have to be unique (multiple tags can share colors)
5. **Tag Inheritance**: Tags don't cascade to family members
6. **Audit Trail**: Tag assignments are logged for history

## Validations

- At least one student must be selected
- Tag name is required and must be unique
- Tag color is required
- Tag name must be 1-50 characters
- Confirmation required when removing tags from multiple students

## User Experience Features

### Tag Chips
- Color-coded visual representation
- Click to filter
- Hover for full name (if truncated)
- Remove tag with X button

### Tag Search
- Auto-complete in tag selector
- Recent tags shown first
- Popular tags highlighted

### Tag Templates
- Suggest commonly used tag patterns
- Quick-create tags from templates
- System-suggested tags based on student data

## Integration Points

- **Student Entity** - Tags stored in student record or junction table
- **Filtering System** - Tags used in student list filtering
- **Reporting** - Tags available as report dimensions
- **Bulk Messaging** - Can message all students with specific tag

## Performance Considerations

- Tags loaded once and cached
- Tag operations asynchronous for large selections
- Optimistic UI updates for better perceived performance

## Notes

- Tags are a flexible categorization system
- Can be used for any organizational purpose
- Different from formal fields (Status, Type, etc.)
- Support for future enhancements: tag categories, tag hierarchies, tag expiry dates
- Consider tag cleanup/archival process for inactive tags
