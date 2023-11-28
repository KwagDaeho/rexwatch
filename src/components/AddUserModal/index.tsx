import { styled } from '@mui/system';
import { AddUserModalHeader } from '../AddUserModalHeader';
import UserRegistration from '../AddUserModalField';
import { useRecoilState } from 'recoil';
import { changeStatusState, modalOpenState } from '@/recoil/atoms';
import { useEffect, useState } from 'react';

export const AddUserModal = ({
  addComplateMessageModal,
  setAddComplateMessageModal,
}) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);

  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, addUserModal: false }));
  };

  return (
    <Modal>
      <ModalContainer>
        <div style={{ marginTop: '20px' }}>
          <AddUserModalHeader handleClick={handleClick} headerText="사용자 등록" />
        </div>
        <UserRegistration
          addComplateMessageModal={addComplateMessageModal}
          setAddComplateMessageModal={setAddComplateMessageModal}
        />
      </ModalContainer>
    </Modal>
  );
};

const Modal = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const ModalContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '620px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
}));
