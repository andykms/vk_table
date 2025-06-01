import { on } from 'events';
import { Button } from '../Button/Button';
import style from './Modal.module.scss';
import { useEffect, useRef, useState } from 'react';
import { SyntheticEvent } from 'react';


export interface ModalProps {
  content: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal = ({ content, onClose, isOpen }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      window.removeEventListener('keydown', onKeydown);
      onClose();
    }
  };

  window.addEventListener('keydown', onKeydown);

  useEffect(()=>{
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    if (modalRef.current && overlayRef.current) {
        const scrollY = window.scrollY;
        modalRef.current.style.top = `${scrollY + window.innerHeight / 2}px`;
    }
  }, [isOpen])
  
  return (
    isOpen ?
    <>
      <div className={style.overlay} ref={overlayRef}></div>
      <div className={style.modal} ref= {modalRef}>   
        <div className={style.closeButton}>
          <Button onClick={onClose}>Назад</Button>
        </div>
          {content}
      </div>
    </> : null
  );
};