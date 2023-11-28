'use client';

import { createContext, useContext, useState, ReactElement, ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';

const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
}>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useThemeToggle = () => {
  return useContext(ThemeContext);
};

interface CustomThemeProviderProps {
  children?: ReactNode;
}

const CustomThemeProvider = ({
  children,
}: CustomThemeProviderProps): ReactElement => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const colorSet = {
    point1: '#0650A4',
  };
  const theme = createTheme({
    typography: {
      fontFamily: 'Noto Sans KR, sans-serif',
    },
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: colorSet.point1,
        light: isDarkMode ? '#fff' : '#99f',
        dark: isDarkMode ? '#fff' : '#000',
        contrastText: isDarkMode ? '#111' : '#fff',
      },
      secondary: {
        main: isDarkMode ? '#000' : '#fff',
        light: isDarkMode ? '#fff' : '#1986a2',
        dark: colorSet.point1,
        contrastText: isDarkMode ? '#fff' : '#000',
      },
      error: {
        main: isDarkMode ? '#c62828' : '#ef5350',
        light: isDarkMode ? '#bcbcca' : '#1986a2',
        dark: isDarkMode ? '#bcbcca' : '#1986a2',
        contrastText: isDarkMode ? '#bcbcca' : '#1986a2',
      },
      warning: {
        main: isDarkMode ? '#bcbcca' : '#1986a2',
        light: isDarkMode ? '#bcbcca' : '#1986a2',
        dark: isDarkMode ? '#bcbcca' : '#1986a2',
        contrastText: isDarkMode ? '#bcbcca' : '#1986a2',
      },
      info: {
        main: isDarkMode ? '#fff' : '#0650A4',
        light: isDarkMode ? '#fff' : '#0650A4',
        dark: isDarkMode ? '#0650A4' : '#fff',
        contrastText: isDarkMode ? '#111' : '#e7e7e7',
      },
      success: {
        main: isDarkMode ? '#1986a2' : '#bcbcca',
        light: isDarkMode ? '#1986a2' : '#bcbcca',
        dark: isDarkMode ? '#1986a2' : '#bcbcca',
        contrastText: isDarkMode ? '#1986a2' : '#bcbcca',
      },
      tonalOffset: {
        light: 1,
        dark: 1,
      },
      contrastThreshold: 1,
      common: {
        black: isDarkMode ? '#bcbcca' : '#1986a2',
        white: isDarkMode ? '#bcbcca' : '#1986a2',
      },

      grey: {
        50: '#111',
        100: '#111',
        200: '#111',
        300: '#111',
        400: '#111',
        500: '#111',
        600: '#111',
        700: '#111',
        800: '#111',
        900: '#111',
        A100: '#111',
        A200: '#111',
        A400: '#111',
        A700: '#111',
      },
      text: {
        primary: isDarkMode ? '#fff' : '#171737',
        secondary: isDarkMode ? '#fff' : '#171737',
        disabled: isDarkMode ? '#fff' : '#171737',
      },
      divider: '#f90',
      action: {
        active: isDarkMode ? '#fff' : '#111',
        hover: isDarkMode ? '#d3cfc7' : '#d1ccc4',
        hoverOpacity: 0.7,
        selected: '#111',
        selectedOpacity: 0.8,
        disabled: '#fff',
        disabledOpacity: 0.8,
        disabledBackground: colorSet.point1,
        focus: '#111',
        focusOpacity: 0.8,
        activatedOpacity: 0.8,
      },
      background: {
        default: isDarkMode ? '#333' : '#fff',
        paper: isDarkMode ? '#0c0c0c' : '#fff',
      },
    },

    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
      easing: {
        // This is the most common easing curve.
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Objects enter the screen at full velocity from off-screen and
        // slowly decelerate to a resting point.
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        // Objects leave the screen at full velocity. They do not decelerate when off-screen.
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        // The sharp curve is used by objects that may return to the screen at any time.
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
