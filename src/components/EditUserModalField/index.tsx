'use client';

import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalOpenState, tokenState } from '@/recoil/atoms';
import Checkbox from '@mui/material/Checkbox';
import { AlertModal } from '../AlertModal';
import { Box, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { ClickButton } from '../ClickButton';
import { AlertDoubleButtonModal } from '../AlertDoubleButtonModal';

type User = {
  USER_ID: string;
  USER_TYPE: string;
  USER_NAME: string;
  USER_PHONE: string;
  USER_EMAIL: string;
  LAST_LOGIN_DT: string;
  STAT: string;
  ROW_NUM: number;
  LAST_LOGIN_IP: string;
  FAIL_COUNT: number;
};

type UserDataProps = {
  userData: User;
};

function EditUserModalField({ userData }: UserDataProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState(false);

  const token = useRecoilValue(tokenState);
  const [jsonResult, setJsonResult] = useState('');
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [userId, setUserId] = useState(
    userData?.USER_ID === null || userData?.USER_ID === 'null'
      ? ''
      : userData?.USER_ID,
  );

  const [userPhone, setUserPhone] = useState(
    userData?.USER_PHONE === null || userData?.USER_PHONE === 'null'
      ? ''
      : userData?.USER_PHONE,
  );

  const [userType, setUserType] = useState(
    userData?.USER_TYPE === null || userData?.USER_TYPE === 'null'
      ? ''
      : userData?.USER_TYPE,
  );

  const handleUserPhoneChange = (e) => {
    if (e.target.value.match(/^\d{0,11}$/)) {
      setUserPhone(e.target.value);
      if (e.target.value !== userData?.USER_PHONE) {
        setIsChanged(true);
      } else {
        setIsChanged(false);
      }
    }
  };

  const handleUserTypeChange = (e) => {
    const newType = e.target.checked ? 'ADM' : 'USR';
    setUserType(newType);
    if (newType !== userData?.USER_TYPE) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, editModal: false }));
  };

  const handleSetClick = () => {
    const jsonData = {
      user_id: userId,
      user_phone: userPhone,
      user_type: userType,
    };

    fetch('http://192.168.0.200:8080/api/v1/user/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        setJsonResult(JSON.stringify(data, null, 4));
        if (data.statusCode === 200) {
          setIsModalOpen(true);
          setModalOpen((prevState) => ({
            ...prevState,
            deleteComplateMessageModal: true,
          }));

          setResultMessage(data.statusText);
          handleClick();
        }
      })
      .catch((err) => {
        console.log('[USER][SET] i/f error=', err.toString());
        setIsModalOpen(true);
        setResultMessage(err.statusText);
      });
  };

  return (
    <>
      <div>
        <AlertModal
          message={resultMessage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <div>
        <AlertDoubleButtonModal
          message={'사용자 정보를 수정할까요?'}
          isOpen={editMessageModal}
          onClose={() => setEditMessageModal(false)}
          actionFunction={handleSetClick}
        />
      </div>

      <DoubleButtonContainer2>
        <LabelForInputAddUser>아이디</LabelForInputAddUser>
        <AddUserTextFieldWithIcon
          disabled={true}
          value={userId}
          inputRef={usernameRef}
        ></AddUserTextFieldWithIcon>
      </DoubleButtonContainer2>
      <DoubleButtonContainer2 style={{ marginTop: 20 }}>
        <LabelForInputAddUser>전화번호</LabelForInputAddUser>
        <AddUserTextFieldWithIcon
          value={userPhone}
          inputRef={phoneNumberRef}
          type="tel"
          size="small"
          onChange={handleUserPhoneChange}
        />
      </DoubleButtonContainer2>

      <CheckBoxContainer>
        <PasswordSpanText>관리자</PasswordSpanText>
        <Checkbox
          checked={userType === 'ADM'}
          onChange={handleUserTypeChange}
          color="primary"
        />
      </CheckBoxContainer>
      <ButtonContainer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              position: 'absolute',
              left: 0,
              bottom: 20,
              width: '100%',
            }}
          >
            <div style={{ marginRight: '5px' }}>
              <ClickButton
                title={'취소'}
                background={'#d3d4d6'}
                minwidth="200px"
                onClick={handleClick}
              />
            </div>

            <ClickButton
              title={'수정'}
              disabled={!isChanged}
              background={isChanged ? '#2477ec' : '#d3d4d6'}
              minwidth="200px"
              onClick={() => setEditMessageModal(true)}
            ></ClickButton>
          </div>
        </div>
      </ButtonContainer>
    </>
  );
}

export default EditUserModalField;

const DoubleButtonContainer2 = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 10px auto;
`;

const LabelForInputAddUser = styled('label')`
  width: 30%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const AddUserTextFieldWithIcon = styled(TextField)`
  /* color: ${(props) => props.theme.palette.primary.main}; */
  width: 70%;

  input {
    height: 30px;
    padding: 6px 6px;
    font-size: 14px;
  }

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #d1cccc; 
    pointer-events: none; // 마우스 이벤트를 받지 않게 함

`}/* 추가된 코드 끝 */
`;

const CheckBoxContainer = styled('div')`
  width: 80%;
  display: flex;
  justify-content: end;
  margin: 0 auto;
`;

const PasswordSpanText = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled('div')`
  padding-top: 20px;
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
