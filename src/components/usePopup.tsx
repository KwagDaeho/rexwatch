import React from 'react';
import { useModal } from './useModal';
import { Typography } from '@mui/material';

interface ModalConfig {
  children: React.ReactNode;
  title: string;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  onClose: () => void;
  modalButtonsConfigs: Array<{
    text: string;
    type: string;
    onClick: () => void;
  }>;
}

export default function usePopup() {
  const { setVisible, resetModalConfigs, setModalConfigs } = useModal();

  const usePopupClear = () => {
    setVisible(false);
    resetModalConfigs();
  };

  const openPopup = (text: string) => {
    const modalConfig: ModalConfig = {
      children: (
        <Typography sx={{ padding: 0 }} variant="h6">
          {text}
        </Typography>
      ),
      title: text,
      headerStyle: {},
      footerStyle: {},
      onClose: () => {
        setVisible(false);
        resetModalConfigs();
      },
      modalButtonsConfigs: [
        {
          text: text,
          type: 'contained',
          onClick: () => {
            setVisible(false);
            resetModalConfigs();
          },
        },
      ],
    };
    setModalConfigs(modalConfig);
    setVisible(true);
  };

  return { openPopup };
}
