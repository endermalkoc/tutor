# Instrument Entity

## Overview
The Instrument entity represents a musical instrument or subject area that teachers can teach and students can learn. This is used to match teachers with students and organize lesson content.

## Core Attributes

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Name | String | Yes | Instrument or subject name (e.g., "Piano", "Guitar", "Violin", "Math", "English") |
| Is Active | Boolean | Yes | Whether the instrument is active in the system (default: true) |

## Relationships

- **Teacher Instruments**: An instrument can be taught by multiple teachers through TeacherInstrument junction (many-to-many)
- **Student Instruments**: An instrument can be studied by multiple students through StudentInstrument junction (many-to-many)

## Business Rules

1. **Name Required**: Instrument name must be provided
2. **Active Status**: Inactive instruments are retained for historical data but hidden from selection
3. **Multi-Use**: The same instrument can be associated with multiple teachers and students
4. **Not Studio-Scoped**: Instruments are system-wide, not studio-specific (can be shared across studios)

## Validations

- Name is required and must not be empty
- Is Active must be a boolean value
- Name should be unique to avoid duplicate instruments

## Notes

- Despite the name "Instrument", this entity can represent any subject area or skill being taught
- Common for music studios: Piano, Guitar, Violin, Drums, Voice, etc.
- Can also represent academic subjects: Math, English, Science, etc.
- Teachers specify which instruments they can teach via TeacherInstrument junction
- Students specify which instruments they are learning via StudentInstrument junction
- Teacher-Student matching can be based on instrument compatibility
- Inactive instruments (Is Active = false) are preserved for historical records but not shown in selection lists
- Instruments are global/system-wide and can be reused across different studios in a multi-tenant setup
