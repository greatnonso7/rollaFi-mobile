import {Box, Text} from 'design-system';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'shared/Icon';
import theme from 'theme';
import {isIos} from 'utils';

interface BottomTabProps {
  name: string;
  focused: boolean;
}

export const BottomTab = ({name, focused}: BottomTabProps) => {
  const icon = name?.toLowerCase();
  return (
    <Box key={name} style={styles.tabContainer}>
      <Icon name={focused ? `${icon}-active` : icon} />
      <Text
        color={focused ? theme.colors.WHITE_200 : theme.colors.GREY_700}
        variant={focused ? 'bottomTabMedium' : 'bottomTabRegular'}>
        {name === 'Wallet' ? 'My Wallet' : name}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: isIos ? 10 : 0,
  },
});
