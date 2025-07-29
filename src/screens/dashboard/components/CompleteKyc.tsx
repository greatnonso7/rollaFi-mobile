/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BlurView} from '@sbaiahmed1/react-native-blur';
import {Box, Text} from 'design-system';
import {deviceWidth, fontSz, hp, isIos, wp} from 'utils';
import theme from 'theme';
import {useRollaFiStore} from 'store';
import {useDarkTheme} from 'theme/dark-mode';

interface CompleteKycProps {
  handleKYCVerification: () => void;
}

export const CompleteKyc = ({handleKYCVerification}: CompleteKycProps) => {
  const {userData} = useRollaFiStore();
  const {themeColor} = useDarkTheme();
  return (
    <>
      {isIos && !userData?.isVerified ? (
        <BlurView blurType={'light'} blurAmount={10} style={styles.blurOverlay}>
          <Box
            alignSelf={'center'}
            bg={theme.colors.PRIMARY}
            p={hp(16)}
            as={TouchableOpacity}
            activeOpacity={0.8}
            style={{position: 'absolute', top: hp(100)}}
            onPress={handleKYCVerification}
            borderRadius={hp(12)}
            alignItems={'center'}>
            <Text
              variant="bodyMedium"
              fontFamily={theme.font.GeneralSansMedium}
              color={themeColor.BODY_MAIN_TEXT}
              fontSize={fontSz(16)}>
              Verify Identity
            </Text>
          </Box>
        </BlurView>
      ) : !isIos && !userData?.isVerified ? (
        <Box style={[styles.blurOverlay]}>
          <BlurView blurType="light" style={[styles.blurOverlay]} />
          <Box
            alignSelf={'center'}
            bg={theme.colors.PRIMARY}
            p={hp(16)}
            zIndex={100000}
            style={{position: 'absolute', top: hp(100)}}
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={handleKYCVerification}
            borderRadius={hp(12)}
            alignItems={'center'}>
            <Text
              variant="bodyMedium"
              fontFamily={theme.font.GeneralSansMedium}
              color={themeColor.BODY_MAIN_TEXT}
              fontSize={fontSz(16)}>
              Verify Identity
            </Text>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  blurContent: {
    padding: wp(20),
    width: wp(311),
    height: hp(204),
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurText: {
    fontSize: wp(18),
    fontWeight: 'bold',
    color: theme.colors.APP_BLACK_100,
    textAlign: 'center',
    marginBottom: hp(8),
  },
  blurSubText: {
    fontSize: wp(14),
    color: theme.colors.GREY_600,
    textAlign: 'center',
    lineHeight: wp(20),
  },
  blurOverlay: {
    zIndex: 1000,
    alignSelf: 'center',
    borderRadius: hp(16),
    marginBottom: hp(20),
    width: deviceWidth,
    height: hp(250),
    position: 'absolute',
  },
});
