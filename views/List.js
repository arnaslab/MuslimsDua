import React, { useState } from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { AreaView, TransparentButton, TextIcon, AnimatedFlatList, AnimatedText } from '../components';
import { useDataContext, useSettingContext } from '../utils/app';
import Animated from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;

const Item = ({ color, data, onPress }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => onPress({ color })}
    >
      <View style={{ 
        height: 100,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: color,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10
      }}>
        {data.title.map((item, key) => (
          <TextIcon
            key={key}
            style={{
              fontSize: 22 - (8 * key)
            }}
          >
            {item}
          </TextIcon>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const List = ({ navigation, route }) => {
  const { navigate, goBack } = navigation;
  const { tag, isLoved, color } = route.params;

  const [ scrollY ] = useState(new Animated.Value(0));
  const { getColor } = useSettingContext();
  const { getDuas } = useDataContext();

  const getHeaderHeight = () => {
    return scrollY.interpolate({
      inputRange: [120, 400],
      outputRange: [200, 60],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
  }

  const getFadeOut = () => {
    return scrollY.interpolate({
      inputRange: [0, 180, 320],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
  }

  const getFadeIn = () => {
    return scrollY.interpolate({
      inputRange: [0, 280, 380],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
  }
  
  return (
    <AreaView>
      <Animated.View style={{
        padding: 10,
        height: getHeaderHeight(),
        justifyContent: 'space-between', 
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TransparentButton 
            onPress={goBack} 
            icon="LeftArrow" 
            color={color}
          />
          <AnimatedText 
            numberOfLines={1}
            style={{
              width: windowWidth - 120,
              opacity: getFadeIn(),
              marginLeft: 10,
              fontFamily: 'Acme-Regular',
              fontSize: 25,
              color
            }}
          >
            {isLoved ? "Favorite" : tag.title}
          </AnimatedText>
          <TransparentButton 
            onPress={() => navigate('Search')} 
            icon="Search" 
            color={color}
          />
        </View>
        <AnimatedText style={{
          opacity: getFadeOut(),
          marginBottom: 20,
          fontFamily: 'Acme-Regular',
          fontSize: 32,
          color,
        }}>
          {isLoved ? "Favorite" : tag.title}
        </AnimatedText>
      </Animated.View>
      <AnimatedFlatList
        data={getDuas({ tagId: tag && tag.id, isLoved })}
        renderItem={({ index, item }) => 
          <Item 
            color={getColor(index)}
            data={item} 
            onPress={(data) => navigate('Page', { tagId: tag && tag.id, duaId: item.id, isLoved, ...data })}
          />
        }
        keyExtractor={item => item.id}
        initialNumToRender={5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY }}}],
          { useNativeDriver: true }
        )}
      />
    </AreaView>
  );
}

export default List;