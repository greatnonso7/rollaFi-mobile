/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleProp, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {ScrollView} from 'react-native-gesture-handler';
import {deviceWidth} from 'utils';
import {styles} from './style';
import {Box} from 'design-system';

type tabRoute = {
  key: string;
  title: string;
};

type componentObj = {
  key: string;
  component: any;
  func: any;
};

interface ITabs {
  tabRoutes: tabRoute[];
  tabComponents: componentObj[];
  getCurrentRoute?: (currentRoute: tabRoute) => void;
  getIndex: (index: number) => void;
  useSceneMap?: boolean;
  style?: StyleProp<ViewStyle>;
  bottomComponent?: JSX.Element;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  currentIndex: number;
}

export const Tabs = ({
  tabRoutes,
  tabComponents,
  getCurrentRoute,
  getIndex,
  useSceneMap = false,
  style,
  bottomComponent,
  sceneContainerStyle,
  currentIndex,
}: ITabs) => {
  const initialLayout = {width: deviceWidth};

  const [routes] = useState(tabRoutes);

  const createSceneMap = () => {
    let sceneObj = {};
    for (let i = 0; i < tabComponents.length; i += 1) {
      //@ts-ignore
      sceneObj[tabComponents[i].key] = tabComponents[i].func;
    }
    return sceneObj;
  };

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case route.key:
        const FoundComponent = tabComponents.find(
          component => component.key === route.key,
        );

        if (bottomComponent) {
          return (
            <ScrollView style={{flex: 1}}>
              {FoundComponent?.component}
              {bottomComponent}
            </ScrollView>
          );
        }
        return FoundComponent?.component;
      default:
        return null;
    }
  };

  const sceneMap = SceneMap(createSceneMap());

  const getRoute = () => {
    getCurrentRoute && getCurrentRoute(routes[currentIndex]);
    getIndex && getIndex(currentIndex);
  };

  useEffect(() => {
    getRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const renderTabBar = (props: {navigationState: {routes: any[]}}) => {
    return (
      <Box style={[styles.tabBar]}>
        {props.navigationState.routes.map((route, i) => (
          <TouchableOpacity
            onPress={() => {
              getIndex(i);
            }}
            style={
              currentIndex === i ? styles.activeTabItem : styles.tabbarItem
            }
            key={i}
            activeOpacity={0.8}>
            {currentIndex === i ? (
              <Text style={styles.activeTabTitle}>{route.title}</Text>
            ) : (
              <Text style={styles.tabTitle}>{route.title}</Text>
            )}
          </TouchableOpacity>
        ))}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{index: currentIndex, routes}}
      renderScene={useSceneMap ? sceneMap : renderScene}
      onIndexChange={getIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      //@ts-ignore
      style={{flex: 1, ...style}}
      sceneContainerStyle={sceneContainerStyle}
    />
  );
};

export default Tabs;
