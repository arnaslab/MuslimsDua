import React from 'react';
import Icon from './Icon';
import { AnimatedText } from './Animated';

const TextIcon = ({
  children, 
  color = "#ffffff", 
  iconSize = 25, 
  style, 
  iconStyle,
  ...props
}) => {

  const keyS = children.toLowerCase().indexOf("shallallahu'alaihiwasallam");
  if (keyS > -1) {
    children = children.slice(0, keyS).trim();
  }
  const keyA = children.toLowerCase().indexOf("'alaihissalam");
  if (keyA > -1) {
    children = children.slice(0, keyA).trim();
  }
  
  const getShalawatIcon = (name) => (
    <Icon 
      name={name}
      fill={color} 
      width={iconSize} 
      height={iconSize}
      style={iconStyle}
    />
  )

  return (
    <AnimatedText 
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
      {keyS > -1 && getShalawatIcon("ShallallahuAlayhiWaSallam")}
      {keyA > -1 && getShalawatIcon("Alayhissalam")}
    </AnimatedText>
  );
}

export default TextIcon;