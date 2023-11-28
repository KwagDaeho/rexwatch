import { Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutModal from '@/components/SignOutModal';
import { styled } from '@mui/system';
import { modalOpenState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';
import ChangePassword from '@/components/ChangePassword/page';
import SignOutNotHaveTokenModal from '@/components/SignOutNothaveTokenModal';

const MenuList = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  listStyleType: 'none',
  padding: 0,
  alignItems: 'center',
});

const MenuItem = styled('li')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

const GetPageList = () => {
  const pages = [
    { link: 'CameraView', name: '영상 보기' },
    { link: 'CameraSetting', name: '설정' },
    { link: 'CameraManagement', name: '카메라' },
    { link: 'ModuleSetting', name: '모듈' },
    { link: 'User', name: '사용자 관리' },
    { link: 'SystemLog', name: '시스템 로그' },
  ];

  const pathname = usePathname().replace('/', '');
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);

  return (
    <>
      <MenuList>
        {pages.map((page, idx) => (
          <MenuItem key={idx}>
            <ButtonStyled
              size="small"
              variant={pathname === page.link ? 'contained' : 'text'}
              disabled={pathname === page.link ? true : false}
              color="primary"
            >
              <Link href={`/${page.link}`}>{page.name}</Link>
            </ButtonStyled>
          </MenuItem>
        ))}
      </MenuList>
      {modalOpen.signOutModal && <SignOutModal />}
      {modalOpen.autoSignOutModal && <SignOutNotHaveTokenModal />}
      {modalOpen.changePasswordModal && (
        <ChangePassword
          open={modalOpen.changePasswordModal}
          handleClose={() =>
            setModalOpen((prevState) => ({
              ...prevState,
              changePasswordModal: false,
            }))
          }
        />
      )}
    </>
  );
};

export default GetPageList;

const ButtonStyled = styled(Button)`
  color: ${(props) => props.theme.palette.primary.dark};
`;
