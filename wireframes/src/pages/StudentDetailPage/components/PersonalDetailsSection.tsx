import { useState } from 'react';
import {
  SectionCard,
  DataGrid,
  Badge,
  Input,
  Select,
  Option,
  FormGroup,
  FormLabel,
} from '../../../components/design-system';

export interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  type: 'child' | 'adult';
  status: 'active' | 'trial' | 'waiting' | 'lead' | 'inactive';
  gender?: 'male' | 'female' | 'other';
  birthday?: string; // ISO date string
  school?: string;
  referrer?: string;
  studentSince?: string; // Month/Year format: "2024-09"
}

export interface PersonalDetailsSectionProps {
  data: PersonalDetailsData;
  onSave?: (data: PersonalDetailsData) => void;
  className?: string;
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Trial' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'lead', label: 'Lead' },
  { value: 'inactive', label: 'Inactive' },
];

const GENDER_OPTIONS = [
  { value: '', label: 'Select...' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const statusVariantMap: Record<string, 'success' | 'indigo' | 'warning' | 'cyan' | 'default'> = {
  active: 'success',
  trial: 'indigo',
  waiting: 'warning',
  lead: 'cyan',
  inactive: 'default',
};

export function PersonalDetailsSection({ data, onSave, className = '' }: PersonalDetailsSectionProps) {
  const [editData, setEditData] = useState<PersonalDetailsData>(data);

  const handleSave = () => {
    onSave?.(editData);
  };

  const handleCancel = () => {
    setEditData(data);
  };

  // Format birthday for display
  const formatBirthday = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return `${date.toLocaleDateString('en-US', options)} (${age} years old)`;
  };

  // Format student since for display
  const formatStudentSince = (monthStr?: string) => {
    if (!monthStr) return null;
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get collapsed summary
  const getCollapsedSummary = () => {
    const parts = [];
    if (data.gender) {
      parts.push(data.gender.charAt(0).toUpperCase() + data.gender.slice(1));
    }
    if (data.birthday) {
      const date = new Date(data.birthday);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      parts.push(`${age} years old`);
    }
    if (data.school) {
      parts.push(data.school);
    }
    return parts.join(', ');
  };

  // View mode content
  const viewContent = (
    <DataGrid
      items={[
        {
          label: 'First Name',
          value: data.firstName,
        },
        {
          label: 'Last Name',
          value: data.lastName,
        },
        {
          label: 'Student Type',
          value: (
            <Badge variant="primary">
              {data.type === 'child' ? 'Child' : 'Adult'}
            </Badge>
          ),
        },
        {
          label: 'Status',
          value: (
            <Badge variant={statusVariantMap[data.status]}>
              {STATUS_OPTIONS.find(s => s.value === data.status)?.label || data.status}
            </Badge>
          ),
        },
        {
          label: 'Gender',
          value: data.gender
            ? GENDER_OPTIONS.find(g => g.value === data.gender)?.label
            : undefined,
          isEmpty: !data.gender,
        },
        {
          label: 'Birthday',
          value: formatBirthday(data.birthday),
          isEmpty: !data.birthday,
        },
        {
          label: 'School',
          value: data.school,
          isEmpty: !data.school,
        },
        {
          label: 'Referrer',
          value: data.referrer,
          isEmpty: !data.referrer,
        },
        {
          label: 'Student Since',
          value: formatStudentSince(data.studentSince),
          isEmpty: !data.studentSince,
        },
      ]}
    />
  );

  // Edit mode content
  const editContent = (
    <div className="personal-details-form">
      <div className="form-grid">
        <FormGroup>
          <FormLabel required>First Name</FormLabel>
          <Input
            value={editData.firstName}
            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel required>Last Name</FormLabel>
          <Input
            value={editData.lastName}
            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel required>Student Type</FormLabel>
          <Select
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value as 'child' | 'adult' })}
          >
            <Option value="child">Child</Option>
            <Option value="adult">Adult</Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel required>Status</FormLabel>
          <Select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value as PersonalDetailsData['status'] })}
          >
            {STATUS_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Gender</FormLabel>
          <Select
            value={editData.gender || ''}
            onChange={(e) => setEditData({ ...editData, gender: e.target.value as PersonalDetailsData['gender'] || undefined })}
          >
            {GENDER_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Birthday</FormLabel>
          <Input
            type="date"
            value={editData.birthday || ''}
            onChange={(e) => setEditData({ ...editData, birthday: e.target.value || undefined })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>School</FormLabel>
          <Input
            value={editData.school || ''}
            onChange={(e) => setEditData({ ...editData, school: e.target.value || undefined })}
            placeholder="Enter school name"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Referrer</FormLabel>
          <Input
            value={editData.referrer || ''}
            onChange={(e) => setEditData({ ...editData, referrer: e.target.value || undefined })}
            placeholder="Enter referrer name"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Student Since</FormLabel>
          <Input
            type="month"
            value={editData.studentSince || ''}
            onChange={(e) => setEditData({ ...editData, studentSince: e.target.value || undefined })}
          />
        </FormGroup>
      </div>
    </div>
  );

  return (
    <SectionCard
      title="Personal Details"
      variant="secondary"
      collapsible
      defaultCollapsed
      collapsedSummary={getCollapsedSummary()}
      editable
      onSave={handleSave}
      onCancel={handleCancel}
      editContent={editContent}
      className={className}
    >
      {viewContent}
    </SectionCard>
  );
}
