import { useState } from 'react';
import { Button, Input, Select } from '../../../components/design-system';
import './FilesTab.css';

type FileType = 'pdf' | 'image' | 'doc';
type ViewMode = 'grid' | 'list';

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  date: string;
}

interface StorageInfo {
  used: number;
  total: number;
}

// Mock data
const mockFiles: FileItem[] = [
  { id: 'f1', name: 'Initial Assessment.pdf', type: 'pdf', size: '2.4 MB', date: 'Sep 2021' },
  { id: 'f2', name: 'Student Photo.jpg', type: 'image', size: '1.2 MB', date: 'Sep 2021' },
  { id: 'f3', name: 'Progress Report Q4.pdf', type: 'pdf', size: '1.8 MB', date: 'Dec 2024' },
  { id: 'f4', name: 'Recital Certificate.pdf', type: 'pdf', size: '0.8 MB', date: 'Dec 2024' },
  { id: 'f5', name: 'Lesson Plan Template.docx', type: 'doc', size: '0.5 MB', date: 'Nov 2024' },
  { id: 'f6', name: 'Practice Log.pdf', type: 'pdf', size: '0.3 MB', date: 'Nov 2024' },
  { id: 'f7', name: 'Recital Video Thumbnail.jpg', type: 'image', size: '0.9 MB', date: 'Dec 2024' },
  { id: 'f8', name: 'Theory Worksheet.pdf', type: 'pdf', size: '0.4 MB', date: 'Oct 2024' },
];

const mockStorage: StorageInfo = {
  used: 45,
  total: 100,
};

const fileTypeIcons: Record<FileType, { icon: string; className: string }> = {
  pdf: { icon: 'file-pdf', className: 'file-icon--pdf' },
  image: { icon: 'image', className: 'file-icon--image' },
  doc: { icon: 'file-doc', className: 'file-icon--doc' },
};

export function FilesTab() {
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const storagePercent = (mockStorage.used / mockStorage.total) * 100;

  return (
    <div className="files-tab">
      {/* Toolbar */}
      <div className="files-toolbar">
        <div className="toolbar-left">
          <Button variant="primary">
            <i className="ph ph-upload" />
            Upload Files
          </Button>

          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Files</option>
            <option value="documents">Documents</option>
            <option value="images">Images</option>
            <option value="assessment">Assessments</option>
            <option value="certificate">Certificates</option>
          </Select>

          <div className="search-container">
            <i className="ph ph-magnifying-glass search-icon" />
            <Input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="toolbar-right">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <i className="ph ph-squares-four" />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <i className="ph ph-list" />
            </button>
          </div>
        </div>
      </div>

      {/* Storage Bar */}
      <div className="storage-bar">
        <span className="storage-label">Storage:</span>
        <div className="storage-progress">
          <div className="storage-fill" style={{ width: `${storagePercent}%` }} />
        </div>
        <span className="storage-text">{mockStorage.used} MB of {mockStorage.total} MB used</span>
      </div>

      {/* Files Container */}
      <div className="files-container">
        {viewMode === 'grid' ? (
          <div className="files-grid">
            {mockFiles.map(file => (
              <div
                key={file.id}
                className={`file-card ${selectedFiles.includes(file.id) ? 'file-card--selected' : ''}`}
                onClick={() => handleFileSelect(file.id)}
              >
                <input
                  type="checkbox"
                  className="file-checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleFileSelect(file.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="file-actions">
                  <button className="file-action-btn" onClick={(e) => e.stopPropagation()}>
                    <i className="ph ph-dots-three" />
                  </button>
                </div>
                <div className={`file-icon ${fileTypeIcons[file.type].className}`}>
                  <i className={`ph ph-${fileTypeIcons[file.type].icon}`} />
                </div>
                <div className="file-name" title={file.name}>{file.name}</div>
                <div className="file-meta">{file.size} - {file.date}</div>
              </div>
            ))}

            {/* Upload Zone */}
            <div className="upload-zone">
              <i className="ph ph-cloud-arrow-up upload-icon" />
              <div className="upload-text">Drop files here</div>
              <div className="upload-hint">or click to browse</div>
            </div>
          </div>
        ) : (
          <div className="files-list">
            {mockFiles.map(file => (
              <div
                key={file.id}
                className={`file-row ${selectedFiles.includes(file.id) ? 'file-row--selected' : ''}`}
              >
                <input
                  type="checkbox"
                  className="file-checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleFileSelect(file.id)}
                />
                <div className={`file-icon file-icon--small ${fileTypeIcons[file.type].className}`}>
                  <i className={`ph ph-${fileTypeIcons[file.type].icon}`} />
                </div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-meta">{file.size} - {file.date}</span>
                </div>
                <div className="file-actions">
                  <button className="action-btn" title="Download">
                    <i className="ph ph-download" />
                  </button>
                  <button className="action-btn" title="More">
                    <i className="ph ph-dots-three" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
