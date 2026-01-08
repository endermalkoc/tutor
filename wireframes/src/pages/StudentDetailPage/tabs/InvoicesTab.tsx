import { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Badge,
  Button,
  Input,
  Select,
} from '../../../components/design-system';
import './InvoicesTab.css';

type InvoiceStatus = 'draft' | 'outstanding' | 'paid' | 'partial' | 'overdue' | 'void';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  balance: number;
  status: InvoiceStatus;
}

interface BillingSettings {
  billingMethod: string;
  rate: string;
  autoInvoicing: string;
  nextInvoice: string;
}

interface InvoiceStats {
  total: number;
  paid: number;
  outstanding: number;
}

// Mock data
const mockInvoices: Invoice[] = [
  { id: 'i1', number: 'INV-0042', date: 'Jan 1, 2025', dueDate: 'Jan 15, 2025', amount: 200, paid: 0, balance: 200, status: 'outstanding' },
  { id: 'i2', number: 'INV-0041', date: 'Jan 1, 2025', dueDate: 'Jan 15, 2025', amount: 200, paid: 0, balance: 200, status: 'outstanding' },
  { id: 'i3', number: 'INV-0038', date: 'Dec 1, 2024', dueDate: 'Dec 15, 2024', amount: 200, paid: 200, balance: 0, status: 'paid' },
  { id: 'i4', number: 'INV-0037', date: 'Dec 1, 2024', dueDate: 'Dec 15, 2024', amount: 200, paid: 200, balance: 0, status: 'paid' },
  { id: 'i5', number: 'INV-0034', date: 'Nov 1, 2024', dueDate: 'Nov 15, 2024', amount: 200, paid: 200, balance: 0, status: 'paid' },
  { id: 'i6', number: 'INV-0033', date: 'Nov 1, 2024', dueDate: 'Nov 15, 2024', amount: 200, paid: 200, balance: 0, status: 'paid' },
];

const mockBillingSettings: BillingSettings = {
  billingMethod: 'Per Lesson',
  rate: '$50.00 per lesson',
  autoInvoicing: 'Monthly on the 1st',
  nextInvoice: 'Feb 1, 2025',
};

const mockStats: InvoiceStats = {
  total: 2400,
  paid: 2000,
  outstanding: 400,
};

const statusConfig: Record<InvoiceStatus, { label: string; variant: 'success' | 'default' | 'warning' | 'error' | 'indigo' }> = {
  draft: { label: 'Draft', variant: 'default' },
  outstanding: { label: 'Outstanding', variant: 'indigo' },
  paid: { label: 'Paid', variant: 'success' },
  partial: { label: 'Partial', variant: 'warning' },
  overdue: { label: 'Overdue', variant: 'error' },
  void: { label: 'Void', variant: 'default' },
};

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function InvoicesTab() {
  const [statusFilter, setStatusFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-quarter');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="invoices-tab">
      {/* Family Notice */}
      <div className="family-notice">
        <i className="ph ph-info" />
        <span>
          Billing managed for <strong>Chen Family</strong>. Includes charges for Emily and Michael Chen.
        </span>
      </div>

      {/* Billing Settings Card */}
      <div className="billing-settings-card">
        <div className="billing-settings-header">
          <h3>Billing Settings</h3>
          <Button variant="secondary" size="sm">
            <i className="ph ph-pencil" />
            Edit
          </Button>
        </div>
        <div className="billing-settings-grid">
          <div className="billing-settings-item">
            <span className="label">Billing Method</span>
            <div className="value">{mockBillingSettings.billingMethod}</div>
          </div>
          <div className="billing-settings-item">
            <span className="label">Rate</span>
            <div className="value">{mockBillingSettings.rate}</div>
          </div>
          <div className="billing-settings-item billing-settings-item--wide">
            <span className="label">Auto-Invoicing</span>
            <div className="auto-invoicing-row">
              <i className="ph ph-gear" />
              <span className="value">{mockBillingSettings.autoInvoicing}</span>
              <span className="separator">.</span>
              <span className="next-invoice">Next invoice: {mockBillingSettings.nextInvoice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="invoices-filters">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="outstanding">Outstanding</option>
          <option value="paid">Paid</option>
          <option value="partial">Partially Paid</option>
          <option value="overdue">Overdue</option>
          <option value="void">Void</option>
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
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <Button variant="primary" className="new-invoice-btn">
          <i className="ph ph-plus" />
          New Invoice
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="invoices-stats">
        <div className="stat-item">
          <span className="stat-value">{formatCurrency(mockStats.total)}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item stat-item--paid">
          <span className="stat-value">{formatCurrency(mockStats.paid)}</span>
          <span className="stat-label">Paid</span>
        </div>
        <div className="stat-item stat-item--outstanding">
          <span className="stat-value">{formatCurrency(mockStats.outstanding)}</span>
          <span className="stat-label">Outstanding</span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="invoices-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell sortable>Invoice #</TableHeaderCell>
              <TableHeaderCell sortable sortDirection="desc">Date</TableHeaderCell>
              <TableHeaderCell sortable>Due Date</TableHeaderCell>
              <TableHeaderCell sortable>Amount</TableHeaderCell>
              <TableHeaderCell sortable>Paid</TableHeaderCell>
              <TableHeaderCell sortable>Balance</TableHeaderCell>
              <TableHeaderCell sortable>Status</TableHeaderCell>
              <TableHeaderCell className="actions-col" />
            </TableRow>
          </TableHead>
          <TableBody>
            {mockInvoices.map(invoice => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <span className="invoice-number">{invoice.number}</span>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <span className="amount">{formatCurrency(invoice.amount)}</span>
                </TableCell>
                <TableCell>
                  <span className="amount">{formatCurrency(invoice.paid)}</span>
                </TableCell>
                <TableCell>
                  <span className={`amount ${invoice.balance > 0 ? 'amount--negative' : ''}`}>
                    {formatCurrency(invoice.balance)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={statusConfig[invoice.status].variant}>
                    {statusConfig[invoice.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="row-actions">
                    {invoice.status === 'outstanding' ? (
                      <>
                        <button className="action-btn" title="Send">
                          <i className="ph ph-paper-plane-tilt" />
                        </button>
                        <button className="action-btn" title="Record Payment">
                          <i className="ph ph-credit-card" />
                        </button>
                      </>
                    ) : (
                      <button className="action-btn" title="Download">
                        <i className="ph ph-download" />
                      </button>
                    )}
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
            Showing <strong>1-6</strong> of <strong>12</strong>
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
