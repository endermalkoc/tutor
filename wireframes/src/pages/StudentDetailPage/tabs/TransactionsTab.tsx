import { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Button,
  Input,
  Select,
} from '../../../components/design-system';
import './TransactionsTab.css';

type TransactionType = 'payment' | 'refund' | 'charge' | 'discount';

interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  student: string;
  description: string;
  category?: string;
  amount: number;
  balance: number;
  balanceType: 'credit' | 'owing' | 'zero';
  isRecurring?: boolean;
}

interface TransactionStats {
  charges: number;
  payments: number;
  balance: number;
}

interface AccountBalance {
  amount: number;
  type: 'credit' | 'owing';
}

// Mock data
const mockTransactions: Transaction[] = [
  { id: 't1', date: 'Jan 6, 2025', type: 'payment', student: 'Emily Chen', description: 'Check #1234', amount: 200, balance: 50, balanceType: 'credit' },
  { id: 't2', date: 'Jan 1, 2025', type: 'charge', student: 'Emily Chen', description: 'January lessons', category: 'Lessons', amount: 200, balance: 150, balanceType: 'owing', isRecurring: true },
  { id: 't3', date: 'Jan 1, 2025', type: 'charge', student: 'Michael Chen', description: 'January lessons', category: 'Lessons', amount: 200, balance: 50, balanceType: 'credit', isRecurring: true },
  { id: 't4', date: 'Dec 15, 2024', type: 'payment', student: 'Emily Chen', description: 'Card ending 4242', amount: 400, balance: 250, balanceType: 'credit' },
  { id: 't5', date: 'Dec 10, 2024', type: 'discount', student: 'Emily Chen', description: 'Holiday discount', category: 'Seasonal', amount: 50, balance: 150, balanceType: 'owing' },
  { id: 't6', date: 'Dec 1, 2024', type: 'charge', student: 'Emily Chen', description: 'December lessons', category: 'Lessons', amount: 200, balance: 200, balanceType: 'owing', isRecurring: true },
  { id: 't7', date: 'Dec 1, 2024', type: 'charge', student: 'Michael Chen', description: 'December lessons', category: 'Lessons', amount: 200, balance: 0, balanceType: 'zero', isRecurring: true },
  { id: 't8', date: 'Nov 20, 2024', type: 'refund', student: 'Emily Chen', description: 'Cancelled lesson refund', amount: 50, balance: 200, balanceType: 'owing' },
];

const mockStats: TransactionStats = {
  charges: 2400,
  payments: 2450,
  balance: 50,
};

const mockAccountBalance: AccountBalance = {
  amount: 50,
  type: 'credit',
};

const typeConfig: Record<TransactionType, { label: string; className: string; icon: string }> = {
  payment: { label: 'Payment', className: 'type-badge--payment', icon: 'arrow-down-left' },
  refund: { label: 'Refund', className: 'type-badge--refund', icon: 'arrow-up-right' },
  charge: { label: 'Charge', className: 'type-badge--charge', icon: 'receipt' },
  discount: { label: 'Discount', className: 'type-badge--discount', icon: 'tag' },
};

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function formatBalance(amount: number, type: 'credit' | 'owing' | 'zero'): string {
  if (type === 'zero') return '$0.00';
  const suffix = type === 'credit' ? ' cr' : '';
  return `${formatCurrency(amount)}${suffix}`;
}

export function TransactionsTab() {
  const [typeFilter, setTypeFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-quarter');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="transactions-tab">
      {/* Family Notice */}
      <div className="family-notice">
        <i className="ph ph-info" />
        <span>Showing all transactions for <strong>Chen Family</strong>.</span>
      </div>

      {/* Balance Card */}
      <div className="balance-card">
        <div className="balance-info">
          <div className="balance-label">Account Balance</div>
          <div className={`balance-value balance-value--${mockAccountBalance.type}`}>
            {formatCurrency(mockAccountBalance.amount)} {mockAccountBalance.type}
          </div>
        </div>
        <Button variant="primary">
          <i className="ph ph-plus" />
          Record Payment
        </Button>
      </div>

      {/* Filters */}
      <div className="transactions-filters">
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="payment">Payments</option>
          <option value="refund">Refunds</option>
          <option value="charge">Charges</option>
          <option value="discount">Discounts</option>
        </Select>

        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-quarter">This Quarter</option>
          <option value="this-year">This Year</option>
        </Select>

        <div className="search-container">
          <i className="ph ph-magnifying-glass search-icon" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <Button variant="secondary" className="export-btn">
          <i className="ph ph-download" />
          Export
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="transactions-stats">
        <div className="stat-item stat-item--charges">
          <span className="stat-value">{formatCurrency(mockStats.charges)}</span>
          <span className="stat-label">Charges</span>
        </div>
        <div className="stat-item stat-item--payments">
          <span className="stat-value">{formatCurrency(mockStats.payments)}</span>
          <span className="stat-label">Payments</span>
        </div>
        <div className="stat-item stat-item--balance">
          <span className="stat-value">{formatCurrency(mockStats.balance)}</span>
          <span className="stat-label">Balance</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell sortable sortDirection="desc">Date</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Student</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell sortable>Amount</TableHeaderCell>
              <TableHeaderCell>Balance</TableHeaderCell>
              <TableHeaderCell className="actions-col" />
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTransactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>
                  <span className={`type-badge ${typeConfig[tx.type].className}`}>
                    <i className={`ph ph-${typeConfig[tx.type].icon}`} />
                    {typeConfig[tx.type].label}
                  </span>
                </TableCell>
                <TableCell>{tx.student}</TableCell>
                <TableCell>
                  <div className="description-cell">
                    <span className="description-text">{tx.description}</span>
                    {tx.category && (
                      <span className="category-tag">{tx.category}</span>
                    )}
                    {tx.isRecurring && (
                      <i className="ph ph-repeat recurring-icon" title="Recurring" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`amount amount--${tx.type}`}>
                    {tx.type === 'charge' ? '-' : tx.type === 'refund' ? '-' : '+'}
                    {formatCurrency(tx.amount)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`balance balance--${tx.balanceType}`}>
                    {formatBalance(tx.balance, tx.balanceType)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="row-actions">
                    <button className="action-btn" title="View">
                      <i className="ph ph-eye" />
                    </button>
                    <button className="action-btn" title="More">
                      <i className="ph ph-dots-three" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing <strong>1-8</strong> of <strong>24</strong>
          </div>
          <div className="pagination-controls">
            <div className="page-size-selector">
              <label>Show</label>
              <select defaultValue="25">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="page-nav">
              <button className="page-btn" disabled>&larr;</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">&rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
