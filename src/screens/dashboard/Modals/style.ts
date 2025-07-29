import {StyleSheet} from 'react-native';
import {hp, wp} from 'utils';

export const getStyles = (themeColor: any) =>
  StyleSheet.create({
    walletIcon: {
      width: wp(100),
      height: hp(100),
      alignSelf: 'center',
      marginBottom: hp(12),
    },
  });
