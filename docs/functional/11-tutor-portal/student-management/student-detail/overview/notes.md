# Notes

Private tutor notes about the student. Not visible to students or families. This is a **Secondary Section**.

## Overview

Notes are organized as discrete entries rather than a single text block, allowing tutors to:
- Track observations chronologically
- Pin important context for quick reference
- Edit or delete individual entries
- Maintain a clear history of student progress

## View Mode

### Pinned Note (Optional)

| Element | Description |
|---------|-------------|
| Pin Icon | Visual indicator that note is pinned |
| Note Content | Key context about the student (learning style, preferences, important info) |
| Edit Button | Inline edit action |
| Unpin Action | Remove from pinned position (moves to regular notes) |

- Only one note can be pinned at a time
- Pinned note appears at the top, visually distinct
- If no pinned note exists, section is hidden

### Quick Add

| Element | Description |
|---------|-------------|
| Input Field | Placeholder: "Add a quick note..." |
| Add Button | Creates new note entry |

- Submit on Enter key or click "Add" button
- New notes appear at top of note list (newest first)
- Input clears after successful add
- Empty submissions are ignored

### Note Entries

| Element | Description |
|---------|-------------|
| Note Content | The note text (supports basic formatting) |
| Timestamp | Relative or absolute date (e.g., "Jan 6" or "2 days ago") |
| Edit Button | Inline edit icon, appears on hover |
| Delete Button | Trash icon, appears on hover |
| Pin Action | Available in overflow menu or on hover |

- Displayed newest first
- Each entry is independently editable
- Hover reveals action buttons
- Maximum display: 5 notes, with "Show all notes" link if more exist

## Interactions

### Adding a Note
1. User types in quick add input
2. User presses Enter or clicks Add
3. New note entry appears at top of list with current timestamp
4. Input field clears

### Editing a Note
1. User clicks edit button on a note
2. Note content becomes editable inline
3. User modifies text
4. User clicks Save or presses Escape to cancel
5. Timestamp updates to show "Edited"

### Deleting a Note
1. User clicks delete button on a note
2. Confirmation prompt appears: "Delete this note?"
3. User confirms or cancels
4. Note is removed from list

### Pinning a Note
1. User clicks pin action on a note
2. Note moves to pinned position at top
3. Previously pinned note (if any) becomes a regular note
4. Visual feedback confirms the pin

### Unpinning a Note
1. User clicks unpin on the pinned note
2. Note moves to regular notes list (sorted by date)
3. Pinned section becomes empty/hidden

## Empty State

- Message: "No notes yet"
- Prompt: "Add notes about learning style, goals, or important context"
- Quick add input remains visible

## Data Model

```
Note {
  id: UUID
  studentId: UUID
  content: String
  isPinned: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

## Keyboard Accessibility

| Key | Action |
|-----|--------|
| Enter | Submit quick add input |
| Escape | Cancel inline edit |
| Tab | Navigate between notes and actions |
