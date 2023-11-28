import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { modalOpenState, tokenState } from '@/recoil/atoms';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import logoImage from '../../data/assets/logo.png';
import { HeaderContainer, Item } from '../MuiStyled/Div';
import { LoginLogo } from '../MuiStyled/Image';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ClickButton } from '../ClickButton';
import { H3 } from '../MuiStyled/Title';
import { grey } from '@mui/material/colors';

const SignOutNotHaveTokenModal: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [jsonResult, setJsonResult] = useState('');
  const router = useRouter(); // useRouter 훅을 사용합니다.
  const grey500 = grey[400];

  const [storedToken, setRecoilToken] = useRecoilState(tokenState); // <- 컴포넌트 본문에서 호출

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, [storedToken]); // storedToken 의존성 추가
  const handleSignOut = async () => {
    setModalOpen((prevState) => ({
      ...prevState,
      changePasswordModal: false,
      addUserModal: false,
      settingModal: false,
      registerModal: false,
      editModal: false,
      signOutModal: false,
    }));

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
        console.log('[SIGN][OUT] result.user_token=', response.data.user_token);
        localStorage.setItem('token', response.data.user_token);
        setToken(response.data.user_token);
        setModalOpen((prevState) => ({ ...prevState, autoSignOutModal: false }));
        setModalOpen((prevState) => ({
          ...prevState,
          changePasswordModal: false,
          addUserModal: false,
          settingModal: false,
          registerModal: false,
          editModal: false,
          signOutModal: false,
        }));
        router.push('/');
      }
    } catch (error) {
      console.log('[SIGN][OUT] i/f error=', error.toString());
      setJsonResult(error.toString());
    }
  };
  return (
    <div>
      <Button
        onClick={() =>
          setModalOpen((prevState) => ({ ...prevState, autoSignOutModal: true }))
        }
      >
        로그아웃 <ExitToAppIcon sx={{ marginLeft: '3px' }} />
      </Button>

      {modalOpen.autoSignOutModal && (
        <Modal style={{ zIndex: 10100 }}>
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
            <Typography
              sx={{ marginTop: '30px', textAlign: 'center', fontWeight: 800 }}
            >
              세션이 만료되었습니다.
            </Typography>
            <Typography
              sx={{ marginTop: '5px', textAlign: 'center', fontWeight: 400 }}
            >
              계속하려면 다시 로그인하십시오.
            </Typography>
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
              }}
            >
              <ClickButton
                minwidth={'200px'}
                title={'다시 로그인 하기'}
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

export default SignOutNotHaveTokenModal;
const Modal = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1014 !important;
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
  z-index: 1014 !important;
`;
