'use client';
import React, { useRef, useState } from 'react';
import { LabelForInput, LabelForInputPassword } from '../MuiStyled/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';
import { ChangePasswordTextField } from '../MuiStyled/TextField';
import { IconInButton } from '../MuiStyled/button';
import { Tooltip } from 'react-tooltip';
import { ChangePasswordContainer } from '../MuiStyled/Div';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,32}$/;

function ChangePasswordFields({
  setOldPassword,
  setNewPassword,
  setNewPassword2,
  oldPasswordRef,
  newPasswordRef,
  confirmPasswordRef,
  passwordError,
  setPasswordError,
}) {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  // const [passwordError, setPasswordError] = useState(false); // 새 비밀번호 필드의 에러 상태
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // 새 비밀번호의 에러 메시지

  const [newPasswordValue, setNewPasswordValue] = useState(''); // 새 비밀번호 값을 저장하기 위한 상태
  const [confirmPasswordError, setConfirmPasswordError] = useState(false); // 비밀번호 확인 필드의 에러 상태
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(''); // 에러 메시지

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;

    // 비밀번호 값을 상태에 저장
    setNewPassword(value);
    setNewPasswordValue(value);

    // 정규식 검증
    if (!passwordRegex.test(value)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        '대문자, 소문자, 숫자, 특수문자를 포함하여 9자 이상 32자 이하로 입력해주세요.',
      );
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
  };

  // 비밀번호 확인 필드에서 값이 변경될 때 호출되는 콜백 함수
  const handleConfirmPasswordChange = (e) => {
    if (e.target.value !== newPasswordValue) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleClickShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <ChangePasswordContainer>
          <LabelForInputPassword>이전 비밀번호</LabelForInputPassword>
          <ChangePasswordTextField
            id="old-password" // id 변경
            placeholder="이전 비밀번호를 입력해주세요."
            type={showPassword1 ? 'text' : 'password'}
            name="oldPassword" // name 변경
            required
            inputRef={oldPasswordRef}
            autoComplete="off"
            size="small"
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword1 ? (
                    <Visibility
                      id="비밀번호보기"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword}
                    />
                  ) : (
                    <VisibilityOff
                      id="비밀번호숨기기"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </ChangePasswordContainer>

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
      </div>
      <div style={{ marginBottom: 15 }}>
        <ChangePasswordContainer>
          <LabelForInputPassword>새 비밀번호</LabelForInputPassword>
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
          <ChangePasswordTextField
            size="small"
            id="new-password" // id 변경
            placeholder="대문자, 소문자, 숫자, 특수문자를 포함하여 9자 이상 32자 이하로 입력해주세요."
            type={showPassword2 ? 'text' : 'password'}
            name="newPassword" // name 변경
            required
            inputRef={newPasswordRef}
            autoComplete="off"
            error={passwordError} // 에러 상태
            helperText={passwordErrorMessage} // 에러 메시지
            onChange={(e) => handleNewPasswordChange(e)} // 값 변경 핸들러
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword2 ? (
                    <Visibility
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      id="비밀번호보기2"
                    />
                  ) : (
                    <VisibilityOff
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      id="비밀번호숨기기2"
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </ChangePasswordContainer>
      </div>
      <div>
        <ChangePasswordContainer>
          <LabelForInputPassword>비밀번호 확인</LabelForInputPassword>
          <Tooltip
            place="bottom"
            style={{ fontSize: '12px', zIndex: 10 }}
            anchorSelect="#비밀번호보기3"
            content="보이기"
          />
          <Tooltip
            place="bottom"
            style={{ fontSize: '12px', zIndex: 10 }}
            anchorSelect="#비밀번호숨기기3"
            content="숨기기"
          />
          <ChangePasswordTextField
            id="confirm-password" // id 변경
            placeholder="비밀번호 확인"
            size="small"
            type={showPassword3 ? 'text' : 'password'}
            name="confirmPassword" // name 변경
            required
            inputRef={confirmPasswordRef}
            autoComplete="off"
            error={confirmPasswordError} // 에러 상태
            helperText={confirmPasswordErrorMessage} // 에러 메시지
            onChange={(e) => (handleConfirmPasswordChange(e), setNewPassword2(e))} // 값 변경 핸들러
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword3 ? (
                    <Visibility
                      id="비밀번호보기3"
                      onClick={handleClickShowPassword3}
                      onMouseDown={handleMouseDownPassword}
                    />
                  ) : (
                    <VisibilityOff
                      id="비밀번호숨기기3"
                      onClick={handleClickShowPassword3}
                      onMouseDown={handleMouseDownPassword}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </ChangePasswordContainer>
      </div>
    </>
  );
}

export default ChangePasswordFields;
