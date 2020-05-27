import Animated from 'react-native-reanimated';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const AnimatedText = Animated.createAnimatedComponent(Text);