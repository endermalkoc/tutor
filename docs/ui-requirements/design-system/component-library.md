# Component Library

**Last Updated**: 2026-01-04
**Design Theme**: Modern Minimalist

## Overview

This component library defines the reusable UI components for the tutor management application. All components follow the minimalist design philosophy: clean, functional, and unobtrusive.

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
```

### Headings

#### Page Title (H1)
- **Size**: 32px
- **Weight**: 300 (light)
- **Color**: white (on colored backgrounds)
- **Letter Spacing**: -0.5px
- **Usage**: Main page headers

#### Section Title (H2)
- **Size**: 20px
- **Weight**: 600 (semibold)
- **Color**: `#0f172a`
- **Letter Spacing**: -0.3px
- **Border Bottom**: 2px solid `#f1f5f9`
- **Padding Bottom**: 12px
- **Margin Bottom**: 24px
- **Usage**: Section headings within forms and pages

#### Subsection Title (H3)
- **Size**: 15px
- **Weight**: 600 (semibold)
- **Color**: Contextual (e.g., `#92400e` for warnings)
- **Usage**: Subsection headings, modal titles

### Body Text
- **Size**: 15px
- **Weight**: 400 (normal)
- **Color**: `#1e293b`
- **Line Height**: 1.6

### Labels
- **Size**: 13px
- **Weight**: 500 (medium)
- **Color**: `#475569`
- **Letter Spacing**: 0.01em
- **Margin Bottom**: 8px

### Help Text
- **Size**: 12px
- **Weight**: 400 (normal)
- **Color**: `#64748b`
- **Margin Top**: 6px

### Required Indicator
- **Symbol**: ` *`
- **Color**: `#ef4444`
- **Weight**: 600
- **Position**: After label text

---

## Form Elements

### Text Input

#### Default State
```css
padding: 14px 16px;
border: 1.5px solid #e2e8f0;
border-radius: 12px;
font-size: 15px;
background: #fafafa;
color: #1e293b;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Hover State
```css
border-color: #cbd5e1;
background: white;
```

#### Focus State
```css
outline: none;
border-color: #0ea5e9;
background: white;
box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
transform: translateY(-1px);
```

#### Error State
```css
border-color: #f87171;
background: #fef2f2;
```

#### Placeholder
```css
color: #94a3b8;
```

**Variants**:
- Standard text input
- Email input (with `inputmode="email"`)
- Tel input (with `inputmode="tel"`)
- Number input (with `inputmode="numeric"`)
- Date input

---

### Textarea

Inherits all text input styles with:
```css
resize: vertical;
min-height: 100px;
```

---

### Select Dropdown

Inherits all text input styles.

```css
padding: 14px 16px;
border: 1.5px solid #e2e8f0;
border-radius: 12px;
font-size: 15px;
background: #fafafa;
```

---

### Radio Buttons

#### Container
```css
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-group.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}
```

#### Radio Option
```css
.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-height: 28px;
}
```

#### Radio Input
```css
width: 18px;
height: 18px;
accent-color: #0ea5e9;
cursor: pointer;
```

#### Label
```css
font-size: 15px;
font-weight: 400;
color: #334155;
cursor: pointer;
transition: color 0.2s;
```

#### Hover State
```css
label {
  color: #0ea5e9;
}
```

**Layout**:
- Vertical stacking by default
- Horizontal layout for compact options (add `.horizontal` class)
- Clean, minimal appearance with no borders or backgrounds
- Subtle color change on hover

---

### Checkboxes

#### Container
```css
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  min-height: 28px;
}
```

#### Checkbox Input
```css
width: 18px;
height: 18px;
accent-color: #0ea5e9;
cursor: pointer;
```

#### Label
```css
font-size: 15px;
font-weight: 400;
color: #334155;
cursor: pointer;
transition: color 0.2s;
```

#### Hover State
```css
label {
  color: #0ea5e9;
}
```

**Layout**:
- Clean, minimal appearance
- No borders or background framing
- Subtle label color change on hover

---

### Fieldset & Legend

```css
fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

legend {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 12px;
  letter-spacing: 0.01em;
}
```

---

### Listbox

Custom listbox component for selecting items from a scrollable list.

#### Container
```css
.listbox {
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fafafa;
  max-height: 240px;
  overflow-y: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Hover State
```css
.listbox:hover {
  border-color: #cbd5e1;
  background: white;
}
```

#### Focus State
```css
.listbox:focus {
  outline: none;
  border-color: #0ea5e9;
  background: white;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}
```

#### List Item
```css
.listbox-item {
  padding: 12px 16px;
  font-size: 15px;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f1f5f9;
}

.listbox-item:last-child {
  border-bottom: none;
}
```

#### Item Hover State
```css
.listbox-item:hover {
  background: #f8fafc;
  color: #0ea5e9;
  padding-left: 20px;
}
```

#### Selected Item
```css
.listbox-item.selected {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #0f172a;
  font-weight: 500;
  border-left: 3px solid #0ea5e9;
  padding-left: 13px;
}

.listbox-item.selected:hover {
  padding-left: 17px;
}
```

**Features**:
- Scrollable when content exceeds max-height (240px)
- Multi-select capability
- Keyboard accessible with arrow navigation
- Visual feedback on hover and selection
- Selected items highlighted with gradient background and left border
- Subtle slide animation on hover

**Accessibility**:
- Uses `role="listbox"` on container
- Uses `role="option"` on items
- `aria-selected` attribute for selected items
- `tabindex="0"` for keyboard focus
- Arrow keys for navigation
- Space/Enter to select

**Usage Example**:
```html
<div class="listbox" role="listbox" tabindex="0">
  <div class="listbox-item selected" role="option" aria-selected="true">
    Mathematics
  </div>
  <div class="listbox-item" role="option" aria-selected="false">
    Science
  </div>
  <div class="listbox-item" role="option" aria-selected="false">
    English
  </div>
</div>
```

---

## Buttons

### Primary Button

```css
padding: 16px 32px;
border-radius: 12px;
font-size: 15px;
font-weight: 600;
background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
color: white;
box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
border: none;
cursor: pointer;
min-height: 52px;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Hover State
```css
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4);
```

#### Active State
```css
transform: translateY(0);
```

#### Focus State
```css
outline: 2px solid #0ea5e9;
outline-offset: 2px;
```

#### Disabled State
```css
opacity: 0.5;
cursor: not-allowed;
```

#### Loading State
```css
/* Shows spinner icon */
<span class="spinner"></span> Creating Student...
```

---

### Secondary Button

```css
padding: 16px 32px;
border-radius: 12px;
font-size: 15px;
font-weight: 500;
background: white;
color: #64748b;
border: 1.5px solid #e2e8f0;
cursor: pointer;
min-height: 52px;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Hover State
```css
background: #f8fafc;
border-color: #cbd5e1;
transform: translateY(-2px);
```

#### Focus State
```css
outline: 2px solid #cbd5e1;
outline-offset: 2px;
```

---

### Toggle Button

Used for "Show More Fields" type interactions.

```css
background: white;
border: 1.5px solid #e2e8f0;
padding: 14px 20px;
border-radius: 10px;
font-size: 14px;
font-weight: 500;
color: #0ea5e9;
cursor: pointer;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Hover State
```css
background: #eff6ff;
border-color: #0ea5e9;
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
```

---

### Icon Button

Used for clear/close actions.

```css
background: white;
border: 1.5px solid #0ea5e9;
color: #0ea5e9;
padding: 10px 12px;
min-width: 40px;
min-height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
cursor: pointer;
transition: all 0.2s;
```

#### Hover State
```css
background: #0ea5e9;
color: white;
transform: scale(1.05);
```

---

## Special Components

### Search Input with Icon

```html
<div class="search-input-wrapper">
  <svg class="search-icon">...</svg>
  <input type="text" style="padding-left: 48px;">
</div>
```

```css
.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  transition: color 0.3s;
}

/* On focus */
.search-input-wrapper:has(input:focus) .search-icon {
  color: #0ea5e9;
}
```

---

### Autocomplete/Dropdown Results

```css
.results-container {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  max-height: 320px;
  overflow-y: auto;
  z-index: 100;
  animation: dropdownSlide 0.2s ease-out;
}

.result-section-header {
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
}

.result-item {
  padding: 14px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s;
}

.result-item:hover {
  background: #f8fafc;
  padding-left: 20px;
}

.result-item:last-child {
  border-bottom: none;
}
```

---

### Selected Item Display

Used to show selected family, tags, etc.

```css
.selected-item {
  padding: 16px 20px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: scaleIn 0.3s ease-out;
}

.selected-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-icon {
  color: #0ea5e9;
}
```

---

### Tag/Badge

```css
.tag {
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
  color: #92400e;
  border: 1.5px solid #fbbf24;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-left: 8px;
  vertical-align: middle;
}
```

---

### Keyboard Hint

```css
.keyboard-hint {
  display: inline-block;
  margin-left: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 400;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .keyboard-hint {
    display: none;
  }
}
```

---

### Spinner/Loading Indicator

```css
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Layout Components

### Container

```css
.container {
  max-width: 840px;
  margin: 0 auto;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: slideIn 0.4s ease-out;
}
```

---

### Header

```css
.header {
  padding: 48px 40px 32px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

/* Decorative element */
.header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}
```

---

### Form Section

```css
.section {
  margin-bottom: 48px;
}
```

---

### Form Row

```css
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-row.single {
  grid-template-columns: 1fr;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
```

---

### Form Group

```css
.form-group {
  display: flex;
  flex-direction: column;
}
```

---

### Actions Footer

```css
.actions {
  display: flex;
  gap: 16px;
  padding: 32px 40px;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column-reverse;
    padding: 24px;
  }
}
```

---

### Collapsible Section

```css
.toggle-section {
  margin: 32px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1.5px dashed #cbd5e1;
}

.hidden-fields {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hidden-fields.visible {
  max-height: 3000px;
  opacity: 1;
  transform: translateY(0);
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}
```

---

### Data Table

**Purpose**: Display student lists, lesson schedules, and other tabular data.

#### Table Container
```css
.table-container {
  width: 100%;
  overflow-x: auto;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: white;
}

table {
  width: 100%;
  border-collapse: collapse;
}
```

#### Table Header
```css
thead {
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

th {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

#### Table Body Rows
```css
tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s;
}

tbody tr:hover {
  background: #f8fafc;
}

tbody tr:last-child {
  border-bottom: none;
}
```

#### Table Cells
```css
td {
  padding: 16px 20px;
  font-size: 15px;
  color: #1e293b;
}
```

#### Row Actions
```css
.table-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.table-actions button {
  padding: 8px 12px;
  font-size: 13px;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.table-actions button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}
```

#### Status Badges (in table)
```css
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.active {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fbbf24;
}

.status-badge.inactive {
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #cbd5e1;
}
```

#### Empty State
```css
.table-empty {
  padding: 48px 20px;
  text-align: center;
  color: #64748b;
}

.table-empty-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: #cbd5e1;
}
```

**Usage Example**:
```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Subjects</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="avatar.jpg" class="avatar avatar-sm">
            <div>
              <div style="font-weight: 500;">John Doe</div>
              <div style="font-size: 13px; color: #64748b;">john@example.com</div>
            </div>
          </div>
        </td>
        <td>Mathematics, Science</td>
        <td><span class="status-badge active">Active</span></td>
        <td>
          <div class="table-actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Mobile Responsiveness**:
```css
@media (max-width: 768px) {
  .table-container {
    border-radius: 0;
  }

  /* Card-based layout for mobile */
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead {
    display: none;
  }

  tbody tr {
    margin-bottom: 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
  }

  td {
    padding: 8px 0;
    border-bottom: none;
  }

  td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #475569;
    display: block;
    font-size: 12px;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}
```

---

## Notification Components

### Validation Summary

```css
.validation-summary {
  display: none;
  margin: 24px 40px 0;
  padding: 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  animation: fadeIn 0.3s ease-out;
}

.validation-summary.visible {
  display: block;
}

.validation-summary-title {
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}

.validation-summary-list {
  list-style: none;
  padding-left: 0;
}

.validation-summary-list li {
  color: #b91c1c;
  font-size: 14px;
  margin-top: 6px;
  padding-left: 24px;
  position: relative;
}

.validation-summary-list li::before {
  content: "→";
  position: absolute;
  left: 8px;
  font-weight: bold;
}

.validation-summary-list a {
  color: #b91c1c;
  text-decoration: underline;
  cursor: pointer;
}
```

---

### Warning Message

```css
.warning-message {
  display: none;
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1.5px solid #fbbf24;
  border-radius: 12px;
  animation: shake 0.5s ease-out;
}

.warning-message.visible {
  display: block;
}

.warning-title {
  font-size: 15px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-content {
  font-size: 14px;
  color: #78350f;
  margin-bottom: 16px;
}
```

---

### Network Error Notification

```css
.network-error {
  display: none;
  position: fixed;
  top: 24px;
  right: 24px;
  max-width: 400px;
  padding: 20px;
  background: white;
  border: 1.5px solid #f87171;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  animation: slideInRight 0.3s ease-out;
}

.network-error.visible {
  display: block;
}

.network-error-title {
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}

.network-error-message {
  font-size: 13px;
  color: #991b1b;
  margin-bottom: 16px;
}
```

---

## Modal Components

### Modal Overlay

```css
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-out;
}

.modal.visible {
  display: flex;
}
```

---

### Modal Content

```css
.modal-content {
  background: white;
  padding: 48px;
  border-radius: 24px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  animation: modalSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content h2 {
  color: #059669;
  margin-bottom: 16px;
  font-size: 28px;
  font-weight: 600;
}

.modal-content p {
  color: #64748b;
  margin-bottom: 32px;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 32px 24px;
  }

  .modal-content h2 {
    font-size: 24px;
  }
}
```

---

## Animations

### Slide In (Container Entry)
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Shake (Warning Animation)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
```

### Float (Decorative Element)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
```

### Dropdown Slide
```css
@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Slide Down (Expandable Content)
```css
@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
}
```

### Modal Slide
```css
@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### Slide In Right (Notifications)
```css
@keyframes slideInRight {
  from {
    transform: translateX(120%);
  }
  to {
    transform: translateX(0);
  }
}
```

---

## Accessibility Features

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Focus Visible

All interactive elements include visible focus states with:
- 2px outline
- Appropriate outline offset
- Brand color or semantic color based on context

### ARIA Attributes

Components include appropriate ARIA attributes:
- `aria-label` for icon buttons
- `aria-describedby` for error messages and help text
- `aria-invalid` for error states
- `aria-required` for required fields
- `role` attributes for custom components
- `aria-expanded` for collapsible sections
- `aria-live` for dynamic content updates

---

## Responsive Behavior

### Breakpoints
- **Mobile**: `max-width: 768px`

### Mobile Adjustments
- Container loses border-radius (full width)
- Form rows become single column
- Actions stack vertically (reverse order)
- Reduced padding throughout
- Keyboard hints hidden
- Dropdowns may become bottom sheets
