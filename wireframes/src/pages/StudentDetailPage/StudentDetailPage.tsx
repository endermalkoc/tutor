import { useState, useRef } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { Breadcrumb } from '../../components/layout';
import {
  StudentHeader,
  StudentDetailTabs,
  PreLessonCard,
  LessonSettingsSection,
  ContactSection,
  FamilySection,
  NotesSection,
  PersonalDetailsSection,
} from './components';
import {
  LessonsTab,
  HomeworkTab,
  MessagesTab,
  InvoicesTab,
  TransactionsTab,
  FilesTab,
} from './tabs';
import type {
  LessonSettingsData,
  ContactData,
  PersonalDetailsData,
  GuardianData,
  Note,
  Sibling,
  BillingInfo,
} from './components';
import './StudentDetailPage.css';

// Mock data for the wireframe demo
const childStudentData = {
  id: '1',
  firstName: 'Emily',
  lastName: 'Chen',
  initials: 'EC',
  type: 'child' as const,
  status: 'active' as const,
  email: 'emily@example.com',
  phone: '(555) 123-4567',
  smsCapable: true,
  primaryGuardian: {
    id: 'g1',
    name: 'Jennifer Chen',
    relationship: 'Mother',
  },
  teachingSince: 'Teaching since Sep 2024 (4 months)',
  nextLesson: {
    date: 'Tomorrow at 3:00 PM',
    isToday: false,
  },
};

const adultStudentData = {
  ...childStudentData,
  firstName: 'Michael',
  lastName: 'Anderson',
  initials: 'MA',
  type: 'adult' as const,
  email: 'michael@example.com',
  phone: '(555) 987-6543',
  primaryGuardian: undefined,
  teachingSince: 'Teaching since Jan 2024 (12 months)',
};

const preLessonItems = [
  { label: 'Last Lesson', value: 'Jan 6 - Chopin Nocturne Op. 9 No. 2' },
  { label: 'Homework Status', value: 'Practice measures 24-48 (assigned)' },
  { label: 'Recent Note', value: 'Making great progress on dynamics' },
];

const lessonSettingsData: LessonSettingsData = {
  subjects: ['Piano', 'Music Theory'],
  duration: 30,
  category: 'individual',
  skillLevel: 'advanced',
  tags: [
    { label: 'Competition Ready', color: 'purple' },
    { label: 'Advanced Theory', color: 'teal' },
  ],
};

const childContactData: ContactData = {
  email: 'emily@example.com',
  phone: '(555) 123-4567',
  smsCapable: true,
  lastContacted: 'Jan 6, 2025',
  emailReminders: true,
  smsReminders: true,
};

const adultContactData: ContactData = {
  email: 'michael@example.com',
  phone: '(555) 987-6543',
  smsCapable: true,
  lastContacted: 'Jan 5, 2025',
  address: {
    street: '456 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
  },
  emailReminders: true,
  smsReminders: false,
};

const guardiansData: GuardianData[] = [
  {
    id: 'g1',
    firstName: 'Jennifer',
    lastName: 'Chen',
    relationship: 'mother',
    email: 'jennifer@example.com',
    phones: [
      { type: 'mobile', number: '(555) 123-4567', smsCapable: true },
      { type: 'home', number: '(555) 234-5678' },
    ],
    address: {
      street: '123 Oak Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
    },
    isPrimary: true,
    isEmergency: true,
    receivesInvoices: true,
    emailReminders: true,
    smsReminders: true,
    privateNote: 'Prefers email communication. Very responsive.',
  },
  {
    id: 'g2',
    firstName: 'David',
    lastName: 'Chen',
    relationship: 'father',
    email: 'david@example.com',
    phones: [
      { type: 'mobile', number: '(555) 345-6789', smsCapable: true },
      { type: 'work', number: '(555) 456-7890' },
    ],
    isPrimary: false,
    isEmergency: false,
    receivesInvoices: false,
    emailReminders: false,
    smsReminders: false,
  },
];

const siblingsData: Sibling[] = [
  { id: '2', name: 'Ethan Chen', status: 'active' },
];

const billingInfoData: BillingInfo = {
  lessonRate: 60,
  creditBalance: 120,
};

const notesData: Note[] = [
  {
    id: 'n1',
    content: 'Emily is making excellent progress on the Chopin Nocturne. Focus on dynamics and pedaling.',
    date: 'Jan 6, 2025',
    isPinned: true,
  },
  {
    id: 'n2',
    content: 'Scales need more work. Assigned additional practice for C major and G major.',
    date: 'Jan 3, 2025',
  },
  {
    id: 'n3',
    content: 'Student seemed tired today. Consider adjusting lesson time.',
    date: 'Dec 28, 2024',
  },
];

const childPersonalDetailsData: PersonalDetailsData = {
  firstName: 'Emily',
  lastName: 'Chen',
  type: 'child',
  status: 'active',
  gender: 'female',
  birthday: '2015-04-12',
  school: 'Lincoln Elementary',
  referrer: 'Google Search',
  studentSince: '2024-09',
};

const adultPersonalDetailsData: PersonalDetailsData = {
  firstName: 'Michael',
  lastName: 'Anderson',
  type: 'adult',
  status: 'active',
  gender: 'male',
  birthday: '1985-08-22',
  referrer: 'Friend referral',
  studentSince: '2024-01',
};

interface OverviewTabProps {
  isAdult: boolean;
  personalDetailsRef: React.RefObject<HTMLDivElement>;
  personalDetailsEditing: boolean;
  onPersonalDetailsEditChange: (editing: boolean) => void;
}

// Overview Tab Component
function OverviewTab({
  isAdult,
  personalDetailsRef,
  personalDetailsEditing,
  onPersonalDetailsEditChange,
}: OverviewTabProps) {
  const [lessonSettings, setLessonSettings] = useState(lessonSettingsData);
  const [contactInfo, setContactInfo] = useState(isAdult ? adultContactData : childContactData);
  const [personalDetails, setPersonalDetails] = useState(
    isAdult ? adultPersonalDetailsData : childPersonalDetailsData
  );
  const [notes, setNotes] = useState(notesData);
  const [guardians, setGuardians] = useState(guardiansData);

  const pinnedNote = notes.find(n => n.isPinned);

  const handleAddNote = (content: string) => {
    const newNote: Note = {
      id: `n${Date.now()}`,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setNotes([newNote, ...notes]);
  };

  const handlePinNote = (noteId: string) => {
    setNotes(notes.map(n => ({
      ...n,
      isPinned: n.id === noteId,
    })));
  };

  const handleUnpinNote = () => {
    setNotes(notes.map(n => ({ ...n, isPinned: false })));
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
  };

  const handleEditNote = (noteId: string, content: string) => {
    setNotes(notes.map(n => n.id === noteId ? { ...n, content } : n));
  };

  return (
    <div className="student-detail-overview">
      {/* Pre-Lesson Card - only shown when there's an upcoming lesson */}
      <PreLessonCard items={preLessonItems} />

      {/* Two Column Layout */}
      <div className="overview-columns">
        {/* Left Column */}
        <div className="overview-column overview-column--left">
          <LessonSettingsSection
            data={lessonSettings}
            onSave={setLessonSettings}
          />

          <ContactSection
            data={contactInfo}
            isAdult={isAdult}
            onSave={setContactInfo}
          />

          {!isAdult && (
            <FamilySection
              guardians={guardians}
              siblings={siblingsData}
              billingInfo={billingInfoData}
              onGuardianEdit={(guardian) => {
                setGuardians(guardians.map(g => g.id === guardian.id ? guardian : g));
              }}
              onGuardianAdd={(guardian) => {
                setGuardians([...guardians, { ...guardian, id: `g${Date.now()}` }]);
              }}
              onGuardianDelete={(guardianId) => {
                setGuardians(guardians.filter(g => g.id !== guardianId));
              }}
              onSetPrimaryGuardian={(guardianId) => {
                setGuardians(guardians.map(g => ({ ...g, isPrimary: g.id === guardianId })));
              }}
              onToggleEmergency={(guardianId) => {
                setGuardians(guardians.map(g =>
                  g.id === guardianId ? { ...g, isEmergency: !g.isEmergency } : g
                ));
              }}
            />
          )}
        </div>

        {/* Right Column */}
        <div className="overview-column overview-column--right">
          <NotesSection
            notes={notes.filter(n => !n.isPinned).slice(0, 3)}
            pinnedNote={pinnedNote}
            totalCount={notes.length}
            onAddNote={handleAddNote}
            onPinNote={handlePinNote}
            onUnpinNote={handleUnpinNote}
            onDeleteNote={handleDeleteNote}
            onEditNote={handleEditNote}
          />

          <PersonalDetailsSection
            ref={personalDetailsRef}
            data={personalDetails}
            onSave={setPersonalDetails}
            editing={personalDetailsEditing}
            onEditChange={onPersonalDetailsEditChange}
          />
        </div>
      </div>
    </div>
  );
}


export function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isAdult, setIsAdult] = useState(false);
  const [personalDetailsEditing, setPersonalDetailsEditing] = useState(false);
  const personalDetailsRef = useRef<HTMLDivElement>(null);

  const studentData = isAdult ? adultStudentData : childStudentData;

  const handleEditStudent = () => {
    // Scroll to personal details section and trigger edit mode
    personalDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPersonalDetailsEditing(true);
  };

  return (
    <div className="student-detail-page">
      {/* Demo Controls */}
      <div className="demo-controls">
        <label className="demo-toggle">
          <input
            type="checkbox"
            checked={isAdult}
            onChange={(e) => setIsAdult(e.target.checked)}
          />
          <span>Adult Student View</span>
        </label>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Students', href: '/students' },
          { label: `${studentData.firstName} ${studentData.lastName}` },
        ]}
      />

      {/* Student Header */}
      <StudentHeader
        student={studentData}
        onScheduleLesson={() => console.log('Schedule lesson')}
        onEdit={handleEditStudent}
        onSendMessage={() => console.log('Send message')}
        onChangeStatus={() => console.log('Change status')}
        onArchive={() => console.log('Archive')}
        onDelete={() => console.log('Delete')}
      />

      {/* Tab Navigation */}
      <StudentDetailTabs studentId={id || '1'} />

      {/* Tab Content */}
      <div className="tab-content">
        <Routes>
          <Route index element={
            <OverviewTab
              isAdult={isAdult}
              personalDetailsRef={personalDetailsRef}
              personalDetailsEditing={personalDetailsEditing}
              onPersonalDetailsEditChange={setPersonalDetailsEditing}
            />
          } />
          <Route path="lessons" element={<LessonsTab />} />
          <Route path="homework" element={<HomeworkTab />} />
          <Route path="messages" element={<MessagesTab />} />
          <Route path="invoices" element={<InvoicesTab />} />
          <Route path="transactions" element={<TransactionsTab />} />
          <Route path="files" element={<FilesTab />} />
        </Routes>
      </div>
    </div>
  );
}
