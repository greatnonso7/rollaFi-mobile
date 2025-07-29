import {StyleSheet} from 'react-native';
import {deviceHeight, hp, wp} from 'utils';
import theme from 'theme';

export const getStyles = (themeColor: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: 0,
    },
    generalContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 0,
    },
    dialogContainer: {
      borderTopRightRadius: hp(40),
      borderTopLeftRadius: hp(40),
      width: '100%',
      maxHeight: deviceHeight - 100,
      alignSelf: 'flex-end',
      position: 'relative',
      backgroundColor: themeColor.BACKGROUND_COLOR,
      zIndex: 10,
    },
    closeButtonContainer: {
      borderRadius: hp(100),
      backgroundColor: themeColor.BODY_MAIN_TEXT,
      flexDirection: 'row-reverse',
      paddingHorizontal: wp(18),
    },
    xIcon: {
      width: wp(20),
      height: hp(20),
    },
    barModalContainer: {
      marginTop: hp(20),
      width: wp(32),
      height: hp(5),
      borderRadius: hp(12),
      backgroundColor: theme.colors.PRIMARY,
      opacity: 0.08,
      alignSelf: 'center',
    },
  });
