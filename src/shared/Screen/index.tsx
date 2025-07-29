import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box} from 'design-system';
import {hp, isAndroid} from 'utils';
import {useDarkTheme} from 'theme/dark-mode';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  backgroundColor?: string;
  removeSafeaArea?: boolean;
  opacity?: number;
}

export const Screen = ({
  children,
  backgroundColor,
  removeSafeaArea,
  opacity,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const {themeColor} = useDarkTheme();

  return (
    <>
      {removeSafeaArea ? (
        <Box
          backgroundColor={backgroundColor || themeColor.BACKGROUND_COLOR}
          flex={1}
          opacity={opacity || 1}
          pt={isAndroid ? top + hp(10) : top}>
          <StatusBar />
          {children}
        </Box>
      ) : (
        <Box
          backgroundColor={backgroundColor || themeColor.BACKGROUND_COLOR}
          flex={1}
          as={SafeAreaView}>
          <StatusBar />
          {children}
        </Box>
      )}
    </>
  );
};
