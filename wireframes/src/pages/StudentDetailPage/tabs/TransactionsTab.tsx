import { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Button,
  Badge,
  SearchInput,
  Toolbar,
  ToolbarRow,
  FilterTabs,
  FilterTab,
  Pagination,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  ListContainer,
} from '../../../components/design-system';
import { AddTransactionModal } from '../components/AddTransactionModal';
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

const mockAccountBalance: AccountBalance = {
  amount: 50,
  type: 'credit',
};

const typeBadgeVariant: Record<TransactionType, 'success' | 'warning' | 'default' | 'indigo'> = {
  payment: 'success',
  refund: 'warning',
  charge: 'default',
  discount: 'indigo',
};

const typeLabels: Record<TransactionType, string> = {
  payment: 'Payment',
  refund: 'Refund',
  charge: 'Charge',
  discount: 'Discount',
};

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function formatBalance(amount: number, type: 'credit' | 'owing' | 'zero'): string {
  if (type === 'zero') return '$0.00';
  const suffix = type === 'credit' ? ' cr' : '';
  return `${formatCurrency(amount)}${suffix}`;
}

// Loading skeleton
function TableSkeleton() {
  return (
    <div className="skeleton-container">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-cell skeleton-checkbox" />
          <div className="skeleton-cell skeleton-text-short" />
          <div className="skeleton-cell skeleton-badge" />
          <div className="skeleton-cell skeleton-text" />
          <div className="skeleton-cell skeleton-text" />
          <div className="skeleton-cell skeleton-text-short" />
          <div className="skeleton-cell skeleton-text-short" />
        </div>
      ))}
    </div>
  );
}

// Empty state
function EmptyState({
  hasFilters,
  onClearFilters,
  onAddTransaction,
}: {
  hasFilters: boolean;
  onClearFilters: () => void;
  onAddTransaction: () => void;
}) {
  if (hasFilters) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">
          <i className="ph ph-magnifying-glass" />
        </div>
        <h3>No transactions found</h3>
        <p>Try adjusting your search or filters</p>
        <Button variant="secondary" size="md" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-illustration">
        <i className="ph ph-receipt" />
      </div>
      <h3>No transactions yet</h3>
      <p>Record payments, charges, and discounts for this family</p>
      <Button variant="primary" size="md" onClick={onAddTransaction}>
        <i className="ph ph-plus" />
        Add Transaction
      </Button>
    </div>
  );
}

export function TransactionsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<TransactionType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [isLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalType, setAddModalType] = useState<TransactionType | undefined>();

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((tx) => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        tx.description.toLowerCase().includes(search) ||
        tx.student.toLowerCase().includes(search) ||
        (tx.category && tx.category.toLowerCase().includes(search));
      if (!matchesSearch) return false;
    }
    if (activeType !== 'all' && tx.type !== activeType) {
      return false;
    }
    return true;
  });

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveType('all');
  };

  const openAddModal = (type?: TransactionType) => {
    setAddModalType(type);
    setAddModalOpen(true);
  };

  // Computed
  const hasFilters = Boolean(searchTerm) || activeType !== 'all';
  const isEmpty = filteredTransactions.length === 0;

  // Calculate summary stats from filtered transactions
  const stats = {
    charges: filteredTransactions.filter(tx => tx.type === 'charge').reduce((sum, tx) => sum + tx.amount, 0),
    payments: filteredTransactions.filter(tx => tx.type === 'payment').reduce((sum, tx) => sum + tx.amount, 0),
    discounts: filteredTransactions.filter(tx => tx.type === 'discount').reduce((sum, tx) => sum + tx.amount, 0),
    refunds: filteredTransactions.filter(tx => tx.type === 'refund').reduce((sum, tx) => sum + tx.amount, 0),
  };

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
        <Dropdown
          trigger={
            <Button variant="primary">
              <i className="ph ph-plus" />
              Add Transaction
              <i className="ph ph-caret-down" />
            </Button>
          }
        >
          <DropdownItem onClick={() => openAddModal('payment')}>
            <i className="ph ph-arrow-down-left" />
            Record Payment
          </DropdownItem>
          <DropdownItem onClick={() => openAddModal('refund')}>
            <i className="ph ph-arrow-up-right" />
            Record Refund
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => openAddModal('charge')}>
            <i className="ph ph-receipt" />
            Add Charge
          </DropdownItem>
          <DropdownItem onClick={() => openAddModal('discount')}>
            <i className="ph ph-tag" />
            Add Discount
          </DropdownItem>
        </Dropdown>
      </div>

      <ListContainer>
        <Toolbar>
          <ToolbarRow>
            <SearchInput
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-flex"
            />

            <FilterTabs>
              <FilterTab active={activeType === 'all'} onClick={() => setActiveType('all')}>
                All
              </FilterTab>
              <FilterTab active={activeType === 'payment'} onClick={() => setActiveType('payment')}>
                Payments
              </FilterTab>
              <FilterTab active={activeType === 'charge'} onClick={() => setActiveType('charge')}>
                Charges
              </FilterTab>
              <FilterTab active={activeType === 'discount'} onClick={() => setActiveType('discount')}>
                Discounts
              </FilterTab>
              <FilterTab active={activeType === 'refund'} onClick={() => setActiveType('refund')}>
                Refunds
              </FilterTab>
            </FilterTabs>

            {hasFilters && (
              <Button variant="ghost" size="md" onClick={clearAllFilters}>
                <i className="ph ph-x" />
                Clear
              </Button>
            )}
          </ToolbarRow>

          {/* Summary Stats */}
          <ToolbarRow>
            <div className="transactions-stats">
              <div className="stat-item">
                <span className="stat-value stat-value--charges">{formatCurrency(stats.charges)}</span>
                <span className="stat-label">Charges</span>
              </div>
              <div className="stat-item">
                <span className="stat-value stat-value--payments">{formatCurrency(stats.payments)}</span>
                <span className="stat-label">Payments</span>
              </div>
              <div className="stat-item">
                <span className="stat-value stat-value--discounts">{formatCurrency(stats.discounts)}</span>
                <span className="stat-label">Discounts</span>
              </div>
              <div className="stat-item">
                <span className="stat-value stat-value--refunds">{formatCurrency(stats.refunds)}</span>
                <span className="stat-label">Refunds</span>
              </div>
            </div>
          </ToolbarRow>

        </Toolbar>

        {/* Loading State */}
        {isLoading && <TableSkeleton />}

        {/* Empty State */}
        {!isLoading && isEmpty && (
          <EmptyState
            hasFilters={hasFilters}
            onClearFilters={clearAllFilters}
            onAddTransaction={() => openAddModal()}
          />
        )}

        {/* Table */}
        {!isLoading && !isEmpty && (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell sortable sortDirection="desc">Date</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell sortable className="col-amount">Amount</TableHeaderCell>
                <TableHeaderCell className="col-balance">Balance</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>
                    <Badge variant={typeBadgeVariant[tx.type]}>
                      {typeLabels[tx.type]}
                    </Badge>
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
                  <TableCell className="col-amount">
                    <span className={`amount amount--${tx.type}`}>
                      {tx.type === 'charge' || tx.type === 'refund' ? '-' : '+'}
                      {formatCurrency(tx.amount)}
                    </span>
                  </TableCell>
                  <TableCell className="col-balance">
                    <span className={`balance balance--${tx.balanceType}`}>
                      {formatBalance(tx.balance, tx.balanceType)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Mobile Cards */}
        {!isLoading && !isEmpty && (
          <div className="mobile-cards">
            {filteredTransactions.map((tx) => (
              <div className="transaction-card" key={tx.id}>
                <div className="card-header">
                  <span className="card-date">{tx.date}</span>
                  <Badge variant={typeBadgeVariant[tx.type]}>
                    {typeLabels[tx.type]}
                  </Badge>
                </div>
                <div className="card-body">
                  <div className="card-description">
                    {tx.description}
                    {tx.isRecurring && <i className="ph ph-repeat" />}
                  </div>
                  <div className="card-student">{tx.student}</div>
                </div>
                <div className="card-footer">
                  <span className={`amount amount--${tx.type}`}>
                    {tx.type === 'charge' || tx.type === 'refund' ? '-' : '+'}
                    {formatCurrency(tx.amount)}
                  </span>
                  <span className={`balance balance--${tx.balanceType}`}>
                    Bal: {formatBalance(tx.balance, tx.balanceType)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isEmpty && (
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            totalItems={24}
            itemsPerPage={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </ListContainer>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        defaultType={addModalType}
        currentStudent="Emily Chen"
        familyStudents={['Emily Chen', 'Michael Chen']}
      />
    </div>
  );
}
