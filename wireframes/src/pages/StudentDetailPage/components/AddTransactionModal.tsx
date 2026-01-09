import { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  FormGroup,
  FormLabel,
} from '../../../components/design-system';
import { RecurrenceConfig } from './RecurrenceConfig';
import './AddTransactionModal.css';

type TransactionType = 'payment' | 'refund' | 'charge' | 'discount';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  defaultType?: TransactionType;
  currentStudent: string;
  familyStudents: string[];
}

const typeDescriptions: Record<TransactionType, string> = {
  payment: 'Record money received from the family',
  refund: 'Record money returned to the family',
  charge: 'Record an amount the family owes',
  discount: 'Apply a discount to the family account',
};

const placeholders: Record<TransactionType, string> = {
  payment: 'e.g., Check #1234, Venmo, Cash',
  refund: 'e.g., Cancelled lesson refund',
  charge: 'e.g., January lessons',
  discount: 'e.g., Sibling discount',
};

const categories = ['Lessons', 'Materials', 'Late Fee', 'Registration', 'Referral Bonus', 'Seasonal'];

export function AddTransactionModal({
  open,
  onClose,
  defaultType,
  currentStudent,
  familyStudents,
}: AddTransactionModalProps) {
  const [type, setType] = useState<TransactionType>(defaultType || 'payment');
  const [student, setStudent] = useState(currentStudent);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens with a new type
  useEffect(() => {
    if (open) {
      setType(defaultType || 'payment');
      setStudent(currentStudent);
      setDate(new Date().toISOString().split('T')[0]);
      setAmount('');
      setDescription('');
      setCategory('');
      setIsRecurring(false);
      setErrors({});
    }
  }, [open, defaultType, currentStudent]);

  const showCategoryAndRecurrence = type === 'charge' || type === 'discount';

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // TODO: Actually save the transaction
    console.log('Creating transaction:', {
      type,
      student,
      date,
      amount: parseFloat(amount),
      description,
      category: showCategoryAndRecurrence ? category : undefined,
      isRecurring: showCategoryAndRecurrence ? isRecurring : false,
    });

    onClose();
  };

  const getTitle = () => {
    if (type === 'payment') return 'Record Payment';
    if (type === 'refund') return 'Record Refund';
    if (type === 'charge') return 'Add Charge';
    return 'Add Discount';
  };

  const getButtonLabel = () => {
    if (type === 'payment') return 'Record Payment';
    if (type === 'refund') return 'Record Refund';
    if (type === 'charge') return 'Add Charge';
    return 'Add Discount';
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>{getTitle()}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {/* Type Selector */}
        <div className="type-selector">
          <div className="type-tabs">
            <button
              type="button"
              className={`type-tab ${type === 'payment' ? 'active' : ''}`}
              onClick={() => setType('payment')}
            >
              Payment
            </button>
            <button
              type="button"
              className={`type-tab ${type === 'refund' ? 'active' : ''}`}
              onClick={() => setType('refund')}
            >
              Refund
            </button>
            <button
              type="button"
              className={`type-tab ${type === 'charge' ? 'active' : ''}`}
              onClick={() => setType('charge')}
            >
              Charge
            </button>
            <button
              type="button"
              className={`type-tab ${type === 'discount' ? 'active' : ''}`}
              onClick={() => setType('discount')}
            >
              Discount
            </button>
          </div>
          <p className="type-description">{typeDescriptions[type]}</p>
        </div>

        {/* Form Fields */}
        <div className="form-grid">
          <FormGroup>
            <FormLabel required>Student</FormLabel>
            <Select value={student} onChange={(e) => setStudent(e.target.value)}>
              {familyStudents.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel required>Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </FormGroup>

          <FormGroup className="amount-field">
            <FormLabel required>Amount</FormLabel>
            <div className="amount-input-wrapper">
              <span className="currency-symbol">$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
              />
            </div>
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </FormGroup>

          {showCategoryAndRecurrence && (
            <FormGroup>
              <FormLabel>Category</FormLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category...</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </FormGroup>
          )}

          <FormGroup className="description-field">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder={placeholders[type]}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </div>

        {/* Recurrence Section */}
        {showCategoryAndRecurrence && (
          <div className="recurrence-section">
            <div className="recurrence-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                />
                <span className="toggle-text">
                  <i className="ph ph-repeat" />
                  Make this recurring
                </span>
              </label>
            </div>

            {isRecurring && (
              <RecurrenceConfig
                startDate={date}
                onStartDateChange={setDate}
              />
            )}
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" size="md" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="md" onClick={handleSubmit}>
          {getButtonLabel()}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
