import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  FormGroup,
  FormLabel,
  FormHint,
  FormError,
  Select,
  Option,
  Radio,
  RadioGroup,
  Checkbox,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Toast,
  FormSection,
  FormRow,
  Fieldset,
  ExpandToggle,
  ExpandableContent,
  Combobox,
  InlineForm,
} from '../components/design-system';
import type { ComboboxOption } from '../components/design-system';
import './AddStudentPage.css';

// Types
type StudentType = 'child' | 'adult';
type StudentStatus = 'active' | 'trial' | 'lead';
type BillingMethod = 'none' | 'per-lesson' | 'monthly' | 'hourly';
type InvoicePreset = 'none' | 'monthly' | 'biweekly';

interface FormData {
  // Student info
  firstName: string;
  lastName: string;
  studentType: StudentType;
  status: StudentStatus;
  email: string;
  phone: string;
  smsCapable: boolean;
  // Extended details
  birthday: string;
  gender: string;
  school: string;
  skillLevel: string;
  subjects: string;
  referrer: string;
  // Family
  familyId: string;
  // New family (guardian)
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianStreet: string;
  guardianCity: string;
  guardianState: string;
  // Lessons & Billing
  duration: string;
  lessonCategory: 'individual' | 'group';
  billingMethod: BillingMethod;
  billingAmount: string;
  invoicePreset: InvoicePreset;
  cycleStartDate: string;
  invoiceFrequency: string;
  invoiceType: 'prepaid' | 'postpaid';
  dueDays: string;
  // Notes
  notes: string;
}

// Mock family data
const mockFamilies: ComboboxOption[] = [
  { value: '1', label: 'Anderson Family', description: 'John Anderson · john@example.com' },
  { value: '2', label: 'Martinez Family', description: 'Maria Martinez · maria@example.com' },
  { value: '3', label: 'Thompson Family', description: 'Sarah Thompson · sarah@example.com' },
];

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  studentType: 'child',
  status: 'active',
  email: '',
  phone: '',
  smsCapable: true,
  birthday: '',
  gender: '',
  school: '',
  skillLevel: '',
  subjects: '',
  referrer: '',
  familyId: '',
  guardianFirstName: '',
  guardianLastName: '',
  guardianEmail: '',
  guardianPhone: '',
  guardianStreet: '',
  guardianCity: '',
  guardianState: '',
  duration: '30',
  lessonCategory: 'individual',
  billingMethod: 'per-lesson',
  billingAmount: '',
  invoicePreset: 'none',
  cycleStartDate: '',
  invoiceFrequency: 'monthly',
  invoiceType: 'postpaid',
  dueDays: '30',
  notes: '',
};

export function AddStudentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [createdStudentName, setCreatedStudentName] = useState('');

  // Expandable sections
  const [studentDetailsExpanded, setStudentDetailsExpanded] = useState(false);
  const [guardianAddressExpanded, setGuardianAddressExpanded] = useState(false);
  const [invoicingExpanded, setInvoicingExpanded] = useState(false);
  const [customInvoicingExpanded, setCustomInvoicingExpanded] = useState(false);

  // New family form
  const [showNewFamilyForm, setShowNewFamilyForm] = useState(false);

  // Validation
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Set default billing cycle start date
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    setFormData((prev) => ({
      ...prev,
      cycleStartDate: nextMonth.toISOString().split('T')[0],
    }));
  }, []);

  // Form change handler
  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormIsDirty(true);
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Family selection
  const handleFamilySelect = (value: string) => {
    handleChange('familyId', value);
    setShowNewFamilyForm(false);
  };

  const handleCreateNewFamily = () => {
    setShowNewFamilyForm(true);
    handleChange('familyId', '');
  };

  const handleCancelNewFamily = () => {
    setShowNewFamilyForm(false);
    // Clear guardian fields
    setFormData((prev) => ({
      ...prev,
      guardianFirstName: '',
      guardianLastName: '',
      guardianEmail: '',
      guardianPhone: '',
      guardianStreet: '',
      guardianCity: '',
      guardianState: '',
    }));
  };

  // Validation
  const validateEmail = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Family validation for children
    if (formData.studentType === 'child') {
      if (!formData.familyId && !showNewFamilyForm) {
        newErrors.familyId = 'Please select or create a family';
      }
      if (showNewFamilyForm) {
        if (!formData.guardianFirstName.trim()) {
          newErrors.guardianFirstName = 'Guardian first name is required';
        }
        if (!formData.guardianLastName.trim()) {
          newErrors.guardianLastName = 'Guardian last name is required';
        }
        if (!formData.guardianEmail && !formData.guardianPhone) {
          newErrors.guardianEmail = 'Email or mobile is required';
        }
        if (formData.guardianEmail && !validateEmail(formData.guardianEmail)) {
          newErrors.guardianEmail = 'Please enter a valid email';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setCreatedStudentName(`${formData.firstName} ${formData.lastName}`);
    setShowSuccessToast(true);
    setFormIsDirty(false);
  };

  // Cancel handling
  const handleCancel = () => {
    if (formIsDirty) {
      setShowCancelModal(true);
    } else {
      navigate('/students');
    }
  };

  const confirmCancel = () => {
    navigate('/students');
  };

  // Toast actions
  const handleAddAnother = () => {
    setShowSuccessToast(false);
    setFormData(initialFormData);
    setShowNewFamilyForm(false);
    setStudentDetailsExpanded(false);
    setGuardianAddressExpanded(false);
    setInvoicingExpanded(false);
    setCustomInvoicingExpanded(false);
  };

  const handleViewStudent = () => {
    setShowSuccessToast(false);
    // Navigate to student detail page (placeholder)
    navigate('/students');
  };

  // Billing method labels
  const getBillingLabel = (): string => {
    switch (formData.billingMethod) {
      case 'per-lesson':
        return 'Price per lesson';
      case 'monthly':
        return 'Monthly rate';
      case 'hourly':
        return 'Hourly rate';
      default:
        return 'Amount';
    }
  };

  return (
    <div className="add-student-page">
      <PageHeader
        title="Add New Student"
        subtitle="Create a student record with contact and billing information"
        breadcrumbs={[
          { label: 'Students', href: '/students' },
          { label: 'Add New' },
        ]}
      />

      <form onSubmit={handleSubmit} className="add-student-form">
        <Card>
          <CardBody>
            {/* Section 1: Student Information */}
            <FormSection title="Student" badge="Required">
              <FormRow>
                <FormGroup error={!!errors.firstName}>
                  <FormLabel htmlFor="firstName" required>
                    First Name
                  </FormLabel>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    autoComplete="given-name"
                    error={!!errors.firstName}
                  />
                  {errors.firstName && <FormError>{errors.firstName}</FormError>}
                </FormGroup>

                <FormGroup error={!!errors.lastName}>
                  <FormLabel htmlFor="lastName" required>
                    Last Name
                  </FormLabel>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    autoComplete="family-name"
                    error={!!errors.lastName}
                  />
                  {errors.lastName && <FormError>{errors.lastName}</FormError>}
                </FormGroup>
              </FormRow>

              <FormRow>
                <Fieldset legend="Type" required>
                  <RadioGroup orientation="horizontal">
                    <Radio
                      name="studentType"
                      value="child"
                      label="Child"
                      checked={formData.studentType === 'child'}
                      onChange={() => handleChange('studentType', 'child')}
                    />
                    <Radio
                      name="studentType"
                      value="adult"
                      label="Adult"
                      checked={formData.studentType === 'adult'}
                      onChange={() => handleChange('studentType', 'adult')}
                    />
                  </RadioGroup>
                </Fieldset>

                <Fieldset legend="Status" required>
                  <RadioGroup orientation="horizontal">
                    <Radio
                      name="status"
                      value="active"
                      label="Active"
                      checked={formData.status === 'active'}
                      onChange={() => handleChange('status', 'active')}
                    />
                    <Radio
                      name="status"
                      value="trial"
                      label="Trial"
                      checked={formData.status === 'trial'}
                      onChange={() => handleChange('status', 'trial')}
                    />
                    <Radio
                      name="status"
                      value="lead"
                      label="Lead"
                      checked={formData.status === 'lead'}
                      onChange={() => handleChange('status', 'lead')}
                    />
                  </RadioGroup>
                </Fieldset>
              </FormRow>

              <FormRow>
                <FormGroup error={!!errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="student@example.com"
                    autoComplete="email"
                    error={!!errors.email}
                  />
                  {errors.email && <FormError>{errors.email}</FormError>}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                  />
                  <Checkbox
                    label="Can receive SMS"
                    checked={formData.smsCapable}
                    onChange={(e) => handleChange('smsCapable', e.target.checked)}
                    className="mt-2"
                  />
                </FormGroup>
              </FormRow>

              {/* Expandable: Additional student details */}
              <ExpandToggle
                label="Add birthday, gender, school..."
                expanded={studentDetailsExpanded}
                onToggle={() => setStudentDetailsExpanded(!studentDetailsExpanded)}
              />

              <ExpandableContent expanded={studentDetailsExpanded}>
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="birthday">Birthday</FormLabel>
                    <Input
                      id="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => handleChange('birthday', e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <Select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                    >
                      <Option value="">Select...</Option>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                      <Option value="prefer-not">Prefer not to say</Option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="school">School</FormLabel>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) => handleChange('school', e.target.value)}
                      placeholder="School name"
                      autoComplete="organization"
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="skillLevel">Skill Level</FormLabel>
                    <Select
                      id="skillLevel"
                      value={formData.skillLevel}
                      onChange={(e) => handleChange('skillLevel', e.target.value)}
                    >
                      <Option value="">Select...</Option>
                      <Option value="beginner">Beginner</Option>
                      <Option value="elementary">Elementary</Option>
                      <Option value="intermediate">Intermediate</Option>
                      <Option value="advanced">Advanced</Option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="subjects">Subjects</FormLabel>
                    <Input
                      id="subjects"
                      value={formData.subjects}
                      onChange={(e) => handleChange('subjects', e.target.value)}
                      placeholder="Piano, Voice, Guitar..."
                    />
                    <FormHint>Separate with commas</FormHint>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="referrer">Referrer</FormLabel>
                    <Input
                      id="referrer"
                      value={formData.referrer}
                      onChange={(e) => handleChange('referrer', e.target.value)}
                      placeholder="How did they find you?"
                    />
                  </FormGroup>
                </FormRow>
              </ExpandableContent>
            </FormSection>

            {/* Section 2: Family Information (Children Only) */}
            {formData.studentType === 'child' && (
              <FormSection title="Family" badge="Required">
                <FormRow columns={1}>
                  <FormGroup error={!!errors.familyId}>
                    <FormLabel>Select or create a family</FormLabel>
                    <Combobox
                      options={mockFamilies}
                      value={formData.familyId}
                      placeholder="Search families..."
                      searchPlaceholder="Search by name or email..."
                      onChange={handleFamilySelect}
                      onCreateNew={handleCreateNewFamily}
                      createNewLabel="Create new family"
                    />
                    {errors.familyId && <FormError>{errors.familyId}</FormError>}
                  </FormGroup>
                </FormRow>

                {/* Inline New Family Form */}
                {showNewFamilyForm && (
                  <InlineForm title="New Family - Guardian" onCancel={handleCancelNewFamily}>
                    <FormRow>
                      <FormGroup error={!!errors.guardianFirstName}>
                        <FormLabel htmlFor="guardianFirstName" required>
                          First Name
                        </FormLabel>
                        <Input
                          id="guardianFirstName"
                          value={formData.guardianFirstName}
                          onChange={(e) => handleChange('guardianFirstName', e.target.value)}
                          placeholder="First name"
                          error={!!errors.guardianFirstName}
                        />
                        {errors.guardianFirstName && (
                          <FormError>{errors.guardianFirstName}</FormError>
                        )}
                      </FormGroup>

                      <FormGroup error={!!errors.guardianLastName}>
                        <FormLabel htmlFor="guardianLastName" required>
                          Last Name
                        </FormLabel>
                        <Input
                          id="guardianLastName"
                          value={formData.guardianLastName}
                          onChange={(e) => handleChange('guardianLastName', e.target.value)}
                          placeholder="Last name"
                          error={!!errors.guardianLastName}
                        />
                        {errors.guardianLastName && (
                          <FormError>{errors.guardianLastName}</FormError>
                        )}
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup error={!!errors.guardianEmail}>
                        <FormLabel htmlFor="guardianEmail">Email</FormLabel>
                        <Input
                          id="guardianEmail"
                          type="email"
                          value={formData.guardianEmail}
                          onChange={(e) => handleChange('guardianEmail', e.target.value)}
                          placeholder="parent@example.com"
                          error={!!errors.guardianEmail}
                        />
                        {errors.guardianEmail && <FormError>{errors.guardianEmail}</FormError>}
                      </FormGroup>

                      <FormGroup>
                        <FormLabel htmlFor="guardianPhone">Mobile</FormLabel>
                        <Input
                          id="guardianPhone"
                          type="tel"
                          value={formData.guardianPhone}
                          onChange={(e) => handleChange('guardianPhone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                        <FormHint>Email or mobile required</FormHint>
                      </FormGroup>
                    </FormRow>

                    {/* Expandable: Guardian address */}
                    <ExpandToggle
                      label="Add address"
                      expanded={guardianAddressExpanded}
                      onToggle={() => setGuardianAddressExpanded(!guardianAddressExpanded)}
                    />

                    <ExpandableContent expanded={guardianAddressExpanded}>
                      <FormRow columns={1}>
                        <FormGroup>
                          <FormLabel htmlFor="guardianStreet">Street Address</FormLabel>
                          <Input
                            id="guardianStreet"
                            value={formData.guardianStreet}
                            onChange={(e) => handleChange('guardianStreet', e.target.value)}
                            placeholder="123 Main St"
                          />
                        </FormGroup>
                      </FormRow>

                      <FormRow>
                        <FormGroup>
                          <FormLabel htmlFor="guardianCity">City</FormLabel>
                          <Input
                            id="guardianCity"
                            value={formData.guardianCity}
                            onChange={(e) => handleChange('guardianCity', e.target.value)}
                            placeholder="City"
                          />
                        </FormGroup>

                        <FormGroup>
                          <FormLabel htmlFor="guardianState">State</FormLabel>
                          <Select
                            id="guardianState"
                            value={formData.guardianState}
                            onChange={(e) => handleChange('guardianState', e.target.value)}
                          >
                            <Option value="">Select...</Option>
                            <Option value="CA">California</Option>
                            <Option value="NY">New York</Option>
                            <Option value="TX">Texas</Option>
                          </Select>
                        </FormGroup>
                      </FormRow>
                    </ExpandableContent>
                  </InlineForm>
                )}
              </FormSection>
            )}

            {/* Section 3: Lessons & Billing */}
            <FormSection title="Lessons & Billing">
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="duration">Default Duration</FormLabel>
                  <Select
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                  >
                    <Option value="30">30 minutes</Option>
                    <Option value="45">45 minutes</Option>
                    <Option value="60">60 minutes</Option>
                    <Option value="90">90 minutes</Option>
                  </Select>
                </FormGroup>

                <Fieldset legend="Category">
                  <RadioGroup orientation="horizontal">
                    <Radio
                      name="lessonCategory"
                      value="individual"
                      label="Individual"
                      checked={formData.lessonCategory === 'individual'}
                      onChange={() => handleChange('lessonCategory', 'individual')}
                    />
                    <Radio
                      name="lessonCategory"
                      value="group"
                      label="Group"
                      checked={formData.lessonCategory === 'group'}
                      onChange={() => handleChange('lessonCategory', 'group')}
                    />
                  </RadioGroup>
                </Fieldset>
              </FormRow>

              <FormRow columns={1}>
                <Fieldset legend="Billing Method">
                  <RadioGroup>
                    <Radio
                      name="billingMethod"
                      value="none"
                      label="No automatic billing"
                      checked={formData.billingMethod === 'none'}
                      onChange={() => handleChange('billingMethod', 'none')}
                    />
                    <Radio
                      name="billingMethod"
                      value="per-lesson"
                      label="Per lesson"
                      checked={formData.billingMethod === 'per-lesson'}
                      onChange={() => handleChange('billingMethod', 'per-lesson')}
                    />
                    <Radio
                      name="billingMethod"
                      value="monthly"
                      label="Monthly flat rate"
                      checked={formData.billingMethod === 'monthly'}
                      onChange={() => handleChange('billingMethod', 'monthly')}
                    />
                    <Radio
                      name="billingMethod"
                      value="hourly"
                      label="Hourly rate"
                      checked={formData.billingMethod === 'hourly'}
                      onChange={() => handleChange('billingMethod', 'hourly')}
                    />
                  </RadioGroup>
                </Fieldset>
              </FormRow>

              {formData.billingMethod !== 'none' && (
                <FormRow columns={1}>
                  <FormGroup className="price-input-group">
                    <FormLabel htmlFor="billingAmount">{getBillingLabel()}</FormLabel>
                    <div className="price-input-wrapper">
                      <span className="currency-symbol">$</span>
                      <Input
                        id="billingAmount"
                        type="number"
                        inputMode="decimal"
                        value={formData.billingAmount}
                        onChange={(e) => handleChange('billingAmount', e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="price-input"
                      />
                    </div>
                  </FormGroup>
                </FormRow>
              )}

              {/* Expandable: Automatic invoicing */}
              <ExpandToggle
                label="Set up automatic invoicing"
                expanded={invoicingExpanded}
                onToggle={() => setInvoicingExpanded(!invoicingExpanded)}
              />

              <ExpandableContent expanded={invoicingExpanded}>
                <FormRow columns={1}>
                  <FormGroup>
                    <FormLabel>Invoice Schedule</FormLabel>
                    <div className="preset-select">
                      <button
                        type="button"
                        className={`preset-option ${formData.invoicePreset === 'none' ? 'selected' : ''}`}
                        onClick={() => handleChange('invoicePreset', 'none')}
                      >
                        <div className="preset-option-title">No auto-invoicing</div>
                        <div className="preset-option-desc">Create invoices manually</div>
                      </button>
                      <button
                        type="button"
                        className={`preset-option ${formData.invoicePreset === 'monthly' ? 'selected' : ''}`}
                        onClick={() => handleChange('invoicePreset', 'monthly')}
                      >
                        <div className="preset-option-title">Simple Monthly</div>
                        <div className="preset-option-desc">Invoice on 1st, due on receipt</div>
                      </button>
                      <button
                        type="button"
                        className={`preset-option ${formData.invoicePreset === 'biweekly' ? 'selected' : ''}`}
                        onClick={() => handleChange('invoicePreset', 'biweekly')}
                      >
                        <div className="preset-option-title">Bi-weekly</div>
                        <div className="preset-option-desc">Invoice every 2 weeks</div>
                      </button>
                    </div>
                  </FormGroup>
                </FormRow>

                {/* Expandable: Custom invoicing options */}
                <ExpandToggle
                  label="Customize schedule"
                  expanded={customInvoicingExpanded}
                  onToggle={() => setCustomInvoicingExpanded(!customInvoicingExpanded)}
                  className="mt-3"
                />

                <ExpandableContent expanded={customInvoicingExpanded}>
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="cycleStartDate">Billing cycle starts</FormLabel>
                      <Input
                        id="cycleStartDate"
                        type="date"
                        value={formData.cycleStartDate}
                        onChange={(e) => handleChange('cycleStartDate', e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="invoiceFrequency">Frequency</FormLabel>
                      <Select
                        id="invoiceFrequency"
                        value={formData.invoiceFrequency}
                        onChange={(e) => handleChange('invoiceFrequency', e.target.value)}
                      >
                        <Option value="weekly">Weekly</Option>
                        <Option value="biweekly">Every 2 weeks</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="annual">Annual</Option>
                      </Select>
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <Fieldset legend="Invoice for">
                      <RadioGroup orientation="horizontal">
                        <Radio
                          name="invoiceType"
                          value="prepaid"
                          label="Upcoming lessons"
                          checked={formData.invoiceType === 'prepaid'}
                          onChange={() => handleChange('invoiceType', 'prepaid')}
                        />
                        <Radio
                          name="invoiceType"
                          value="postpaid"
                          label="Completed lessons"
                          checked={formData.invoiceType === 'postpaid'}
                          onChange={() => handleChange('invoiceType', 'postpaid')}
                        />
                      </RadioGroup>
                    </Fieldset>

                    <FormGroup>
                      <FormLabel htmlFor="dueDays">Payment due</FormLabel>
                      <Select
                        id="dueDays"
                        value={formData.dueDays}
                        onChange={(e) => handleChange('dueDays', e.target.value)}
                      >
                        <Option value="0">On receipt</Option>
                        <Option value="7">7 days</Option>
                        <Option value="14">14 days</Option>
                        <Option value="30">30 days</Option>
                      </Select>
                    </FormGroup>
                  </FormRow>
                </ExpandableContent>
              </ExpandableContent>
            </FormSection>

            {/* Section 4: Notes */}
            <FormSection title="Notes" badge="Optional" badgeVariant="optional" noBorder>
              <FormRow columns={1}>
                <FormGroup>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Private notes about this student..."
                  />
                  <FormHint>Only visible to you, not shared with students or families</FormHint>
                </FormGroup>
              </FormRow>
            </FormSection>
          </CardBody>

          <CardFooter>
            <div className="form-footer-content">
              <div className="form-footer-left">
                <Button type="button" variant="secondary" size="md" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
              <div className="form-footer-right">
                <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Student'}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>

      {/* Success Toast */}
      <Toast
        show={showSuccessToast}
        variant="success"
        duration={8000}
        onClose={() => setShowSuccessToast(false)}
      >
        <div className="toast-success-content">
          <div className="toast-icon-wrapper success">
            <i className="ph ph-check-circle" />
          </div>
          <div>
            <div className="toast-title">Student added successfully</div>
            <div className="toast-message">{createdStudentName} has been added to your student list.</div>
            <div className="toast-actions">
              <button type="button" className="toast-action" onClick={handleAddAnother}>
                Add another
              </button>
              <button type="button" className="toast-action" onClick={handleViewStudent}>
                View student
              </button>
            </div>
          </div>
        </div>
      </Toast>

      {/* Cancel Confirmation Modal */}
      <Modal open={showCancelModal} onClose={() => setShowCancelModal(false)}>
        <ModalHeader onClose={() => setShowCancelModal(false)}>
          <ModalTitle>Discard changes?</ModalTitle>
        </ModalHeader>
        <ModalBody>You have unsaved changes. Are you sure you want to leave?</ModalBody>
        <ModalFooter>
          <Button variant="secondary" size="md" onClick={() => setShowCancelModal(false)}>
            Keep editing
          </Button>
          <Button variant="primary" size="md" onClick={confirmCancel}>
            Discard
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
