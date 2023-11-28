import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { modalOpenState, tokenState } from '@/recoil/atoms';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import logoImage from '../../data/assets/logo.png';
import { LoginLogo } from '../MuiStyled/Image';
import { H3 } from '../MuiStyled/Title';
import { HeaderContainer, Item } from '../MuiStyled/Div';
import { grey } from '@mui/material/colors';
import { Button, Typography } from '@mui/material';
import { ClickButton } from '../ClickButton';

const SignOutModal: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [jsonResult, setJsonResult] = useState('');
  const router = useRouter(); // useRouter 훅을 사용합니다.
  const [storedToken, setRecoilToken] = useRecoilState(tokenState); // <- 컴포넌트 본문에서 호출
  const grey500 = grey[400];

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, [storedToken]); // storedToken 의존성 추가
  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.200:8080/api/v1/sign/out',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('[SIGN][OUT] i/f success=', response.data);

      setJsonResult(JSON.stringify(response.data, null, 4));

      if (response.data.statusCode === 200) {
        // 토큰을 로컬 스토리지와 상태 모두에서 제거
        localStorage.removeItem('user_token');
        setToken(null);
        setRecoilToken(null); // Recoil 상태 업데이트

        setModalOpen((prevState) => ({ ...prevState, signOutModal: false }));
        router.push('/');
      }
    } catch (error) {
      console.log('[SIGN][OUT] i/f error=', error.toString());
      setJsonResult(error.toString());
    }
  };

  return (
    <div>
      {modalOpen.signOutModal && (
        <Modal style={{ zIndex: 10000 }}>
          <ModalContainer>
            <HeaderContainer sx={{ flexDirection: 'column' }}>
              <Item>
                <LoginLogo src={logoImage} alt="Logo" />
              </Item>
              <Item>
                <H3
                  sx={{
                    textAlign: 'center',
                    fontWeight: 800,
                    color: grey500,
                  }}
                >
                  RexWatchCity
                </H3>
              </Item>
            </HeaderContainer>
            <Typography sx={{ marginTop: '40px', textAlign: 'center' }}>
              시스템에서 로그아웃 하시겠습니까?
            </Typography>
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                marginTop: '50px',
              }}
            >
              <ClickButton
                minwidth={'200px'}
                title={'취소'}
                background={'#c2c2c2'}
                onClick={() =>
                  setModalOpen((prevState) => ({
                    ...prevState,
                    signOutModal: false,
                  }))
                }
              ></ClickButton>
              <ClickButton
                minwidth={'200px'}
                title={'확인'}
                background={'#2477ec'}
                onClick={() => handleSignOut()}
              ></ClickButton>
            </div>
          </ModalContainer>
        </Modal>
      )}
    </div>
  );
};

export default SignOutModal;
const Modal = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10020;
`;

const ModalContainer = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  padding: 30px;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  border-radius: 10px;
  z-index: 10020;
`;
