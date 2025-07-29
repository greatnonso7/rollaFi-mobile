import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, isIos, wp} from 'utils';

export const getStyles = (_themeColor: any) => {
  return StyleSheet.create({
    cardStyle: {
      borderRadius: hp(20),
    },
    walletCardContainer: {
      width: wp(370),
      height: hp(140),
      paddingHorizontal: hp(30),
      paddingVertical: hp(24),
      alignSelf: 'center',
    },
    cardWalletIcon: {
      width: wp(29),
      height: hp(20),
    },
    signText: {
      fontFamily: theme.font.GeneralSansBold,
      fontSize: fontSz(16),
      top: isIos ? hp(12) : 10,
    },
    amountText: {
      fontFamily: theme.font.GeneralSansBold,
      fontSize: fontSz(28),
      lineHeight: hp(33),
    },
    blurView: {
      width: wp(320),
      height: hp(200),
      marginBottom: hp(20),
      zIndex: 1000,
      borderRadius: 20,
      alignSelf: 'center',
      borderWidth: 1,
      position: 'absolute',
    },
    blurContainer: {
      borderRadius: hp(20),
      height: hp(204),
      width: wp(311),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      alignSelf: 'center',
      zIndex: 1000,
    },
    blurGetCardTextContainer: {
      height: hp(40),
      borderRadius: hp(12),
      width: wp(170),
      position: 'relative',
      backgroundColor: '#CCF725',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000000,
    },
  });
};
