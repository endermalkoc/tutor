import React from 'react';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ src, alt = '', initials, size = 'md', className = '' }: AvatarProps) {
  const classNames = ['avatar', `avatar-${size}`, className].filter(Boolean).join(' ');

  if (src) {
    return (
      <span className={classNames}>
        <img src={src} alt={alt} />
      </span>
    );
  }

  return <span className={classNames}>{initials}</span>;
}

// Avatar stack for showing multiple avatars
export interface AvatarStackProps {
  children: React.ReactNode;
  className?: string;
}

export function AvatarStack({ children, className = '' }: AvatarStackProps) {
  const classNames = ['avatar-stack', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}
