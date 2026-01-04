# Email & SMS Reminders

## Overview
The Email & SMS Reminders feature allows tutors to configure reminder settings for one or more students, controlling whether and how they receive automated lesson reminders.

## Access
Available when one or more students are selected

## Workflow

### Step 1: Select Students
1. User selects one or more students
2. Selected count displays
3. Reminders action becomes available

### Step 2: Initiate Reminder Configuration
1. User initiates reminders action
2. Reminder configuration interface displays

### Step 3: Configure Settings

**Reminder Status:**
- Enable reminders
- Disable reminders

**Reminder Type** (if enabled):
- Email only
- SMS only
- Both email and SMS

**Recipients** (if enabled):
- Send to student
- Send to parent(s)
- Send to both student and parent(s)

### Step 4: Apply Settings
1. User applies settings
2. Settings updated for all selected students
3. Success message: "Reminder settings updated for [X] students"

## Configuration Options

### Reminder Status
- **Enabled** - Student will receive automated lesson reminders
- **Disabled** - Student will not receive reminders

### Reminder Type

**Email Reminders:**
- Sent to email address in Contact record
- Includes lesson details and calendar information

**SMS Reminders:**
- Sent to phone marked as SMS-capable
- Text message with key lesson information

**Both:**
- Student receives both email and SMS reminders

### Recipient Selection

**For Adult Students:**
- Reminders sent to student's contact information

**For Child Students:**
- **Student** - Sent to student's email/phone
- **Parent(s)** - Sent to guardian(s) email/phone
- **Both** - Sent to both student and guardian(s)

## Current Settings Display

When configuring reminders for multiple students:
- Shows current reminder settings
- Mixed settings indicator if students have different settings
- Summary: "X with email, Y with SMS, Z with both, W disabled"

## Business Rules

1. **Email Requirement**: Email reminders require valid email address in Contact record
2. **SMS Requirement**: SMS reminders require SMS-capable phone in Contact record
3. **Child Default**: Child students default to parent recipients
4. **No Contact Info**: Students without required contact info cannot have that reminder type enabled

## Validations

- At least one student must be selected
- Cannot enable email reminders without email address
- Cannot enable SMS reminders without SMS-capable phone
- If missing contact info, system shows warning and skips those students

## Integration Points

- **Contact Entity** - Stores reminder preferences and contact information
- **Email Service** - Sends email reminders
- **SMS Service** - Sends SMS reminders
- **Event Entity** - Reminders triggered by upcoming lessons

## Notes

- Reminders help reduce no-shows
- Email and SMS can be used independently or together
- Parent/student recipient settings are particularly important for child students
- Students without required contact information cannot receive that reminder type
