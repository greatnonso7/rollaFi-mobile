import React, {useEffect} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Box, BoxProps, Text} from 'design-system';
import theme from 'theme';
import {fontSz, getBottomSpace, hp, wp} from 'utils';
import {Icon} from 'shared';

interface Props extends BoxProps {
  title?: string;
  disabled?: boolean;
  textColor?: string;
  textVariant?: any;
  backgroundColor?: string;
  loading?: boolean;
  isNotBottom?: boolean;
  containerStyle?: ViewStyle;
  hasIcon?: string;
  hasBackIcon?: string;
  hasTextLoading?: boolean;
}

export const Button = ({
  title,
  disabled,
  textColor,
  textVariant,
  backgroundColor,
  loading,
  isNotBottom,
  containerStyle,
  hasIcon,
  hasBackIcon,
  hasTextLoading,
  ...props
}: Props) => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    if (loading || hasTextLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear, // Easing is an additional import from react-native
          useNativeDriver: true, // To make use of native driver for performance
        }),
      ).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasTextLoading]);
  // First set up animation

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 1],
    outputRange: ['0deg', '360deg', '0deg'],
  });

  return (
    <Box style={!isNotBottom && [styles.containerStyle, containerStyle]}>
      <Box
        disabled={disabled}
        activeOpacity={0.8}
        as={TouchableOpacity}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderRadius={hp(32)}
        height={hp(46)}
        width={wp(344)}
        backgroundColor={
          disabled || loading
            ? theme.colors.APP_BLACK_300
            : backgroundColor || theme.colors.WHITE_300
        }
        {...props}>
        <Box
          flexDirection={'row'}
          alignItems="center"
          justifyContent={'center'}
          alignSelf={'center'}>
          {loading ? (
            <Animated.Image
              source={theme.images.loader}
              style={[styles.loaderImage, {transform: [{rotate: spin}]}]}
            />
          ) : (
            <>
              {hasIcon && (
                <Box top={hp(1)} right={10}>
                  <Icon name={hasIcon} />
                </Box>
              )}
              <Text
                color={
                  disabled
                    ? theme.colors.INACTIVE
                    : textColor || theme.colors.APP_BLACK_100
                }
                variant={textVariant || 'bodyMedium'}
                fontSize={fontSz(16)}>
                {title}
              </Text>
              {hasBackIcon && (
                <Box left={wp(2)}>
                  <Icon name={hasBackIcon} />
                </Box>
              )}
              {hasTextLoading && (
                <Box left={wp(2)}>
                  <Animated.Image
                    source={theme.images.loader}
                    style={[styles.loaderImage, {transform: [{rotate: spin}]}]}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: hp(40) + getBottomSpace(),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loaderImage: {
    width: 18,
    height: 18,
  },
});
