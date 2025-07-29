import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Controller, ControllerRenderProps} from 'react-hook-form';
import Box, {BoxProps} from '../Box';
import Text from '../Text';
import {InputBaseProps} from './types';
import theme from 'theme';
import styles from './style';
import {fontSz, hp} from 'utils';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'shared';
import {useDarkTheme} from 'theme/dark-mode';

interface RegularInputProps extends InputBaseProps, TextInputProps {
  type?: 'regular';
  containerProps?: BoxProps;
  baseContainerStyle?: ViewStyle;
  hasIcon?: string;
  textInputContainerStyle?: any;
  noForgot?: boolean;
  showPassword?: boolean;
  password?: boolean;
  onPressPasswordIcon?: () => void;
  isDropDown?: boolean;
  onPressDropDown?: () => void;
  isLoading?: boolean;
  isDiscount?: boolean;
  isRequired?: boolean;
  isAmount?: string;
  bvnName?: string;
}

interface ComponentMapType {
  [index: string]: ({
    onChange,
    onBlur,
    value,
  }: any) => JSX.Element | JSX.Element[];
}

export const RegularInput = ({
  containerProps,
  control,
  errorText,
  label,
  name = '',
  type = 'regular',
  baseContainerStyle,
  noForgot,
  hasIcon,
  onPressPasswordIcon,
  password,
  isDropDown,
  onPressDropDown,
  isLoading,
  textInputContainerStyle,
  isRequired,
  isAmount,
  bvnName,
  ...props
}: RegularInputProps) => {
  const {themeColor} = useDarkTheme();
  const regularInput = ({onChange, onBlur, value}: ControllerRenderProps) => {
    return (
      <Box
        px={16}
        activeOpacity={0.8}
        onPress={onPressDropDown}
        as={isDropDown ? TouchableOpacity : View}
        borderBottomColor={themeColor.BODY_MAIN_TEXT}
        borderBottomWidth={0.5}
        style={[
          styles.baseContainer,
          baseContainerStyle,
          Boolean(errorText) && styles.errorContainer,
        ]}>
        {hasIcon && <Icon name={hasIcon} />}
        {isAmount && (
          <Box mr={2}>
            <Text
              variant="bodyMedium"
              color={themeColor.BODY_MAIN_TEXT}
              fontSize={fontSz(14)}>
              {isAmount === 'NGN' ? '₦' : '$'}
            </Text>
          </Box>
        )}

        <TextInput
          selectionColor={theme.colors.INACTIVE}
          style={[
            styles.textInput,
            textInputContainerStyle,
            {
              color: themeColor.BODY_MAIN_TEXT,
            },
          ]}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          editable={isDropDown ? false : true}
          pointerEvents={isDropDown ? 'none' : 'auto'}
          placeholderTextColor={theme.colors.INACTIVE}
          {...props}
        />
        {password ? (
          <Box
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={onPressPasswordIcon}>
            <Icon name="eye-slash" />
          </Box>
        ) : null}

        {isDropDown && (
          <Box
            as={TouchableOpacity}
            onPress={onPressDropDown}
            activeOpacity={0.8}>
            <Icon
              name="caret-down"
              color={
                value?.length > 0
                  ? theme.colors.WHITE_300
                  : theme.colors.INACTIVE
              }
            />
          </Box>
        )}
        {bvnName && (
          <Box bg={theme.colors.APP_BLACK_700} p={2} borderRadius={8}>
            <Text
              variant="bodyMedium"
              fontSize={fontSz(12)}
              color={theme.colors.BODY_TEXT_100}>
              {bvnName}
            </Text>
          </Box>
        )}
        {isLoading && <ActivityIndicator size={'small'} />}
      </Box>
    );
  };

  const componentMap: ComponentMapType = {
    regular: regularInput,
  };

  const navigation = useNavigation<any>();

  return (
    <Box {...containerProps}>
      {label && (
        <Box flexDirection={'row'} alignItems={'center'} pb={10}>
          <Text
            variant="body"
            pr={1}
            fontSize={hp(14)}
            color={theme.colors.INACTIVE}
            fontFamily={theme.font.GeneralSansRegular}>
            {label}
          </Text>
          {isRequired && <Icon name="is-required" />}
        </Box>
      )}
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <View>{componentMap[type]({onChange, onBlur, value})}</View>
        )}
      />
      <Box flexDirection={'row'}>
        {errorText && (
          <Text variant="bodySmall" top={1} color="red">
            {errorText}
          </Text>
        )}
        {password && noForgot && (
          <Box
            as={TouchableOpacity}
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.8}
            position={'absolute'}
            right={0}
            top={2}>
            <Text variant="bodyBold" color={theme.colors.INACTIVE}>
              Forgot password?
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
