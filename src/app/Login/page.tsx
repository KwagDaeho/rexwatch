import React from 'react';
import LoginFields from '../../components/LoginFields';
import LoginHeader from '@/components/LoginHeader';
import { styled } from '@mui/material';

function Login() {
  return (
    <Background>
      <ModalContainer>
        <LoginHeader />
        <LoginFields />
      </ModalContainer>
    </Background>
  );
}

export default Login;

const Background = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.background.paper};
  z-index: 2000;
  left: 0;
  top: 0;
`;

const ModalContainer = styled('div')`
  width: 400px;
  height: 530px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.5);
`;
