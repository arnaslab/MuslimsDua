import React from 'react';
import Animated from 'react-native-reanimated';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TextIcon from './TextIcon';
import Icon from './Icon';

export const withAnimated = (WrappedComponent) => {
    class WithAnimated extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return Animated.createAnimatedComponent(WithAnimated);
}

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const AnimatedText = Animated.createAnimatedComponent(Text);