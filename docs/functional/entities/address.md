# Address Entity

## Overview
The Address entity represents a physical address that can be associated with users, studios, schools, and locations. Addresses can be shared across multiple entities.

## Core Attributes

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Address Type | Reference | No | Reference to AddressType (Home, Work, Billing, etc.) |
| Street Line 1 | String | No | Primary street address |
| Street Line 2 | String | No | Apartment, suite, unit, building, floor, etc. |
| City | String | No | City name |
| State/Province | String | No | State, province, or region |
| Postal Code | String | No | Postal code or ZIP code |
| Country | Reference | No | Reference to Country entity |

## Relationships

- **AddressType**: An address may reference an AddressType (many-to-one, optional)
- **Country**: An address may reference a Country (many-to-one, optional)
- **Users**: An address can be associated with multiple Users (one-to-many)
- **Studios**: An address can be associated with multiple Studios (one-to-many)
- **Schools**: An address can be associated with multiple Schools (one-to-many)
- **Locations**: An address can be associated with multiple Locations (one-to-many)

## Business Rules

1. **Reusable Entity**: Addresses can be shared across multiple entities (e.g., family members at same address)
2. **Flexible Structure**: All fields are optional to support international addresses and partial data
3. **Address Type Optional**: Address type provides categorization but is not required
4. **Country Standardization**: Country should reference Country entity for standardization

## Validations

- At least one address field should be populated if address record exists
- Postal Code format validation depends on country
- State/Province may be required depending on country

## Notes

- Address is a shared entity that can be reused across multiple contacts/entities
- Address Type allows categorization (Home, Work, Billing, Shipping, etc.)
- Country reference enables standardized country codes and names
- Flexible structure supports international addresses with varying formats
- Empty or partial addresses are allowed to accommodate incomplete data during initial data entry
