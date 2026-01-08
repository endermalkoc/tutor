import { useState } from 'react';
import {
  SectionCard,
  DataGrid,
  Tag,
  TagList,
  TagInput,
  Select,
  Option,
  FormGroup,
  FormLabel,
  Input,
} from '../../../components/design-system';
import type { TagColor } from '../../../components/design-system';

export interface LessonSettingsData {
  subjects: string[];
  duration: number;
  category: 'individual' | 'group';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  tags: Array<{ label: string; color: TagColor }>;
}

export interface LessonSettingsSectionProps {
  data: LessonSettingsData;
  onSave?: (data: LessonSettingsData) => void;
  className?: string;
}

const durationOptions = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
  { value: 90, label: '90 minutes' },
  { value: 'custom', label: 'Custom' },
];

const categoryOptions = [
  { value: 'individual', label: 'Individual' },
  { value: 'group', label: 'Group' },
];

const skillLevelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const standardDurations = [30, 45, 60, 90];

export function LessonSettingsSection({ data, onSave, className = '' }: LessonSettingsSectionProps) {
  const [editData, setEditData] = useState<LessonSettingsData>(data);
  const [useCustomDuration, setUseCustomDuration] = useState(!standardDurations.includes(data.duration));

  const handleSave = () => {
    onSave?.(editData);
  };

  const handleCancel = () => {
    setEditData(data);
    setUseCustomDuration(!standardDurations.includes(data.duration));
  };

  const getDurationLabel = (value: number) => {
    return durationOptions.find(opt => opt.value === value)?.label || `${value} minutes`;
  };

  const getCategoryLabel = (value: string) => {
    return categoryOptions.find(opt => opt.value === value)?.label || value;
  };

  const getSkillLevelLabel = (value: string) => {
    return skillLevelOptions.find(opt => opt.value === value)?.label || value;
  };

  // View mode content
  const viewContent = (
    <DataGrid
      items={[
        {
          label: 'Subjects',
          value: (
            <TagList>
              {data.subjects.map((subject, idx) => (
                <Tag key={idx} color="outline">{subject}</Tag>
              ))}
            </TagList>
          ),
        },
        {
          label: 'Default Duration',
          value: getDurationLabel(data.duration),
        },
        {
          label: 'Lesson Category',
          value: getCategoryLabel(data.category),
        },
        {
          label: 'Skill Level',
          value: getSkillLevelLabel(data.skillLevel),
        },
        {
          label: 'Tags',
          value: data.tags.length > 0 ? (
            <TagList>
              {data.tags.map((tag, idx) => (
                <Tag key={idx} color={tag.color}>{tag.label}</Tag>
              ))}
            </TagList>
          ) : (
            <span className="data-value--empty">No tags</span>
          ),
        },
      ]}
    />
  );

  // Edit mode content
  const editContent = (
    <div className="lesson-settings-form">
      <div className="form-grid">
        <FormGroup>
          <FormLabel>Subjects</FormLabel>
          <TagInput
            value={editData.subjects}
            onChange={(subjects) => setEditData({ ...editData, subjects })}
            placeholder="Add subject..."
          />
        </FormGroup>
        <FormGroup>
          <FormLabel required>Default Duration</FormLabel>
          <Select
            value={useCustomDuration ? 'custom' : String(editData.duration)}
            onChange={(e) => {
              if (e.target.value === 'custom') {
                setUseCustomDuration(true);
              } else {
                setUseCustomDuration(false);
                setEditData({ ...editData, duration: Number(e.target.value) });
              }
            }}
          >
            {durationOptions.map(opt => (
              <Option key={opt.value} value={String(opt.value)}>{opt.label}</Option>
            ))}
          </Select>
          {useCustomDuration && (
            <Input
              type="number"
              min={1}
              max={480}
              value={editData.duration}
              onChange={(e) => setEditData({ ...editData, duration: Number(e.target.value) || 60 })}
              placeholder="Enter minutes"
              style={{ marginTop: '8px' }}
            />
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel required>Lesson Category</FormLabel>
          <Select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value as 'individual' | 'group' })}
          >
            {categoryOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Skill Level</FormLabel>
          <Select
            value={editData.skillLevel}
            onChange={(e) => setEditData({ ...editData, skillLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
          >
            {skillLevelOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Tags</FormLabel>
          <TagInput
            value={editData.tags.map(t => t.label)}
            onChange={(labels) => setEditData({
              ...editData,
              tags: labels.map(label => {
                // Preserve existing color if tag already exists
                const existing = editData.tags.find(t => t.label === label);
                return existing || { label, color: 'blue' as TagColor };
              }),
            })}
            placeholder="Add tag..."
            tagColor="blue"
          />
        </FormGroup>
      </div>
    </div>
  );

  return (
    <SectionCard
      title="Lesson Settings"
      variant="primary"
      editable
      onSave={handleSave}
      onCancel={handleCancel}
      editContent={editContent}
      className={className}
    >
      {viewContent}
    </SectionCard>
  );
}
