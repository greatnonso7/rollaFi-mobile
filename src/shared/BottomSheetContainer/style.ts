import {StyleSheet} from 'react-native';
import theme from 'theme';
import {deviceHeight, hp} from 'utils';

export const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: theme.colors.APP_BLACK_100,
    borderRadius: hp(40),
  },
  containerStyle: {
    height: deviceHeight,
    zIndex: 1000,
  },
  handleStyle: {
    height: hp(50),
    backgroundColor: '#101213',
  },
});
