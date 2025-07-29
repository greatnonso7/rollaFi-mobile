import React from 'react';
import {Header, Screen} from 'shared';
import {Box, Button, Text} from 'design-system';
import {Appearance, ScrollView} from 'react-native';
import {ProfilePreference} from './components';
import {hp, wp} from 'utils';
import {useDarkTheme} from 'theme/dark-mode';
import {useRollaFiStore} from 'store';

export const Account = () => {
  const {logout} = useRollaFiStore();
  const {isDark, setScheme, themeColor} = useDarkTheme();
  const handleThemeSwitch = async (option: {
    id: number;
    state: string;
    title: string;
  }) => {
    if (option?.state === 'light') {
      setScheme('light', 'light', false);
    } else if (option.state === 'dark') {
      setScheme('dark', 'dark', false);
    } else if (option.state === 'default') {
      const mode = Appearance.getColorScheme();
      setScheme(mode, 'default', true);
    }
  };
  return (
    <Screen removeSafeaArea>
      <Header hasHeaderText="Account" />

      <ScrollView>
        <Box mx={wp(16)} mt={hp(20)}>
          <Text
            variant="bodyMedium"
            color={themeColor.BODY_MAIN_TEXT}
            pb={hp(20)}>
            Preferences
          </Text>

          <ProfilePreference
            title="Dark Mode"
            onPress={() =>
              handleThemeSwitch({
                id: 1,
                state: isDark ? 'light' : 'dark',
                title: isDark ? 'Light' : 'Dark',
              })
            }
            icon="theme-icon"
            isSwitch
            isSwitchValue={isDark}
          />
        </Box>
      </ScrollView>

      <Button title="Logout" onPress={logout} />
    </Screen>
  );
};
