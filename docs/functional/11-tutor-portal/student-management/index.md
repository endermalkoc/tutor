# Student Management

## Overview
The Student Management page is the central hub for viewing and managing all students in the tutor's studio. It provides a comprehensive list view with powerful filtering, sorting, and bulk actions to efficiently manage the student roster.

## Page Layout

### Primary View
- **Student List** - Main list displaying students with configurable columns (see [Student List](./student-list.md))
- **Action Toolbar** - Bulk actions displayed above the list
- **Filters Panel** - Side panel or collapsible section for filtering students
- **Search Bar** - Global search across student information

## User Stories

### As a tutor, I want to:
- View all my students in one organized list
- Filter students by status, subject, skill level, or tag
- Search for a specific student quickly
- Add new students individually or in bulk
- Perform actions on multiple students at once
- Update student information efficiently
- Track student balances and payment status
- See upcoming sessions for each student

## Student List Features

For detailed information about the student list including available columns, sorting, pagination, and display options, see:
- [Student List](./student-list.md) - Student-specific list configuration and features
- [Lists UI Requirements](../../ui-requirements/lists.md) - General list functionality (column selection, sorting, searching)

## Available Actions

### Bulk Actions
1. [Add New Student](./add-student.md) - Create a new student record
2. [Import Students](../importing-students.md) - Bulk import from CSV/Excel
3. [Send Message](../bulk-messaging.md) - Email, SMS, or messaging app to multiple students
4. [Assign Tag](./assign-tag.md) - Apply tags for organization and grouping
5. [Update Prices](./update-prices.md) - Bulk price changes
6. [Edit Make-Up Credits](./edit-makeup-credits.md) - Add or remove makeup credits
7. [Email & SMS Reminders](./email-sms-reminders.md) - Configure reminder settings
8. [Apply Default Prices](./apply-default-prices.md) - Apply studio/subject/teacher defaults
9. [Download](./download.md) - Export to PDF, Excel, or vCard
10. [Set Status](./set-status.md) - Change student status in bulk
11. [Delete Students](./delete-students.md) - Delete selected students from the system

### List Management
- [Filtering & Search](./filtering-search.md) - Filter and search capabilities
- [Individual Student Actions](./individual-actions.md) - Row-level actions for each student

## Integration Points

- **Student Entity** - Primary data source ([Student Entity](../../entities/student.md))
- **Family Entity** - Family associations
- **Contact Entity** - Contact information
- **Transaction Entity** - Balance calculations
- **Event Entity** - Upcoming session information

## Technical Considerations

For performance, mobile, and accessibility requirements, see [Student List](./student-list.md).

## Notes

- Student Management is one of the most frequently used pages in the tutor portal
- Performance and usability are critical for user satisfaction
- Provide clear feedback for all actions
- Support keyboard shortcuts for power users
