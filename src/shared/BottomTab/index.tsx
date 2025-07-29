import {Box, Text} from 'design-system';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'shared/Icon';
import theme from 'theme';
import {useDarkTheme} from 'theme/dark-mode';
import {hp, wp} from 'utils';

interface BottomTabProps {
  name: string;
  focused: boolean;
}

export const BottomTab = ({name, focused}: BottomTabProps) => {
  const icon = name?.toLowerCase();
  const {isDark} = useDarkTheme();

  // Color logic for different states
  const getIconColor = () => {
    if (isDark) {
      // Dark mode colors
      return focused ? theme.colors.PRIMARY : theme.colors.GREY_600;
    } else {
      // Light mode colors
      return focused ? theme.colors.APP_BLACK_100 : theme.colors.GREY_600;
    }
  };

  const getTextColor = () => {
    if (isDark) {
      // Dark mode colors
      return focused ? theme.colors.PRIMARY : theme.colors.GREY_600;
    } else {
      // Light mode colors
      return focused ? theme.colors.APP_BLACK_100 : theme.colors.GREY_600;
    }
  };

  return (
    <Box key={name} style={styles.tabContainer}>
      <Icon name={focused ? `${icon}-active` : icon} color={getIconColor()} />
      <Text
        color={getTextColor()}
        variant={focused ? 'bottomTabMedium' : 'bottomTabRegular'}>
        {name === 'Wallet' ? 'My Wallet' : name}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: wp(60),
    height: hp(60),
    justifyContent: 'center',
    alignItems: 'center',
    top: hp(10),
  },
});
