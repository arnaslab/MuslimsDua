import React from 'react';
import { useSettingContext } from '../utils/app';
import { Text } from 'react-native';

const ResizedText = ({ 
  children, 
  style, 
  type = "latin",
  ratio = useSettingContext().fontSize,
  size = "medium" 
}) => (
  <Text style={{
    fontFamily: type === "arabic" ? 'Lateef-Regular' : 'Acme-Regular',
    fontSize: type === "arabic" ? (30 + ratio * 2) : size === "small" ? (15 + ratio) : (20 + ratio),
    ...style
  }}>
    {children}
  </Text>
)

export default ResizedText;