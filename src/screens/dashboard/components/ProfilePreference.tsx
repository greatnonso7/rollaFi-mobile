import React from 'react';
import {Box, Text} from 'design-system';
import {Switch} from 'react-native';
import {Icon} from 'shared';
import {hp, wp} from 'utils';
import {useDarkTheme} from 'theme/dark-mode';

interface ProfilePreferenceProps {
  title: string;
  onPress: () => void;
  isSwitch?: boolean;
  icon: string;
  isSwitchValue?: boolean;
}

export const ProfilePreference = ({
  title,
  onPress,
  isSwitch,
  isSwitchValue,
  icon,
}: ProfilePreferenceProps) => {
  const {themeColor} = useDarkTheme();
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor={themeColor.INNER_BORDER}
      pb={hp(16)}
      mb={hp(16)}>
      <Box flexDirection="row" alignItems="center">
        <Icon name={icon} />
        <Text variant="bodyMedium" pl={wp(2)} color={themeColor.BODY_MAIN_TEXT}>
          {title}
        </Text>
      </Box>
      {isSwitch && <Switch onValueChange={onPress} value={isSwitchValue} />}
    </Box>
  );
};
