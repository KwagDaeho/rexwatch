import React, { useState } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRecoilState } from 'recoil';
import { modalOpenState } from '@/recoil/atoms';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/system';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
const Wrapper = styled('div')({
  position: 'relative',
});

const SubMenuList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.1rem',
  listStyleType: 'none',
  padding: 0,
  position: 'absolute',
  top: '100%',
  left: '0',
  zIndex: 10, // zIndex 추가
});

const SubMenuButton = styled(Button)`
  width: 100%;
  color: ${(props) => props.theme.palette.info.main};
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  margin: 0rem 5rem;
`;
const UserSubMenu = ({ currentPath }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);

  return (
    <Wrapper id="user_menu_btn">
      <Button
        size="small"
        variant={currentPath === 'UserSub' ? 'contained' : 'text'}
        disabled={currentPath === 'UserSub'}
        color="primary"
        sx={{
          height: '52px',
          '&:hover': {
            backgroundColor: 'inherit',
            boxShadow: 'none',
          },
        }}
        onClick={() => {
          setSelectedMenu((prevMenu) => (prevMenu === 'UserSub' ? null : 'UserSub'));
        }}
      >
        <Link
          href="/UserSub"
          onClick={(e) => e.preventDefault()}
          style={{
            display: 'inline-flex',
            width: '100%',
            height: '100%',
            verticalAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <AccountCircleIcon sx={{ margin: 'auto' }} color="primary" />
        </Link>
      </Button>
      <Collapse in={selectedMenu === 'UserSub'}>
        <SubMenuList>
          <li>
            <SubMenuButton
              id="header_gnb"
              size="small"
              variant={currentPath === 'ChangePassword' ? 'contained' : 'text'}
              disabled={currentPath === 'ChangePassword'}
              color="info"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen((prevState) => ({
                  ...prevState,
                  changePasswordModal: true,
                }));
              }}
            >
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center', // 아이콘과 텍스트가 동일한 수평선상에 위치하도록 함
                }}
              >
                <Link
                  style={{ marginRight: '0.5rem', textAlign: 'left' }}
                  href="/ChangePassword"
                  onClick={(e) => e.preventDefault()}
                >
                  비밀번호 변경
                </Link>
                <KeyIcon />
              </div>
            </SubMenuButton>
          </li>
          <li>
            <SubMenuButton
              size="small"
              variant={currentPath === 'SignOut' ? 'contained' : 'text'}
              disabled={currentPath === 'SignOut'}
              color="info"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen((prevState) => ({
                  ...prevState,
                  signOutModal: true,
                }));
              }}
            >
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center', // 아이콘과 텍스트가 동일한 수평선상에 위치하도록 함
                }}
              >
                <Link
                  style={{ marginRight: '0.5rem', textAlign: 'left' }}
                  href="/SignOut"
                  onClick={(e) => e.preventDefault()}
                >
                  로그 아웃
                </Link>
                <LogoutIcon />
              </div>
            </SubMenuButton>
          </li>
        </SubMenuList>
      </Collapse>
    </Wrapper>
  );
};

export default UserSubMenu;
