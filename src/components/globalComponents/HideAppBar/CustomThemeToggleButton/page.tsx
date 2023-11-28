/* eslint-disable react/jsx-no-comment-textnodes */
import { Box, Button, IconButton } from '@mui/material';
import { useThemeToggle } from 'src/utils/theme/CustomThemeProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
const CustomThemeToggleButton = () => {
  const { toggleTheme } = useThemeToggle();
  const { isDarkMode } = useThemeToggle();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <IconButton onClick={toggleTheme} color="info" size="small" sx={{ ml: 2 }}>
        {isDarkMode && <ModeNightIcon sx={{ color: '#fff', fontSize: 30 }} />}
        {!isDarkMode && <LightModeIcon sx={{ color: '#000', fontSize: 30 }} />}
      </IconButton>
    </Box>
  );
};

export default CustomThemeToggleButton;
