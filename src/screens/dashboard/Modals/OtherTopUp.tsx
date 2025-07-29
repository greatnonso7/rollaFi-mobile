import React from 'react';
import {Box, Button, Text} from 'design-system';
import {BaseModal} from 'shared';
import {fontSz, hp} from 'utils';
import {Image} from 'react-native';
import theme from 'theme';
import {getStyles} from './style';
import {useDarkTheme} from 'theme/dark-mode';
import {useRollaFiStore} from 'store';

interface OtherTopUpProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OtherTopUp = ({
  isVisible,
  onClose,
  onComplete,
}: OtherTopUpProps) => {
  const {activeWallet} = useRollaFiStore();
  const {themeColor} = useDarkTheme();
  const styles = getStyles(themeColor);
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box px={hp(24)}>
        <Image source={theme.images.wallet} style={styles.walletIcon} />
        <Text
          variant="headerMedium"
          fontFamily={theme.font.GeneralSansMedium}
          fontSize={fontSz(24)}
          color={themeColor.BODY_MAIN_TEXT}
          textAlign={'center'}>
          Fund your {activeWallet?.currency} wallet
        </Text>
        <Text
          variant="body"
          fontSize={fontSz(14)}
          color={themeColor.SUB_HEADER_TEXT}
          lineHeight={hp(20)}
          textAlign={'center'}>
          This feature is unavailable at the moment, Please use the swap feature
          to get funds into your {activeWallet?.currency} wallet. Thank you
        </Text>

        <Button
          isNotBottom
          alignSelf={'center'}
          mt={hp(20)}
          mb={hp(30)}
          onPress={onComplete}
          title="Try Swap Now"
          textVariant="bodyMedium"
        />
      </Box>
    </BaseModal>
  );
};
