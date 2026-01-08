import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  logo?: string;
  navItems: NavItem[];
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  className?: string;
}

export function Sidebar({ logo = 'TutorStudio', navItems, user, className = '' }: SidebarProps) {
  const classNames = ['sidebar', className].filter(Boolean).join(' ');

  return (
    <aside className={classNames} role="navigation" aria-label="Main navigation">
      <div className="sidebar-logo">{logo}</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon && <span className="nav-icon">{item.icon}</span>}
            {item.label}
          </NavLink>
        ))}
      </nav>
      {user && (
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user.initials}</div>
            <div>
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
