import {Box, BoxProps, Text} from 'design-system';
import React from 'react';
import {TextStyle} from 'react-native';
import {Icon} from 'shared/Icon';
import {useDarkTheme} from 'theme/dark-mode';
import {fontSz, hp, wp} from 'utils';

interface HeaderTextProps {
  hasHeaderText: string;
  textStyle?: TextStyle;
  hasIcon?: string;
  fontSize?: number;
  hasSubHeader?: string;
  containerStyle?: BoxProps;
}

export const HeaderText = ({
  hasHeaderText,
  hasIcon,
  textStyle,
  fontSize = fontSz(14),
  hasSubHeader,
  containerStyle,
}: HeaderTextProps) => {
  const {themeColor} = useDarkTheme();
  return (
    <Box mx={wp(16)} {...containerStyle}>
      <Box flexDirection={'row'} alignItems={'center'}>
        {hasIcon && (
          <Box mr={10}>
            <Icon name={hasIcon} />
          </Box>
        )}
        <Text
          variant="bodySemiBold"
          color={themeColor.BODY_MAIN_TEXT}
          fontSize={fontSize}
          lineHeight={hp(43)}
          style={textStyle}>
          {hasHeaderText}
        </Text>
      </Box>
      {hasSubHeader && (
        <Text
          variant="body"
          fontSize={fontSz(14)}
          lineHeight={hp(18)}
          color={themeColor.SUB_HEADER_TEXT}>
          {hasSubHeader}
        </Text>
      )}
    </Box>
  );
};
