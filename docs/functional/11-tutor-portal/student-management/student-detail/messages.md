# Student Detail - Messages Tab

## Purpose

The Messages tab displays the complete communication history with the student and their family, including emails, SMS messages, and in-app messages.

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ FILTERS & ACTIONS                                               │
│ [Channel ▼] [Date Range ▼] [Search...]          [+ New Message] │
├─────────────────────────────────────────────────────────────────┤
│ MESSAGE THREADS                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ 📧 Re: Lesson Rescheduling              Jan 6, 2:30 PM  │ │ │
│ │ │ Sarah Smith (Mom)                                       │ │ │
│ │ │ "That works perfectly, thank you!"                      │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ 💬 Homework Question                    Jan 5, 4:15 PM  │ │ │
│ │ │ John Smith                                              │ │ │
│ │ │ "I'm stuck on problem 5, can you help?"                 │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │ ...                                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PAGINATION                                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Filters

### Channel Filter

| Option | Icon | Description |
|--------|------|-------------|
| All | — | All message types (default) |
| Email | 📧 | Email correspondence |
| SMS | 💬 | Text messages |
| In-App | 🔔 | Messages sent through the app |

### Date Range Filter

| Option | Description |
|--------|-------------|
| All Time | No date filtering |
| Today | Today's messages |
| This Week | Current week |
| This Month | Current month |
| Last 3 Months | Rolling 3-month window |
| Custom | Date picker for range |

### Search

- Searches message content and subject lines
- Real-time filtering
- Minimum 2 characters

---

## Message Thread List

### Thread Display

Each thread shows:

| Element | Description |
|---------|-------------|
| Channel Icon | Email, SMS, or In-App indicator |
| Subject/Title | Email subject or conversation topic |
| Participant | Who the message is with (student or guardian) |
| Preview | First line of most recent message |
| Timestamp | Date/time of last message |
| Unread Indicator | Badge for unread messages |

### Thread Grouping

- Messages grouped by conversation thread
- Replies to same email chain grouped together
- SMS conversations grouped by recipient

### Sort Order

- Most recent thread first (by last message timestamp)
- Unread threads optionally pinned to top

---

## New Message

User clicks "+ New Message" button:

### Compose Form

| Field | Type | Description |
|-------|------|-------------|
| To | Select | Student, Guardian(s), or All family contacts |
| Channel | Select | Email, SMS (if phone available), or In-App |
| Subject | Text input | Required for email, optional for SMS |
| Message | Textarea/Rich text | Message content |
| Attachments | File upload | For email only |

### Channel-Specific Behavior

**Email:**
- Subject line required
- Rich text formatting available
- Attachments supported
- Sent from tutor's configured email

**SMS:**
- Character count displayed (160 char segments)
- No attachments
- Sent to phone number marked as SMS-capable

**In-App:**
- Delivered to student/family portal
- Push notification if enabled
- Attachments supported

### Compose Actions

| Action | Behavior |
|--------|----------|
| Send | Sends message immediately |
| Save Draft | Saves for later (email only) |
| Cancel | Discards message |

---

## Thread Detail View

Clicking a thread opens the full conversation:

### Conversation View

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to Messages         Re: Lesson Rescheduling              │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ You                                     Jan 6, 10:00 AM     │ │
│ │ Hi Sarah, I need to reschedule Friday's lesson...           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Sarah Smith                             Jan 6, 2:30 PM      │ │
│ │ That works perfectly, thank you!                            │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ REPLY                                                           │
│ [Message input field...]                           [Send Reply] │
└─────────────────────────────────────────────────────────────────┘
```

### Message Bubbles

| Element | Description |
|---------|-------------|
| Sender | Name and optional avatar |
| Timestamp | Date and time sent |
| Content | Full message text |
| Status | Sent, Delivered, Read (where trackable) |
| Attachments | Downloadable files (if any) |

### Reply Interface

- Quick reply at bottom of thread
- Pre-filled recipient (same as thread)
- Same channel as thread
- Full compose options available via expand

---

## Message Actions

### Thread Actions

| Action | Description |
|--------|-------------|
| Reply | Open reply composer |
| Forward | Forward message (email only) |
| Archive | Move to archived messages |
| Delete | Remove thread (with confirmation) |

### Individual Message Actions

| Action | Description |
|--------|-------------|
| Copy | Copy message text |
| Forward | Forward single message |
| Delete | Remove single message |

---

## Automated Messages

System-generated messages displayed in thread:

| Type | Description |
|------|-------------|
| Lesson Reminder | Automated lesson reminders |
| Homework Assigned | Homework notification |
| Invoice Sent | Billing notifications |
| Payment Received | Payment confirmations |

Automated messages marked with "Automated" label.

---

## Empty State

If no messages exist:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    💬                                           │
│                                                                 │
│              No messages yet                                    │
│                                                                 │
│       Start a conversation with the student or family           │
│                                                                 │
│              [+ Send First Message]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recipients

### For Child Students

Available recipients include:
- Student (if has contact info)
- Primary Guardian
- Additional Guardians
- All Family Contacts (sends to all)

### For Adult Students

Available recipients:
- Student only

---

## Message Templates

Quick access to saved templates:

| Feature | Description |
|---------|-------------|
| Template Dropdown | Select from saved templates |
| Insert Template | Populates message with template content |
| Save as Template | Save current message as new template |

---

## Delivery Status

Track message delivery (where supported):

| Status | Description |
|--------|-------------|
| Sending | Message being sent |
| Sent | Message left tutor's system |
| Delivered | Message reached recipient's system |
| Read | Recipient opened message (email with tracking) |
| Failed | Delivery failed (with retry option) |

---

## Pagination

- Default: 25 threads per page
- Infinite scroll option for conversation view
- Load more for long threads

---

## Accessibility

- Thread list navigable via keyboard
- Messages properly labeled for screen readers
- Compose form fields have labels
- Send button clearly identified
- Status updates announced
