# School Entity

## Overview
The School entity represents an educational institution that students attend. Schools are tracked within a Studio for reference and organizational purposes.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Studio | Reference | Yes | Reference to Studio |
| Name | String | Yes | School name |
| Address | Reference | No | Reference to Address entity |
| Website | String | No | School website URL |
| Is Active | Boolean | Yes | Whether the school is active in the system (default: true) |

## Relationships

- **Studio**: A school belongs to a Studio (many-to-one, required)
- **Address**: A school may reference an Address (many-to-one, optional)
- **Phones**: A school can have multiple Phones through SchoolPhone junction table (one-to-many)
- **Students**: A school can have multiple Students (one-to-many)

## Business Rules

1. **Studio Required**: Every school must belong to a studio
2. **Name Required**: School name must be provided
3. **Active Status**: Inactive schools are retained for historical data but hidden from new student forms
4. **Shared Address**: Multiple schools can share the same address if needed

## Validations

- Studio reference is required
- Name is required and must not be empty
- Website must be valid URL format if provided
- Is Active must be a boolean value

## Notes

- Schools are tracked for informational purposes and student organization
- Students can optionally specify which school they attend
- School information helps tutors understand student context and scheduling constraints
- Inactive schools (Is Active = false) are preserved for historical records but not shown in dropdowns
- School phones are managed through the SchoolPhone junction table
- Address is optional - not all schools may have address information on file
