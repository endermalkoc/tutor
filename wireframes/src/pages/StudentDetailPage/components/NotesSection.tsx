import { useState, useRef, KeyboardEvent } from 'react';
import { SectionCard, Button } from '../../../components/design-system';
import './NotesSection.css';

export interface Note {
  id: string;
  content: string;
  date: string;
  isPinned?: boolean;
}

export interface NotesSectionProps {
  notes: Note[];
  pinnedNote?: Note;
  totalCount?: number;
  onAddNote?: (content: string) => void;
  onEditNote?: (noteId: string, content: string) => void;
  onDeleteNote?: (noteId: string) => void;
  onPinNote?: (noteId: string) => void;
  onUnpinNote?: (noteId: string) => void;
  onShowAllNotes?: () => void;
  className?: string;
}

export function NotesSection({
  notes,
  pinnedNote,
  totalCount,
  onAddNote,
  onEditNote,
  onDeleteNote,
  onPinNote,
  onUnpinNote,
  onShowAllNotes,
  className = '',
}: NotesSectionProps) {
  const [quickNoteValue, setQuickNoteValue] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleQuickNoteKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleAddQuickNote();
    }
    if (e.key === 'Escape') {
      setQuickNoteValue('');
      textareaRef.current?.blur();
    }
  };

  const handleAddQuickNote = () => {
    const trimmed = quickNoteValue.trim();
    if (trimmed) {
      onAddNote?.(trimmed);
      setQuickNoteValue('');
    }
  };

  const handleCancelQuickNote = () => {
    setQuickNoteValue('');
    textareaRef.current?.blur();
  };

  const startEditing = (note: Note) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  const saveEdit = () => {
    if (editingNoteId && editingContent.trim()) {
      onEditNote?.(editingNoteId, editingContent.trim());
    }
    setEditingNoteId(null);
    setEditingContent('');
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditingContent('');
  };

  const displayedNotes = notes.filter(n => !n.isPinned);
  const remaining = totalCount ? totalCount - displayedNotes.length - (pinnedNote ? 1 : 0) : 0;

  return (
    <SectionCard
      title="Notes"
      variant="secondary"
      className={className}
    >
      <div className="notes-section-content">
        {/* Quick Add */}
        <div className="quick-add-note">
          <textarea
            ref={textareaRef}
            className="quick-add-input"
            placeholder="Add a quick note..."
            value={quickNoteValue}
            onChange={(e) => setQuickNoteValue(e.target.value)}
            onKeyDown={handleQuickNoteKeydown}
            rows={1}
          />
          <div className={`quick-add-actions ${quickNoteValue ? 'visible' : ''}`}>
            <Button variant="secondary" size="sm" onClick={handleCancelQuickNote}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddQuickNote}>
              Add Note
            </Button>
          </div>
        </div>

        {/* Pinned Note */}
        {pinnedNote && (
          <div className="pinned-note">
            <div className="pinned-note-header">
              <span className="pinned-note-label">
                <i className="ph ph-push-pin" />
                Pinned
              </span>
            </div>
            {editingNoteId === pinnedNote.id ? (
              <div className="note-edit-form">
                <textarea
                  className="note-edit-input"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  rows={3}
                  autoFocus
                />
                <div className="note-edit-actions">
                  <Button variant="secondary" size="sm" onClick={cancelEdit}>Cancel</Button>
                  <Button variant="primary" size="sm" onClick={saveEdit}>Save</Button>
                </div>
              </div>
            ) : (
              <div className="pinned-note-content">{pinnedNote.content}</div>
            )}
            <div className="pinned-note-actions">
              <button
                className="note-action-btn"
                title="Edit"
                onClick={() => startEditing(pinnedNote)}
              >
                <i className="ph ph-pencil" />
              </button>
              <button
                className="note-action-btn"
                title="Unpin"
                onClick={() => onUnpinNote?.(pinnedNote.id)}
              >
                <i className="ph ph-push-pin-slash" />
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        {displayedNotes.length > 0 && (
          <>
            <div className="notes-list-header">
              <span className="notes-list-title">Recent Notes</span>
            </div>
            <div className="notes-list">
              {displayedNotes.map(note => (
                <div key={note.id} className="note-entry">
                  {editingNoteId === note.id ? (
                    <div className="note-edit-form">
                      <textarea
                        className="note-edit-input"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={3}
                        autoFocus
                      />
                      <div className="note-edit-actions">
                        <Button variant="secondary" size="sm" onClick={cancelEdit}>Cancel</Button>
                        <Button variant="primary" size="sm" onClick={saveEdit}>Save</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="note-entry-content">{note.content}</div>
                      <div className="note-entry-meta">
                        <span>{note.date}</span>
                      </div>
                      <div className="note-entry-actions">
                        <button
                          className="note-action-btn"
                          title="Pin"
                          onClick={() => onPinNote?.(note.id)}
                        >
                          <i className="ph ph-push-pin" />
                        </button>
                        <button
                          className="note-action-btn"
                          title="Edit"
                          onClick={() => startEditing(note)}
                        >
                          <i className="ph ph-pencil" />
                        </button>
                        <button
                          className="note-action-btn note-action-btn--danger"
                          title="Delete"
                          onClick={() => onDeleteNote?.(note.id)}
                        >
                          <i className="ph ph-trash" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Show All Notes */}
        {remaining > 0 && (
          <button className="show-all-notes" onClick={onShowAllNotes}>
            Show all {totalCount} notes
            <i className="ph ph-caret-down" />
          </button>
        )}
      </div>
    </SectionCard>
  );
}
