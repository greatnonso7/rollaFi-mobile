import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AuthStack from './auth';
import DashboardStack from './dashboard';
import {RootStackParamList} from 'types';
import {navigationRef} from './utils';
import {InteractionManager, Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import linking from './LinkingConfiguration';
import {DeepLinkEnum, useDeepLinks, useURL} from 'hooks';
import {checkDeepLinkResult} from './utils/navigation-service';
import {clearDeepLinkAndSaveData} from 'utils';
import {useRollaFiStore} from 'store';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const Stack = createStackNavigator<RootStackParamList>();

const AppNav = () => {
  const {isLoggedIn} = useRollaFiStore();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={isLoggedIn ? 'AppDashboard' : 'Auth'}>
      {isLoggedIn ? (
        <Stack.Screen name="AppDashboard" component={DashboardStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const {setDeepLinkData} = useRollaFiStore();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const {addDeepLink} = useDeepLinks();
  const link = useURL();

  const handleDeepLink = useCallback(
    (url: string) => {
      const task = InteractionManager.runAfterInteractions(() => {
        const {didDeepLinkLand, action, linkPath} = checkDeepLinkResult(url);
        if (!didDeepLinkLand) {
          addDeepLink({
            id: linkPath,
            type: DeepLinkEnum.NAVIGATION,
            action: () => {
              // Execute the navigation action
              navigationRef.current?.dispatch(action);

              // Clear the deep link and save data to store
              clearDeepLinkAndSaveData(
                url,
                () => {
                  // This will be handled by the deep link removal in useDeepLinks
                },
                setDeepLinkData,
              );
            },
          });
        } else {
          // If deep link already landed, just save the data
          clearDeepLinkAndSaveData(
            url,
            () => {
              // No need to clear since it already landed
            },
            setDeepLinkData,
          );
        }
      });

      return () => task.cancel();
    },
    [addDeepLink, setDeepLinkData],
  );

  React.useEffect(() => {
    if (!link) {
      return;
    }

    handleDeepLink(link);
  }, [link, handleDeepLink]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      initialState={__DEV__ ? initialState : undefined}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      <AppNav />
    </NavigationContainer>
  );
};

export default Navigation;
