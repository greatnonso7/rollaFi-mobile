import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {DashboardStackParamList} from 'types';
import BottomTabBar from './bottom-tab';
import {RollaFiWebView} from 'shared';
import {ConvertFunds, FundWallet, SendFunds} from 'screens/dashboard';

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
      <DashboardStack.Screen name="RollaFiWebView" component={RollaFiWebView} />
      <DashboardStack.Screen name="FundWallet" component={FundWallet} />
      <DashboardStack.Screen name="SendFunds" component={SendFunds} />
      <DashboardStack.Screen name="ConvertFunds" component={ConvertFunds} />
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigation;
