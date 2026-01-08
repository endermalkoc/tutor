import { useState } from 'react';
import { Button, Input, Select } from '../../../components/design-system';
import './MessagesTab.css';

type MessageChannel = 'email' | 'sms';

interface MessageThread {
  id: string;
  subject: string;
  channel: MessageChannel;
  senderName: string;
  senderRelation?: string;
  preview: string;
  date: string;
  isUnread?: boolean;
}

// Mock data
const mockThreads: MessageThread[] = [
  {
    id: 'm1',
    subject: 'Re: Lesson Rescheduling',
    channel: 'email',
    senderName: 'Jennifer Chen',
    senderRelation: 'Mom',
    preview: "That works perfectly, thank you for accommodating our schedule change!",
    date: 'Today, 2:30 PM',
    isUnread: true,
  },
  {
    id: 'm2',
    subject: 'Lesson Reminder',
    channel: 'sms',
    senderName: 'Emily Chen',
    preview: "Thanks for the reminder! I'll be ready for tomorrow's lesson.",
    date: 'Jan 5, 4:15 PM',
  },
  {
    id: 'm3',
    subject: 'Winter Recital Information',
    channel: 'email',
    senderName: 'Jennifer Chen',
    senderRelation: 'Mom',
    preview: 'Thank you for sharing the recital details. Emily is very excited about performing!',
    date: 'Dec 20, 10:00 AM',
  },
  {
    id: 'm4',
    subject: 'Monthly Progress Report - December',
    channel: 'email',
    senderName: 'Jennifer Chen',
    senderRelation: 'Mom',
    preview: "This is wonderful feedback! We're so happy with Emily's progress this month.",
    date: 'Dec 15, 9:00 AM',
  },
  {
    id: 'm5',
    subject: 'Practice Question',
    channel: 'sms',
    senderName: 'Emily Chen',
    preview: "Got it, thank you! I'll focus on that section during practice tonight.",
    date: 'Dec 10, 7:30 PM',
  },
  {
    id: 'm6',
    subject: 'Holiday Schedule Update',
    channel: 'email',
    senderName: 'Jennifer Chen',
    senderRelation: 'Mom',
    preview: "Thank you for the holiday schedule. We'll plan accordingly.",
    date: 'Dec 5, 11:00 AM',
  },
];

export function MessagesTab() {
  const [channelFilter, setChannelFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="messages-tab">
      {/* Filters */}
      <div className="messages-filters">
        <Select
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Channels</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="in-app">In-App</option>
        </Select>

        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
          <option value="last-3-months">Last 3 Months</option>
        </Select>

        <div className="search-container">
          <i className="ph ph-magnifying-glass search-icon" />
          <Input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <Button variant="primary" className="new-message-btn">
          <i className="ph ph-plus" />
          New Message
        </Button>
      </div>

      {/* Message List */}
      <div className="message-list">
        {mockThreads.map(thread => (
          <div
            key={thread.id}
            className={`message-thread ${thread.isUnread ? 'message-thread--unread' : ''}`}
          >
            <div className={`thread-icon thread-icon--${thread.channel}`}>
              <i className={`ph ph-${thread.channel === 'email' ? 'envelope' : 'chat-circle'}`} />
            </div>
            <div className="thread-content">
              <div className="thread-header">
                <span className="thread-subject">
                  {thread.subject}
                  {thread.isUnread && <span className="unread-badge" />}
                </span>
                <span className="thread-date">{thread.date}</span>
              </div>
              <div className="thread-meta">
                {thread.senderName}
                {thread.senderRelation && ` (${thread.senderRelation})`}
              </div>
              <div className="thread-preview">{thread.preview}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
