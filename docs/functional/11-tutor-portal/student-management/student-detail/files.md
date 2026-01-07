# Student Detail - Files Tab

## Purpose

The Files tab manages all attachments and documents associated with the student, including assessments, certificates, contracts, photos, and other relevant files.

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ACTIONS & VIEW                                                  │
│ [+ Upload Files]                       [Grid View] [List View]  │
├─────────────────────────────────────────────────────────────────┤
│ FILTERS & SEARCH                                                │
│ [Type ▼] [Date Range ▼] [Search files...]                       │
├─────────────────────────────────────────────────────────────────┤
│ STORAGE USAGE                                                   │
│ Using 45 MB of 100 MB                    ████████░░░░░░░ 45%    │
├─────────────────────────────────────────────────────────────────┤
│ FILES                                                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Grid View:                                                  │ │
│ │ ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐             │ │
│ │ │  📄    │  │  🖼️    │  │  📄    │  │  📁    │             │ │
│ │ │Assessment│ │ Photo  │  │Contract│  │Progress│             │ │
│ │ │ .pdf   │  │ .jpg   │  │ .pdf   │  │Report.pdf            │ │
│ │ └────────┘  └────────┘  └────────┘  └────────┘             │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PAGINATION (if many files)                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## View Modes

### Grid View (Default)

Files displayed as cards with:
- File type icon or thumbnail (for images)
- File name (truncated if long)
- File size
- Upload date on hover
- Selection checkbox

### List View

Files displayed in table format:

| Column | Description | Sortable |
|--------|-------------|----------|
| | Checkbox for selection | No |
| Icon | File type icon | No |
| Name | File name | Yes |
| Type | File type/category | Yes |
| Size | File size | Yes |
| Uploaded | Upload date | Yes (default, descending) |
| Uploaded By | Who uploaded | Yes |
| Actions | Row actions | No |

---

## Filters

### Type Filter

| Option | Description |
|--------|-------------|
| All Files | All file types (default) |
| Documents | PDF, DOC, DOCX, TXT |
| Images | JPG, PNG, GIF, etc. |
| Spreadsheets | XLS, XLSX, CSV |
| Other | All other types |

### Category Filter (Custom Tags)

| Category | Description |
|----------|-------------|
| Assessment | Initial assessments, evaluations |
| Progress Report | Progress reports, updates |
| Certificate | Certificates earned |
| Contract | Agreements, contracts |
| Photo | Student photos |
| General | Uncategorized files |

### Date Range Filter

| Option | Description |
|--------|-------------|
| All Time | No date filtering |
| This Month | Current month uploads |
| Last 3 Months | Recent uploads |
| This Year | Current year |
| Custom | Date picker |

### Search

- Searches file names
- Real-time filtering

---

## Storage Usage

Shows current storage consumption:

| Element | Description |
|---------|-------------|
| Progress Bar | Visual indication of usage |
| Used | Current storage used |
| Limit | Storage limit (per student or account) |
| Percentage | Usage percentage |

Warning displayed when approaching limit (>80%).

---

## Upload Files

User clicks "+ Upload Files":

### Upload Interface

| Feature | Description |
|---------|-------------|
| Drag & Drop Zone | Large drop target |
| Browse Button | Opens file picker |
| Multi-file | Select multiple files |
| Progress | Upload progress per file |

### Upload Options

| Field | Type | Description |
|-------|------|-------------|
| Category | Select | File category |
| Description | Text | Optional description |
| Private | Checkbox | Visible to tutor only |

### Upload Constraints

| Constraint | Value |
|------------|-------|
| Max File Size | 25 MB per file |
| Max Files | 10 files per upload |
| Allowed Types | PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF, TXT, CSV |
| Blocked Types | EXE, BAT, SH, JS (executable files) |

### Upload Progress

- Per-file progress bar
- Cancel individual uploads
- Error handling for failed uploads
- Success confirmation

---

## File Actions

### Single File Actions

| Action | Description |
|--------|-------------|
| Download | Download file to device |
| Preview | Open preview (for supported types) |
| Rename | Change file name |
| Edit Details | Modify category, description |
| Share | Generate shareable link |
| Delete | Remove file (with confirmation) |

### Bulk Actions

When multiple files selected:

| Action | Description |
|--------|-------------|
| Download | Download as ZIP |
| Move | Change category |
| Delete | Remove selected files |

---

## File Preview

Supported preview types:

| Type | Preview |
|------|---------|
| Images | In-browser image viewer |
| PDF | In-browser PDF viewer |
| Text | Plain text display |
| Documents | Limited preview or download prompt |

Preview panel includes:
- Full file name
- File details (size, date, uploader)
- Download button
- Navigation to prev/next file
- Close button

---

## File Details Panel

When viewing file details:

| Field | Description |
|-------|-------------|
| Name | File name (editable) |
| Category | File category (editable) |
| Description | Optional description (editable) |
| Size | File size |
| Type | MIME type |
| Uploaded | Date and time |
| Uploaded By | Who uploaded the file |
| Last Modified | If file was renamed/updated |
| Private | Visibility setting |

### Actions in Detail Panel

| Action | Behavior |
|--------|----------|
| Save | Save changes to details |
| Download | Download file |
| Delete | Remove file |
| Close | Close panel |

---

## Share File

Generate shareable link for a file:

### Share Options

| Field | Type | Description |
|-------|------|-------------|
| Link Type | Select | View only or Download |
| Expiration | Select | 1 day, 7 days, 30 days, Never |
| Password | Toggle | Optional password protection |

### Share Output

- Generated link
- Copy button
- Send via email option
- Revoke link option

---

## Empty State

If no files exist:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    📁                                           │
│                                                                 │
│              No files uploaded yet                              │
│                                                                 │
│       Upload assessments, progress reports, photos,             │
│           and other documents for this student.                 │
│                                                                 │
│              [+ Upload First File]                              │
│                                                                 │
│           Drag and drop files here, or click to browse          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Privacy & Visibility

### File Visibility

| Setting | Description |
|---------|-------------|
| Private | Only visible to tutor |
| Shared | Visible to student/family in their portal |

### Default Visibility

- New uploads default to Private
- Tutor can change visibility per file

---

## File Organization

### Folders (Optional Enhancement)

If folder organization is supported:
- Create folders
- Move files between folders
- Nested folder structure
- Breadcrumb navigation within folders

### Sorting

| Sort Option | Description |
|-------------|-------------|
| Name (A-Z) | Alphabetical ascending |
| Name (Z-A) | Alphabetical descending |
| Newest First | Most recent upload |
| Oldest First | Oldest upload |
| Largest First | Biggest files |
| Smallest First | Smallest files |

---

## Error Handling

### Upload Errors

| Error | Message |
|-------|---------|
| File too large | "File exceeds 25 MB limit" |
| Invalid type | "File type not allowed" |
| Storage full | "Storage limit reached" |
| Network error | "Upload failed. Retry?" |

### Access Errors

| Error | Message |
|-------|---------|
| File not found | "File no longer exists" |
| Download failed | "Download failed. Retry?" |

---

## Pagination

- Grid: 20 files per page
- List: 25 files per page
- Maintains filter/sort state

---

## Accessibility

- Grid items keyboard navigable
- File type indicated by icon + text
- Upload progress announced
- Preview modal keyboard accessible
- Delete confirmations require explicit action
- Alt text for image thumbnails
