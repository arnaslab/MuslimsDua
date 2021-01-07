import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import { withAnimated } from './Animated';
import svgs from './svgs';

const AnimatedSvgIcon = withAnimated(SvgIcon);

const Icon = (props) => <AnimatedSvgIcon {...props} svgs={svgs} />;

export default Icon;