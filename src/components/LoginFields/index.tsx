'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  LogoutTimeState,
  modalOpenState,
  tokenState,
  userState,
} from 'src/recoil/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { isTokenExpired, renewToken } from '@/utils/auth';
import moment from 'moment';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AlertModal } from '../AlertModal';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import styled from 'styled-components';
import { sendRequestURL } from '@/api/PostApi';

function LoginFields() {
  const [showPassword, setShowPassword] = useState(null);
  const router = useRouter(); // useRouter 훅을 사용합니다.
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const capchaRef = useRef<HTMLInputElement>(null);
  const [logoutTime, setLogoutTime] = useRecoilState(LogoutTimeState);
  const [username, setUsername] = useState(''); // 아이디를 위한 상태
  const [password, setPassword] = useState(''); // 비밀번호를 위한 상태
  const [capcha, setCapcha] = useState(''); // 캡차를 위한 상태
  const [loginFailMessage, setLoginFailMessage] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [capchaErrorMessage, setCapchaErrorMessage] = useState('');
  const setInnerModalOpen = useSetRecoilState(modalOpenState);
  const [imageSrc, setImageSrc] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const fetchUrl = 'http://192.168.0.200:8080/api/v1/sign/capcha';

  const handleRefresh = () => {
    setTrigger(trigger + 1);
  };

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleCapchaChange = (event: any) => {
    setCapcha(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const jsonData = {
      user_id: username,
      user_pw: password,
      capcha: capcha,
    };
    try {
      const response = await fetch('http://192.168.0.200:8080/api/v1/sign/in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      if (result.statusCode === 200) {
        setUser(result.user_info);
        setToken(result.user_token); // Recoil 상태 업데이트
        localStorage.setItem('user_token', result.user_token);
        localStorage.setItem('user_id', username);
        setLogoutTime(moment().add(600, 'seconds').format('YYYY-MM-DD h:mm:ss'));
        setInnerModalOpen((prevState) => ({
          ...prevState,
          autoSignOutModal: false,
        }));
        router.push('/CameraView');
      } else {
        setLoginFailMessage(result.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const valueInfoCheckFunc = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIdErrorMessage('');
    setPasswordErrorMessage('');
    setCapchaErrorMessage('');
    // 필드가 하나라도 비어있는지 확인
    if (!username || !password || !capcha) {
      if (!username) {
        setTimeout(() => {
          usernameRef.current?.focus();
          setIdErrorMessage('아이디를 확인해주세요.');
        }, 0);
        return false;
      }
      if (!password) {
        setTimeout(() => {
          passwordRef.current?.focus();
          setPasswordErrorMessage('비밀번호를 확인해 주세요.');
        }, 0);
        return false;
      }
      if (!capcha) {
        setTimeout(() => {
          capchaRef.current?.focus();
          setCapchaErrorMessage('보안 코드를 확인해 주세요.');
        }, 0);
        return;
      }
      return false;
    } else {
      handleSubmit(event);
    }
  };

  // const CapchaComponent = () => {
  //   return (
  //     <SecurityNumberContainer>
  //       <ImageContainer>
  //         {imageSrc ? (
  //           <Image
  //             id="image_capcha"
  //             src={imageSrc}
  //             alt="Capcha"
  //             width={80}
  //             height={30}
  //           />
  //         ) : (
  //           <Image
  //             id="image_capcha"
  //             alt="Capcha Error"
  //             src={require('../../data/assets/capchaError.png')}
  //             width={80}
  //             height={30}
  //           />
  //         )}
  //       </ImageContainer>
  //       <Tooltip
  //         place="bottom"
  //         style={{ fontSize: '12px', zIndex: 1 }}
  //         anchorSelect="#보안코드갱신"
  //         content="보안코드 갱신"
  //       />
  //       <RefreshIcon
  //         style={{ cursor: 'pointer' }}
  //         onClick={handleRefresh}
  //         id="보안코드갱신"
  //       />
  //     </SecurityNumberContainer>
  //   );
  // };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      (async () => {
        try {
          const newToken = await renewToken(token);
          setToken(newToken);
          localStorage.setItem('token', newToken);
        } catch (error) {
          console.error('Token renewal error:', error);
        }
      })();
    }
  }, [token, setToken]);

  useEffect(() => {
    // const totalRefreshData = async () => {
    //   const listResult = await sendRequestURL('get', fetchUrl);
    //   console.log('listResult', listResult);
    // };
    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setImageSrc(`data:image/png;base64,${data}`);
      })
      .catch((error) => {
        console.log('Error:', error);
        setResultMessage(
          '보안코드 이미지 로딩에 실패했습니다. 서버를 확인해 주세요.',
        );
        setModalOpen(true);
      });
  }, [trigger]);

  // useEffect(() => {
  //   const totalRefreshData = async () => {
  //     const listResult = await sendRequestURL('get', fetchUrl);
  //     console.log('listResult', listResult);
  //   };
  //   totalRefreshData();
  // }, []);

  return (
    <>
      <Form
        style={{
          paddingTop: '15px',
          width: '90%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center,',
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <MainTextField
          id="username"
          style={{ width: '100%', height: '70px' }}
          placeholder="아이디"
          type="text"
          name="username"
          inputProps={{ maxLength: 10 }}
          autoFocus
          size="small"
          autoComplete="off"
          value={username}
          inputRef={usernameRef}
          onChange={handleUsernameChange}
          helperText={idErrorMessage}
          error={idErrorMessage !== ''}
        />
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
        <LoginPasswordTextField
          id="password"
          placeholder="비밀번호"
          type={showPassword ? 'text' : 'password'}
          name="password"
          inputRef={passwordRef}
          size="small"
          style={{ width: '100%', height: '70px' }}
          autoComplete="off"
          inputProps={{ maxLength: 32, inputMode: 'numeric' }}
          error={passwordErrorMessage !== ''}
          onChange={handlePasswordChange}
          helperText={passwordErrorMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <Visibility
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    id="비밀번호보기"
                  />
                ) : (
                  <VisibilityOff
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    id="비밀번호숨기기"
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <CapchaContainer
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            height: '70px',
            marginBottom: '20px',
          }}
        >
          <FixedCapchaTextField
            style={{ width: '60%' }}
            id="capcha"
            placeholder="보안코드"
            type="capcha"
            name="capcha"
            size="small"
            helperText={capchaErrorMessage}
            inputRef={capchaRef}
            autoComplete="off"
            value={capcha}
            error={capchaErrorMessage !== ''}
            inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]' }}
            onChange={handleCapchaChange}
          />
          <SecurityNumberContainer
            style={{
              width: '35%',
              display: 'flex',
              justifyContent: 'space-around',
              paddingTop: '6px',
            }}
          >
            <div>
              {/* <Image
                id="image_capcha"
                alt="Capcha Error"
                src={require('../../data/assets/capchaError.png')}
                width={80}
                height={30}
              /> */}
              {/* {imageSrc === null && (
                <Image
                  id="image_capcha"
                  alt="Capcha Error"
                  src={require('../../data/assets/capchaError.png')}
                  width={80}
                  height={30}
                />
              )} */}
              {/* {imageSrc !== null && (
                <Image
                  id="image_capcha"
                  src={imageSrc}
                  alt="Capcha"
                  width={80}
                  height={30}
                />
              )} */}
              {imageSrc ? (
                <Image
                  id="image_capcha"
                  src={imageSrc}
                  alt="Capcha"
                  width={80}
                  height={30}
                />
              ) : (
                <Image
                  id="image_capcha"
                  alt="Capcha Error"
                  src={require('../../data/assets/capchaError.png')}
                  width={80}
                  height={30}
                />
              )}
            </div>
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 1 }}
              anchorSelect="#securityCodeButton"
              content="보안코드 갱신"
            />
            <RefreshIcon
              style={{ cursor: 'pointer' }}
              onClick={handleRefresh}
              id="securityCodeButton"
            />
          </SecurityNumberContainer>
        </CapchaContainer>
        <LoginButton
          style={{ width: '100%', fontWeight: 'bold', backgroundColor: '#2477ec' }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={valueInfoCheckFunc}
        >
          로그인
        </LoginButton>
        <p
          style={{
            padding: '5px 0',
            height: '30px',
            fontSize: '12px',
            color: 'red',
            textAlign: 'center',
          }}
        >
          {loginFailMessage || ''}
        </p>
        <p
          style={{
            textAlign: 'center',
            paddingTop: '5px',
            fontSize: '12px',
            color: '#c8c8c8',
          }}
        >
          RexWatchCity Copyright 2023. Rexgen. All rights reserved.
        </p>
      </Form>
      {/* <AlertModal
        message={resultMessage}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      /> */}
    </>
  );
}

export default LoginFields;

const Form = styled('form')`
  /* padding-top: 15px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;
const MainTextField = styled(TextField)`
  width: 100%;
  height: 70px;
`;
const LoginPasswordTextField = styled(TextField)`
  width: 100%;
  height: 70px;
`;
const CapchaContainer = styled('div')`
  /* width: 100%;
  display: flex;
  justify-content: space-between;
  height: 70px;
  margin-bottom: 20px; */
`;
const FixedCapchaTextField = styled(TextField)`
  width: 60%;
`;
const SecurityNumberContainer = styled('div')`
  width: 35%;
  display: flex;
  justify-content: space-around;
  padding-top: 6px;
`;
const ImageContainer = styled('div')`
  /* height: 40px; */
`;
const LoginButton = styled(Button)`
  width: 100%;
  font-weight: bold;
  background-color: '#2477ec';
`;
