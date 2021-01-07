import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { useSettingContext } from '../utils/app';

const OutlineButton = ({ 
  onPress, 
  title, 
  isActive = true, 
  color, 
  size = 40,
  icon, 
  iconSize = 20,
  textSize = 12,
  style, 
  textStyle
}) => {
  const { getTextByLang } = useSettingContext();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        alignItems: 'center'
      }}>
        <View
          style={{
            height: size,
            width: size,
            borderWidth: 2,
            borderColor: isActive ? color : "#bfbfbf",
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            ...style
          }}
        >
          <Icon 
            name={typeof icon === "string" ? icon : getTextByLang(icon)} 
            height={iconSize} 
            width={iconSize} 
            fill={isActive ? color : "#bfbfbf"} 
          />
        </View>
        {title && (
          <Text style={{ 
            color: isActive ? color : "#bfbfbf",
            lineHeight: 30,
            fontFamily: 'Acme-Regular',
            fontSize: textSize,
            textAlign: 'center',
            ...textStyle 
          }}>
            {typeof title === "string" ? title : getTextByLang(title)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default OutlineButton;