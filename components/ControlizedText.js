import React from 'react';
import { useSettingContext } from '../utils/app';
import { Text } from 'react-native';

const ControlizedText = ({ 
  children, 
  style, 
  type = "latin",
  ratio = useSettingContext().fontSize,
  size = "medium",
  color = "balck" 
}) => (
  <Text style={{
    fontFamily: type === "arabic" ? 'Lateef-Regular' : 'Acme-Regular',
    fontSize: type === "arabic" ? (30 + ratio * 2) : size === "small" ? (15 + ratio) : (20 + ratio),
    color: color === "white" ? "#ffffff" : "#000000",
    ...style
  }}>
    {children}
  </Text>
)

export default ControlizedText;