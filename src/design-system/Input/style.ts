import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp} from 'utils';

const styles = StyleSheet.create({
  baseContainer: {
    height: hp(46),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  extraInputContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    minHeight: hp(46),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  textInput: {
    fontFamily: theme.font.GeneralSansRegular,
    fontSize: fontSz(14),
    flex: 1,
  },
  errorContainer: {
    borderBottomWidth: hp(3),
  },
});

export default styles;
