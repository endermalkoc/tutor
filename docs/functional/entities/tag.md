# Tag Entity

## Overview
The Tag entity provides a flexible labeling and categorization system for organizing students. Tags enable tutors to group students for filtering, bulk actions, and reporting purposes. Each tag has a name, color for visual identification, and optional description.

## Core Attributes

### Tag Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Name | String | Yes | Tag name (e.g., "Piano", "Advanced", "Summer 2024", "Needs Follow-up") |
| Color | String | Yes | Hex color code for visual display (e.g., "#FF5733") |
| Description | Text | No | Optional description explaining the tag's purpose |

### Metadata
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Created At | DateTime | Yes | When the tag was created |
| Created By | Reference | Yes | User who created the tag |
| Studio | Reference | Yes | Studio this tag belongs to |

## Relationships

- **Students**: Many-to-many relationship with Student entity - A tag can be applied to multiple students, and a student can have multiple tags
- **Studio**: A tag belongs to a Studio (many-to-one, required) - Tags are studio-specific
- **Created By**: References the User who created the tag

## Business Rules

1. **Studio Isolation**: Tags are scoped to a specific studio and cannot be shared across studios
2. **Unique Names Per Studio**: Tag names must be unique within a studio (case-insensitive)
3. **Color Required**: Every tag must have a color for visual distinction in the UI
4. **Name Length**: Tag names should be concise (recommended 1-30 characters)
5. **Active Tags**: Tags can be archived/deactivated if no longer needed but preserved for historical data
6. **Case Insensitive**: Tag name matching is case-insensitive ("Piano" = "piano")

## Validations

- Name is required and cannot be empty
- Name must be unique within the studio (case-insensitive)
- Name length: 1-50 characters
- Color is required and must be valid hex color format (#RRGGBB or #RGB)
- Description maximum length: 500 characters
- Studio reference is required

## Common Tag Use Cases

### Subject/Instrument Tags
- "Piano", "Guitar", "Violin", "Math", "Science"
- Color-code by subject type

### Skill Level Tags
- "Beginner", "Intermediate", "Advanced", "Expert"
- Color gradient from light to dark

### Program/Session Tags
- "Summer Program 2024", "Competition Prep", "Recital Participants"
- Color-code by time period or program type

### Administrative Tags
- "Needs Follow-up", "Payment Issue", "At Risk", "Star Student"
- Color-code by urgency or status type

### Age Group Tags
- "Elementary", "Middle School", "High School", "Adult"
- Color-code by age range

### Location Tags
- "Online Only", "In-Person", "Hybrid", "Studio A", "Home Visits"
- Color-code by location type

## Tag Management Features

### Creating Tags
- Quick create from student management page
- Bulk create from tag management page
- Import tags from template or previous year

### Applying Tags
- Apply to individual students
- Bulk apply to selected students
- Apply during student import
- Auto-apply based on rules (e.g., instrument, skill level)

### Filtering by Tags
- Filter student list by one or more tags
- AND/OR logic for multiple tag filters
- "Has any tag" or "Has no tags" filters

### Tag Analytics
- Count of students per tag
- Tag usage over time
- Most/least used tags
- Orphaned tags (no students)

## UI Display

### Tag Badges
- Display as colored pills/badges in student lists
- Show tag name with background color
- Limit visible tags per row (e.g., show 3, "+2 more")
- Tooltip on hover shows full tag list and descriptions

### Tag Selector
- Color-coded dropdown for selecting tags
- Search/filter tags by name
- Recently used tags shown first
- Visual preview of tag colors

### Tag Management Page
- List all tags with color, description, student count
- Sort by name, color, usage count, creation date
- Edit tag properties (name, color, description)
- Delete or archive unused tags
- Merge duplicate tags

## Performance Considerations

- Index on Studio + Name for uniqueness checking
- Eager load tags when displaying student lists
- Cache tag list per studio for quick filtering
- Limit total tags per studio (recommended max: 100-200)

## Notes

- Tags provide flexible, user-defined organization beyond fixed fields
- Color coding improves visual scanning and quick identification
- Tags are more flexible than fixed categories (e.g., Subjects field)
- Consider providing tag templates for common use cases
- Tags can be renamed without breaking relationships
- Deleting a tag removes it from all associated students
- Archiving preserves tag for historical reporting while hiding from active use
- Tag colors should have sufficient contrast for accessibility
- Many-to-many relationship implemented via StudentTag junction table
