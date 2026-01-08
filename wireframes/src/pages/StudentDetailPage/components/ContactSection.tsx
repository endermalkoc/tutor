import { useState } from 'react';
import {
  SectionCard,
  DataGrid,
  Input,
  Checkbox,
  Switch,
  FormGroup,
  FormLabel,
  Select,
  Option,
} from '../../../components/design-system';
import './ContactSection.css';

export interface ContactData {
  email?: string;
  phone?: string;
  smsCapable?: boolean;
  lastContacted?: string;
  // Address fields (for adult students only)
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  // Notification preferences
  emailReminders: boolean;
  smsReminders: boolean;
}

export interface ContactSectionProps {
  data: ContactData;
  isAdult?: boolean;
  onSave?: (data: ContactData) => void;
  className?: string;
}

const US_STATES = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'WA', label: 'Washington' },
];

export function ContactSection({ data, isAdult = false, onSave, className = '' }: ContactSectionProps) {
  const [editData, setEditData] = useState<ContactData>(data);

  const handleSave = () => {
    onSave?.(editData);
  };

  const handleCancel = () => {
    setEditData(data);
  };

  // Format address for display
  const formatAddress = (address?: ContactData['address']) => {
    if (!address) return null;
    const parts = [address.street, address.city, address.state, address.zipCode].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : null;
  };

  // Build view items
  const viewItems = [
    {
      label: 'Email',
      value: data.email ? (
        <a href={`mailto:${data.email}`}>{data.email}</a>
      ) : undefined,
      isEmpty: !data.email,
    },
    {
      label: 'Phone',
      value: data.phone ? (
        <a href={`tel:${data.phone}`}>{data.phone}</a>
      ) : undefined,
      isEmpty: !data.phone,
    },
    {
      label: 'SMS Capable',
      value: data.smsCapable ? 'Yes' : 'No',
    },
    {
      label: 'Last Contacted',
      value: data.lastContacted,
      isEmpty: !data.lastContacted,
    },
  ];

  // Add address for adult students
  if (isAdult) {
    const formattedAddress = formatAddress(data.address);
    viewItems.push({
      label: 'Address',
      value: formattedAddress || undefined,
      isEmpty: !formattedAddress,
      fullWidth: true,
    } as any);
  }

  // View mode content
  const viewContent = (
    <div className="contact-section-content">
      <DataGrid items={viewItems} columns={2} />
      <div className="notification-list">
        <div className="switch-wrapper">
          <Switch
            checked={data.emailReminders}
            onChange={(checked) => onSave?.({ ...data, emailReminders: checked })}
          />
          <span className="switch-label">Send email lesson reminders</span>
        </div>
        <div className="switch-wrapper">
          <Switch
            checked={data.smsReminders}
            onChange={(checked) => onSave?.({ ...data, smsReminders: checked })}
          />
          <span className="switch-label">Send SMS lesson reminders</span>
        </div>
      </div>
    </div>
  );

  // Edit mode content
  const editContent = (
    <div className="contact-section-form">
      <div className="form-grid">
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={editData.email || ''}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            placeholder="Enter email address"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Phone</FormLabel>
          <Input
            type="tel"
            value={editData.phone || ''}
            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
            placeholder="Enter phone number"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>SMS Capable</FormLabel>
          <Checkbox
            label="This phone can receive SMS"
            checked={editData.smsCapable || false}
            onChange={(e) => setEditData({ ...editData, smsCapable: e.target.checked })}
          />
        </FormGroup>
      </div>

      {isAdult && (
        <>
          <h5 className="form-subsection-title">Address</h5>
          <div className="form-grid">
            <FormGroup className="full-width">
              <FormLabel>Street Address</FormLabel>
              <Input
                value={editData.address?.street || ''}
                onChange={(e) => setEditData({
                  ...editData,
                  address: { ...editData.address, street: e.target.value },
                })}
                placeholder="Enter street address"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>City</FormLabel>
              <Input
                value={editData.address?.city || ''}
                onChange={(e) => setEditData({
                  ...editData,
                  address: { ...editData.address, city: e.target.value },
                })}
                placeholder="Enter city"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>State</FormLabel>
              <Select
                value={editData.address?.state || ''}
                onChange={(e) => setEditData({
                  ...editData,
                  address: { ...editData.address, state: e.target.value },
                })}
              >
                <Option value="">Select state...</Option>
                {US_STATES.map(state => (
                  <Option key={state.value} value={state.value}>{state.label}</Option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <FormLabel>Zip Code</FormLabel>
              <Input
                value={editData.address?.zipCode || ''}
                onChange={(e) => setEditData({
                  ...editData,
                  address: { ...editData.address, zipCode: e.target.value },
                })}
                placeholder="Enter zip code"
              />
            </FormGroup>
          </div>
        </>
      )}

      <div className="notification-list edit-mode">
        <div className="switch-wrapper">
          <Switch
            checked={editData.emailReminders}
            onChange={(checked) => setEditData({ ...editData, emailReminders: checked })}
          />
          <span className="switch-label">Send email lesson reminders</span>
        </div>
        <div className="switch-wrapper">
          <Switch
            checked={editData.smsReminders}
            onChange={(checked) => setEditData({ ...editData, smsReminders: checked })}
          />
          <span className="switch-label">Send SMS lesson reminders</span>
        </div>
      </div>
    </div>
  );

  return (
    <SectionCard
      title="Contact & Notifications"
      variant="secondary"
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
