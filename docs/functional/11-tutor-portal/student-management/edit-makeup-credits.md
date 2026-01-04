# Edit Make-Up Credits

## Overview
The Edit Make-Up Credits feature allows tutors to manage makeup lesson credits for students. Make-up credits are tracked per student-tutor pair, allowing students to accumulate credits with different tutors independently. Credits can be in three states: total issued, available (not yet booked), and booked (scheduled for future use).

## Access
**Toolbar Button**: "Make-Up Credits" button (enabled when one or more students are selected)

## Workflow

### Step 1: Select Students
1. Use checkboxes to select one or more students
2. Selected count displays in toolbar
3. "Make-Up Credits" button becomes enabled

### Step 2: Open Credits Dialog
1. Click "Make-Up Credits" button
2. Make-up credits dialog opens
3. Shows current credit status for each student

### Step 3: Select Tutor
1. **Tutor Selection** (required)
   - Dropdown list of all tutors in the studio
   - If single student selected and student has assigned tutors, show those first
   - Credits are tracked per student-tutor pair
   - Each student can have different credit balances with different tutors

### Step 4: Set Credit Amount
1. Enter the total number of credits the student should have with the selected tutor
   - Sets the available credit balance to this amount
   - Must be zero or positive integer (no negative credits)
2. Current balance displayed for each student with the selected tutor:
   - **Total Credits**: All credits issued
   - **Available Credits**: Not yet booked
   - **Booked Credits**: Scheduled for future sessions

### Step 5: Credits Updated
1. Available credits set to entered amount for selected student(s) with the selected tutor
2. Success message: "Make-up credits set to [X] for [Y] student(s) with [Tutor Name]"
3. Credit balance refreshes in the list

**Note:** Credits are automatically subtracted when students book and attend makeup lessons. This dialog only sets the available credit amount.

## Make-Up Credit System

### What are Make-Up Credits?
- Compensation for cancelled or missed lessons (tutor-initiated)
- Allow students to book replacement sessions with the specific tutor
- Tracked per student-tutor pair (not studio-wide)
- Independent balances with each tutor

### Student-Tutor Credit Relationship
- **Each student-tutor pair has its own credit balance**
- Student may have credits with Tutor A but not Tutor B
- Credits can only be used with the tutor who issued them
- Example: Sarah has 2 credits with Math Tutor, 1 credit with Science Tutor

### Credit States

**Available Credits:**
- Credits ready to be used for scheduling makeup sessions
- This is the number that tutors set using the Edit Make-Up Credits feature
- Automatically decremented when student books a makeup session
- Can only be zero or positive (no negative credits)

**Booked Credits:**
- Credits applied to scheduled future makeup sessions
- Automatically set when student books a session using a credit
- Session is scheduled but hasn't occurred yet

**Used Credits:**
- Credits for completed makeup sessions
- Automatically updated when a booked session is marked complete
- Historical tracking only

**Automatic Credit Flow:**
1. Tutor sets Available Credits to 3
2. Student books makeup session → Available: 2, Booked: 1
3. Student attends session → Available: 2, Booked: 0, Used: 1
4. Student books another session → Available: 1, Booked: 1, Used: 1

**Example Current Balance:**
- Available: 2 credits (can book 2 makeup sessions)
- Booked: 1 credit (1 session scheduled for next week)
- Used: 1 credit (1 makeup session already completed)

## Common Scenarios

### Setting Credits

**Tutor-Cancelled Lesson:**
- Student currently has 0 credits with tutor
- Tutor sets credits to 1
- Student can now book makeup session with that tutor

**Multiple Cancelled Lessons:**
- Student had 1 credit, tutor cancels 2 more lessons
- Tutor sets credits to 3
- Student can book 3 makeup sessions

**After Student Uses Credit:**
- System automatically decrements when student books/attends
- Available: 3 → Student books session → Available: 2
- No manual adjustment needed

**Correction:**
- Credits were accidentally set to 5, should be 2
- Tutor sets credits to 2
- Overwrites previous amount

**Starting Fresh:**
- Student had old credits, starting new arrangement
- Tutor sets credits to desired amount
- Previous balance is overwritten

## Credit Tracking

### Credit History Per Student-Tutor Pair
Track all credit activity for each student-tutor relationship:
- Student name
- Tutor name
- Date credits added/removed
- Number of credits changed
- Adjusted by (user who made the change)
- Resulting balance (Total, Available, Booked)

### Current Balance Display
For each student-tutor pair:
- **Total Credits**: All credits ever issued
- **Available Credits**: Not yet booked (can schedule makeup sessions)
- **Booked Credits**: Scheduled for future sessions
- **Used Credits**: Historical count of completed makeup sessions

### Display in Student List
The "Make-Up Credits" column shows:
- **Aggregate view**: Sum of available credits across all tutors
- **Hover/expand**: Breakdown by tutor
- **Example**: "3 credits" (2 with Tutor A, 1 with Tutor B)

## Using Make-Up Credits

### Booking with Credits
- Student/guardian books session with specific tutor
- If available credits exist with that tutor, option to "Use Make-Up Credit"
- Credit moves from "Available" to "Booked" state
- When session occurs, credit moves to "Used" state
- Cannot use credits with a different tutor

### Credit Booking Flow
1. Student selects tutor for makeup session
2. System checks available credits with that specific tutor
3. If credits available, student can apply credit to booking
4. Credit state: Available → Booked (when scheduled) → Used (after session)

## Business Rules

1. **Student-Tutor Relationship**: Credits are specific to the student-tutor pair
2. **Tutor Selection Required**: Must select which tutor when setting credits
3. **Non-Negative Credits**: Credit amount must be zero or positive (no negative credits allowed)
4. **Integer Values**: Credit amount must be a whole number (0, 1, 2, 3, etc.)
5. **Automatic Deduction**: System automatically subtracts credits when student books/attends makeup sessions
6. **State Transitions**: Available → Booked (when scheduled) → Used (when completed)
7. **Set, Not Add/Remove**: This feature sets the total available credits, doesn't add or subtract
8. **Audit Trail**: All credit changes logged with user, date, student, tutor, previous amount, new amount
9. **Independent Balances**: Each student-tutor pair maintains separate credit balance

## Validations

- At least one student must be selected
- Tutor must be selected
- Credit amount must be zero or a positive integer
- User must have permission to edit credits

## User Experience Features

### Current Balance Display
When dialog opens, show for each selected student:
- Tutor dropdown (required selection)
- Current balance with selected tutor (updates when tutor changes):
  - Available: Y credits
  - Booked: Z credits
  - Used: W credits (historical)
- Credit amount input field (pre-filled with current available amount)

### Quick Actions
- "Set to 1" button for single credit
- "Set to 0" button to clear credits
- Quick tutor selection if student has assigned tutors
- Input field shows current value, user types new value

### Multi-Student Handling
- When multiple students selected, same tutor and credit amount applied to all
- Shows current balance for each student with selected tutor
- All students set to the same new amount

### Credit Summary Dashboard
- View students with available credits by tutor
- See total available credits per tutor
- Track booking and usage rates per tutor

## Integration Points

- **Student Entity** - Links to student record
- **Tutor Entity** - Links to tutor record
- **StudentTutorCredit Entity** - Stores credit balance per student-tutor pair
  - student_id
  - tutor_id
  - total_credits
  - available_credits
  - booked_credits
  - used_credits
- **Event Entity** - Links makeup sessions to credit usage
- **Audit Log** - Tracks all credit adjustments

## Credit Data Model

### StudentTutorCredit Table
| Field | Type | Description |
|-------|------|-------------|
| student_id | Reference | Student with credits |
| tutor_id | Reference | Tutor who issued credits |
| available_credits | Integer | Credits available to book (set by tutor) |
| booked_credits | Integer | Credits scheduled for future sessions (auto) |
| used_credits | Integer | Credits for completed sessions (auto, historical) |
| last_updated | DateTime | Last modification timestamp |
| updated_by | Reference | User who last modified available credits |

**Note:** Only `available_credits` is manually set. `booked_credits` and `used_credits` are automatically managed by the system.

### Credit Change Log
Track when tutors manually set credit amounts:
- student_id
- tutor_id
- change_date
- previous_available
- new_available
- changed_by
- notes (optional)

## Reporting

### Credit Reports
- Credits issued per tutor over time period
- Credits used vs. available by tutor
- Students with highest credit usage per tutor
- Credit liability (unused available credits) by tutor
- Credit booking rate (available → booked → used conversion)

### Credit Analytics
- Which tutors issue the most credits
- Average credit usage time (from issued to used)
- Students with credits across multiple tutors
- Credit utilization rate per tutor

## Notes

- Make-up credits are specific to student-tutor relationships, not studio-wide
- Credits cannot be transferred between tutors
- Each tutor manages their own credit liability with students
- Track patterns in credit issuance per tutor to identify issues
- Clear communication about tutor-specific credit policies
- Credits represent future obligation specific to each tutor
- Consider policy for when a tutor leaves: what happens to their issued credits?
