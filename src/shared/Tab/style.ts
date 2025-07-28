import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderColor: theme.colors.WHITE_200,
    marginTop: hp(15),
    borderBottomWidth: hp(1),
    borderBottomColor: theme.colors.APP_BLACK_300,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp(46),
  },
  tabbarItem: {
    alignItems: 'center',
    padding: 3,
    width: wp(153),
    alignSelf: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 1,
    zIndex: 10,
    width: wp(153),
    borderBottomColor: theme.colors.WHITE_200,
    height: hp(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabDivider: {
    borderRightWidth: 0,
  },
  tabTitle: {
    fontSize: fontSz(14),
    fontFamily: theme.font.GeneralSansRegular,
    lineHeight: hp(21),
    color: theme.colors.INACTIVE,
  },
  activeTabTitle: {
    fontSize: fontSz(14),
    fontFamily: theme.font.GeneralSansRegular,
    lineHeight: hp(21),
    color: theme.colors.WHITE_300,
  },
});

export default styles;
