import React from 'react';
import { LoginLogo } from '@/components/MuiStyled/Image';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';

function LoginHeader() {
  return (
    <HeaderContainer>
      <LoginLogo
        height={60}
        width={60}
        src="/rexgen.png"
        alt="Rex-Watch-city-edge"
      />
      <h2>RexWatchCity v3.0e</h2>
      <VerticalLine />
      <div>
        <h5
          style={{
            paddingTop: '20px',
            textAlign: 'center',
            fontWeight: 800,
            color: 'grey',
          }}
        >
          시스템에 로그인 하세요!
        </h5>
      </div>
    </HeaderContainer>
  );
}

export default LoginHeader;

const HeaderContainer = styled('div')`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const VerticalLine = styled('hr')`
  color: #cccccc;
  margin: 5px 0;
  width: 90%;
`;
