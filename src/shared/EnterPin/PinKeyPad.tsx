import React, {useState} from 'react';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Box, Text} from 'design-system';
import {Icon} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import theme from 'theme';

interface PinKeyPadProps {
  onComplete?: (value: string) => void;
  boxSize?: number;
  title?: string;
  mt?: number;
}

export const PinKeyPad = ({onComplete, boxSize, title, mt}: PinKeyPadProps) => {
  const [pin, setPin] = useState('');

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
  };

  const firstRow = ['1', '2', '3'];
  const secondRow = ['4', '5', '6'];
  const thirdRow = ['7', '8', '9'];
  const fourthRow = ['faceId', '0', 'del'];

  const onLongPress = (item: any) => {
    RNReactNativeHapticFeedback.trigger('impactMedium', options);

    if (item === 'del') {
      setPin('');
    }
  };

  const onPressButton = async (item: string) => {
    RNReactNativeHapticFeedback.trigger('impactMedium', options);
    let completePin;

    if (item === 'del') {
      setPin(pin?.slice(0, -1));
      return;
    }
    if (item === 'pin') {
      return;
    }

    if (pin?.length < 5) {
      setPin(pin + item);
    }

    completePin = pin + item;
    if (completePin.length === 4) {
      onComplete && onComplete(completePin);
    }
  };

  return (
    <Box mt={mt || 80}>
      <Box flexDirection={'column'} bottom={hp(40)}>
        <Image source={theme.images['lock-2']} style={styles.lockImage} />
        {title && <Text style={styles.pinTitle}>{title}</Text>}
      </Box>
      <Box
        width={wp(250)}
        height={hp(50)}
        flexDirection={'row'}
        alignItems={'center'}
        alignSelf={'center'}
        justifyContent={'space-between'}>
        {[1, 2, 3, 4].map((item, index) => {
          let hasCompleted = pin?.length >= index + 1;
          return (
            <Box key={index}>
              <Icon name={hasCompleted ? 'active-pin' : 'empty-pin'} />
            </Box>
          );
        })}
      </Box>
      <Box
        flexDirection={'row'}
        mt={mt || 90}
        mx={20}
        alignItems={'flex-start'}
        justifyContent={'space-between'}>
        <Box flex={1}>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            width={wp(330)}
            alignSelf={'center'}
            justifyContent={'space-between'}
            mb={boxSize || 40}>
            {firstRow.map((item, index) => (
              <Box
                as={TouchableOpacity}
                onPress={() => onPressButton(item)}
                key={index}
                activeOpacity={0.8}
                width={101}
                height={48}
                borderRadius={16}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text
                  variant="bodyMedium"
                  lineHeight={hp(26)}
                  fontSize={fontSz(20)}
                  color={theme.colors.WHITE_700}>
                  {item}
                </Text>
              </Box>
            ))}
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            width={wp(330)}
            alignSelf={'center'}
            justifyContent={'space-between'}
            mb={boxSize || 40}>
            {secondRow.map((item, index) => (
              <Box
                as={TouchableOpacity}
                onPress={() => onPressButton(item)}
                key={index}
                activeOpacity={0.8}
                width={101}
                height={48}
                borderRadius={16}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text
                  variant="bodyMedium"
                  fontSize={fontSz(20)}
                  lineHeight={hp(26)}
                  color={theme.colors.WHITE_700}>
                  {item}
                </Text>
              </Box>
            ))}
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            width={wp(330)}
            alignSelf={'center'}
            justifyContent={'space-between'}
            mb={boxSize || 40}>
            {thirdRow.map((item, index) => (
              <Box
                as={TouchableOpacity}
                onPress={() => onPressButton(item)}
                key={index}
                activeOpacity={0.8}
                width={101}
                height={48}
                borderRadius={16}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text
                  variant="bodyMedium"
                  fontSize={fontSz(20)}
                  lineHeight={hp(26)}
                  color={theme.colors.WHITE_700}>
                  {item}
                </Text>
              </Box>
            ))}
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            width={wp(330)}
            alignSelf={'center'}
            justifyContent={'space-between'}
            mb={boxSize || 40}>
            {fourthRow.map((item, index) => {
              return (
                <Box
                  as={TouchableOpacity}
                  onPress={() => onPressButton(item)}
                  onLongPress={() => onLongPress(item)}
                  key={index}
                  activeOpacity={0.8}
                  width={101}
                  height={48}
                  borderRadius={16}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  {item === 'del' ? (
                    <Icon name="chevron-back" color={theme.colors.WHITE_700} />
                  ) : item === '0' ? (
                    <Text
                      fontSize={fontSz(20)}
                      variant="bodyMedium"
                      color={theme.colors.WHITE_700}>
                      {item}
                    </Text>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  pinTitle: {
    textAlign: 'center',
    fontFamily: theme.font.GeneralSansMedium,
    fontSize: fontSz(24),
    lineHeight: hp(26),
    paddingTop: hp(30),
  },
  lockImage: {
    width: 80,
    alignSelf: 'center',
    height: 80,
  },
});
