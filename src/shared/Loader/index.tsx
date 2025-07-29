import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from 'utils';
import theme from 'theme';

export function Loader(props: {
  loading: boolean;
  fullPageLoaderStyle?: ViewStyle;
}) {
  const {loading, fullPageLoaderStyle} = props;
  return loading ? (
    <View style={[styles.fullPageLoader, fullPageLoaderStyle]}>
      <ActivityIndicator size={'small'} color={theme.colors.PRIMARY} />
    </View>
  ) : null;
}
const styles = StyleSheet.create({
  fullPageLoader: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
