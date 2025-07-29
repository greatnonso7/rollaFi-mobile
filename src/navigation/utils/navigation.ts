import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from 'types';

export const navigationRef = createNavigationContainerRef<any>();

export type Navigation = {
  goBack: () => void;
  navigate: <RouteName extends keyof RootStackParamList>(
    ...args: RouteName extends unknown
      ? undefined extends RootStackParamList[RouteName]
        ?
            | [screen: RouteName]
            | [screen: RouteName, params: RootStackParamList[RouteName]]
        : [screen: RouteName, params: RootStackParamList[RouteName]]
      : never
  ) => void;
};

export const navigation: Navigation = {
  goBack: () => {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
  navigate: (...args) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(...args);
    }
  },
};
