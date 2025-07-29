import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {DashboardStackParamList} from 'types';
import BottomTabBar from './bottom-tab';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

const DashboardNavigation = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <DashboardStack.Screen name="Dashboard" component={BottomTabBar} />
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigation;
