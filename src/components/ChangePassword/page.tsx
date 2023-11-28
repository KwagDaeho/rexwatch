import React, { useEffect, useRef, useState } from 'react';
import Modal from '@mui/material/Modal';
import ChangePasswordHeader from '@/components/ChangePasswordHeader';
import ChangePasswordFields from '@/components/ChangePasswordFields';
import { styled } from '@mui/material';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { modalOpenState, tokenState } from '@/recoil/atoms';
import { ClickButton } from '../ClickButton';
import { useSignOut } from '@/utils/useSignOut/useSignOut';

const StyledModal = styled(Modal)(({ theme }) => ({
  position: 'relative',
  zIndex: 1200,
}));

const CenteredModal = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  width: '500px',
  backgroundColor: theme.palette.background.paper, // Modal 배경색을 흰색으로 설정
  outline: 'none', // Modal에 기본적으로 적용되는 테두리 제거
  borderRadius: theme.shape.borderRadius, // 모달의 모서리를 둥글게
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem', // 요소 사이의 간격 추가
  zIndex: 999,
}));

function ChangePassword({ open, handleClose }) {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');
  const [passwordError, setPasswordError] = useState(false); // 새 비밀번호 필드의 에러 상태

  const [token, setRecoilToken] = useRecoilState(tokenState); // <- 컴포넌트 본문에서 호출
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const { handleSignOut } = useSignOut();

  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, changePasswordModal: false }));
  };
  const handlePasswordChange = async () => {
    if (focusOnEmptyField()) {
      try {
        const response = await axios.post(
          'http://192.168.0.200:8080/api/v1/acnt/pwchange',
          {
            user_pw_old: oldPassword,
            user_pw_new: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.statusCode === 200) {
          handleClick();
          setIsModalOpen(true);
          setResultMessage(response.data.statusText);
        } else if (
          response.data.statusCode === 631 ||
          response.data.statusCode == 635
        ) {
          setResultMessage(response.data.statusText);
        } else if (response.data.statusCode === 611) {
          handleSignOut();
        }
      } catch (error) {
        setResultMessage(error.statusText);
      }
    }
  };

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const focusOnEmptyField = () => {
    if (!oldPasswordRef.current?.value) {
      oldPasswordRef.current?.focus();
      return false; // Field is empty
    } else if (!newPasswordRef.current?.value) {
      newPasswordRef.current?.focus();
      return false; // Field is empty
    } else if (!confirmPasswordRef.current?.value) {
      confirmPasswordRef.current?.focus();
      return false; // Field is empty
    } else {
      return true; // All fields are filled
    }
  };

  useEffect(() => {
    setResultMessage(null);
  }, [oldPassword, newPassword]);

  return (
    <div>
      <StyledModal open={open} aria-labelledby="change-password-modal">
        <CenteredModal>
          <ChangePasswordHeader />
          <ChangePasswordFields
            setPasswordError={setPasswordError}
            passwordError={passwordError}
            setOldPassword={setOldPassword}
            setNewPassword={setNewPassword}
            setNewPassword2={setNewPassword2}
            oldPasswordRef={oldPasswordRef}
            newPasswordRef={newPasswordRef}
            confirmPasswordRef={confirmPasswordRef}
          />
          <p style={{ color: 'red', textAlign: 'center' }}>{resultMessage || ''}</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <div style={{ marginRight: '5px' }}>
                <ClickButton
                  title={'취소'}
                  background={'#d3d4d6'}
                  minwidth="220px"
                  onClick={handleClose}
                />
              </div>
              <ClickButton
                title={'등록'}
                background={passwordError ? '#d3d4d6' : '#2477ec'}
                minwidth="220px"
                onClick={handlePasswordChange}
                disabled={passwordError}
              ></ClickButton>
            </div>
          </div>
        </CenteredModal>
      </StyledModal>
    </div>
  );
}

export default ChangePassword;
