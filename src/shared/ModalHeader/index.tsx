import React from 'react';
import {Box, Text} from 'design-system';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'shared/Icon';
import {fontSz} from 'utils';
import {useDarkTheme} from 'theme/dark-mode';

interface ModalHeaderProps {
  onClose?: () => void;
  onPress?: () => void;
  title?: string;
  rightIcon?: any;
  hasIcon?: string | null;
}

export const ModalHeader = ({
  title,
  onClose,
  hasIcon,
  onPress,
}: ModalHeaderProps) => {
  const {themeColor} = useDarkTheme();
  return (
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Box as={TouchableOpacity} activeOpacity={0.8} onPress={onClose}>
        <Icon name={'close'} />
      </Box>

      <Text
        variant="bodyBold"
        fontSize={fontSz(18)}
        textAlign={'center'}
        color={themeColor.BODY_MAIN_TEXT}>
        {title}
      </Text>
      <Box>
        {hasIcon && (
          <Box as={TouchableOpacity} activeOpacity={0.8} onPress={onPress}>
            <Icon name={hasIcon} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
