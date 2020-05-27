import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const TransparentButton = ({ onPress, icon, size = 25, color }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{
      width: size + 10,
      height: size + 10,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Icon name={icon} height={size} width={size} fill={color}/>
    </View>
  </TouchableOpacity>
)

export default TransparentButton;