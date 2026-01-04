# Bulk Email

## Overview
The Bulk Email feature allows tutors to send email messages to multiple students and guardians at once from the student list view.

## Access Points
- Student Management list - Email selected students/guardians

## Workflow

### Step 1: Select Recipients
1. User selects students from student list
2. System displays count of selected students
3. **Warning Display**: If any selected students or guardians don't have email addresses:
   - Warning message: "[X] students/guardians have no email address"
   - List of students/guardians without email shown
   - Option to proceed with remaining recipients or cancel
4. User initiates bulk email action

### Step 2: Compose Email
System displays email composition interface.

**Email Address Validation:**
- System validates that all intended recipients have email addresses
- If missing email addresses detected, warning displayed prominently
- User can choose to proceed without those recipients or cancel

**Composition Fields:**

#### 1. From
Select sender address:
- **User's own email address** - Send from tutor's personal/business email
- **Application-generated address** - Send from system email (e.g., noreply@tutorapp.com)

#### 2. To
Pre-populated recipient list:
- Automatically filled based on selected students from list
- Includes appropriate email addresses (student and/or guardian emails)
- Ability to add more recipients by typing student or guardian names
- System auto-completes from student/guardian database
- Shows recipient count

#### 3. Extra Recipients
Additional email addresses:
- Free-form email address input
- Ability to add any email addresses directly
- For recipients not in the student/guardian database
- Useful for copying other tutors, administrators, etc.

#### 4. Subject
Email subject line:
- Required field
- Plain text input

#### 5. Message
Email body composition:
- Rich text editor with formatting options (bold, italic, lists, links, etc.)
- Ability to select from saved templates
- Template selector displays available message templates
- Selecting a template populates the message field
- User can edit template content after selection

#### 6. Attachments
File attachments:
- Ability to attach any type of file
- Multiple files can be attached
- Shows file name and size for each attachment
- Option to remove individual attachments

#### 7. Scheduling
Message delivery timing:
- **Send Immediately** - Send as soon as user confirms (default)
- **Schedule for Later** - Automatically send at a future date/time
  - Requires selecting a date
  - Requires selecting a time
  - Shows scheduled send date/time clearly

### Step 3: Preview
Before sending:
- User can preview the email
- Preview shows:
  - From address
  - To recipients (list)
  - Extra recipients (if any)
  - Subject
  - Message content (formatted)
  - Attachments (list)
  - Scheduled send time (if applicable)
- Option to return to editing

### Step 4: Send or Schedule
1. User reviews preview
2. User confirms to send
3. If "Send Immediately":
   - Messages queued and sent
   - Success confirmation displayed
4. If "Schedule for Later":
   - Messages queued for scheduled time
   - Confirmation displayed with scheduled time

## Recipient Selection Details

### Pre-populated Recipients
When coming from student list:
- System determines appropriate email addresses based on student type:
  - **Adult students**: Student's email address
  - **Child students**: Guardian email addresses
  - **Both**: Option to include both student and guardian emails
- All email addresses from selected students included by default

### Adding More Recipients
- Type student name to add their email
- Type guardian name to add their email
- System suggests matches as user types
- Selected names convert to email addresses
- Shows all final email addresses in "To" field

## Message Templates

### Template Features
- Saved message templates available in dropdown/selector
- Templates include pre-written subject and message content
- Selecting a template populates both subject and message fields
- User can edit template content after insertion
- Templates help ensure consistent messaging

### Template Categories
Examples of template types:
- Schedule change notifications
- Cancellation notices
- General announcements
- Holiday greetings
- Policy updates

## Scheduling Details

### Immediate Send
- Default option
- Messages sent as soon as user confirms
- Delivery begins immediately
- User sees confirmation when messages are queued

### Scheduled Send
- Select future date and time
- System holds messages until scheduled time
- Messages sent automatically at specified time
- User can view/edit/cancel scheduled messages before send time
- Confirmation shows: "Message scheduled to send on [Date] at [Time]"

### Time Zone
- Scheduled time uses tutor's time zone
- Clearly displayed to avoid confusion

## Business Rules

1. **Email Required**: Only students/guardians with email addresses can receive emails
2. **Missing Email Warning**: System displays warning if selected students/guardians lack email addresses
3. **Valid Emails**: System validates email format
4. **Child Students**: For child students, guardians are default recipients
5. **Permission Required**: User must have email permissions
6. **At Least One Recipient**: Must have at least one valid email address in To field
7. **Scheduled Time**: Scheduled send time must be in the future

## Validations

- From address must be selected
- At least one recipient in "To" field or "Extra Recipients"
- Subject cannot be empty
- Message cannot be empty
- All email addresses must be valid format
- If scheduling, date and time must be specified and in the future
- Confirmation required before sending to large groups (e.g., 50+ recipients)

## Preview Screen

### Preview Display
Shows complete email as it will appear:
- **From**: Sending email address
- **To**: All recipient email addresses (expandable list if many)
- **Extra Recipients**: Additional email addresses (if any)
- **Subject**: Email subject line
- **Message**: Formatted message content
- **Attachments**: List of attached files with sizes
- **Send Time**: "Immediately" or scheduled date/time

### Preview Actions
- **Edit** - Return to composition screen
- **Send** or **Schedule** - Confirm and proceed
- **Cancel** - Discard and close

## Success Confirmation

### Immediate Send
- Success message: "Email sent to [X] recipients"
- List of recipients shown (expandable)
- Option to send another message

### Scheduled Send
- Success message: "Email scheduled to send on [Date] at [Time] to [X] recipients"
- Confirmation that message is queued
- Option to view scheduled messages

## Warning Displays

### Missing Email Addresses
Displayed at multiple points in the workflow:

**During Selection:**
- When students are selected, system immediately checks for email addresses
- Warning appears if any selected students/guardians lack email
- Clear list of affected students/guardians shown
- Warning includes count: "[X] students/guardians have no email address"

**During Composition:**
- Warning remains visible during email composition
- Recipients without email addresses excluded from "To" field
- Clear indication of how many recipients will actually receive the email

**User Options:**
- Proceed with sending to recipients who have email addresses
- Cancel and add email addresses to missing recipients first
- Deselect students without email addresses

## Error Handling

### Invalid Email Addresses
- If any email addresses are invalid:
  - Error displayed with invalid addresses
  - User must correct before proceeding

### Attachment Size Limits
- If attachments exceed size limit:
  - Error: "Attachments exceed maximum size ([X] MB)"
  - User must remove or reduce attachments

### Send Failures
- If messages fail to send:
  - Error notification with details
  - Option to retry
  - Failed recipients identified

## Integration Points

- **Student Entity** - Student email addresses, student type
- **Guardian Entity** - Guardian email addresses
- **Contact Entity** - Email addresses and contact information
- **Email Service** - Message delivery system
- **Template Service** - Message template storage and retrieval
- **Scheduling Service** - Queues scheduled messages

## Notes

- Messages sent from user's own address show in their sent folder (if configured)
- Messages sent from application address are tracked in message history
- Large recipient lists processed asynchronously to avoid timeout
- Consider email deliverability best practices (SPF, DKIM, DMARC)
- Provide unsubscribe mechanism in emails if required by law
- Attachments should have reasonable size limits
- Rich text editor supports common formatting needs
- Preview step helps catch errors before sending
- Scheduled messages can be useful for announcements at specific times
