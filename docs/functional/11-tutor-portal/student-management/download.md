# Download Student Data

## Overview
The Download feature allows tutors to export student information in multiple formats (PDF, Excel, vCard) for reporting, backup, or external use.

## Access
Always available with format selection

## Supported Formats

### 1. PDF
- Formatted student roster report
- Printable and shareable
- Professional appearance
- **Uses predefined columns appropriate for PDF**

### 2. Excel (XLSX)
- Spreadsheet with student data
- Can be analyzed, filtered, sorted in Excel
- Import into other systems
- **Exports only visible columns from screen**

### 3. vCard
- Contact cards for each student
- Import into phone/email contacts
- Individual .vcf files or combined file
- **Uses predefined contact fields appropriate for vCard**

## Column Behavior by Format

| Format | Column Selection |
|--------|------------------|
| **Excel** | Exports **visible columns only** from screen in current order |
| **PDF** | Uses **predefined columns** appropriate for printing (Student Name, Status, Age, Family, Contact, Next Lesson, Notes) |
| **vCard** | Uses **predefined contact fields** (Name, Email, Phone, Address, Birthday, Organization, Notes) |

**Important**: To customize your Excel export, use the column selector to show/hide columns before downloading.

## Workflow

### Step 1: Configure List (Optional)
1. Apply filters to show specific students
2. Sort by desired column
3. Select specific students (optional)
4. **For Excel exports**: Show/hide desired columns (Excel will export visible columns only)

### Step 2: Choose Format
1. User initiates download action
2. Select format:
   - Download as PDF
   - Download as Excel
   - Download as vCard

### Step 3: Download File
1. File generated on server
2. Download prompt appears
3. Save file to desired location
4. File opens in appropriate application

## PDF Export

### Contents
- **Header**: Studio name, report title, date generated
- **Student List**: Table with appropriate columns for PDF format
- **Footer**: Page numbers, tutor name

### Columns Included
PDF includes a predefined set of columns appropriate for printing:
- Student Name
- Status
- Age
- Family
- Student Contact (email/phone)
- Next Lesson
- Notes (preview)

### Features
- Uses appropriate columns for PDF format (not screen columns)
- Includes only filtered students (if filter applied)
- Honors current sort order
- Professional formatting
- Landscape or portrait orientation (auto-selected based on columns)

### Page Layout
- Header with studio logo (if configured)
- Column headers repeated on each page
- Alternating row colors for readability
- Page numbers
- Generation date and time

### Use Cases
- Print class roster
- Share student list with admin
- Archive snapshot of students
- Include in reporting packages

## Excel Export

### Contents
- Student data with visible columns from screen
- One row per student
- Column headers in first row
- Formatted as Excel table

### Columns Included
**Excel exports only the columns currently visible on screen**, in the same order as displayed:
- Matches your current column selection
- Respects column order from the list view
- Includes only columns you have chosen to show
- Column widths preserved from screen layout

**Example**: If your screen shows: Student Name, Age, Family, Next Lesson, Make-Up Credits - the Excel export will contain only these 5 columns in this order.

### Features
- Exports visible columns only (matches screen view)
- Respects current filters (only filtered students)
- Respects current sort order
- All students or selected students only
- Excel table format for easy sorting/filtering
- Column headers frozen for scrolling
- Auto-fit column widths

### Use Cases
- Data analysis in Excel
- Create custom reports
- Import into other software
- Backup student data
- Share with accountant/admin

## vCard Export

### Contents
vCard includes appropriate contact information fields (not screen columns):

For each student:
- Name (first, last)
- Email address
- Phone numbers (mobile, home, work)
- Address (if available)
- Birthday
- Organization (studio name)
- Notes

### Format Options
**Option A: Individual Files**
- One .vcf file per student
- Downloads as ZIP file containing all vCards
- Easy to import selectively

**Option B: Combined File**
- Single .vcf file with all students
- Bulk import into contacts
- Simpler for importing all at once

### Features
- Respects current filters
- All students or selected students only
- Standard vCard format (version 3.0 or 4.0)
- Compatible with all major contact apps

### Use Cases
- Import students into phone contacts
- Quick call/text from phone
- Share contact info with assistant
- Backup contact information

## Download Scope

### All Students
- Downloads all students in current view
- Respects active filters
- Ignores checkbox selection

### Selected Students Only
- Downloads only checked students
- Checkbox selection determines scope
- Option appears when students are selected

### Filtered Students
- Automatically uses current filter
- Only students matching filter criteria
- Filter indicator shown in download dialog

## File Naming

### PDF
- Format: `Students_[StudioName]_[Date].pdf`
- Example: `Students_Smith_Music_Studio_2024-01-15.pdf`

### Excel
- Format: `Students_[StudioName]_[Date].xlsx`
- Example: `Students_Smith_Music_Studio_2024-01-15.xlsx`

### vCard
- Individual: `StudentName.vcf` (in ZIP file)
- Combined: `Students_[StudioName]_[Date].vcf`

## Download Configuration

### PDF Options
- Orientation (Portrait/Landscape)
- Page size (Letter/A4)
- Include notes preview (Yes/No)

### Excel Options
- **Note**: Excel always exports visible columns from screen
- Include formatting (Yes/No)
- Freeze header row (Yes/No - default: Yes)

### vCard Options
- Individual files or combined
- Include birthday (Yes/No - default: Yes)
- Include notes (Yes/No - default: No)

## Business Rules

1. **Data Privacy**: Only download students tutor has access to
2. **Current View**: Export reflects current filters, sorting, selection
3. **File Size Limits**: Warn if export > 1000 students (large file)
4. **Format Appropriate**: Suggest format based on use case
5. **Audit Trail**: Downloads are logged (who, when, what format, how many students)

## Validations

- At least one student must be in current view/selection
- User must have download permissions
- File size warning for large exports (> 100 students for PDF)

## User Experience Features

### Download Preview
Before downloading:
- Show count of students to be included
- Show which columns will be included
- Estimated file size
- Preview first few rows

### Quick Export
- Download current view with defaults
- Recent export settings remembered
- Common configurations saved as presets

### Progress Indicator
- Progress bar for large exports
- Can cancel during generation
- Notification when ready

## Integration Points

- **Student Entity** - Primary data source
- **Contact Entity** - Contact information
- **Family Entity** - Family associations
- **PDF Generator** - Creates PDF files
- **Excel Library** - Creates XLSX files
- **vCard Library** - Creates VCF files

## Error Handling

### Generation Failures
- Clear error message
- Retry option
- Partial data not downloaded (all or nothing)

### File Size Warnings
- Warn if > 100 students for PDF
- Suggest Excel for large datasets
- Option to filter further before exporting

### Browser Compatibility
- Works in all modern browsers
- Fallback for older browsers
- Mobile download support

## Security Considerations

1. **Access Control**: Only authorized users can download
2. **Data Sensitivity**: Warn about protecting downloaded files
3. **Audit Logging**: All downloads logged
4. **File Encryption**: Option to password-protect Excel exports
5. **Temporary Files**: Server cleans up generated files after download

## Notes

- Downloads provide backup and external access to data
- **Excel exports are customizable**: Show/hide columns before downloading to control what's exported
- **PDF and vCard use predefined columns**: Column selection on screen doesn't affect these formats
- Excel exports most versatile for custom analysis and reporting
- PDF exports best for sharing/printing with standard format
- vCard exports useful for contact management
- To export specific columns in Excel: Configure column visibility first, then download
- Consider GDPR/privacy implications of downloading personal data
- Educate users about protecting downloaded files
- Regular exports can serve as backup strategy
