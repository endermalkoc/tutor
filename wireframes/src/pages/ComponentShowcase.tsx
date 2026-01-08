import { useState } from 'react';
import {
  Button,
  ButtonLink,
  Badge,
  StatusDot,
  Input,
  Textarea,
  FormGroup,
  FormLabel,
  FormHint,
  FormError,
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
  CardFooter,
  MetricCard,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableActions,
  TableActionButton,
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
  FormSection,
  FormRow,
  Fieldset,
  ExpandToggle,
  ExpandableContent,
  Combobox,
  InlineForm,
  TagInput,
} from '../components/design-system';
import type { ComboboxOption } from '../components/design-system';
import { PageHeader, Breadcrumb } from '../components/layout';
import './ComponentShowcase.css';

// Mock data for Combobox
const familyOptions: ComboboxOption[] = [
  { value: '1', label: 'Anderson Family', description: 'John Anderson · john@example.com' },
  { value: '2', label: 'Martinez Family', description: 'Maria Martinez · maria@example.com' },
  { value: '3', label: 'Thompson Family', description: 'Sarah Thompson · sarah@example.com' },
];

export function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [switchOn, setSwitchOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // New component states
  const [expandedSection, setExpandedSection] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [subjectTags, setSubjectTags] = useState<string[]>(['Piano', 'Music Theory']);

  return (
    <div className="showcase">
      <PageHeader
        title="Component Showcase"
        subtitle="Design system components for wireframes"
      />

      {/* Navigation */}
      <section className="showcase-section">
        <h2 className="showcase-title">Navigation</h2>
        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-label">Breadcrumb</div>
            <Breadcrumb
              items={[
                { label: 'Students', href: '/students' },
                { label: 'Emily Chen' },
              ]}
            />
            <div style={{ marginTop: 'var(--space-4)' }}>
              <Breadcrumb
                items={[
                  { label: 'Dashboard', href: '/' },
                  { label: 'Settings', href: '/settings' },
                  { label: 'Notifications' },
                ]}
              />
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Page Header</div>
            <PageHeader
              title="Students"
              subtitle="247 total students"
              actions={<Button variant="primary"><i className="ph ph-plus" /> Add Student</Button>}
            />
          </div>
          <div className="showcase-card full-width">
            <div className="showcase-label">Page Header with Breadcrumbs</div>
            <PageHeader
              title="Emily Chen"
              subtitle="Active · Piano, Music Theory"
              breadcrumbs={[
                { label: 'Students', href: '/students' },
                { label: 'Emily Chen' },
              ]}
              actions={
                <>
                  <Button variant="secondary">Edit</Button>
                  <Button variant="primary"><i className="ph ph-calendar-plus" /> Schedule Lesson</Button>
                </>
              }
            />
          </div>
        </div>
      </section>

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
            <div className="showcase-label">With Icons</div>
            <div className="showcase-row">
              <Button variant="primary">
                <i className="ph ph-plus" /> Add Student
              </Button>
              <Button variant="secondary">
                <i className="ph ph-download-simple" /> Export
              </Button>
              <Button variant="ghost">
                <i className="ph ph-gear" /> Settings
              </Button>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">States</div>
            <div className="showcase-row">
              <Button disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Button Links</div>
            <div className="showcase-row">
              <ButtonLink href="#" variant="primary">Primary Link</ButtonLink>
              <ButtonLink href="#" variant="secondary">Secondary Link</ButtonLink>
              <ButtonLink href="#" variant="ghost">Ghost Link</ButtonLink>
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
            <div className="showcase-label">Badges with Icons</div>
            <div className="showcase-row">
              <Badge variant="success"><i className="ph ph-check-circle" /> Paid</Badge>
              <Badge variant="warning"><i className="ph ph-clock" /> Pending</Badge>
              <Badge variant="error"><i className="ph ph-x-circle" /> Overdue</Badge>
              <Badge variant="primary"><i className="ph ph-star" /> Featured</Badge>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Status Dots</div>
            <div className="showcase-row">
              <div className="flex items-center gap-2">
                <StatusDot variant="success" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot variant="warning" />
                <span>On Hold</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot variant="error" />
                <span>Cancelled</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot variant="neutral" />
                <span>Inactive</span>
              </div>
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
          <div className="showcase-card">
            <div className="showcase-label">Tag Input</div>
            <div style={{ maxWidth: 400 }}>
              <TagInput
                value={subjectTags}
                onChange={setSubjectTags}
                placeholder="Add subjects..."
              />
            </div>
            <p className="body-sm text-secondary mt-2">Type and press Enter or comma to add tags</p>
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
                <FormError>Please enter a valid email address.</FormError>
              </FormGroup>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Input Sizes</div>
            <div className="showcase-stack">
              <Input inputSize="sm" placeholder="Small input" />
              <Input inputSize="md" placeholder="Medium input (default)" />
              <Input inputSize="lg" placeholder="Large input" />
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
                <FormHint>Optional. Maximum 500 characters.</FormHint>
              </FormGroup>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Checkbox, Radio & Switch</div>
            <div className="showcase-stack">
              <Checkbox label="Checkbox option" />
              <Checkbox label="Checked checkbox" defaultChecked />
              <Checkbox label="Disabled checkbox" disabled />
              <RadioGroup>
                <Radio name="demo" label="Radio option 1" defaultChecked />
                <Radio name="demo" label="Radio option 2" />
                <Radio name="demo" label="Radio option 3" />
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Switch checked={switchOn} onChange={setSwitchOn} />
                <span className="body-sm">{switchOn ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Sections & Layout */}
      <section className="showcase-section">
        <h2 className="showcase-title">Form Sections & Layout</h2>
        <Card>
          <CardBody>
            <FormSection title="Student Information" badge="Required">
              <FormRow>
                <FormGroup>
                  <FormLabel required>First Name</FormLabel>
                  <Input placeholder="Enter first name" />
                </FormGroup>
                <FormGroup>
                  <FormLabel required>Last Name</FormLabel>
                  <Input placeholder="Enter last name" />
                </FormGroup>
              </FormRow>
              <FormRow>
                <Fieldset legend="Student Type" required>
                  <RadioGroup orientation="horizontal">
                    <Radio name="type-demo" label="Child" defaultChecked />
                    <Radio name="type-demo" label="Adult" />
                  </RadioGroup>
                </Fieldset>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="student@example.com" />
                </FormGroup>
              </FormRow>

              <ExpandToggle
                label="Add additional details..."
                expanded={expandedSection}
                onToggle={() => setExpandedSection(!expandedSection)}
              />
              <ExpandableContent expanded={expandedSection}>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Birthday</FormLabel>
                    <Input type="date" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>School</FormLabel>
                    <Input placeholder="School name" />
                  </FormGroup>
                </FormRow>
              </ExpandableContent>
            </FormSection>

            <FormSection title="Notes" badge="Optional" badgeVariant="optional" noBorder>
              <FormRow columns={1}>
                <FormGroup>
                  <Textarea placeholder="Add notes..." />
                  <FormHint>Only visible to you</FormHint>
                </FormGroup>
              </FormRow>
            </FormSection>
          </CardBody>
        </Card>
      </section>

      {/* Combobox */}
      <section className="showcase-section">
        <h2 className="showcase-title">Combobox</h2>
        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-label">Searchable Dropdown</div>
            <div style={{ maxWidth: 400 }}>
              <Combobox
                options={familyOptions}
                value={selectedFamily}
                placeholder="Search families..."
                searchPlaceholder="Search by name or email..."
                onChange={setSelectedFamily}
                onCreateNew={() => setShowInlineForm(true)}
                createNewLabel="Create new family"
              />
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-label">Selected Value</div>
            <p className="text-secondary body-sm">
              {selectedFamily
                ? `Selected: ${familyOptions.find((f) => f.value === selectedFamily)?.label}`
                : 'No family selected'}
            </p>
            {selectedFamily && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedFamily('')}>
                Clear Selection
              </Button>
            )}
          </div>
        </div>

        {showInlineForm && (
          <div style={{ marginTop: 'var(--space-4)', maxWidth: 600 }}>
            <InlineForm title="New Family - Guardian" onCancel={() => setShowInlineForm(false)}>
              <FormRow>
                <FormGroup>
                  <FormLabel required>First Name</FormLabel>
                  <Input placeholder="First name" />
                </FormGroup>
                <FormGroup>
                  <FormLabel required>Last Name</FormLabel>
                  <Input placeholder="Last name" />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="parent@example.com" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone</FormLabel>
                  <Input type="tel" placeholder="(555) 123-4567" />
                  <FormHint>Email or phone required</FormHint>
                </FormGroup>
              </FormRow>
            </InlineForm>
          </div>
        )}
      </section>

      {/* Cards */}
      <section className="showcase-section">
        <h2 className="showcase-title">Cards</h2>
        <div className="showcase-grid showcase-grid-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-secondary">This is a basic card with header and body sections.</p>
            </CardBody>
          </Card>
          <Card hoverable style={{ cursor: 'pointer' }}>
            <CardBody>
              <div className="flex items-center gap-3 mb-4">
                <Avatar initials="JS" size="lg" />
                <div>
                  <div style={{ fontWeight: 600 }}>John Smith</div>
                  <div className="caption">Piano • Intermediate</div>
                </div>
              </div>
              <p className="body-sm text-secondary">Next lesson: Today at 3:00 PM</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>With Footer</CardTitle>
              <Badge variant="success">Active</Badge>
            </CardHeader>
            <CardBody>
              <p className="text-secondary body-sm">Card with header, body, and footer sections.</p>
            </CardBody>
            <CardFooter>
              <div className="flex items-center justify-between">
                <span className="caption">Last updated 2h ago</span>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </CardFooter>
          </Card>
          <MetricCard
            label="Total Students"
            value="247"
            change={{ value: '+12%', positive: true }}
          />
          <MetricCard
            label="Revenue (MTD)"
            value="$12,450"
            change={{ value: '-3%', positive: false }}
          />
          <MetricCard
            label="Lessons This Week"
            value="42"
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
              <TableHeaderCell checkbox>
                <Checkbox />
              </TableHeaderCell>
              <TableHeaderCell sortable sortDirection="asc">Student</TableHeaderCell>
              <TableHeaderCell>Subject</TableHeaderCell>
              <TableHeaderCell sortable>Status</TableHeaderCell>
              <TableHeaderCell>Next Lesson</TableHeaderCell>
              <TableHeaderCell className="text-right">Balance</TableHeaderCell>
              <TableHeaderCell style={{ width: 100 }}></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar initials="EM" size="sm" />
                  <div>
                    <div style={{ fontWeight: 500 }}>Emily Martinez</div>
                    <div className="caption mono">STU_2847</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>Piano</TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell>
                <div>Today, 3:00 PM</div>
                <div className="caption">In 2 hours</div>
              </TableCell>
              <TableCell className="text-right" mono>$240.00</TableCell>
              <TableCell>
                <TableActions>
                  <TableActionButton title="Edit">
                    <i className="ph ph-pencil-simple" />
                  </TableActionButton>
                  <TableActionButton title="More">
                    <i className="ph ph-dots-three" />
                  </TableActionButton>
                </TableActions>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell><Checkbox defaultChecked /></TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar initials="JC" size="sm" />
                  <div>
                    <div style={{ fontWeight: 500 }}>James Chen</div>
                    <div className="caption mono">STU_2853</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>Guitar</TableCell>
              <TableCell><Badge variant="warning">On Hold</Badge></TableCell>
              <TableCell>
                <div>Jan 20, 4:00 PM</div>
                <div className="caption">In 5 days</div>
              </TableCell>
              <TableCell className="text-right" mono>$0.00</TableCell>
              <TableCell>
                <TableActions>
                  <TableActionButton title="Edit">
                    <i className="ph ph-pencil-simple" />
                  </TableActionButton>
                  <TableActionButton title="More">
                    <i className="ph ph-dots-three" />
                  </TableActionButton>
                </TableActions>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar initials="SW" size="sm" />
                  <div>
                    <div style={{ fontWeight: 500 }}>Sarah Wilson</div>
                    <div className="caption mono">STU_2801</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>Violin</TableCell>
              <TableCell><Badge variant="success">Active</Badge></TableCell>
              <TableCell>
                <div>Tomorrow, 10:00 AM</div>
                <div className="caption">In 18 hours</div>
              </TableCell>
              <TableCell className="text-right" mono>$480.00</TableCell>
              <TableCell>
                <TableActions>
                  <TableActionButton title="Edit">
                    <i className="ph ph-pencil-simple" />
                  </TableActionButton>
                  <TableActionButton title="More">
                    <i className="ph ph-dots-three" />
                  </TableActionButton>
                </TableActions>
              </TableCell>
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
