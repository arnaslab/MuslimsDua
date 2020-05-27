import React from 'react';
import { Text } from 'react-native';
import Icon from './Icon';

const TextIcon = ({ children, color = "#ffffff", iconSize = 25, style, ...props }) => {
  const keyS = children.toLowerCase().indexOf("shallallahu'alaihiwasallam");
  if (keyS > -1) {
    children = children.slice(0, keyS).trim();
  }
  const keyA = children.toLowerCase().indexOf("'alaihissalam");
  if (keyA > -1) {
    children = children.slice(0, keyA).trim();
  }

  const shalawatIcon = (name) => (
    <Icon name={name} fill={color} width={iconSize} height={iconSize} />
  )

  return (
    <Text 
      style={{
        fontFamily: 'Acme-Regular',
        fontSize: 22,
        color,
        ...style
      }}
      {...props}
    >
      {children}
      {keyS > -1 || keyA > -1 && " "}
      {keyS > -1 && shalawatIcon("ShallallahuAlayhiWaSallam")}
      {keyA > -1 && shalawatIcon("Alayhissalam")}
    </Text>
  );
}

export default TextIcon;