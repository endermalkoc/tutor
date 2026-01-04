# Student List

## Overview
The student list is the primary view in Student Management, displaying all students with configurable columns and powerful list management features. This document defines student-specific list configurations and behaviors that extend the general [Lists UI Requirements](../../ui-requirements/lists.md).

## Available Columns

The following columns can be displayed in the student list. Columns marked with ⭐ are shown by default.

| Column | Default | Description |
|--------|---------|-------------|
| Student Name | ⭐ | Student's full name (always visible, cannot be hidden) |
| Age | ⭐ | Current age calculated from birthday |
| Attendance Average | | Percentage of attended vs scheduled sessions |
| Birthday | | Student's date of birth |
| Card on File | | Whether payment card is on file for family |
| Default Duration | | Default lesson duration in minutes |
| Default Price | | Default price per lesson |
| Family | ⭐ | Family name |
| Gender | | Student's gender |
| Group Tags | ⭐ | Tags assigned to student for grouping/filtering |
| Last Lesson | | Date of most recent completed lesson |
| Last Login | | Last time student logged into student portal |
| Make-Up Credits | ⭐ | Number of unused makeup credits |
| Next Lesson | ⭐ | Date and time of next scheduled lesson |
| Notes | ⭐ | Preview of student notes |
| Parent Login | | Whether parent/guardian has portal access |
| Referrer | | How student was referred to the tutor |
| Reminders | | Email/SMS reminder settings (icons or text) |
| School | | School the student attends |
| Skill Level | | Student's proficiency level |
| Student Contact | ⭐ | Student's email and/or phone |
| Student Login | | Whether student has portal access |
| Student Since | | Date student started with tutor |
| Status | ⭐ | Student status (Active, Trial, Waiting, Lead, Inactive) |
| Subjects | | Subjects being studied |
| Tutors | ⭐ | Teacher(s) assigned to student |

**Default Visible Columns (10):**
1. Student Name
2. Status
3. Age
4. Family
5. Group Tags
6. Make-Up Credits
7. Next Lesson
8. Notes
9. Student Contact
10. Tutors

**Column Management:**
- Users can show/hide any column except Student Name (always visible)
- Column order can be customized via drag-and-drop
- Column width can be adjusted
- Column preferences are saved per user
- "Reset to Default" option restores default column selection

See [Lists UI Requirements](../../ui-requirements/lists.md) for general column selection functionality.

## Sorting

**Always Sortable (even when hidden):**
- **Student** - Sort by student name (A-Z or Z-A)
- **Age** - Sort by age (youngest to oldest or oldest to youngest)
- **Make-Up Credits** - Sort by number of credits (low to high or high to low)
- **Next Lesson** - Sort by next lesson date/time (earliest to latest or latest to earliest)

**Sortable When Visible:**
All other columns can be sorted, but only when they are visible in the column list:
- Attendance Average, Birthday, Card on File, Default Duration, Default Price, Family, Gender, Group Tags, Last Lesson, Last Login, Notes, Parent Login, Referrer, Reminders, School, Skill Level, Student Contact, Student Login, Student Since, Status, Subjects, Tutors

**Sorting Behavior:**
- Default sort: Student Name (A-Z)
- For columns that are sortable even when hidden, sorting options are available in the toolbar

See [Lists UI Requirements](../../ui-requirements/lists.md) for general sorting behavior.

## Pagination

- Configurable page size (25, 50, 100, 200)
- Page navigation controls
- "Load More" option for infinite scroll

## Business Rules

1. **Data Isolation**: Tutors only see students in their studio
2. **Family Association**: Students must be associated with a family
3. **Bulk Action Limits**: Bulk actions limited to 100 students at a time for performance
4. **Permission-Based Access**: Actions available based on user permissions
5. **Soft Delete**: Students are soft-deleted (marked inactive) not hard-deleted
6. **Audit Trail**: All bulk actions are logged for audit purposes

## Integration Points

- **Student Entity** - Primary data source ([Student Entity](../../entities/student.md))
- **Family Entity** - Family associations
- **Contact Entity** - Contact information
- **Transaction Entity** - Balance calculations
- **Event Entity** - Upcoming session information
- **Lists UI** - Core list functionality ([Lists UI Requirements](../../ui-requirements/lists.md))

## Performance Considerations

- List should support 1000+ students without performance degradation
- Lazy loading for large lists
- Server-side filtering, sorting, and searching for scalability
- Bulk actions processed asynchronously for large selections
- Optimistic UI updates for better perceived performance

## Mobile Considerations

- Responsive design for tablet and mobile
- Touch-friendly interactions
- Swipe gestures for row actions
- Simplified bulk actions on mobile (fewer options visible)
- Mobile-optimized column selection (fewer columns by default)

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- ARIA labels for all interactive elements
- High contrast mode support
- Focus indicators for keyboard users
