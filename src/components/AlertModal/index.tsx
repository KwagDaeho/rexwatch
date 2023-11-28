import { styled } from '@mui/system';
import React from 'react';
import { Typography } from '@mui/material';
import logoImage from '../../data/assets/logo.png';
import { LoginLogo } from '@/components/MuiStyled/Image';
import { HeaderContainer, Item } from '@/components/MuiStyled/Div';
import { H3 } from '../MuiStyled/Title';
import { grey } from '@mui/material/colors';
import { ClickButton } from '../ClickButton';
import { useRecoilState } from 'recoil';
import { loadingState } from '@/recoil/atoms';
export const AlertModal = ({ message, isOpen, onClose }: any) => {
  const grey500 = grey[400];
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  return (
    isOpen && (
      <Modal>
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
            {message}
          </Typography>
          {isLoading.delete || isLoading.register ? null : (
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                marginTop: '50px',
              }}
            >
              <ClickButton
                title={'확인'}
                background={'#2477ec'}
                minwidth="200px"
                onClick={onClose}
              />
            </div>
          )}
        </ModalContainer>
      </Modal>
    )
  );
};

const Modal = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10400;
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
  z-index: 10400;
`;
