import {Box, Text} from 'design-system';
import React from 'react';
import {TextStyle} from 'react-native';
import {Icon} from 'shared/Icon';
import theme from 'theme';
import {fontSz, hp} from 'utils';

interface HeaderTextProps {
  hasHeaderText: string;
  textStyle?: TextStyle;
  hasIcon?: string;
  fontSize?: number;
  hasSubHeader?: string;
}

export const HeaderText = ({
  hasHeaderText,
  hasIcon,
  textStyle,
  fontSize = fontSz(14),
  hasSubHeader,
}: HeaderTextProps) => {
  return (
    <Box>
      <Box flexDirection={'row'} alignItems={'center'}>
        {hasIcon && (
          <Box mr={10}>
            <Icon name={hasIcon} />
          </Box>
        )}
        <Text
          variant="bodyMedium"
          color={theme.colors.WHITE_300}
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
          color={theme.colors.BODY}>
          {hasSubHeader}
        </Text>
      )}
    </Box>
  );
};
