/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account, ConvertFunds, Home} from 'screens/dashboard';
import theme from 'theme';
import {fontSz, hp} from 'utils';
import {BottomTab} from 'shared';
import {BottomTabStackParamList} from 'types';
import {useDarkTheme} from 'theme/dark-mode';

const DashboardBottomTabs = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabBar = () => {
  const {themeColor} = useDarkTheme();
  return (
    <DashboardBottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: hp(80),
          paddingBottom: hp(10),
          backgroundColor: themeColor.BACKGROUND_COLOR,
          borderTopColor: themeColor.GREY_600,
        },
        tabBarActiveTintColor: themeColor.GREY_600,
        tabBarLabelStyle: {
          fontSize: fontSz(10),
          fontFamily: theme.font.GeneralSansRegular,
        },
        tabBarShowLabel: false,
      }}>
      <DashboardBottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return <BottomTab name="Home" focused={focused} />;
          },
        }}
      />

      <DashboardBottomTabs.Screen
        name="Swap"
        component={ConvertFunds}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BottomTab name="Swap" focused={focused} />
          ),
        }}
      />
      <DashboardBottomTabs.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BottomTab name="Account" focused={focused} />
          ),
        }}
      />
    </DashboardBottomTabs.Navigator>
  );
};

export default BottomTabBar;
