import { Button, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { AddUserModalHeader } from '../AddUserModalHeader';
import EditUserModalField from '../EditUserModalField';
import { EditUserModalHeader } from '../EditUserModalHeader';
import { MainLineHr } from '../MuiStyled/Br';

export const EditUserModal = ({ isOpen, onClose, userData }: any) => {
  const theme = useTheme();
  if (!isOpen) {
    return null;
  }

  return (
    <StyledEditModal>
      <EditModalContainer theme={theme} onClick={(e) => e.stopPropagation()}>
        <EditUserModalHeader headerText="사용자 상세정보" />
        <EditUserModalField userData={userData} />
      </EditModalContainer>
    </StyledEditModal>
  );
};

const StyledEditModal = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999; // added z-index for overlay effect
`;

const EditModalContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  zIndex: 10000, // higher z-index for modal content
}));
