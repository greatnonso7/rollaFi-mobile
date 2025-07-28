import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {showSplash, hideSplash} from 'react-native-splash-view';

const App = () => {
  useEffect(() => {
    showSplash(); // Show the splash screen

    setTimeout(() => {
      hideSplash(); // Hide after some time
    }, 3000);
  }, []);

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default App;
