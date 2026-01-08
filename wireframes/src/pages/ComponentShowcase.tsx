import { useState } from 'react';
import {
  Button,
  Badge,
  Input,
  Textarea,
  FormGroup,
  FormLabel,
  FormHint,
  Select,
  Option,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Tag,
  TagList,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  MetricCard,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab,
  FilterTabs,
  FilterTab,
  Avatar,
  AvatarStack,
  Alert,
  Toast,
  Pagination,
  EmptyState,
} from '../components/design-system';
import { PageHeader } from '../components/layout';
import './ComponentShowcase.css';

export function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [switchOn, setSwitchOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="showcase">
      <PageHeader
        title="Component Showcase"
        subtitle="Design system components for wireframes"
      />

      {/* Buttons */}
      <section className="showcase-section">
        <h2 className="showcase-title">Buttons</h2>
        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-label">Variants</div>
            <div className="showcase-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Sizes</div>
            <div className="showcase-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">States</div>
            <div className="showcase-row">
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Badges & Tags */}
      <section className="showcase-section">
        <h2 className="showcase-title">Badges & Tags</h2>
        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-label">Badge Variants</div>
            <div className="showcase-row">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="indigo">Indigo</Badge>
              <Badge variant="cyan">Cyan</Badge>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Tags</div>
            <TagList>
              <Tag color="blue">Blue</Tag>
              <Tag color="green">Green</Tag>
              <Tag color="orange">Orange</Tag>
              <Tag color="purple">Purple</Tag>
              <Tag color="outline">Outline</Tag>
              <Tag color="red" onRemove={() => {}}>Removable</Tag>
            </TagList>
          </div>
        </div>
      </section>

      {/* Form Controls */}
      <section className="showcase-section">
        <h2 className="showcase-title">Form Controls</h2>
        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-label">Inputs</div>
            <div className="showcase-stack">
              <FormGroup>
                <FormLabel>Default Input</FormLabel>
                <Input placeholder="Enter text..." />
              </FormGroup>
              <FormGroup>
                <FormLabel required>Required Field</FormLabel>
                <Input placeholder="Required..." />
                <FormHint>This field is required</FormHint>
              </FormGroup>
              <FormGroup error>
                <FormLabel>Error State</FormLabel>
                <Input error placeholder="Invalid input" />
              </FormGroup>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Select & Textarea</div>
            <div className="showcase-stack">
              <FormGroup>
                <FormLabel>Select</FormLabel>
                <Select>
                  <Option value="">Select an option...</Option>
                  <Option value="1">Option 1</Option>
                  <Option value="2">Option 2</Option>
                  <Option value="3">Option 3</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <FormLabel>Textarea</FormLabel>
                <Textarea placeholder="Enter description..." />
              </FormGroup>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Checkbox, Radio & Switch</div>
            <div className="showcase-stack">
              <Checkbox label="Checkbox option" />
              <RadioGroup>
                <Radio name="demo" label="Radio option 1" defaultChecked />
                <Radio name="demo" label="Radio option 2" />
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Switch checked={switchOn} onChange={setSwitchOn} />
                <span className="body-sm">{switchOn ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="showcase-section">
        <h2 className="showcase-title">Cards</h2>
        <div className="showcase-grid showcase-grid-3">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-secondary">This is the card body content.</p>
            </CardBody>
          </Card>
          <MetricCard
            label="Active Students"
            value="247"
            change={{ value: '+12%', positive: true }}
          />
          <MetricCard
            label="Monthly Revenue"
            value="$4,250"
            change={{ value: '-3%', positive: false }}
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="showcase-section">
        <h2 className="showcase-title">Tabs</h2>
        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-label">Standard Tabs</div>
            <Tabs>
              <Tab active={activeTab === 0} onClick={() => setActiveTab(0)}>Overview</Tab>
              <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>Details</Tab>
              <Tab active={activeTab === 2} onClick={() => setActiveTab(2)}>History</Tab>
            </Tabs>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Filter Tabs</div>
            <FilterTabs>
              <FilterTab active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>All</FilterTab>
              <FilterTab active={activeFilter === 'active'} onClick={() => setActiveFilter('active')}>Active</FilterTab>
              <FilterTab active={activeFilter === 'trial'} onClick={() => setActiveFilter('trial')}>Trial</FilterTab>
              <FilterTab active={activeFilter === 'inactive'} onClick={() => setActiveFilter('inactive')}>Inactive</FilterTab>
            </FilterTabs>
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="showcase-section">
        <h2 className="showcase-title">Avatars</h2>
        <div className="showcase-card">
          <div className="showcase-label">Sizes & Stack</div>
          <div className="showcase-row">
            <Avatar initials="SM" size="sm" />
            <Avatar initials="MD" size="md" />
            <Avatar initials="LG" size="lg" />
            <Avatar initials="XL" size="xl" />
            <div style={{ marginLeft: 'var(--space-4)' }}>
              <AvatarStack>
                <Avatar initials="A" size="md" />
                <Avatar initials="B" size="md" />
                <Avatar initials="C" size="md" />
              </AvatarStack>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="showcase-section">
        <h2 className="showcase-title">Alerts</h2>
        <div className="showcase-stack">
          <Alert variant="info" title="Information">
            This is an informational message.
          </Alert>
          <Alert variant="success" title="Success">
            Operation completed successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review before continuing.
          </Alert>
          <Alert variant="error" title="Error">
            Something went wrong.
          </Alert>
        </div>
      </section>

      {/* Table */}
      <section className="showcase-section">
        <h2 className="showcase-title">Table</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell sortable sortDirection="asc">Status</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Emily Chen</TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell mono>emily@example.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Marcus Williams</TableCell>
              <TableCell><Badge variant="indigo">Trial</Badge></TableCell>
              <TableCell mono>marcus@example.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sophie Martinez</TableCell>
              <TableCell><Badge variant="warning">Waiting</Badge></TableCell>
              <TableCell mono>sophie@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Pagination */}
      <section className="showcase-section">
        <h2 className="showcase-title">Pagination</h2>
        <Card>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            totalItems={247}
            itemsPerPage={25}
            onPageChange={setCurrentPage}
          />
        </Card>
      </section>

      {/* Empty State */}
      <section className="showcase-section">
        <h2 className="showcase-title">Empty State</h2>
        <Card>
          <EmptyState
            title="No students found"
            description="Get started by adding your first student to the system."
            action={<Button>Add Student</Button>}
          />
        </Card>
      </section>

      {/* Modal & Toast */}
      <section className="showcase-section">
        <h2 className="showcase-title">Modal & Toast</h2>
        <div className="showcase-row">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="secondary" onClick={() => setToastVisible(true)}>Show Toast</Button>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader onClose={() => setModalOpen(false)}>
          <ModalTitle>Example Modal</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-secondary">This is the modal content. You can put any content here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setModalOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>

      <Toast
        show={toastVisible}
        variant="success"
        onClose={() => setToastVisible(false)}
      >
        Action completed successfully!
      </Toast>
    </div>
  );
}
