import { Logout } from '@mui/icons-material';
import { Box, IconButton, ListItemIcon, MenuItem, Menu } from '@mui/material';
import { useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRecoilState } from 'recoil';
import { modalOpenState } from '@/recoil/atoms';
import { useThemeToggle } from '@/utils/theme/CustomThemeProvider';
const UserSubMenuButton = () => {
  const { isDarkMode } = useThemeToggle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size="small"
          color="info"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {isDarkMode && (
            <AccountCircleIcon sx={{ color: '#fff', width: 30, height: 30 }} />
          )}
          {!isDarkMode && (
            <AccountCircleIcon sx={{ color: '#000', width: 30, height: 30 }} />
          )}
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -1,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() =>
            setModalOpen((prevState) => ({
              ...prevState,
              changePasswordModal: true,
            }))
          }
        >
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          비밀번호 변경
        </MenuItem>
        <MenuItem
          onClick={() =>
            setModalOpen((prevState) => ({
              ...prevState,
              signOutModal: true,
            }))
          }
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그 아웃
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserSubMenuButton;
