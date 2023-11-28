// Login.jsx
import React from 'react';
import { VerticalLine } from '../MuiStyled/Br';
import { AddUserModalHeader } from '../AddUserModalHeader';
import { useRecoilState } from 'recoil';
import { modalOpenState } from '@/recoil/atoms';

function ChangePasswordHeader() {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);

  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, changePasswordModal: false }));
  };
  return (
    <div style={{}}>
      <AddUserModalHeader handleClick={handleClick} headerText={'비밀번호 변경'} />
    </div>
  );
}

export default ChangePasswordHeader;
