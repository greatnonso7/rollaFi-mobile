import {
  PartialState,
  NavigationAction,
  NavigationState,
  getStateFromPath,
  getPathFromState,
  getActionFromState,
} from '@react-navigation/native';
import {navigationRef} from './navigation';
import linking from 'navigation/LinkingConfiguration';

export const DeepLinkSchema = 'rollafi://';

const cleanPathStr = (path: string) => {
  const queryVairablesIndex = path.indexOf('?');
  if (queryVairablesIndex === -1) {
    return path;
  }
  return path.substr(0, queryVairablesIndex);
};

export const checkDeepLinkResult = (url: string) => {
  const extractedUrl = url.replace(DeepLinkSchema, '');

  const currentState = navigationRef.current?.getRootState() as NavigationState;

  const linkState = getStateFromPath(
    extractedUrl,
    linking.config as any,
  ) as PartialState<NavigationState>;

  const currentPath = cleanPathStr(getPathFromState(currentState));

  const linkPath = cleanPathStr(getPathFromState(linkState));

  const action = getActionFromState(linkState) as NavigationAction;

  return {
    action,
    linkPath,
    didDeepLinkLand: currentPath === linkPath,
  };
};
