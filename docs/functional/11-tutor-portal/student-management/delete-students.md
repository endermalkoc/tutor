# Delete Students

## Overview
The Delete Students feature allows tutors to remove students from their active roster. Students with lesson or billing history are automatically switched to 'Inactive' status to preserve historical data for reporting. Only students with no history are permanently deleted from the system.

## Access
**Toolbar Button**: "Delete" button (enabled when one or more students are selected)

## Workflow

### Step 1: Select Students
1. Use checkboxes to select one or more students
2. Selected count displays in toolbar
3. "Delete" button becomes enabled

### Step 2: Initiate Delete
1. Click "Delete" button
2. Delete confirmation dialog opens

### Step 3: Delete Confirmation Dialog

**Confirmation Message:**
> "Are you sure you want to delete the selected students? (Students with lesson/billing history will automatically be switched to 'Inactive' so that this information is retained for historical reporting. All 'Inactive' students with lesson/billing history will remain 'Inactive')."

**Dialog displays:**
- **Students to Delete**: List of selected students (name, family, current status)
- **What will happen**:
  - Students WITH history → Status changed to 'Inactive'
  - Students WITHOUT history → Permanently deleted
- **Student Breakdown**:
  - Count of students that will become Inactive
  - Count of students that will be permanently deleted

### Step 4: Confirm Action
1. Review the confirmation message
2. Click "Delete" to proceed or "Cancel" to abort
3. No additional checkboxes required

### Step 5: Execute Deletion
1. System processes each student:
   - **If student has lesson/billing history**: Change status to 'Inactive'
   - **If student has no history**: Permanently delete record
2. Success message displays:
   - "[X] students set to Inactive"
   - "[Y] students permanently deleted"
3. Students removed from current view (unless viewing Inactive students)

## Deletion Logic

### Students WITH Lesson/Billing History
**Criteria for having history:**
- Has at least one past session (attended or completed)
- Has payment transactions
- Has invoices (paid or unpaid)
- Has transaction records

**What happens:**
- Student status automatically changed to 'Inactive'
- Student record remains in database
- All historical data preserved
- Student hidden from active lists (filtered by status)
- Can be reactivated by changing status back to Active

**What's preserved:**
- Student profile information
- Family associations
- Complete session history (past and future)
- Payment history
- Transaction records
- Invoice history
- Notes and attachments
- All relationships and references

### Students WITHOUT History
**Criteria for no history:**
- No past sessions
- No payment transactions
- No invoices
- No transaction records
- Newly added student with no activity

**What happens:**
- Student record permanently deleted from database
- Cannot be recovered
- All student data removed

**Related entities also deleted (cascade delete):**
- **Family**: If student is only member and family has no history
- **Contact**: Student's contact record (if not shared)
- **Address**: Associated addresses (if not shared with family/other students)
- **Phone**: Associated phone numbers (if not shared)
- **Notes**: All student notes
- **Tags**: Student-tag associations
- **Attachments**: Student-related files and documents

**Typical scenarios:**
- Student added by mistake
- Duplicate entry
- Test data
- Lead that never converted (no trial session)

## Data Impact

### Future Sessions

**For Students Set to Inactive:**
- Future sessions remain in system but associated with Inactive student
- Sessions may need manual cancellation or rescheduling
- Calendar events remain
- See [Set Status](./set-status.md) for session handling when changing to Inactive

**For Students Permanently Deleted:**
- All scheduled sessions (if any) are removed
- Calendar events deleted
- Session slots become available

### Outstanding Balances

**Students with balances have history:**
- If student has any balance (positive or negative), they have billing history
- Student will automatically be set to Inactive (not deleted)
- Balance remains on record
- Outstanding amounts preserved for collection/refund
- Invoices remain accessible

**Students without balances:**
- Can be permanently deleted if no other history exists
- No financial records to preserve

### Family Associations

**Students set to Inactive:**
- Remain associated with family
- Family relationship preserved
- Can access student through family view
- Family record remains active

**Students permanently deleted:**
- Student removed from family
- If student is the only family member AND family has no history:
  - Family is also permanently deleted
  - Related entities (contacts, addresses, phones) also deleted if not used elsewhere
- If family has other students or has history:
  - Family remains active
  - Only the student is removed

## Bulk Delete Operations

### Common Scenarios

**Delete Test/Duplicate Students (No History):**
1. Filter students by tag "Test" or "Duplicate"
2. Filter by status = Lead (no sessions yet)
3. Select students with no history
4. Delete - these will be permanently removed

**Clean Up Leads That Didn't Convert:**
1. Filter: Status = Lead, Added > 6 months ago
2. Verify no session history
3. Delete - permanently removes unconverted leads

### Bulk Delete Limits
- Maximum 100 students per bulk delete operation
- For larger operations, process in batches
- Mixed results: Some may become Inactive, others permanently deleted

## Business Rules

1. **History Preservation**: Students with lesson/billing history automatically set to Inactive (never deleted)
2. **Status-Based Deletion**: Inactive students with history remain Inactive and cannot be permanently deleted
3. **Automatic Decision**: System automatically determines deletion type based on history
4. **Audit Trail**: All delete operations logged with user and timestamp
5. **Historical Data Protected**: Past sessions, payments, invoices always preserved
6. **Confirmation Required**: Always require explicit confirmation
7. **Permission-Based**: Only users with delete permission can delete students
8. **No Restoration Needed**: Students set to Inactive can be reactivated via status change

## Validations

### Pre-Delete Checks
- ✓ At least one student selected
- ✓ User has permission to delete students
- ✓ Students belong to user's studio (data isolation)
- ✓ Not exceeding bulk delete limit (100 students)

### Automatic Handling
- System automatically checks for lesson/billing history
- Students with history automatically set to Inactive
- Students without history permanently deleted
- No manual decision required from user

## User Experience Features

### Delete Confirmation Dialog
**Clear Information:**
- Confirmation message explaining the automatic behavior
- Student name(s) prominently displayed
- Breakdown showing which students will become Inactive vs permanently deleted
- Clear distinction between the two outcomes

### Batch Processing
**For Large Deletions:**
- Progress indicator showing "Processing X of Y students"
- Summary of results:
  - "[X] students set to Inactive"
  - "[Y] students permanently deleted"

## Viewing Inactive Students

### Finding Students Set to Inactive
**After "deletion":**
- Students with history now have status = Inactive
- Can be found by filtering for Inactive status
- Appear in Inactive students list
- All data intact and accessible

### Reactivating Students
**To restore a student that was "deleted":**
1. Filter for Inactive students
2. Find the student
3. Use "Set Status" action to change status back to Active
4. Student returns to active roster
- See [Set Status](./set-status.md) for details

## Integration Points

- **Student Entity** - Updates status to Inactive OR permanently deletes record
- **Family Entity** - Preserves family for Inactive students; cascade deletes empty families with no history
- **Contact Entity** - Preserves for Inactive students; cascade deletes unshared contacts for permanent deletes
- **Address Entity** - Cascade deletes unshared addresses for permanent deletes
- **Phone Entity** - Cascade deletes unshared phone numbers for permanent deletes
- **Event Entity** - Preserves for Inactive students; removes for permanent deletes
- **Invoice Entity** - Always preserved (students with invoices never permanently deleted)
- **Transaction Entity** - Always preserved (students with transactions never permanently deleted)
- **Notes** - Cascade deletes for permanent deletes
- **Tags** - Removes tag associations for permanent deletes
- **Attachments** - Cascade deletes student files for permanent deletes
- **Audit Log** - Records deletion action and outcome

## Reporting & Analytics

### Deletion Metrics
- Number of delete operations per month
- Breakdown: Students set to Inactive vs permanently deleted
- Who is performing delete operations (by user)
- Frequency of delete operations

### Inactive Student Tracking
- Inactive students with historical data
- Reason for inactivation
- Reactivation rates (Inactive → Active)

## Security & Permissions

### Permission Levels
- **Delete Students**: Can perform delete operation (results in Inactive or permanent delete based on history)

### Audit Trail
**Each Delete Operation Records:**
- Student ID and name
- Performed by (user ID and name)
- Performed at (timestamp)
- Result: "Set to Inactive" or "Permanently Deleted"
- Reason: "Has lesson/billing history" or "No history"

## Error Handling

### Deletion Failures
**If operation fails for some students:**
- Display error details per student
- Successfully processed students remain processed
- Failed operations can be retried
- Clear error messages explain the issue

**Common Errors:**
- Database error
- Permission denied
- Student not found
- Concurrent modification (student updated by another user)
- System constraint violation

## Mobile Considerations

- Confirmation dialog optimized for mobile screens
- Clear message explaining automatic behavior
- Touch-friendly confirmation buttons
- Simple, focused user interface

## Notes

- Delete operation automatically protects historical data
- Students with lesson/billing history cannot be permanently deleted
- Inactive status serves as "soft delete" for students with history
- Historical financial data always preserved for accounting/tax purposes
- Use "Set Status" to manually set students to Inactive without using delete
- Permanent deletion only for students with no history (test data, duplicates, unconverted leads)
- System automatically determines appropriate action based on student history
- "Deleted" students with history can be reactivated by changing status to Active
- **Cascade delete**: Permanently deleting a student also removes related entities (family, contacts, addresses, phones) if they have no history and aren't shared with other students
- Empty families with no history are automatically cleaned up during permanent student deletion
- Shared entities (addresses/phones used by family or siblings) are preserved even during permanent deletion
- Monitor delete operations to identify data quality issues (frequent deletions may indicate problems with data entry)
