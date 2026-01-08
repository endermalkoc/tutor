import React, { useEffect, useCallback } from 'react';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className = '' }: ModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  const backdropClasses = ['modal-backdrop', open && 'open'].filter(Boolean).join(' ');
  const modalClasses = ['modal', className].filter(Boolean).join(' ');

  return (
    <div className={backdropClasses} onClick={onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function ModalHeader({ children, onClose, className = '' }: ModalHeaderProps) {
  const classNames = ['modal-header', className].filter(Boolean).join(' ');
  return (
    <div className={classNames}>
      {children}
      {onClose && (
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
}

export interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalTitle({ children, className = '' }: ModalTitleProps) {
  const classNames = ['modal-title', className].filter(Boolean).join(' ');
  return <h2 className={classNames}>{children}</h2>;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  const classNames = ['modal-body', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  const classNames = ['modal-footer', className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
}
