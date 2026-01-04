# Subject Entity

## Overview
The Subject entity represents any subject area, skill, or topic that teachers can teach and students can learn. This is used to match teachers with students and organize lesson content.

## Core Attributes

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Name | String | Yes | Subject name (e.g., "Mathematics", "English", "Science", "Piano", "Guitar", "SAT Prep") |
| Is Active | Boolean | Yes | Whether the subject is active in the system (default: true) |

## Relationships

- **Teacher Subjects**: A subject can be taught by multiple teachers through TeacherSubject junction (many-to-many)
- **Student Subjects**: A subject can be studied by multiple students through StudentSubject junction (many-to-many)

## Business Rules

1. **Name Required**: Subject name must be provided
2. **Active Status**: Inactive subjects are retained for historical data but hidden from selection
3. **Multi-Use**: The same subject can be associated with multiple teachers and students
4. **Not Studio-Scoped**: Subjects are system-wide, not studio-specific (can be shared across studios)

## Validations

- Name is required and must not be empty
- Is Active must be a boolean value
- Name should be unique to avoid duplicate subjects

## Common Subject Examples

### Academic Subjects
- Mathematics (Algebra, Geometry, Calculus, etc.)
- English (Reading, Writing, Literature, etc.)
- Science (Biology, Chemistry, Physics, etc.)
- Foreign Languages (Spanish, French, Mandarin, etc.)
- Social Studies (History, Geography, etc.)

### Test Preparation
- SAT Prep
- ACT Prep
- GRE Prep
- GMAT Prep

### Music
- Piano
- Guitar
- Violin
- Voice
- Drums

### Other Skills
- Computer Programming
- Art
- Business/Finance
- Study Skills

## Notes

- Subjects represent any teachable skill or knowledge area
- Teachers specify which subjects they can teach via TeacherSubject junction
- Students specify which subjects they are learning via StudentSubject junction
- Teacher-Student matching can be based on subject compatibility
- Inactive subjects (Is Active = false) are preserved for historical records but not shown in selection lists
- Subjects are global/system-wide and can be reused across different studios in a multi-tenant setup
- Subject-specific pricing can be configured to reflect different market rates for different subjects
