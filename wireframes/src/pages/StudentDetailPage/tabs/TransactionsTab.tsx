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

type TransactionType = 'payment' | 'charge' | 'credit' | 'adjustment' | 'refund';

interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  description: string;
  reference?: string;
  amount: number;
  balance: number;
  balanceType: 'credit' | 'owing' | 'zero';
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
  { id: 't1', date: 'Jan 6, 2025', type: 'payment', description: 'Payment received', reference: 'Check #1234', amount: 200, balance: 50, balanceType: 'credit' },
  { id: 't2', date: 'Jan 1, 2025', type: 'charge', description: 'INV-0042 - January lessons (Emily)', reference: 'INV-0042', amount: -200, balance: 150, balanceType: 'owing' },
  { id: 't3', date: 'Jan 1, 2025', type: 'charge', description: 'INV-0041 - January lessons (Michael)', reference: 'INV-0041', amount: -200, balance: 50, balanceType: 'credit' },
  { id: 't4', date: 'Dec 15, 2024', type: 'payment', description: 'Payment received', reference: 'Card ending 4242', amount: 400, balance: 250, balanceType: 'credit' },
  { id: 't5', date: 'Dec 10, 2024', type: 'credit', description: 'Holiday discount credit', reference: undefined, amount: 50, balance: 150, balanceType: 'owing' },
  { id: 't6', date: 'Dec 1, 2024', type: 'charge', description: 'INV-0038 - December lessons (Emily)', reference: 'INV-0038', amount: -200, balance: 200, balanceType: 'owing' },
  { id: 't7', date: 'Dec 1, 2024', type: 'charge', description: 'INV-0037 - December lessons (Michael)', reference: 'INV-0037', amount: -200, balance: 0, balanceType: 'zero' },
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

const typeConfig: Record<TransactionType, { label: string; className: string; icon?: string }> = {
  payment: { label: 'Payment', className: 'type-badge--payment', icon: 'check' },
  charge: { label: 'Charge', className: 'type-badge--charge' },
  credit: { label: 'Credit', className: 'type-badge--credit', icon: 'plus' },
  adjustment: { label: 'Adjustment', className: 'type-badge--adjustment' },
  refund: { label: 'Refund', className: 'type-badge--refund' },
};

function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount);
  return `$${absAmount.toFixed(2)}`;
}

function formatAmount(amount: number): string {
  const prefix = amount > 0 ? '+' : '';
  return `${prefix}${formatCurrency(amount)}`;
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
          <option value="charge">Charges</option>
          <option value="credit">Credits</option>
          <option value="adjustment">Adjustments</option>
          <option value="refund">Refunds</option>
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
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Reference</TableHeaderCell>
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
                    {typeConfig[tx.type].icon && (
                      <i className={`ph ph-${typeConfig[tx.type].icon}`} />
                    )}
                    {typeConfig[tx.type].label}
                  </span>
                </TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.reference || '-'}</TableCell>
                <TableCell>
                  <span className={`amount ${tx.amount > 0 ? 'amount--positive' : 'amount--negative'}`}>
                    {formatAmount(tx.amount)}
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
            Showing <strong>1-7</strong> of <strong>24</strong>
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
