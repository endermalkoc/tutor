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

### Step 3: Family Assignment (Children Only)

**Note:** This step only applies to children. Adults are automatically treated as independent students with no family assignment.

For child students, user selects one of two options:

1. **Add to existing family** - Search and select from existing families
2. **Create new family** - Enter new family and guardian information

**If adding to existing family:**
- Search field to find families by family name, parent name, or email
- Search results display family name with primary guardian details
- Selecting a family links the student to that family's billing and contacts
- Child inherits family address (no separate address entry needed)

**If creating new family:**
- Primary Guardian information (see "Creating New Family" section below)
- Family name automatically derived from guardian's last name (e.g., "Smith Family")
- Child inherits family address from guardian

**For adult students:**
- No family selection displayed
- Student is treated as independent
- Billing goes directly to student
- Student must provide their own address in Contact Information section

### Step 4: Fill Default Visible Fields

**Student Contact Information** (from Contact entity):

- Email Address
- Phone Number (mobile phone)
- SMS Capable (checkbox - indicates if phone number can receive SMS messages)
- Address, City, State (only shown for adult students; children inherit family address)

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
- Bill to family (default for children with family assigned)
- Bill student directly (default for adults, required if no family)

**Note:** For adult students, "Bill to family" option is disabled since they have no family assignment.

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

- If Student Type = Child, family assignment is required (existing or new)
- If Student Type = Child, family must have at least one guardian
- If Student Type = Adult, no family assignment allowed (automatically independent)
- If Student Type = Adult, address fields are shown and recommended
- If creating new family, guardian information is required

## Creating New Family

If "Create New Family" is selected:

**Note:** Family name is automatically generated from guardian's last name (e.g., "Smith Family").

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

### Show More Fields

- Additional fields hidden by default to reduce form clutter
- "Show More Fields" action reveals hidden fields
- User can toggle visibility of optional fields
- Hidden fields include: Gender, Birthday, School, Subjects, Skill Level, Skype Username, FaceTime ID, Referrer, Student Since
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
- Reminder settings can be configured in family or student settings after creation
