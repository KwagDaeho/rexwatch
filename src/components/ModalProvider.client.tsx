'use client';

import { createContext, useState, useMemo, ReactNode, FC } from 'react';

interface ModalConfigType {
  children: ReactNode;
  title: string;
  width?: number;
  isAlert?: boolean;
  onClose: () => void;
  bodystyle?: React.CSSProperties;
  modalButtonsConfigs?: any[]; // 여기서 버튼의 구조에 따라 더 구체적인 타입을 지정하시면 됩니다.
  isBottomModalNeeded?: boolean;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
}

interface ModalContextType {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalConfigs: ModalConfigType;
  setModalConfigs: React.Dispatch<React.SetStateAction<ModalConfigType>>;
  resetModalConfigs: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

const initialModalConfig: ModalConfigType = {
  children: <div></div>,
  title: '',
  width: 700,
  isAlert: false,
  onClose: () => {},
  bodystyle: {},
  modalButtonsConfigs: [],
  isBottomModalNeeded: true,
  headerStyle: {},
  footerStyle: {},
};

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [modalConfigs, setModalConfigs] = useState(initialModalConfig);

  const resetModalConfigs = () => {
    setModalConfigs(initialModalConfig);
  };

  const value = useMemo(
    () => ({
      visible,
      setVisible,
      modalConfigs,
      setModalConfigs,
      resetModalConfigs,
    }),
    [visible, setVisible, modalConfigs, setModalConfigs, resetModalConfigs],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export type { ModalContextType, ModalConfigType };
export default ModalProvider;
