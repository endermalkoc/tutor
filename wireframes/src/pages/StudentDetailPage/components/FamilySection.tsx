import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SectionCard,
  Button,
  Badge,
  Input,
  Select,
  Option,
  Checkbox,
  Textarea,
  FormGroup,
  FormLabel,
} from '../../../components/design-system';
import { GuardianCard, GuardianData } from './GuardianCard';
import './FamilySection.css';

export interface Sibling {
  id: string;
  name: string;
  status: 'active' | 'trial' | 'inactive';
}

export interface BillingInfo {
  lessonRate: number;
  creditBalance: number;
}

export interface FamilySectionProps {
  guardians: GuardianData[];
  siblings?: Sibling[];
  billingInfo?: BillingInfo;
  onGuardianEdit?: (guardian: GuardianData) => void;
  onGuardianAdd?: (guardian: Omit<GuardianData, 'id'>) => void;
  onGuardianDelete?: (guardianId: string) => void;
  onSetPrimaryGuardian?: (guardianId: string) => void;
  onToggleEmergency?: (guardianId: string) => void;
  className?: string;
}

const TITLES = [
  { value: '', label: 'Select...' },
  { value: 'mr', label: 'Mr.' },
  { value: 'mrs', label: 'Mrs.' },
  { value: 'ms', label: 'Ms.' },
  { value: 'dr', label: 'Dr.' },
  { value: 'prof', label: 'Prof.' },
];

const RELATIONSHIPS = [
  { value: '', label: 'Select relationship...' },
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'stepmother', label: 'Stepmother' },
  { value: 'stepfather', label: 'Stepfather' },
  { value: 'grandmother', label: 'Grandmother' },
  { value: 'grandfather', label: 'Grandfather' },
  { value: 'aunt', label: 'Aunt' },
  { value: 'uncle', label: 'Uncle' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'foster-parent', label: 'Foster Parent' },
  { value: 'other', label: 'Other' },
];

const US_STATES = [
  { value: '', label: 'Select state...' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
];

const emptyContact: Omit<GuardianData, 'id'> = {
  firstName: '',
  lastName: '',
  title: '',
  relationship: '',
  email: '',
  phones: [],
  address: {},
  isPrimary: false,
  isEmergency: false,
  receivesInvoices: false,
  emailReminders: false,
  smsReminders: false,
  privateNote: '',
};

export function FamilySection({
  guardians,
  siblings = [],
  billingInfo,
  onGuardianEdit,
  onGuardianAdd,
  onGuardianDelete,
  onSetPrimaryGuardian,
  onToggleEmergency,
  className = '',
}: FamilySectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState<Omit<GuardianData, 'id'>>(emptyContact);
  const [sameAsPrimary, setSameAsPrimary] = useState(true);

  // Get primary guardian's address for "same as primary" feature
  const primaryGuardian = guardians.find(g => g.isPrimary);
  const primaryAddress = primaryGuardian?.address;

  const handleAddContact = () => {
    onGuardianAdd?.(newContact);
    setNewContact(emptyContact);
    setShowAddForm(false);
  };

  const handleCancelAdd = () => {
    setNewContact(emptyContact);
    setShowAddForm(false);
  };

  const statusVariantMap: Record<string, 'success' | 'indigo' | 'default'> = {
    active: 'success',
    trial: 'indigo',
    inactive: 'default',
  };

  return (
    <SectionCard
      title="Family"
      variant="secondary"
      className={className}
    >
      <div className="family-section-content">
        {/* Guardian Cards */}
        {guardians.map(guardian => (
          <GuardianCard
            key={guardian.id}
            guardian={guardian}
            primaryAddress={primaryAddress}
            onEdit={onGuardianEdit}
            onSetPrimary={onSetPrimaryGuardian}
            onToggleEmergency={onToggleEmergency}
            onDelete={onGuardianDelete}
          />
        ))}

        {/* Add Contact Button / Form */}
        {!showAddForm ? (
          <button className="add-contact-btn" onClick={() => setShowAddForm(true)}>
            <i className="ph ph-plus" />
            Add Contact
          </button>
        ) : (
          <div className="add-contact-card">
            <div className="add-contact-header">
              <span className="add-contact-title">
                <i className="ph ph-user-plus" />
                New Contact
              </span>
            </div>
            <div className="form-grid">
              <FormGroup>
                <FormLabel required>First Name</FormLabel>
                <Input
                  value={newContact.firstName}
                  onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                  placeholder="Enter first name"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel required>Last Name</FormLabel>
                <Input
                  value={newContact.lastName}
                  onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                  placeholder="Enter last name"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Title</FormLabel>
                <Select
                  value={newContact.title || ''}
                  onChange={(e) => setNewContact({ ...newContact, title: e.target.value })}
                >
                  {TITLES.map(t => (
                    <Option key={t.value} value={t.value}>{t.label}</Option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <FormLabel>Relationship</FormLabel>
                <Select
                  value={newContact.relationship || ''}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                >
                  {RELATIONSHIPS.map(r => (
                    <Option key={r.value} value={r.value}>{r.label}</Option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup className="full-width">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={newContact.email || ''}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="Enter email address"
                />
                <span className="form-hint">At least email or mobile number is required</span>
              </FormGroup>
            </div>

            <h5 className="form-subsection-title">Phone Numbers</h5>
            <div className="form-grid">
              <FormGroup>
                <FormLabel>Mobile Number</FormLabel>
                <div className="phone-input-row">
                  <Input
                    type="tel"
                    value={newContact.phones.find(p => p.type === 'mobile')?.number || ''}
                    onChange={(e) => {
                      const phones = newContact.phones.filter(p => p.type !== 'mobile');
                      if (e.target.value) {
                        phones.push({ type: 'mobile', number: e.target.value, smsCapable: false });
                      }
                      setNewContact({ ...newContact, phones });
                    }}
                    placeholder="Enter mobile number"
                  />
                  <Checkbox
                    label="SMS Capable"
                    checked={newContact.phones.find(p => p.type === 'mobile')?.smsCapable || false}
                    onChange={(e) => {
                      const phones = newContact.phones.map(p =>
                        p.type === 'mobile' ? { ...p, smsCapable: e.target.checked } : p
                      );
                      setNewContact({ ...newContact, phones });
                    }}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel>Home Number</FormLabel>
                <Input
                  type="tel"
                  value={newContact.phones.find(p => p.type === 'home')?.number || ''}
                  onChange={(e) => {
                    const phones = newContact.phones.filter(p => p.type !== 'home');
                    if (e.target.value) {
                      phones.push({ type: 'home', number: e.target.value });
                    }
                    setNewContact({ ...newContact, phones });
                  }}
                  placeholder="Enter home number"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Work Number</FormLabel>
                <Input
                  type="tel"
                  value={newContact.phones.find(p => p.type === 'work')?.number || ''}
                  onChange={(e) => {
                    const phones = newContact.phones.filter(p => p.type !== 'work');
                    if (e.target.value) {
                      phones.push({ type: 'work', number: e.target.value });
                    }
                    setNewContact({ ...newContact, phones });
                  }}
                  placeholder="Enter work number"
                />
              </FormGroup>
            </div>

            <h5 className="form-subsection-title">Address</h5>
            <div className="form-group" style={{ marginBottom: 'var(--space-3)' }}>
              <Checkbox
                label="Same as primary contact"
                checked={sameAsPrimary}
                onChange={(e) => {
                  setSameAsPrimary(e.target.checked);
                  if (e.target.checked && primaryAddress) {
                    setNewContact({ ...newContact, address: { ...primaryAddress } });
                  }
                }}
              />
            </div>
            {!sameAsPrimary && (
              <div className="form-grid">
                <FormGroup className="full-width">
                  <FormLabel>Street Address</FormLabel>
                  <Input
                    value={newContact.address?.street || ''}
                    onChange={(e) => setNewContact({
                      ...newContact,
                      address: { ...newContact.address, street: e.target.value },
                    })}
                    placeholder="Enter street address"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>City</FormLabel>
                  <Input
                    value={newContact.address?.city || ''}
                    onChange={(e) => setNewContact({
                      ...newContact,
                      address: { ...newContact.address, city: e.target.value },
                    })}
                    placeholder="Enter city"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>State</FormLabel>
                  <Select
                    value={newContact.address?.state || ''}
                    onChange={(e) => setNewContact({
                      ...newContact,
                      address: { ...newContact.address, state: e.target.value },
                    })}
                  >
                    {US_STATES.map(s => (
                      <Option key={s.value} value={s.value}>{s.label}</Option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Zip Code</FormLabel>
                  <Input
                    value={newContact.address?.zipCode || ''}
                    onChange={(e) => setNewContact({
                      ...newContact,
                      address: { ...newContact.address, zipCode: e.target.value },
                    })}
                    placeholder="Enter zip"
                  />
                </FormGroup>
              </div>
            )}

            <h5 className="form-subsection-title">Preferences</h5>
            <div className="form-grid">
              <FormGroup>
                <Checkbox
                  label="Set as Primary Contact"
                  checked={newContact.isPrimary}
                  onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  label="Emergency Contact"
                  checked={newContact.isEmergency}
                  onChange={(e) => setNewContact({ ...newContact, isEmergency: e.target.checked })}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  label="Should Receive Invoices"
                  checked={newContact.receivesInvoices}
                  onChange={(e) => setNewContact({ ...newContact, receivesInvoices: e.target.checked })}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  label="Send Email Reminders"
                  checked={newContact.emailReminders}
                  onChange={(e) => setNewContact({ ...newContact, emailReminders: e.target.checked })}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox
                  label="Send SMS Reminders"
                  checked={newContact.smsReminders}
                  onChange={(e) => setNewContact({ ...newContact, smsReminders: e.target.checked })}
                />
              </FormGroup>
            </div>

            <h5 className="form-subsection-title">Private Note</h5>
            <FormGroup>
              <Textarea
                value={newContact.privateNote || ''}
                onChange={(e) => setNewContact({ ...newContact, privateNote: e.target.value })}
                placeholder="Add a private note about this contact (only visible to you)..."
                rows={2}
              />
              <span className="form-hint">
                <i className="ph ph-lock" />
                This note is private and not visible to the contact.
              </span>
            </FormGroup>

            <div className="form-actions">
              <Button variant="secondary" onClick={handleCancelAdd}>Cancel</Button>
              <Button variant="primary" onClick={handleAddContact}>Add Contact</Button>
            </div>
          </div>
        )}

        {/* Siblings Section */}
        {siblings.length > 0 && (
          <div className="siblings-section">
            <div className="siblings-title">Other Students in Family</div>
            {siblings.map(sibling => (
              <div key={sibling.id} className="sibling-item">
                <Link to={`/students/${sibling.id}`} className="sibling-name">
                  {sibling.name}
                </Link>
                <Badge variant={statusVariantMap[sibling.status]}>
                  {sibling.status.charAt(0).toUpperCase() + sibling.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Billing Indicator */}
        {billingInfo && (
          <div className="billing-indicator">
            <div className="billing-summary">
              <span className="billing-rate">${billingInfo.lessonRate}/lesson</span>
              <span className="billing-divider">·</span>
              <span className={`billing-balance ${billingInfo.creditBalance >= 0 ? 'positive' : 'negative'}`}>
                ${Math.abs(billingInfo.creditBalance)} {billingInfo.creditBalance >= 0 ? 'credit' : 'owed'}
              </span>
              <span className="billing-divider">·</span>
              <Link to="/students/1/invoices" className="billing-link">
                View billing
                <i className="ph ph-arrow-right" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
