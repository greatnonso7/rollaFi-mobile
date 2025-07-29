import React from 'react';
import {Box, Text} from 'design-system';
import {Icon} from 'shared';
import {headerProps} from './types';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fontSz, hp, populateHitSlop, wp} from 'utils';
import {RootStackParamList} from 'types';
import theme from 'theme';
import {useDarkTheme} from 'theme/dark-mode';

export const Header = ({
  hasBackButton,
  hasRightIcon,
  onPressLeftIcon,
  onPressRightIcon,
  containerProps,
  hasHeaderText,
  hasLogo,
}: headerProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {themeColor} = useDarkTheme();

  const renderHeaderLeft = () => {
    if (hasBackButton && navigation.canGoBack()) {
      return (
        <Box
          as={TouchableOpacity}
          activeOpacity={0.8}
          position={'absolute'}
          left={0}
          onPress={() =>
            onPressLeftIcon ? onPressLeftIcon() : navigation.goBack()
          }
          hitSlop={populateHitSlop(5)}>
          <Box
            width={wp(40)}
            height={hp(40)}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={100}
            bg={theme.colors.APP_BLACK_200}>
            <Icon name="arrow-back" />
          </Box>
        </Box>
      );
    }
  };

  const renderHeaderCenter = () => {
    if (hasHeaderText) {
      return (
        <Box>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(16)}
            lineHeight={hp(19)}
            color={theme.colors.WHITE_300}>
            {hasHeaderText}
          </Text>
        </Box>
      );
    }

    if (hasLogo) {
      return <Icon name="logo" color={themeColor.BODY_MAIN_TEXT} />;
    }
  };

  const renderHeaderRight = () => {
    if (hasRightIcon) {
      return (
        <Box
          position={'absolute'}
          right={0}
          onPress={onPressRightIcon}
          hitSlop={populateHitSlop(5)}
          activeOpacity={0.8}
          as={TouchableOpacity}>
          {hasRightIcon}
        </Box>
      );
    }
  };

  return (
    <Box>
      <Box {...containerProps} px={16}>
        <Box
          height={55}
          alignItems={'center'}
          flexDirection={'row'}
          justifyContent={'center'}>
          {renderHeaderLeft()}
          {renderHeaderCenter()}
          {renderHeaderRight()}
        </Box>
      </Box>
    </Box>
  );
};
