import {navigationRef} from 'navigation/utils';
import {useEffect, useContext, useState} from 'react';
import {InteractionManager} from 'react-native';
import {DeepLinkContext} from 'shared';
import {useRollaFiStore, getDeepLinkData} from 'store';

export enum DeepLinkEnum {
  NAVIGATION = 'NAVIGATION',
}

export const useDeepLinks = (deepLinks?: DeepLinkEnum[]) => {
  const [hookRoute, setHookRoute] = useState<string>();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const {deepLinksState, addDeepLink, removeDeepLink} =
    useContext(DeepLinkContext);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      const route = navigationRef.current?.getCurrentRoute();
      if (!hookRoute) {
        setHookRoute(route?.name);
      }
    });

    const handleNavigationStateChange = () => {
      setCurrentRoute(navigationRef.current?.getCurrentRoute()?.name);
    };

    navigationRef.current?.addListener('state', handleNavigationStateChange);

    return () => {
      task.cancel();
      navigationRef.current?.removeListener(
        'state',
        handleNavigationStateChange,
      );
    };
  }, [hookRoute]);

  useEffect(() => {
    (async () => {
      if (!deepLinks || hookRoute !== currentRoute) {
        return;
      }

      const found = deepLinksState.filter(link =>
        deepLinks.includes(link.type),
      );

      if (!found.length) {
        return;
      }

      const currentLink = found[0];
      await currentLink.action();
      removeDeepLink(currentLink.id);
    })();
  }, [deepLinksState, hookRoute, currentRoute, deepLinks, removeDeepLink]);

  return {addDeepLink};
};

/**
 * Hook to access deep link data from the store
 * @returns Deep link data and methods to manage it
 */
export const useDeepLinkData = () => {
  const {deepLinkData, setDeepLinkData, clearDeepLinkData} = useRollaFiStore();

  const getStoredDeepLinkData = () => {
    return getDeepLinkData();
  };

  return {
    deepLinkData,
    setDeepLinkData,
    clearDeepLinkData,
    getStoredDeepLinkData,
  };
};
