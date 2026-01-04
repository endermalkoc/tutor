# Event Entity

## Overview
The Event entity represents a tutoring session, appointment, or scheduled event. Events can be one-time occurrences or part of a recurring series. They can be associated with teachers, students, locations, and have various settings for booking, pricing, and visibility.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Studio | Reference | Yes | Reference to Studio |
| UID | String | Yes | Unique identifier for the event (for calendar integration) |
| Event Type | Reference | No | Reference to EventType (Lesson, Group Lesson, Vacation, etc.) |
| Category | Reference | No | Reference to Category for organization/color coding |

### Scheduling
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Start Time | DateTime | Yes | Event start date and time |
| Duration Minutes | Integer | Yes | Duration of the event in minutes |
| All Day | Boolean | Yes | Whether this is an all-day event (default: false) |
| Recurrence | Reference | No | Reference to Recurrence pattern if recurring |

### Participants
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Teacher | Reference | No | Reference to Teacher conducting the session |
| Substitute Teacher | Reference | No | Reference to substitute Teacher if regular teacher unavailable |
| Attendees | Junction | No | Students/users attending (via EventAttendee junction table) |
| Entire Studio | Boolean | Yes | Whether event applies to entire studio (default: false) |

### Location
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Location | Reference | No | Reference to Location entity |

### Booking & Visibility
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Is Public | Boolean | Yes | Whether event is publicly visible (default: false) |
| Allow Online Booking | Boolean | Yes | Whether students can book this slot online (default: false) |
| Is Booked | Boolean | Yes | Whether the event slot has been booked (default: false) |
| Requires Makeup Credit | Boolean | Yes | Whether booking requires a makeup credit (default: false) |

### Pricing
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Student Price | Decimal | No | Price charged to student for this session |
| Pricing Type | Reference | No | Reference to PricingType (hourly, per session, package, etc.) |

### Descriptions
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Public Description | Text | No | Description visible to students/parents |
| Show Public Description | Boolean | Yes | Whether to display public description (default: false) |
| Private Description | Text | No | Internal notes not visible to students/parents |

## Relationships

- **Studio**: An event belongs to a Studio (many-to-one, required)
- **EventType**: An event may reference an EventType (many-to-one, optional)
- **Teacher**: An event may have a Teacher (many-to-one, optional)
- **Substitute Teacher**: An event may have a substitute Teacher (many-to-one, optional)
- **Category**: An event may reference a Category (many-to-one, optional)
- **Location**: An event may have a Location (many-to-one, optional)
- **Recurrence**: An event may be part of a recurring series (many-to-one, optional)
- **Pricing Type**: An event may reference a PricingType (many-to-one, optional)
- **Attendees**: An event has multiple attendees via EventAttendee junction (many-to-many)
- **Exceptions**: An event can have multiple EventExceptions for schedule changes (one-to-many)
- **Attendance**: An event has attendance records for students (one-to-many)
- **Makeup Credits**: An event can generate makeup credits (one-to-many)
- **Lesson Notes**: An event can have lesson notes from teachers (one-to-many)

## Event Types

Common event types include:
- **Lesson** - Regular one-on-one tutoring session
- **Group Lesson** - Group tutoring session with multiple students
- **Vacation** - Scheduled break/vacation (not billable)
- **Recital/Performance** - Student performance event
- **Workshop** - Educational workshop or seminar
- **Administrative** - Administrative time block

## Business Rules

1. **UID Uniqueness**: UID must be unique across all events (used for calendar synchronization)
2. **Duration Validation**: Duration must be positive integer (typically 15, 30, 45, 60, 90, 120 minutes)
3. **Substitute Teacher**: Can only be set if primary Teacher is also set
4. **Online Booking**: Allow Online Booking can only be true for public events
5. **Makeup Credit**: If Requires Makeup Credit is true, students must have available credit to book
6. **Entire Studio Events**: If Entire Studio is true, individual attendees are not tracked
7. **Pricing**: Student Price should be set based on Pricing Type and duration
8. **Recurrence vs One-Time**: Events with Recurrence pattern are part of a series; null recurrence means one-time event

## Validations

- Studio reference is required
- UID is required and must be unique
- Start Time is required
- Duration Minutes is required and must be positive
- If Substitute Teacher is set, Teacher must also be set
- If Allow Online Booking is true, Is Public must be true
- Student Price must be >= 0 if provided

## Notes

- Events are the core scheduling entity in the system
- UID enables calendar integration (iCal, Google Calendar, etc.)
- Recurring events share a Recurrence record but each occurrence is a separate Event record
- Event Exceptions handle cancellations, rescheduling, and modifications to recurring events
- Public events can be displayed on tutor's website or booking page
- Private Description is for internal teacher notes and planning
- Makeup credits allow students to reschedule missed lessons
- Attendance tracking happens through the Attendance entity, linked to events
- Event pricing can override default student pricing based on session type
