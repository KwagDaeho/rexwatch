// useSignOut.ts
import { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { modalOpenState, tokenState } from '@/recoil/atoms';
import { useRouter } from 'next/navigation';

export const useSignOut = () => {
  const [token] = useRecoilState(tokenState);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.removeItem('user_token');
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
      if (response.data.statusText === '필수 파라미터가 없습니다. (login_id)') {
        router.push('/');
        setModalOpen((prevState) => ({
          ...prevState,
          editModal: false,
          registerModal: false,
          settingModal: false,
          addUserModal: false,
          signOutModal: false,
          changePasswordModal: false,
          autoSignOutModal: false,
        }));
      }
      if (response.data.statusCode === 200) {
        setModalOpen((prevState) => ({
          ...prevState,
          editModal: false,
          registerModal: false,
          settingModal: false,
          addUserModal: false,
          signOutModal: false,
          changePasswordModal: false,
          autoSignOutModal: false,
        }));
        router.push('/');
      }
    } catch (error) {
      console.log('[SIGN][OUT] i/f error=', error.toString());
    }
  };

  return { handleSignOut };
};
