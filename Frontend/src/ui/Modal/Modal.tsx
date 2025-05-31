import { on } from 'events';
import { Button } from '../Button/Button';
import style from './Modal.module.scss';
import { useRef, useState } from 'react';
import { SyntheticEvent } from 'react';


export interface ModalProps {
  content: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({ content, onClose, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onKeydown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'Escape') {
      window.removeEventListener('keydown', onKeydown);
      onClose();
    }
  };

  window.addEventListener('keydown', onKeydown);

  return (
    isOpen ?
    <>
      <div className={style.overlay} ref={modalRef}></div>
      <div className={style.modal}>
        {content}
        <Button onClick={onClose}>Назад</Button>
      </div>
    </> : null
  );
};