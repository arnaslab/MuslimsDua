import React from 'react';
import { SafeAreaView } from 'react-native';

const AreaView = ({ children, color }) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      ...(color && { backgroundColor: color })
    }}>
      {children}
    </SafeAreaView>
  );
}

export default AreaView;