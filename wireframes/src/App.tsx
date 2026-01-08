import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { ComponentShowcase } from './pages/ComponentShowcase';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><ComponentShowcase /></AppLayout>} />
      <Route path="/students" element={<AppLayout><PlaceholderPage title="Students" /></AppLayout>} />
      <Route path="/calendar" element={<AppLayout><PlaceholderPage title="Calendar" /></AppLayout>} />
      <Route path="/invoices" element={<AppLayout><PlaceholderPage title="Invoices" /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><PlaceholderPage title="Settings" /></AppLayout>} />
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
