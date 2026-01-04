# Reference Tables

## Overview
Reference tables (also called lookup tables) provide standardized values for dropdowns, categorization, and data consistency across the system. These tables allow for controlled vocabularies while remaining flexible through admin configuration.

## Common Structure
All reference tables typically share these common attributes:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Name | String | Yes | Display name for the reference value |
| Description | String | No | Optional description explaining the value |
| Is Active | Boolean | Yes | Whether this value is active/selectable (default: true) |

## Reference Table Entities

### Student-Related

**StudentStatus**
- Purpose: Tracks student enrollment status
- Common values: Active, Trial, Waiting, Lead, Inactive
- Used by: Student entity

**StudentType**
- Purpose: Categorizes students by age group or program type
- Common values: Adult, Child
- Used by: Student entity
- Note: Affects portal access and communication preferences

**SkillLevel**
- Purpose: Indicates student's proficiency level
- Common values: Beginner, Intermediate, Advanced, Professional
- Has additional field: Sort Order (for ordering levels)
- Used by: Student entity

### Teacher-Related

**PayrollType**
- Purpose: Defines how teachers are compensated
- Common values: Hourly, Salaried, Per Student, Commission, Contractor
- Used by: Teacher entity

### Financial

**BillingType**
- Purpose: Defines how lessons are billed
- Common values: Hourly, Per Lesson, Package, Monthly, Per Semester
- Used by: TeacherStudentAssignment entity

**PricingType**
- Purpose: Defines pricing model for events
- Common values: Hourly, Per Session, Package Rate, Flat Fee, Free
- Used by: Event entity

### Event & Scheduling

**EventType**
- Purpose: Categorizes events
- Common values: Lesson, Group Lesson, Vacation, Recital, Workshop, Administrative
- Used by: Event entity

**FrequencyType**
- Purpose: Defines recurrence patterns
- Common values: Daily, Weekly, Bi-Weekly, Monthly, Custom
- Used by: Recurrence entity

**AttendanceStatus**
- Purpose: Tracks attendance state
- Common values: Present, Absent, Excused, Late, Left Early
- Used by: EventAttendee entity

### Contact & Communication

**Gender**
- Purpose: Gender classification
- Common values: Male, Female, Non-binary, Prefer not to say
- Used by: Contact entity

**PhoneType**
- Purpose: Categorizes phone numbers
- Common values: Mobile, Home, Work, Emergency, Fax
- Used by: Phone entity

**AddressType**
- Purpose: Categorizes addresses
- Common values: Home, Work, Billing, Shipping, Mailing
- Used by: Address entity

**Country**
- Purpose: Standardized country list
- Has additional field: Code (ISO country code)
- Used by: Address entity

**MessagingAppType**
- Purpose: Types of messaging platforms
- Common values: Skype, FaceTime, Zoom, Google Meet, WhatsApp, Discord
- Used by: MessagingApp entity

### Organization

**Category**
- Purpose: Multi-purpose categorization system
- Has additional fields: Category Type (to distinguish usage context), Color (for visual coding)
- Common values: Varies by Category Type (lesson categories, transaction categories, etc.)
- Used by: Event, Transaction, TeacherStudentAssignment entities

**Location**
- Purpose: Physical locations for events
- Has additional field: Address (reference to Address entity)
- Common values: Studio A, Studio B, Student's Home, Online, etc.
- Used by: Event entity

## Business Rules

1. **Active Status**: Inactive reference values are preserved for historical data but hidden from selection in forms
2. **Name Uniqueness**: Within each reference table, names should be unique to avoid confusion
3. **Soft Delete**: Reference values should never be hard-deleted if used by existing records
4. **Default Values**: System should define sensible defaults for common reference types
5. **Extensibility**: Administrators should be able to add custom reference values where appropriate

## Common Operations

### Adding Values
- New reference values can be added by system administrators
- Values should be added through admin interface, not directly by users
- Consider whether value should be system-wide or studio-specific

### Editing Values
- Names and descriptions can be edited
- Editing a value updates it everywhere it's used
- Consider impact on existing data before making changes

### Deactivating Values
- Use Is Active = false instead of deleting
- Deactivated values remain in historical data
- Deactivated values don't appear in new record forms
- Can be reactivated if needed

## Notes

- Reference tables provide controlled vocabularies while allowing customization
- Most reference tables are system-wide, though some (like Category) may be studio-specific
- Keeping reference data separate from core entities makes the system more flexible
- Default/starter values should be provided during system setup
- Consider permissions - typically only admins can modify reference tables
- Some reference tables (Gender, Country) may need to follow standards or regulations
- Color coding (in Category) enables visual organization in calendars and reports
