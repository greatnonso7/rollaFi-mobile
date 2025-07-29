import React, {useEffect} from 'react';
import {ThemeProvider} from '@emotion/react';
import {showSplash, hideSplash} from 'react-native-splash-view';
import theme from 'theme';
import {FlashMessageToast} from 'shared';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from 'navigation';
import {DarkThemeProvider} from 'theme/dark-mode';

const App = () => {
  useEffect(() => {
    showSplash(); // Show the splash screen

    setTimeout(() => {
      hideSplash(); // Hide after some time
    }, 3000);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <DarkThemeProvider>
          <FlashMessageToast />
          <Navigation />
        </DarkThemeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
