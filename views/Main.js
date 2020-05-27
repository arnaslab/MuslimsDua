import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import navigation from './navigation';
import { useDataContext, useSettingContext } from '../utils/app';

const Stack = createStackNavigator();

const Main = () => {
  const [ fontsLoaded ] = useFonts({
    'Acme-Regular': require('../assets/fonts/Acme-Regular.ttf'),
    'Lateef-Regular': require('../assets/fonts/Lateef-Regular.ttf')
  });

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

  if (fontsLoaded && (isReady || isUpdated)) {
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
    return <AppLoading />;
  }
}

export default Main;