'use client';

import { AddUserModal } from '@/components/AddUserModal';
import DoubleButton from '@/components/DoubleButton';
import MainHeader from '@/components/MainHeader';
import { DoubleButtonContainer, TableContainer } from '@/components/MuiStyled/Div';
import UserIPTable from '@/components/UserIPTable';
import UserTable from '@/components/UserTable';
import { changeStatusState, modalOpenState, tokenState } from '@/recoil/atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled, TextField, Typography } from '@mui/material';
import { AlertModal } from '@/components/AlertModal';
import { useSignOut } from '@/utils/useSignOut/useSignOut';
import usePopup from '@/components/usePopup';
import { AlertDoubleButtonModal } from '@/components/AlertDoubleButtonModal';
import { ClickButton } from '@/components/ClickButton';

function User() {
  const token = useRecoilValue(tokenState);
  const { handleSignOut } = useSignOut();
  const { openPopup } = usePopup();
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [changeStatus, setChangeStatus] = useRecoilState(changeStatusState);

  const [isActiveButton1, setActiveButton1] = useState(true);
  const [isActiveButton2, setActiveButton2] = useState(false);
  const [addressType, setAddressType] = useState('IP'); // 기본값을 'IP'로 설정
  const [accsData, setAccsData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isValidIP, setIsValidIP] = useState(null); // 추가된 유효성 상태
  const [addAlertModal, setAddAlertModal] = useState(false);
  const [addComplateMessageModal, setAddComplateMessageModal] = useState(false);

  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, addUserModal: true }));
  };

  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, and enter
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C, Command+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X, Command+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      return; // Let it happen, don't do anything
    }

    // Ensure that it is a number or dot and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105) &&
      e.keyCode !== 190
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (changeStatus.addStatus) {
      setAddComplateMessageModal(true);
    }
  }, [changeStatus]);

  const handleAddClick = async () => {
    const jsonData = {
      accs_data: accsData,
      accs_type: addressType,
    };

    try {
      const response = await fetch('http://192.168.0.200:8080/api/v1/accs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        openPopup(result.statusText);
        setResultMessage(result.statusText);
        setIsModalOpen(true);
        setAddAlertModal(false);
        setChangeStatus((prevState) => ({ ...prevState, addStatus: true }));
        setAccsData(null);
      } else if (result.statusCode === 402) {
        setResultMessage(result.statusText);
        setIsModalOpen(true);
        setChangeStatus((prevState) => ({ ...prevState, addStatus: false }));
        setAccsData(null);
      } else if (result.statusCode === 611 || result.statusCode === 613) {
        handleSignOut();
        setIsModalOpen(false);
        setChangeStatus((prevState) => ({
          ...prevState,
          addStatus: false,
        }));
        setAccsData(null);
      }
      // Set your result here, if you need to use it in the UI
    } catch (error) {
      setResultMessage(error.statusText);
      setAccsData(null);

      if (error.statusCode === 611 || error.statusCode === 613) {
        handleSignOut();
        setIsModalOpen(false);
        setChangeStatus((prevState) => ({
          ...prevState,
          addStatus: false,
        }));
      }
    }
  };
  const [inputIP, setInputIP] = useState('');
  const handleIPInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // Allow only numbers and periods
    const onlyNumbersAndPeriods = e.target.value.replace(/[^0-9.]/g, '');

    if (onlyNumbersAndPeriods === '') {
      setIsValidIP(null); // Reset the IP validity to its initial state
      setInputIP(''); // Reset the error message
      setAccsData(null); // This line is already there, reset the AccsData too
    } else if (ipRegex.test(onlyNumbersAndPeriods)) {
      setAccsData(onlyNumbersAndPeriods);
      setIsValidIP(true); // Valid IP
      setInputIP('');
    } else {
      setIsValidIP(false); // Invalid IP
      setInputIP('유효한 형식이 아닙니다.');
    }

    e.target.value = onlyNumbersAndPeriods; // Set the updated value
  };

  useEffect(() => {
    setIsValidIP(null);
    setAccsData(null);
    setInputIP('');
  }, [isActiveButton1, isActiveButton2, changeStatus]);

  return (
    <div>
      <AlertModal
        message={resultMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <AlertDoubleButtonModal
        message={'해당 IP를 등록할까요?'}
        isOpen={addAlertModal}
        onClose={() => setAddAlertModal(false)}
        actionFunction={handleAddClick}
      />
      <MainHeader title={'사용자 관리'} />
      <DoubleButtonContainer>
        <DoubleButton
          setActiveButton1={setActiveButton1}
          setActiveButton2={setActiveButton2}
          isActiveButton1={isActiveButton1}
          isActiveButton2={isActiveButton2}
          button1={'사용자 목록'}
          button2={'접근제한'}
        />
        {isActiveButton1 && !isActiveButton2 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 10,
              marginLeft: 5,
            }}
          >
            <ClickButton
              title={'등록'}
              background={'#2477ec'}
              minwidth="80px"
              onClick={handleClick}
            />
          </div>
        )}
        {!isActiveButton1 && isActiveButton2 && (
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
            <Typography sx={{ marginTop: 3, marginRight: 3 }}>
              아이피 주소
            </Typography>
            <div>
              <TextField
                autoComplete="off"
                size="small"
                sx={{ marginTop: '15px' }}
                onChange={handleIPInputChange}
                onKeyDown={handleKeyDown}
                inputProps={{ pattern: '[0-9.]*', inputMode: 'numeric' }}
              />

              <P>{inputIP || ' '}</P>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 10,
                marginLeft: 5,
              }}
            >
              <ClickButton
                title={'등록'}
                background={isValidIP ? '#2477ec' : '#dce3ec'}
                minwidth="80px"
                onClick={() => setAddAlertModal(true)}
                disabled={!isValidIP} // Disabled when IP is not valid
              />
            </div>
          </div>
        )}
      </DoubleButtonContainer>

      {isActiveButton1 && !isActiveButton2 && (
        <TableContainer>
          <UserTable />
        </TableContainer>
      )}
      {!isActiveButton1 && isActiveButton2 && (
        <TableContainer>
          <UserIPTable />
        </TableContainer>
      )}
      {modalOpen.addUserModal && (
        <AddUserModal
          addComplateMessageModal={addComplateMessageModal}
          setAddComplateMessageModal={setAddComplateMessageModal}
        />
      )}
      <div style={{ flex: 1 }}>
        <AlertModal
          message={'등록이 완료되었습니다.'}
          isOpen={modalOpen.complateMessageModal}
          onClose={() =>
            setModalOpen((prevState) => ({
              ...prevState,
              complateMessageModal: false,
            }))
          }
        />
      </div>
    </div>
  );
}

export default User;

const P = styled('p')`
  padding-left: 35%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: red;
  font-size: 12px;
`;
