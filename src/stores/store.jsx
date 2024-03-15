import React, { createContext, useState, useEffect } from 'react';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const [isDarkModeOn, setIsDarkModeOn] = useState(colorScheme === 'dark'); // 根据系统主题设置默认主题
  const [paperTheme, setPaperTheme] = useState({
    ...(isDarkModeOn ? MD3DarkTheme : MD3LightTheme),
    colors: theme[isDarkModeOn ? 'dark' : 'light']
  });

  useEffect(() => {
    const scheme = isDarkModeOn ? 'dark' : 'light';
    const baseTheme = isDarkModeOn ? MD3DarkTheme : MD3LightTheme;

    setPaperTheme({ ...baseTheme, colors: theme[scheme] });
   
  }, [isDarkModeOn, theme]);

  const toggleTheme = () => {
    setIsDarkModeOn(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkModeOn, toggleTheme, paperTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};