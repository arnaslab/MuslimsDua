import React from 'react';
import { SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

const AreaView = ({ children, color }) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      marginTop: Constants.statusBarHeight,
      ...(color && { backgroundColor: color })
    }}>
      {children}
    </SafeAreaView>
  );
}

export default AreaView;