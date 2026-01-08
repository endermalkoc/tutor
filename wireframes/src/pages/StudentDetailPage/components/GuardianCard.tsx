import { useState, useRef, useEffect } from 'react';
import {
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
import './GuardianCard.css';

export interface PhoneNumber {
  type: 'mobile' | 'home' | 'work';
  number: string;
  smsCapable?: boolean;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface GuardianData {
  id: string;
  title?: string;
  firstName: string;
  lastName: string;
  relationship?: string;
  email?: string;
  phones: PhoneNumber[];
  address?: Address;
  isPrimary: boolean;
  isEmergency: boolean;
  receivesInvoices: boolean;
  emailReminders: boolean;
  smsReminders: boolean;
  privateNote?: string;
}

export interface GuardianCardProps {
  guardian: GuardianData;
  primaryAddress?: Address;
  onEdit?: (guardian: GuardianData) => void;
  onSetPrimary?: (guardianId: string) => void;
  onToggleEmergency?: (guardianId: string) => void;
  onDelete?: (guardianId: string) => void;
  onCall?: (phone: string) => void;
  onEmail?: (email: string) => void;
  onMessage?: (guardianId: string) => void;
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
  { value: '', label: 'Select...' },
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
  { value: '', label: 'Select...' },
  { value: 'CA', label: 'CA' },
  { value: 'NY', label: 'NY' },
  { value: 'TX', label: 'TX' },
  { value: 'FL', label: 'FL' },
];

export function GuardianCard({
  guardian,
  primaryAddress,
  onEdit,
  onSetPrimary,
  onToggleEmergency,
  onDelete,
  onCall,
  onEmail,
  onMessage,
  className = '',
}: GuardianCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editData, setEditData] = useState<GuardianData>(guardian);
  const [sameAsPrimary, setSameAsPrimary] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get display name
  const displayName = `${guardian.title ? TITLES.find(t => t.value === guardian.title)?.label + ' ' : ''}${guardian.firstName} ${guardian.lastName}`;

  // Get relationship label
  const relationshipLabel = RELATIONSHIPS.find(r => r.value === guardian.relationship)?.label || guardian.relationship;

  // Get primary phone (mobile preferred)
  const primaryPhone = guardian.phones.find(p => p.type === 'mobile') || guardian.phones[0];

  // Get phone icon
  const getPhoneIcon = (type: string) => {
    switch (type) {
      case 'mobile': return 'ph-device-mobile';
      case 'home': return 'ph-house';
      case 'work': return 'ph-briefcase';
      default: return 'ph-phone';
    }
  };

  // Format address
  const formatAddress = (addr?: Address, compareWith?: Address) => {
    if (!addr) return null;
    const parts = [addr.street, addr.city, addr.state, addr.zipCode].filter(Boolean);
    if (parts.length === 0) return null;

    // Check if same as primary
    let suffix = '';
    if (compareWith &&
        addr.street === compareWith.street &&
        addr.city === compareWith.city &&
        addr.state === compareWith.state &&
        addr.zipCode === compareWith.zipCode) {
      suffix = ` (same as ${guardian.isPrimary ? '' : 'primary'})`;
    }

    return parts.join(', ') + suffix;
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    onEdit?.(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(guardian);
    setIsEditing(false);
  };

  const cardClasses = [
    'guardian-card',
    guardian.isPrimary && 'guardian-card--primary',
    isEditing && 'guardian-card--editing',
    className,
  ].filter(Boolean).join(' ');

  if (isEditing) {
    return (
      <div className={cardClasses}>
        <div className="guardian-edit-form">
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
              <FormLabel>Title</FormLabel>
              <Select
                value={editData.title || ''}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              >
                {TITLES.map(t => (
                  <Option key={t.value} value={t.value}>{t.label}</Option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <FormLabel>Relationship</FormLabel>
              <Select
                value={editData.relationship || ''}
                onChange={(e) => setEditData({ ...editData, relationship: e.target.value })}
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
                value={editData.email || ''}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </FormGroup>
          </div>

          <h5 className="form-subsection-title">Phone Numbers</h5>
          <div className="form-grid">
            <FormGroup>
              <FormLabel>Mobile Number</FormLabel>
              <div className="phone-input-row">
                <Input
                  type="tel"
                  value={editData.phones.find(p => p.type === 'mobile')?.number || ''}
                  onChange={(e) => {
                    const phones = editData.phones.filter(p => p.type !== 'mobile');
                    if (e.target.value) {
                      phones.push({ type: 'mobile', number: e.target.value, smsCapable: true });
                    }
                    setEditData({ ...editData, phones });
                  }}
                  placeholder="Enter mobile number"
                />
                <Checkbox
                  label="SMS Capable"
                  checked={editData.phones.find(p => p.type === 'mobile')?.smsCapable || false}
                  onChange={(e) => {
                    const phones = editData.phones.map(p =>
                      p.type === 'mobile' ? { ...p, smsCapable: e.target.checked } : p
                    );
                    setEditData({ ...editData, phones });
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <FormLabel>Home Number</FormLabel>
              <Input
                type="tel"
                value={editData.phones.find(p => p.type === 'home')?.number || ''}
                onChange={(e) => {
                  const phones = editData.phones.filter(p => p.type !== 'home');
                  if (e.target.value) {
                    phones.push({ type: 'home', number: e.target.value });
                  }
                  setEditData({ ...editData, phones });
                }}
                placeholder="Enter home number"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Work Number</FormLabel>
              <Input
                type="tel"
                value={editData.phones.find(p => p.type === 'work')?.number || ''}
                onChange={(e) => {
                  const phones = editData.phones.filter(p => p.type !== 'work');
                  if (e.target.value) {
                    phones.push({ type: 'work', number: e.target.value });
                  }
                  setEditData({ ...editData, phones });
                }}
                placeholder="Enter work number"
              />
            </FormGroup>
          </div>

          <h5 className="form-subsection-title">Address</h5>
          {!guardian.isPrimary && primaryAddress && (
            <div className="form-group" style={{ marginBottom: 'var(--space-3)' }}>
              <Checkbox
                label="Same as primary contact"
                checked={sameAsPrimary}
                onChange={(e) => {
                  setSameAsPrimary(e.target.checked);
                  if (e.target.checked && primaryAddress) {
                    setEditData({ ...editData, address: { ...primaryAddress } });
                  }
                }}
              />
            </div>
          )}
          {(!sameAsPrimary || guardian.isPrimary) && (
            <div className="form-grid">
              <FormGroup className="full-width">
                <FormLabel>Street</FormLabel>
                <Input
                  value={editData.address?.street || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    address: { ...editData.address, street: e.target.value },
                  })}
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
                  {US_STATES.map(s => (
                    <Option key={s.value} value={s.value}>{s.label}</Option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <FormLabel>Zip</FormLabel>
                <Input
                  value={editData.address?.zipCode || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    address: { ...editData.address, zipCode: e.target.value },
                  })}
                />
              </FormGroup>
            </div>
          )}

          <h5 className="form-subsection-title">Preferences</h5>
          <div className="form-grid">
            {!guardian.isPrimary && (
              <FormGroup>
                <Checkbox
                  label="Set as Primary Contact"
                  checked={editData.isPrimary}
                  onChange={(e) => setEditData({ ...editData, isPrimary: e.target.checked })}
                />
              </FormGroup>
            )}
            <FormGroup>
              <Checkbox
                label="Emergency Contact"
                checked={editData.isEmergency}
                onChange={(e) => setEditData({ ...editData, isEmergency: e.target.checked })}
              />
            </FormGroup>
            <FormGroup>
              <Checkbox
                label="Should Receive Invoices"
                checked={editData.receivesInvoices}
                onChange={(e) => setEditData({ ...editData, receivesInvoices: e.target.checked })}
              />
            </FormGroup>
            <FormGroup>
              <Checkbox
                label="Send Email Reminders"
                checked={editData.emailReminders}
                onChange={(e) => setEditData({ ...editData, emailReminders: e.target.checked })}
              />
            </FormGroup>
            <FormGroup>
              <Checkbox
                label="Send SMS Reminders"
                checked={editData.smsReminders}
                onChange={(e) => setEditData({ ...editData, smsReminders: e.target.checked })}
              />
            </FormGroup>
          </div>

          <h5 className="form-subsection-title">Private Note</h5>
          <FormGroup>
            <Textarea
              value={editData.privateNote || ''}
              onChange={(e) => setEditData({ ...editData, privateNote: e.target.value })}
              placeholder="Add a private note about this contact (only visible to you)..."
              rows={2}
            />
            <span className="form-hint">
              <i className="ph ph-lock" />
              This note is private and not visible to the contact.
            </span>
          </FormGroup>

          <div className="form-actions">
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      <div className="guardian-view-mode">
        <div className="guardian-header">
          <span className="guardian-name">{displayName}</span>
          <span className="guardian-role">
            {guardian.isPrimary ? 'Primary Contact' : 'Contact'}
            {relationshipLabel ? ` · ${relationshipLabel}` : ''}
          </span>
          {guardian.isEmergency && (
            <Badge variant="error" className="emergency-badge">
              <i className="ph ph-first-aid-kit" />
              Emergency
            </Badge>
          )}

          {!guardian.isPrimary && (
            <div className="contact-menu-wrapper" ref={menuRef}>
              <button
                className="contact-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="More options"
              >
                <i className="ph ph-dots-three-vertical" />
              </button>
              {menuOpen && (
                <div className="contact-menu">
                  <button className="contact-menu-item" onClick={() => { onSetPrimary?.(guardian.id); setMenuOpen(false); }}>
                    <i className="ph ph-star" />
                    Set as Primary Contact
                  </button>
                  <button className="contact-menu-item" onClick={() => { onToggleEmergency?.(guardian.id); setMenuOpen(false); }}>
                    <i className="ph ph-first-aid-kit" />
                    {guardian.isEmergency ? 'Remove Emergency Contact' : 'Mark as Emergency Contact'}
                  </button>
                  <div className="contact-menu-divider" />
                  <button className="contact-menu-item contact-menu-item--danger" onClick={() => { onDelete?.(guardian.id); setMenuOpen(false); }}>
                    <i className="ph ph-trash" />
                    Delete Contact
                  </button>
                </div>
              )}
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="guardian-edit-btn">
            <i className="ph ph-pencil" />
            Edit
          </Button>
        </div>

        <div className="guardian-actions">
          <button className="guardian-action-btn" title="Call" onClick={() => primaryPhone && onCall?.(primaryPhone.number)}>
            <i className="ph ph-phone" />
          </button>
          <button className="guardian-action-btn" title="Email" onClick={() => guardian.email && onEmail?.(guardian.email)}>
            <i className="ph ph-envelope" />
          </button>
          <button className="guardian-action-btn" title="Message" onClick={() => onMessage?.(guardian.id)}>
            <i className="ph ph-chat-circle" />
          </button>
        </div>

        {guardian.email && (
          <div className="guardian-contact">
            <i className="ph ph-envelope" />
            <a href={`mailto:${guardian.email}`}>{guardian.email}</a>
          </div>
        )}

        {primaryPhone && (
          <div className="guardian-phone-primary">
            <i className={`ph ${getPhoneIcon(primaryPhone.type)}`} />
            <a href={`tel:${primaryPhone.number}`}>{primaryPhone.number}</a>
            <span className="phone-type">{primaryPhone.type.charAt(0).toUpperCase() + primaryPhone.type.slice(1)}</span>
            {primaryPhone.smsCapable && (
              <i className="ph ph-chat-circle sms-icon" title="SMS Capable" />
            )}
          </div>
        )}

        <div className="guardian-details-toggle">
          <button className="btn-link" onClick={() => setShowDetails(!showDetails)}>
            <i className={`ph ph-caret-${showDetails ? 'down' : 'right'} details-caret`} />
            <span>{showDetails ? 'Hide details' : 'Show details'}</span>
          </button>
        </div>

        {showDetails && (
          <div className="guardian-details">
            {/* Additional phones */}
            {guardian.phones.filter(p => p !== primaryPhone).length > 0 && (
              <div className="guardian-phone-list">
                {guardian.phones.filter(p => p !== primaryPhone).map((phone, idx) => (
                  <span key={idx} className="guardian-phone-item">
                    <i className={`ph ${getPhoneIcon(phone.type)}`} />
                    <a href={`tel:${phone.number}`}>{phone.number}</a>
                    <span className="phone-type">{phone.type.charAt(0).toUpperCase() + phone.type.slice(1)}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Address */}
            {guardian.address && (
              <div className="guardian-address">
                <i className="ph ph-map-pin" />
                <span>{formatAddress(guardian.address, primaryAddress)}</span>
              </div>
            )}

            {/* Preferences */}
            <div className="guardian-preferences">
              {guardian.receivesInvoices && (
                <Badge variant="cyan">
                  <i className="ph ph-receipt" />
                  Invoice Recipient
                </Badge>
              )}
              {guardian.emailReminders && (
                <Badge variant="default">
                  <i className="ph ph-envelope" />
                  Email Reminders
                </Badge>
              )}
              {guardian.smsReminders && (
                <Badge variant="default">
                  <i className="ph ph-chat-circle" />
                  SMS Reminders
                </Badge>
              )}
            </div>

            {/* Private note */}
            {guardian.privateNote && (
              <div className="guardian-private-note">
                <i className="ph ph-lock" />
                <strong>Private Note:</strong> {guardian.privateNote}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
