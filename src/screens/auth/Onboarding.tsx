import React, {useEffect, useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {BlurLoader, Icon, Screen} from 'shared';
import {useDarkTheme} from 'theme/dark-mode';
import {fontSz, hp, wp} from 'utils';
import {Image} from 'react-native';
import {getStyles} from './style';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {GetInviteCode} from './Modals';

export const Onboarding = () => {
  const [open, setOpen] = useState<'get-invite-code' | ''>('');
  const [loading, setLoading] = useState(false);
  const {themeColor} = useDarkTheme();
  const styles = getStyles(themeColor);
  const route = useRoute<RouteProp<AuthStackParamList, 'Onboarding'>>();
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  const {inviteCode} = route?.params || {};

  const continueButton = () => {
    setOpen('get-invite-code');
  };

  useEffect(() => {
    if (inviteCode) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate('Login', {inviteCode});
      }, 3000);
    }
  }, [inviteCode, navigate]);

  return (
    <Screen removeSafeaArea>
      <Box alignSelf={'center'} pt={hp(16)}>
        <Icon name="logo" color={themeColor.BODY_MAIN_TEXT} />
      </Box>

      <Box alignSelf={'center'} bottom={hp(20)} pt={hp(16)}>
        <Image
          source={require('assets/images/hero-image.png')}
          style={styles.homeBg}
        />
        <Box bottom={hp(130)} mx={wp(16)}>
          <Text
            variant="bodySemiBold"
            fontSize={fontSz(28)}
            textAlign={'center'}
            color={themeColor.BODY_MAIN_TEXT}>
            Seamless Cross-Border Transactions for Global Businesses
          </Text>

          <Text
            pt={hp(20)}
            variant="body"
            fontSize={fontSz(16)}
            textAlign={'center'}
            width={wp(330)}
            color={themeColor.BODY_MAIN_TEXT}>
            Empowering businesses with seamless cross-border transactions,
            instant access to liquidity and competitive currency swaps.
          </Text>
        </Box>
      </Box>

      <Button title="Get in touch" onPress={continueButton} />

      <GetInviteCode
        isVisible={open === 'get-invite-code'}
        onClose={() => setOpen('')}
      />

      <BlurLoader loading={loading} />
    </Screen>
  );
};
