# Update Prices

## Overview
The Update Prices feature allows tutors to apply pricing configurations to one or more students, either using the tutor's default pricing or specifying a custom pricing configuration.

## Access
Available when one or more students are selected

## Workflow

### Step 1: Select Students
1. User selects one or more students
2. Selected count displays
3. Update Prices action becomes available

### Step 2: Initiate Price Update
1. User initiates update prices action
2. Price update interface displays

### Step 3: Choose Pricing Option

**Option 1: Use Tutor Default**
- Applies the tutor's default pricing configuration to all selected students
- Uses tutor's pre-configured lesson category, duration, and billing settings
- Quick option for standardization

**Option 2: Specify a New Default**
- Define a custom pricing configuration
- Configure lesson category, duration, and billing type
- Applied to all selected students

### Step 4: Configure Pricing (if Option 2 selected)

If "Specify a New Default" is selected, configure the following:

#### Default Lesson Category
Select one:
- **Group Lesson**
- **Lesson**
- **Vacation**

#### Default Duration
- Enter duration in minutes
- Common values: 30, 45, 60, 90 minutes
- Ability to enter custom values

#### Default Billing
Select one of the following billing methods:

**1. Don't automatically create any calendar-generated charges**
- No automatic billing
- Manual invoicing only

**2. Student pays based on the number of lessons taken**
- Per-lesson billing
- Enter: **$ amount per lesson**
- Charges created based on completed lessons

**3. Student pays the same amount each month regardless of number of lessons**
- Flat monthly fee
- Enter: **$ amount per month**
- Fixed recurring charge

**4. Student pays an hourly rate (Charges will automatically adjust to lesson duration)**
- Hourly billing
- Enter: **$ amount per hour**
- Charges calculated based on actual lesson duration

### Step 5: Update Existing Events

**Update price in existing calendar events:**
- Enable: Updates pricing in already-scheduled future events
- Disable: Only affects new events created after this change

This option applies to both "Use Tutor Default" and "Specify a New Default"

### Step 6: Review and Apply
1. Review pricing configuration to be applied
2. See count of students affected
3. See count of existing events that will be updated (if option selected)
4. User confirms changes
5. Pricing updated for all selected students
6. Success message: "Pricing updated for [X] students"

## Pricing Configuration Details

### Tutor Default Pricing
- Pre-configured by tutor in settings
- Represents tutor's standard pricing structure
- Quick way to apply consistent pricing across students
- Can be updated in tutor settings

### Custom Pricing Configuration
- Allows per-student or per-group customization
- Useful for special rates, promotions, or different subject pricing
- All four billing options available
- Can differ from tutor default

## Lesson Categories

| Category | Description |
|----------|-------------|
| Group Lesson | Lesson with multiple students |
| Lesson | Individual one-on-one lesson |
| Vacation | Placeholder for vacation/break periods |

## Billing Methods

### 1. No Automatic Charges
- Manual invoicing only
- Tutor creates invoices manually
- No automatic billing from calendar events
- Use case: Special arrangements, scholarships, barter

### 2. Per-Lesson Billing
- Charges based on lessons completed
- Price per lesson must be specified
- Variable monthly income based on lesson count
- Use case: Most common tutoring arrangement

### 3. Flat Monthly Fee
- Same amount every month
- Regardless of lesson count
- Fixed monthly amount must be specified
- Use case: Subscription-style pricing, packages

### 4. Hourly Rate
- Charges adjust to lesson duration
- Hourly rate must be specified
- Flexible for varying lesson lengths
- Use case: Variable-length sessions, consulting

## Update Existing Calendar Events

**When enabled:**
- All future scheduled events for selected students are updated
- Pricing configuration applied retroactively to scheduled events
- Useful when changing pricing mid-term

**When disabled:**
- Only new events created after this change use new pricing
- Existing scheduled events keep their current pricing
- Useful when pricing changes at specific future date

## Business Rules

1. **Future Events Only**: Only future (not past) events can be updated
2. **Student Assignment**: Pricing configuration stored per student
3. **Price Required**: For billing options 2-4, price amount must be > 0
4. **Duration Required**: Default duration must be specified
5. **Bulk Limit**: Limited to 100 students at a time
6. **Audit Trail**: All pricing changes logged

## Validations

- At least one student must be selected
- If "Specify a New Default" selected:
  - Lesson category must be selected
  - Duration must be positive integer
  - Billing method must be selected
  - If billing method 2-4, price amount must be > 0
- Confirmation required before applying changes

## Common Use Cases

### Standardize All Students to Tutor Default
1. Select all students
2. Choose "Use Tutor Default"
3. Enable "Update price in existing calendar events"
4. Apply

### Set Special Rate for Trial Students
1. Filter and select trial students
2. Choose "Specify a New Default"
3. Configure: Lesson, 30 minutes, Per-lesson at reduced rate
4. Disable updating existing events (if applicable)
5. Apply

### Change to Monthly Subscription Pricing
1. Select students switching to subscription
2. Choose "Specify a New Default"
3. Configure: Lesson, duration, Flat monthly fee
4. Enable updating existing events
5. Apply

### Set Up Group Lesson Pricing
1. Select students in group
2. Choose "Specify a New Default"
3. Configure: Group Lesson, duration, Per-lesson at group rate
4. Apply

## Integration Points

- **Student Entity** - Updates default pricing configuration fields
- **Event Entity** - Updates pricing in existing events if option selected
- **Transaction Entity** - Future transactions use new pricing configuration
- **Invoice Entity** - Future invoices reflect new billing method
- **Audit Log** - All pricing changes logged

## Notes

- Tutor default pricing serves as template for new students
- Students can have individual pricing configurations
- Pricing changes only affect future billing
- Past invoices and transactions remain unchanged
- "Update existing calendar events" option is powerful - use carefully
- Consider communicating price changes to students/parents
- Different students can have different billing methods
