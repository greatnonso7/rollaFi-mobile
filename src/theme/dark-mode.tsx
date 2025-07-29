import React, {useContext} from 'react';
import {ColorSchemeName, StatusBar} from 'react-native';
import {lightColors, darkColors} from './colors';
import {useRollaFiStore} from 'store';

export const ThemeContext = React.createContext({
  isDark: false,
  themeColor: lightColors,
  setScheme: (scheme: ColorSchemeName, status: string, isDefault: boolean) => {
    console.log(scheme, isDefault);
  },
});

export const DarkThemeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const {currentTheme, setCurrentTheme} = useRollaFiStore();

  const isDark = currentTheme?.theme === 'dark';

  const defaultTheme = {
    isDark,
    themeColor: isDark ? darkColors : lightColors,
    setScheme: (
      scheme: ColorSchemeName,
      status: string,
      isDefault: boolean,
    ) => {
      const data = {
        theme: scheme as string,
        status,
        isDefault,
      };
      setCurrentTheme(data);
      StatusBar.setBarStyle(
        scheme === 'light'
          ? 'dark-content'
          : scheme === 'dark'
          ? 'light-content'
          : 'dark-content',
      );
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkTheme = () => useContext(ThemeContext);
