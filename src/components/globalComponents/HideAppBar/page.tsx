'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Gnb from 'src/components/Gnb/page';
import CustomThemeToggleButton from './CustomThemeToggleButton/page';
import { RecoilRoot, useRecoilState } from 'recoil';
import moment from 'moment';
import { LogoutTimeState, modalOpenState, tokenState } from '@/recoil/atoms';
import { useEffect } from 'react';
import { useState } from 'react';
import UserSubMenuButton from './UserSubMenuButton';
import { useSignOut } from '@/utils/useSignOut/useSignOut';
import { renewToken } from '@/utils/auth';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
function HideOnScroll(
  props: Props & { setIsModalVisible: (visible: boolean) => void },
) {
  const [logoutTime, setLogoutTime] = useRecoilState(LogoutTimeState);
  const { setIsModalVisible } = props;
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [token, setToken] = useRecoilState(tokenState);
  const { handleSignOut } = useSignOut();

  useEffect(() => {
    const checkLogoutCondition = () => {
      if (logoutTime) {
        const diff = moment
          .duration(moment(logoutTime).diff(moment().format('YYYY-MM-DD h:mm:ss')))
          .asSeconds();
        if (diff === 0) {
          return true; // 로그아웃 조건이 충족됨을 나타냄
        }
      }

      // if (!token) {
      //   console.log('토큰이 없는순간 ?');
      //   return true; // 로그아웃 조건이 충족됨을 나타냄
      // }

      return false; // 로그아웃 조건이 충족되지 않음을 나타냄
    };

    const interval = setInterval(() => {
      if (checkLogoutCondition()) {
        // handleSignOut();
        setModalOpen((prevState) => ({
          ...prevState,
          editModal: false,
          registerModal: false,
          settingModal: false,
          addUserModal: false,
          signOutModal: false,
          changePasswordModal: false,
          autoSignOutModal: true,
        }));
      }
    }, 1000);

    document.body.onclick = (e) => {
      if (
        localStorage.getItem('user_token') &&
        e.clientY > 64 &&
        !document.getElementById('detection_area_wrap')
      ) {
        (async () => {
          try {
            const newToken = await renewToken(localStorage.getItem('user_token'));
            setToken(newToken);
            localStorage.setItem('user_token', newToken);
            setLogoutTime(moment().add(600, 'seconds').format('YYYY-MM-DD h:mm:ss'));
          } catch (error) {
            console.error('Token renewal error:', error);
          }
        })();
      }
    };
    return () => {
      clearInterval(interval);
    };
  }, [token, logoutTime]);

  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <RecoilRoot>
      <React.Fragment>
        <HideOnScroll {...props} setIsModalVisible={setIsModalVisible}>
          <AppBar color="secondary">
            <Toolbar className="header-wrap">
              <div id="header_gnb_wrap">
                <Gnb />
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                  <UserSubMenuButton />
                  <CustomThemeToggleButton />
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {props.children}
      </React.Fragment>
    </RecoilRoot>
  );
}
