import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Login, Onboarding, VerifyLogin} from 'screens/auth';
import {AuthStackParamList} from 'types';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="VerifyLogin" component={VerifyLogin} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
