import { useContext, Context } from 'react';
import { ModalContext, ModalContextType } from './ModalProvider.client';

const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

export { useModal };
