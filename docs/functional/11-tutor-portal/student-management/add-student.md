# Add New Student

## Overview

The Add New Student feature allows tutors to create individual student records with complete contact, academic, and billing information.

## Access

Always available in student management

## Workflow

### Step 1: Open Form

1. User initiates add student action
2. Student creation form displays

### Step 2: Fill Required Fields

**Required Information:**

- **First Name** (from Contact entity)
- **Last Name** (from Contact entity)
- **Student Type** - Adult or Child
- **Status** - Active, Trial, Waiting, Lead, or Inactive

### Step 3: Family Assignment

User selects one of three options:

1. **Add to existing family** - Search and select from existing families
2. **Create new family** - Enter new family and guardian information
3. **No family (independent student)** - Student manages their own account (typically adults)

**If adding to existing family:**
- Search field to find families by family name, parent name, or email
- Search results display family name with primary guardian details
- Selecting a family links the student to that family's billing and contacts

**If creating new family:**
- Family Name field (used to group students from same household)
- Primary Guardian information (see "Creating New Family" section below)

**If no family:**
- Student is treated as independent
- Billing goes directly to student
- Student contact info used for all communications

### Step 4: Fill Default Visible Fields

**Student Contact Information** (from Contact entity):

- Email Address
- Phone Number (mobile phone)
- SMS Capable (checkbox - indicates if phone number can receive SMS messages)

**Lesson Settings**:

- Lesson Category (Lesson, Group Lesson, Vacation)
- Default Duration (minutes)
- Default Billing Type
- Price
- Price Type

**Additional Information**:

- Notes (private tutor notes)

### Step 5: Default Billing

**Billing Responsibility:**
- Bill to family (default if family assigned)
- Bill student directly (default if no family)

**Billing Settings:**
- Billing Email (optional - defaults to contact email)
- Payment Terms: Due on receipt, Net 7, Net 14, Net 30

### Step 6: Optional - Show Additional Fields

Additional fields hidden by default. User can show these fields by clicking "Show More Fields" or similar action:

**Personal Information** (hidden by default):

- Gender
- Birthday
- School

**Academic Information** (hidden by default):

- Subjects (multi-select)
- Skill Level

**Communication Apps** (hidden by default):

- Skype Username
- FaceTime ID

**Reminder Settings** (hidden by default):

- Send Email Lesson Reminders (enabled/disabled)
- Send SMS Lesson Reminders (enabled/disabled)
- **Note**: These fields are ALWAYS visible when creating a new family (not hidden)

**Other Information** (hidden by default):

- Referrer (how student found the tutor)
- Student Since (date)

### Step 7: Save

1. User submits the form
2. System validates all fields
3. If validation passes:
   - Student record created
   - Contact record created/linked
   - Family association established
   - User returned to student management list
   - New student appears in the list
4. If validation fails:
   - Error messages displayed
   - User corrects issues and resubmits

## Form Validation

### Required Field Validation

- First Name and Last Name must be provided
- Family must be selected or created
- Student Type must be selected
- Status must be selected

### Contact Information Validation

- Email must be valid email format if provided
- Phone number must follow valid format if provided

### Price Validation

- Price must be >= 0 if provided
- Default Duration must be positive integer

### Business Logic Validation

- If Student Type = Child, family must have at least one guardian
- If creating new family, guardian information is required
- Email Reminders can only be enabled if email address provided
- SMS Reminders can only be enabled if phone number exists and SMS Capable is checked

## Creating New Family

If "Create New Family" is selected:

**Family Information:**
- Family Name (e.g., "Smith Family" - used to group students from same household)

**Primary Guardian - Required Fields:**
- First Name
- Last Name
- Email Address OR Mobile Number (at least one required)

**Primary Guardian - Contact Fields:**
- Email Address
- Mobile Number
- SMS Capable (checkbox - indicates if phone number can receive SMS)
- Address (street address)
- City
- State

**Lesson Reminder Preferences (always visible for new family):**
- Email Reminders: 24 hours before / 48 hours before / Don't send
- SMS Reminders: 2 hours before / 24 hours before / Don't send

**Note**: Reminder preferences are always visible when creating a new family to ensure proper configuration from the start.

**Process:**

1. Family record created first
2. Guardian contact record created and linked to family as primary guardian
3. Student record created and linked to family
4. Billing defaults to family unless specified otherwise

## User Experience Features

### Form Organization

- Sections collapsible/expandable
- Required fields clearly marked
- Helpful tooltips for complex fields
- Default values pre-populated where appropriate

### Smart Defaults

- Status defaults to "Active" for new students
- Student Type defaults to "Child"
- Default Duration defaults to 30 minutes
- SMS Capable defaults to enabled (checked) when phone number is provided
- Send Email Reminders defaults to enabled (if email provided)
- Send SMS Reminders defaults to enabled (if phone number provided and SMS capable)

### Show More Fields

- Additional fields hidden by default to reduce form clutter
- "Show More Fields" action reveals hidden fields
- User can toggle visibility of optional fields
- Hidden fields include: Gender, Birthday, School, Subjects, Skill Level, Skype Username, FaceTime ID, Referrer, Student Since, and Reminder Settings
- **Exception**: Reminder settings always visible when creating a new family
- Field visibility preferences can be saved per user (optional enhancement)

### Family Quick Add

- Option to create new family within form
- Inline family creation without leaving form
- Guardian information collected in same flow

### Auto-Complete

- School selection with auto-complete
- Subject selection with auto-complete
- Referrer field with previous referrer suggestions

## Success Confirmation

**After Save:**

- Success message: "Student [Name] added successfully"
- Option to:
  - View student detail page
  - Add another student
  - Schedule first lesson
  - Return to student list

## Error Handling

### Duplicate Detection

- Check for existing students with same name in family
- Warn if potential duplicate detected
- Allow user to proceed or cancel

### Validation Errors

- Inline error messages next to invalid fields
- Summary of all errors at top of form
- Focus automatically moves to first error

### Network Errors

- Retry mechanism for save failures
- Data preserved if network error occurs
- Clear error message with retry option

## Integration Points

- **Student Entity** - Creates student record ([Student Entity](../../entities/student.md))
- **Contact Entity** - Creates/updates contact information
- **Family Entity** - Links to family or creates new family
- **Guardian Entity** - Creates guardian if new family
- **Phone Entity** - Creates phone record if provided
- **Address Entity** - Creates address if provided
- **User Entity** - Optionally creates user account for portal access

## Notes

- Creating a student automatically creates underlying Contact record
- Student can be created with minimal information (name, family, type, status)
- Additional fields can be added later through student detail view
- Only one phone number per student/guardian stored (mobile phone)
- Price and lesson settings can be updated later in student detail view
- Guardian portal access can be configured separately after student creation
- Student portal access (User creation) happens separately, not during initial student add
- Hidden fields help reduce form complexity for quick student creation
- Reminder settings always visible for new families to ensure proper configuration
