import React from 'react';
import {Box, Text} from 'design-system';
import {deviceWidth, fontSz, hp, isAndroid, wp} from 'utils';
import {Image, ImageBackground, ImageSourcePropType} from 'react-native';
import theme from 'theme';
import {getStyles} from './style';
import {Icon} from 'shared';
import {useDarkTheme} from 'theme/dark-mode';

type WalletContainerProps = {
  wallet: any;
};

interface WalletConfig {
  type: string;
  bgImage: ImageSourcePropType | undefined;
  color: string;
  icon: string;
  walletIcon: ImageSourcePropType | undefined;
  currency: string;
}

export const WalletContainer = ({wallet}: WalletContainerProps) => {
  const {themeColor} = useDarkTheme();
  const styles = getStyles(themeColor);

  const activeWallet = () => {
    let config: WalletConfig = {
      type: '',
      bgImage: undefined,
      color: '',
      icon: '',
      walletIcon: undefined,
      currency: '',
    };
    switch (wallet?.currency) {
      case 'NGN':
        config = {
          type: 'NGN Wallet',
          bgImage: theme.images['ngn-card-type'],
          icon: 'ngn-wallet-switch',
          walletIcon: theme.images.ngn,
          currency: '₦',
          color: theme.colors.WHITE,
        };
        break;
      case 'USD':
        config = {
          type: 'USD Wallet',
          bgImage: theme.images['usd-card-type'],
          icon: 'usd-wallet-switch',
          walletIcon: theme.images.usd,
          currency: '$',
          color: theme.colors.WHITE,
        };
        break;

      default:
        config = {
          bgImage: theme.images['ngn-card-type'],
          icon: 'ngn-wallet-switch',
          walletIcon: theme.images['ngn-card-type'],
          currency: '₦',
          type: 'NGN Wallet',
          color: theme.colors.WHITE,
        };
    }
    return config;
  };

  return (
    <Box bg={themeColor.BACKGROUND_COLOR} width={deviceWidth}>
      <ImageBackground
        source={activeWallet()?.bgImage}
        resizeMode="cover"
        imageStyle={styles.cardStyle}
        style={styles.walletCardContainer}>
        <Box flexDirection={'row'}>
          <Image
            source={activeWallet().walletIcon}
            style={styles.cardWalletIcon}
          />
          <Text
            variant="bodyMedium"
            fontSize={fontSz(16)}
            pl={1}
            color={activeWallet().color}>
            {activeWallet().type}
          </Text>
          <Icon name="chevron-up-down" color={activeWallet().color} />
        </Box>

        <Box flexDirection={'row'} mt={hp(20)} justifyContent={'space-between'}>
          <Box flexDirection={'row'}>
            <Text style={styles.signText} color={activeWallet().color}>
              {activeWallet().currency}
            </Text>
            <Text
              pt={10}
              style={styles.amountText}
              color={activeWallet().color}>
              {wallet?.amount}
            </Text>
          </Box>
          {/* <Box
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={openWalletList}>
            <Icon name={activeWallet().icon || 'ngn-wallet-switch'} />
          </Box> */}
        </Box>
      </ImageBackground>
      <Box
        width={wp(320)}
        borderRadius={hp(20)}
        height={hp(50)}
        bottom={isAndroid ? hp(45) : hp(52)}
        zIndex={-100}
        bg={themeColor.IMAGE_OVERLAY}
        alignSelf={'center'}
      />
    </Box>
  );
};
