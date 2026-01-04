# Set Status

## Overview
The Set Status feature allows tutors to quickly change the enrollment status for one or more students using a simple dropdown selector. Changes are tracked automatically in the system's audit trail.

## Access
**Toolbar Button**: "Set Status" dropdown button (enabled when one or more students are selected)

## Workflow

### Step 1: Select Students
1. Use checkboxes to select one or more students
2. Selected count displays in toolbar
3. "Set Status" dropdown becomes enabled

### Step 2: Select New Status
1. Click "Set Status" dropdown button
2. Dropdown menu displays available status options:
   - **Active** - Currently enrolled with regular sessions
   - **Trial** - In trial period, evaluating fit
   - **Waiting** - Waiting to start or resume lessons
   - **Lead** - Prospective student, not yet enrolled
   - **Inactive** - No longer taking lessons

### Step 3: Status Updated
1. Click desired status from dropdown
2. Status immediately updated for all selected students
3. Success message: "Status updated to [Status] for [X] students"
4. List refreshes to reflect changes

**Behind the Scenes:**
- System automatically records timestamp of change
- System tracks which user made the change
- Audit trail maintained for all status changes
- No user input required for tracking

## Status Definitions

### Active
- **Definition**: Student is currently enrolled and attending lessons
- **Characteristics**:
  - Has upcoming sessions scheduled
  - Receives regular reminders
  - Appears in active student lists
  - Included in attendance tracking
  - Invoiced regularly
- **Common Transitions**:
  - From Trial (trial period successful)
  - From Waiting (starting/resuming lessons)
  - To Inactive (stopping lessons)

### Trial
- **Definition**: Student in trial period, evaluating lessons
- **Characteristics**:
  - Limited number of sessions
  - May have special trial pricing
  - Requires follow-up to convert
  - Receives extra attention/communication
- **Common Transitions**:
  - From Lead (started trial)
  - To Active (converted after successful trial)
  - To Inactive (trial not successful)

### Waiting
- **Definition**: Student waiting to start or resume lessons
- **Characteristics**:
  - No current sessions
  - May have future start date
  - On waitlist for specific time slot
  - Still considered part of roster
- **Common Transitions**:
  - From Active (taking break)
  - From Lead (committed but waiting for slot)
  - To Active (starting/resuming)

### Lead
- **Definition**: Prospective student, inquired but not committed
- **Characteristics**:
  - No sessions scheduled
  - Requires follow-up
  - May attend trial or evaluation
  - Not yet invoiced
- **Common Transitions**:
  - New entry point
  - To Trial (starting trial period)
  - To Inactive (not interested)

### Inactive
- **Definition**: No longer taking lessons, account dormant
- **Characteristics**:
  - No upcoming sessions
  - Not invoiced
  - Hidden from active lists by default
  - Historical data preserved
  - Can be reactivated
- **Common Transitions**:
  - From any other status (stopping lessons)
  - To Active (resuming lessons)

## Status Change Effects

### When Setting to Active
- Student appears in active student lists
- Eligible for online booking
- Reminders enabled (if configured)
- Invoicing resumes

### When Setting to Trial
- Student flagged for conversion tracking
- May apply trial pricing
- Follow-up tasks created
- Trial end date can be set

### When Setting to Waiting
- Upcoming sessions may be cancelled/rescheduled
- Student on waitlist for preferred time
- Periodic check-ins scheduled
- No current invoicing

### When Setting to Lead
- Student in pipeline for conversion
- Follow-up tasks created
- No sessions scheduled yet
- Not invoiced

### When Setting to Inactive
- Option to cancel upcoming sessions
- Remove from active lists
- Stop reminders
- Stop invoicing
- Historical data retained

## Bulk Status Operations

### Common Scenarios

**End of Semester Cleanup:**
1. Filter students with no recent sessions
2. Select all
3. Choose "Inactive" from Set Status dropdown

**Convert Trials:**
1. Filter status = Trial
2. Select successful trials
3. Choose "Active" from Set Status dropdown

**Waitlist Activation:**
1. Filter status = Waiting
2. Select students starting this week
3. Choose "Active" from Set Status dropdown

## Business Rules

1. **Audit Trail**: All status changes automatically logged with user, timestamp
2. **Immediate Effect**: Status change takes effect immediately
3. **No Confirmation**: Status changes applied without confirmation dialog for streamlined workflow
4. **Bulk Changes**: Can change status for multiple students at once
5. **History Tracking**: System maintains complete history of status changes for each student

## Validations

- At least one student must be selected
- User must have permission to change student status
- Students must belong to user's studio (data isolation)

## User Experience Features

### Quick Access
- Dropdown button always visible when students selected
- Single click to change status (no dialogs or confirmations)
- Immediate feedback with success message
- List auto-refreshes to show updated statuses

### Status Indicators
- Current status displayed as badge/chip in student list
- Color-coded status badges for quick visual scanning
- Status counts in filter sidebar

### Status History
- System tracks all status changes automatically
- View history in student detail page or audit log
- Shows: Previous status, new status, changed by, timestamp

## Integration Points

- **Student Entity** - Updates Status field
- **Event Entity** - May affect upcoming sessions
- **Invoice Entity** - May affect billing
- **Reporting** - Status used in analytics
- **Notifications** - May trigger status-specific communications

## Reporting

### Status Distribution
- Count of students by status
- Status change trends over time
- Conversion rates (Lead → Trial → Active)
- Retention rates (Active staying Active)

### Status Change Analysis
- Most common status transitions
- Average time in each status
- Reactivation rates
- Status change frequency by user

## Notes

- Status is a key student lifecycle indicator
- Streamlined single-click workflow for maximum efficiency
- System automatically tracks all changes for audit and reporting purposes
- No manual note-taking required - focus on the action, not the documentation
- Regular status maintenance keeps data accurate
- Status-based reporting provides business insights
- Different statuses may have different pricing/policies
- Clear status definitions help consistency
- Complete audit trail available for compliance and analysis
