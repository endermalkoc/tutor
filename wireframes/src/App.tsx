import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { ComponentShowcase } from './pages/ComponentShowcase';
import { StudentListPage } from './pages/StudentListPage';
import { AddStudentPage } from './pages/AddStudentPage';
import { StudentDetailPage } from './pages/StudentDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><PlaceholderPage title="Dashboard" /></AppLayout>} />
      <Route path="/students" element={<AppLayout><StudentListPage /></AppLayout>} />
      <Route path="/students/add" element={<AppLayout><AddStudentPage /></AppLayout>} />
      <Route path="/students/:id/*" element={<AppLayout><StudentDetailPage /></AppLayout>} />
      <Route path="/calendar" element={<AppLayout><PlaceholderPage title="Calendar" /></AppLayout>} />
      <Route path="/invoices" element={<AppLayout><PlaceholderPage title="Invoices" /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><PlaceholderPage title="Settings" /></AppLayout>} />
      <Route path="/design-system" element={<AppLayout><ComponentShowcase /></AppLayout>} />
    </Routes>
  );
}

// Placeholder component for routes not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <h1 className="h2">{title}</h1>
      <p className="text-muted mt-2">This page will be implemented when wireframes are migrated.</p>
    </div>
  );
}

export default App;
