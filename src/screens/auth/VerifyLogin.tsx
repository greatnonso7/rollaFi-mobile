import React, {Fragment, useEffect, useState} from 'react';
import {Header, HeaderText, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {getStyles} from './style';
import {Box, Button, Text} from 'design-system';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TouchableOpacity} from 'react-native';
import {useDarkTheme} from 'theme/dark-mode';
import {useRollaFiStore} from 'store';
import {showMessage} from 'react-native-flash-message';

const CELL_COUNT = 6;

export const VerifyLogin = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });
  const {completeLogin} = useRollaFiStore();

  const {themeColor} = useDarkTheme();
  const styles = getStyles(themeColor);
  const handleResendOtp = () => {
    setOtp('');
    setSeconds(0);
    setMinutes(1);
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds]);

  const continueProcess = () => {
    setLoading(true);

    if (otp === '123456') {
      setLoading(false);
      completeLogin();
    } else {
      setLoading(false);
      showMessage({
        message: 'Invalid OTP',
        type: 'danger',
      });
      setOtp('');
    }
  };

  return (
    <Screen removeSafeaArea>
      <Header hasBackButton hasLogo />
      <HeaderText
        textStyle={styles.headerText}
        hasHeaderText="Verify your phone number"
        fontSize={fontSz(24)}
        hasSubHeader="Enter the 6-digit code sent to your phone number"
      />

      <Box my={hp(20)} mx={wp(16)}>
        {/* @ts-ignore */}
        <CodeField
          ref={ref}
          {...props}
          value={otp}
          onChangeText={setOtp}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Fragment key={index}>
              <Box style={[styles.cellRoot, isFocused && styles.focusInput]}>
                <Text
                  style={styles.cellText}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor cursorSymbol="|" /> : null)}
                </Text>
              </Box>
            </Fragment>
          )}
        />

        {minutes === 0 && seconds === 0 ? (
          <Box my={hp(20)} flexDirection={'row'} alignItems={'flex-start'}>
            <Text variant={'body'} color={'text_input_border'}>
              Didn't receive the OTP?{' '}
            </Text>
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={handleResendOtp}
              borderBottomWidth={1}
              borderColor={themeColor.BODY_MAIN_TEXT}>
              <Text variant={'body'} color={themeColor.BODY_MAIN_TEXT}>
                Resend OTP
              </Text>
            </Box>
          </Box>
        ) : (
          <Box my={hp(20)} flexDirection={'row'} alignItems={'flex-start'}>
            <Text
              variant={'body'}
              color={themeColor.SUB_HEADER_TEXT}
              fontSize={fontSz(14)}>
              Didn't receive the OTP?{' '}
            </Text>
            <Text
              variant={'body'}
              color={themeColor.SUB_HEADER_TEXT}
              fontSize={fontSz(14)}>
              Resend in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </Box>
        )}
      </Box>

      <Button
        title="Verify"
        onPress={continueProcess}
        disabled={otp.length !== 6}
        loading={loading}
      />
    </Screen>
  );
};
