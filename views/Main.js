import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import navigation from './navigation';
import { useDataContext, useSettingContext } from '../utils/app';

const Stack = createStackNavigator();

const Main = () => {

  const { isIdle, isReady, isUpdated, loadData, updateData } = useDataContext();
  const { loadSetting } = useSettingContext();

  useEffect(() => {
    if (isIdle) {
      loadData();
      loadSetting();
    }
  });

  useEffect(() => {
    if (isReady && !isUpdated) {
      updateData();
    }
  }, [isReady]);

  useEffect(() => {
    if (isReady || isUpdated) {
      SplashScreen.hide();
    }
  }, [isReady, isUpdated]);

  if (isReady || isUpdated) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {navigation.map((item, key) => (
            <Stack.Screen
              key={key}
              name={item.name}
              component={item.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return null;
  }
}

export default Main;