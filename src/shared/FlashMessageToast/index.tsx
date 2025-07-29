/* eslint-disable react/no-unstable-nested-components */
import {Box, Text} from 'design-system';
import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';
import FlashMessage from 'react-native-flash-message';
import {Icon} from 'shared/Icon';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const FlashMessageToast = () => {
  const flashMessage = useRef<FlashMessage>();

  return (
    <FlashMessage
      //@ts-ignore
      ref={flashMessage}
      position={'top'}
      duration={3000}
      MessageComponent={({message}: any) => {
        if (message?.type === 'danger') {
          return (
            <Box
              backgroundColor={theme.colors.LIGHT_RED_500}
              mt={hasDynamicIsland() || hasNotch() ? hp(50) : hp(40)}
              mx={wp(16)}
              p={wp(2)}
              borderRadius={hp(12)}>
              <Box
                bg={theme.colors.LIGHT_RED_400}
                borderRadius={hp(8)}
                m={wp(2)}
                p={wp(2)}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Icon name="toast-danger" />
                  <Text
                    variant="bodyMedium"
                    pl={wp(2)}
                    fontSize={fontSz(12)}
                    color={theme.colors.APP_BLACK_100}>
                    {message?.message}
                  </Text>
                </Box>

                <Box
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => flashMessage.current?.hideMessage()}>
                  <Icon name="close" />
                </Box>
              </Box>
            </Box>
          );
        } else if (message?.type === 'success') {
          return (
            <Box
              backgroundColor={theme.colors.LIGHT_GREEN_500}
              mt={hasDynamicIsland() || hasNotch() ? hp(50) : hp(40)}
              mx={wp(16)}
              p={wp(2)}
              borderRadius={hp(12)}>
              <Box
                bg={theme.colors.LIGHT_GREEN_400}
                borderRadius={hp(8)}
                m={wp(2)}
                p={wp(2)}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Icon name="toast-success" />
                  <Text
                    pl={wp(2)}
                    variant="bodyMedium"
                    fontSize={fontSz(12)}
                    color={theme.colors.APP_BLACK_100}>
                    {message?.message}
                  </Text>
                </Box>

                <Box
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => flashMessage.current?.hideMessage()}>
                  <Icon name="close" />
                </Box>
              </Box>
            </Box>
          );
        }
      }}
    />
  );
};
