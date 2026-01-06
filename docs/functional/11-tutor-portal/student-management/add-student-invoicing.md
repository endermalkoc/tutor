# Add New Student - Invoicing Setup (Step 2)

## Overview

Optional second step in the student creation flow for setting up automated invoicing. This step is only presented when creating a new family during student creation.

## Access

Only displayed when:
- Student Type is "Child"
- Family Assignment is "Create new family"

Not displayed when:
- Student Type is "Adult" (no family, billing goes to student directly)
- Adding child to existing family (family already has invoicing configured)

## Workflow

### Step 1: Invoicing Decision

After completing the main student form (Step 1), user is presented with:

**Question:** "Would you like to set up automatic invoicing for this family?"

**Options:**
1. **No, skip for now** - Proceed to create student without invoicing setup
2. **Yes, set up invoicing** - Continue to invoicing configuration

### If User Selects "No"

1. Student record is created
2. Family record is created with guardian
3. No invoicing configuration applied
4. User redirected to success confirmation
5. Invoicing can be configured later in family settings

### If User Selects "Yes"

Display the [Invoice Scheduling Settings](../invoicing/invoice-scheduling.md) form.

## Navigation

### Back Navigation

- User can return to Step 1 to edit student/family information
- All Step 1 data is preserved

### Cancel

- Cancels entire student creation flow
- No records created
- User returned to student list

## Success Confirmation

After completing student creation (with or without invoicing):

- Success message: "Student [Name] added successfully"
- If invoicing configured: Additional confirmation of invoicing setup
- Options:
  - View student detail page
  - Add another student
  - Schedule first lesson
  - Return to student list

## Integration Points

- **Family Entity** - Invoicing settings stored on family
- **Invoice Settings** - Configuration for automatic invoice generation
- **Payment Settings** - Payment terms and methods

## Notes

- This step is optional - users can always skip and configure later
- Invoicing settings apply to the entire family, not individual students
- Existing families already have their invoicing configured (hence skip for existing family selection)
- Default billing method selected in Step 1 determines charge calculation, this step configures invoice delivery
