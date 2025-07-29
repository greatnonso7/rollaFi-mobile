import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {StyleSheet} from 'react-native';

export const getStyles = (themeColor: any) =>
  StyleSheet.create({
    freezeIcon: {
      width: wp(94),
      height: hp(90),
      alignSelf: 'center',
    },
    cellRoot: {
      backgroundColor: theme.colors.WHITE,
      borderRadius: hp(8),
      borderWidth: 1,
      borderColor: theme.colors.GREY_600,
      width: wp(51),
      height: hp(64),
      alignItems: 'center',
      justifyContent: 'center',
    },

    cellText: {
      textAlign: 'center',
      color: theme.colors.APP_BLACK,
      fontFamily: theme.font.GeneralSansMedium,
      fontSize: fontSz(24),
    },
    codeFieldRoot: {
      marginTop: hp(16),
    },
    focusInput: {
      borderWidth: hp(1),
      borderColor: themeColor.BODY_MAIN_TEXT,
      borderRadius: hp(8),
    },
  });
