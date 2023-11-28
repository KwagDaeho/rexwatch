'use client';
import React, { useEffect, useRef, useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, InputAdornment, TextField } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { changeStatusState, modalOpenState, tokenState } from '@/recoil/atoms';
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertModal } from '../AlertModal';
import styled from '@emotion/styled';
import { ClickButton } from '../ClickButton';
import { useSignOut } from '@/utils/useSignOut/useSignOut';
import { Tooltip } from 'react-tooltip';
import { AddUserModalFooter } from '../AddUserModalFooter';
import { LabelPrimaryMain } from '../MuiStyled/InputLabel';
import { AlertDoubleButtonModal } from '../AlertDoubleButtonModal';

function UserRegistration({ addComplateMessageModal, setAddComplateMessageModal }) {
  const token = useRecoilValue(tokenState);
  const [addStatus, setAddStatus] = useRecoilState(changeStatusState);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);

  const { handleSignOut } = useSignOut();

  const [idCheckMessage, setIdCheckMessage] = useState<string | null>(null);
  const [userPass1, setUserPass1] = useState('');
  const [userPass2, setUserPass2] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userType, setUserType] = useState('USR');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [jsonResult, setJsonResult] = useState('');
  const [passwordType1, setPasswordType1] = useState('password');
  const [passwordType2, setPasswordType2] = useState('password');
  const [disabled, setDisabled] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [password1Error, setPassword1Error] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [showPassword1, setShowPassword1] = useState(null);
  const [showPassword2, setShowPassword2] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  const [addMessageModal, setAddMessageModal] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);

  const handleClickShowPassword1 = () => {
    setShowPassword1((prevShowPassword1) => {
      const nextShow = !prevShowPassword1;
      setPasswordType1(nextShow ? 'text' : 'password');
      return nextShow;
    });
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2((prevShowPassword2) => {
      const nextShow = !prevShowPassword2;
      setPasswordType2(nextShow ? 'text' : 'password');
      return nextShow;
    });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (event) => {
    setUserType(event.target.checked ? 'ADM' : 'USR');
  };

  const isValidKoreanPhoneNumber = (phone: string): boolean => {
    const pattern =
      /^((01[016789])-?([1-9]\d{2,3})-?(\d{4})|(02|0[3-6]\d|070)-?(\d{3,4})-?(\d{4}))$/;
    return pattern.test(phone);
  };

  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, addUserModal: false }));
  };

  const handleChangePassword = (e) => {
    if (e.target.checked) {
      setUserPass1('Rex6885!@');
      setUserPass2('Rex6885!@');
      setPasswordType1('password');
      setPasswordType2('password');
      setShowPassword2(false);
      setShowPassword1(false);
      setPassword1Error(null);
      setPassword2Error(null);
      setDisabled(true);
    } else {
      setUserPass1('');
      setUserPass2('');
      setPasswordType1('password');
      setPasswordType2('password');
      setDisabled(false);
    }
  };

  const handleUsernameChange = (event: any) => {
    const value = event?.target?.value;
    const regex = /^[a-zA-Z0-9]{6,25}$/;

    if (!value) {
      setUsernameError('');
    } else if (!regex.test(value)) {
      setUsernameError('영문, 숫자만 포함하여 6자 이상 25자 이하로 입력해주세요.');
    } else {
      setUsernameError('');
    }

    setUserName(value);
    setIdCheckMessage('');
    setIsIdChecked(false);
  };

  const handlePassword1Change = (event: any) => {
    const value = event?.target?.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,32}$/;

    if (!value) {
      setPassword1Error('');
    } else if (!regex.test(value)) {
      setPassword1Error(
        '대문자, 소문자, 숫자, 특수문자를 포함하여 9자 이상 32자 이하로 입력해주세요.',
      );
    } else {
      setPassword1Error('');
    }

    setUserPass1(value);
  };

  const handlePassword2Change = (event: any) => {
    const value = event?.target?.value;

    if (!value) {
      setPassword2Error('');
    } else if (value !== userPass1) {
      setPassword2Error('비밀번호가 일치하지 않습니다.');
    } else {
      setPassword2Error('');
    }

    setUserPass2(value);
  };

  const handlePhoneNumberChange = (event: any) => {
    const value = event?.target?.value;
    const regex = /^(\d{2,3})-(\d{4})-(\d{4})$/;

    if (!value) {
      setPhoneError('');
    } else if (!regex.test(value)) {
      setPhoneError('올바른 전화번호 형식을 입력해주세요. 예) 02-1234-5678');
    } else {
      setPhoneError('');
    }

    setUserPhone(value);
  };

  // 사용자 추가 함수
  const handleAdd = () => {
    setAddStatus((prevState) => ({ ...prevState, addStatus: false }));

    if (isIdChecked === false) {
      setJsonResult('아이디 중복체크를 먼저 수행하세요!');
      setResultMessage('아이디 중복체크를 먼저 수행하세요!');
      return;
    } else {
      const jsonData = {
        user_id: userName,
        user_pass: userPass1,
        user_phone: userPhone,

        user_type: userType,
      };

      fetch('http://192.168.0.200:8080/api/v1/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.statusCode === 200) {
            setAddStatus((prevState) => ({ ...prevState, addStatus: true }));
            setModalOpen((prevState) => ({
              ...prevState,
              complateMessageModal: true,
            }));

            setIsIdChecked(false);
            handleClick();
            setResultMessage(data.statusText);
            setAddComplateMessageModal(true);
            console.log('뭐임??');
            setAddMessageModal(false);
          } else if (data.statusCode === 402) {
            setAddStatus((prevState) => ({ ...prevState, addStatus: false }));
            setAddComplateMessageModal(true);
            setAddMessageModal(false);
            setResultMessage(data.statusText);
          } else {
            setAddStatus((prevState) => ({ ...prevState, addStatus: false }));
            setAddComplateMessageModal(true);
            setAddMessageModal(false);

            setResultMessage(data.statusText);
            handleSignOut();
          }
        })
        .catch((error) => {
          setResultMessage(error.statusText);
          handleSignOut();
        });
    }
  };

  //아이디 체크 함수
  const handleIdCheck = () => {
    setAddStatus((prevState) => ({ ...prevState, addStatus: false }));

    const jsonData = {
      user_id: userName,
    };

    fetch('http://192.168.0.200:8080/api/v1/user/idchk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setIdCheckMessage('사용하실 수 있는 아이디 입니다.');
          setIsIdChecked(true);
          setResultMessage(null);
        } else if (data.statusCode === 627) {
          setIdCheckMessage(data.statusText);
        } else if (data.statusCode === 402) {
          setIdCheckMessage('아이디를 입력 후 중복체크 버튼을 클릭해 주세요.');
          setAddStatus((prevState) => ({
            ...prevState,
            addStatus: false,
          }));
        } else if (data.statusCode === 625) {
          setIdCheckMessage(data.statusText);
        } else {
          handleSignOut();
        }
      })
      .catch((error) => {
        setIdCheckMessage('ID 체크 중 오류가 발생했습니다.');
        setJsonResult(error.toString());
        handleSignOut();
      });
  };

  const valueInfoCheckFunc = (event: React.MouseEvent<HTMLButtonElement>) => {
    const phoneRegex = /^(\d{2,3})(\d{4})(\d{4})$/;

    // 아이디 검사
    if (!userName) {
      setUsernameError('아이디를 입력해주세요.'); // 에러 메시지 업데이트
      usernameRef.current?.focus();
      return false; // 반환
    }

    // 전화번호가 입력되지 않은 경우
    if (!userPhone) {
      setPhoneError('전화번호를 입력해주세요.'); // 에러 메시지 업데이트
      phoneNumberRef.current?.focus();
      return false; // 반환
    }

    // 전화번호 형식 검사
    if (!phoneRegex.test(userPhone)) {
      setPhoneError('올바른 전화번호 형식이 아닙니다.'); // 에러 메시지 업데이트
      phoneNumberRef.current?.focus();
      return false; // 반환
    }

    // 비밀번호1 검사
    if (!userPass1) {
      setPassword1Error('비밀번호를 입력해주세요.'); // 에러 메시지 업데이트
      passwordRef1.current?.focus();
      return false; // 반환
    }

    // 비밀번호2 검사
    if (!userPass2) {
      setPassword2Error('비밀번호 확인을 입력해주세요.'); // 에러 메시지 업데이트
      passwordRef2.current?.focus();
      return false; // 반환
    }

    // 모든 검사를 통과한 경우
    return setAddMessageModal(true);
  };

  useEffect(() => {
    if (userPhone !== '') {
      if (userPhone && !isValidKoreanPhoneNumber(userPhone)) {
        setPhoneError('유효하지 않은 전화번호 형식입니다.');
      } else {
        setPhoneError(null);
      }
    }
  }, [userPhone]);
  useEffect(() => {
    if (userPass1 && userPass2 && userPass1 !== userPass2) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError(null);
    }
  }, [userPass1, userPass2]);

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <AlertDoubleButtonModal
            message={'사용자를 등록할까요?'}
            isOpen={addMessageModal}
            onClose={() => setAddMessageModal(false)}
            actionFunction={handleAdd}
          />
        </div>

        <DoubleButtonContainer2>
          <Label>아이디</Label>
          <AddUserTextFieldWithIcon
            inputRef={usernameRef}
            autoFocus
            required
            inputProps={{ maxLength: 10 }}
            onChange={(e) => handleUsernameChange(e)}
          ></AddUserTextFieldWithIcon>
          <DoubleCheckButtonContainer>
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10010 }}
              anchorSelect="#중복체크"
              content="중복체크"
            />
            {isIdChecked ? (
              <ClickButton
                id="중복체크"
                onClick={handleIdCheck}
                title={<TaskAltIcon color="primary" />}
                background="#2477ec"
              />
            ) : (
              <ClickButton
                id="중복체크"
                onClick={handleIdCheck}
                title={<TaskAltIcon color="error" />}
                background="#ea2020"
              />
            )}
          </DoubleCheckButtonContainer>
        </DoubleButtonContainer2>
        <P>{usernameError || ' '}</P>

        <P style={{ color: isIdChecked ? 'blue' : 'red' }}>
          {idCheckMessage || ' '}
        </P>
        <DoubleButtonContainer2>
          <Label>전화번호</Label>
          <AddUserTextFieldWithIcon
            inputRef={phoneNumberRef}
            value={userPhone}
            placeholder="예) 01000000000"
            type="tel"
            inputProps={{ maxLength: 11 }}
            autoComplete="off"
            required
            onChange={(e) => {
              handlePhoneNumberChange(e);
            }}
          />
        </DoubleButtonContainer2>
        <P>{phoneError || ' '}</P>
        <DoubleButtonContainer2>
          <Label>비밀번호</Label>
          <ContactFieldContainer>
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10 }}
              anchorSelect="#비밀번호보기"
              content="보이기"
            />
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10 }}
              anchorSelect="#비밀번호숨기기"
              content="숨기기"
            />
            <AddUserTextField
              type={passwordType1}
              inputRef={passwordRef1}
              value={userPass1}
              disabled={disabled}
              autoComplete="off"
              required
              error={password1Error ? true : false}
              helperText={password1Error}
              inputProps={{ maxLength: 32, inputMode: 'numeric' }}
              sx={{ backgroundColor: disabled && 'grey' }}
              onChange={(e) => handlePassword1Change(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {disabled ? (
                      <></>
                    ) : (
                      <IconInButton
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword1 ? (
                          <Visibility id="비밀번호보기" />
                        ) : (
                          <VisibilityOff id="비밀번호숨기기" />
                        )}
                      </IconInButton>
                    )}
                  </InputAdornment>
                ),
              }}
            ></AddUserTextField>
          </ContactFieldContainer>
        </DoubleButtonContainer2>
        <DoubleButtonContainer2>
          <Label>비밀번호 확인</Label>
          <ContactFieldContainer>
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10 }}
              anchorSelect="#비밀번호보기2"
              content="보이기"
            />
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10 }}
              anchorSelect="#비밀번호숨기기2"
              content="숨기기"
            />

            <AddUserTextField
              autoComplete="off"
              required
              type={passwordType2}
              value={userPass2}
              inputProps={{ maxLength: 32, inputMode: 'numeric' }}
              disabled={disabled}
              sx={{ backgroundColor: disabled && 'grey' }}
              inputRef={passwordRef2}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {disabled ? (
                      <></>
                    ) : (
                      <IconInButton
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword2 ? (
                          <Visibility id="비밀번호보기2" />
                        ) : (
                          <VisibilityOff id="비밀번호숨기기2" />
                        )}
                      </IconInButton>
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handlePassword2Change(e)}
            ></AddUserTextField>
          </ContactFieldContainer>
        </DoubleButtonContainer2>
        <P>{passwordError}</P>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <PasswordSpanText onClick={handleChangePassword}>
            초기 비밀번호 사용
          </PasswordSpanText>
          <Checkbox
            onChange={(e) => {
              handleChangePassword(e);
            }}
            sx={{ marginRight: '40px' }}
            color="primary"
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <PasswordSpanText onClick={handleCheckboxChange}>관리자</PasswordSpanText>
          <Checkbox
            sx={{ marginRight: '40px' }}
            color="primary"
            checked={userType === 'ADM'}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
      <p style={{ color: 'red', textAlign: 'center' }}>{resultMessage || ''}</p>
      <AddUserModalFooter
        onClickCancel={handleClick}
        onClickRegister={valueInfoCheckFunc}
        isIdChecked={isIdChecked}
      />
    </Container>
  );
}

export default UserRegistration;

const DoubleButtonContainer2 = styled('div')`
  position: relative;
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
  height: 20px;
`;

const DoubleCheckButtonContainer = styled('div')`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: space-between;
`;

const AddUserTextFieldWithIcon = styled(TextField)`
  width: 70%;
  input {
    height: 35px;
    padding: 6px 6px;
    font-size: 14px;
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #d1cccc; // 원하는 비활성화 배경색으로 설정
    pointer-events: none; // 마우스 이벤트를 받지 않게 함

`}
`;

const P = styled('p')`
  padding-left: 35%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: red;
  font-size: 12px;
`;
const ContactFieldContainer = styled('div')`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PasswordSpanText = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddUserTextField = styled(TextField)`
  width: 100%;

  input {
    height: 35px;
    padding: 6px 6px;
    font-size: 14px;
  }
`;

const IconInButton = styled('button')`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 3px;
  background: transparent;
  border: none;
  margin-left: 20px;
`;
const Container = styled('div')`
  width: 100%;
  padding: 30px 0;
`;
const Label = styled(LabelPrimaryMain)`
  display: flex;
  font-size: 14px;
  align-items: center;
  width: 25%;
  height: 20px;
`;
