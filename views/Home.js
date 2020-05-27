import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { AreaView, Icon, OutlineButton } from '../components';
import { useDataContext, useSettingContext } from '../utils/app';

const borderRadius = 90;

const Item = ({ isFirst, data, onPress, color }) => (
  <View style={{
    marginTop: isFirst ? 0 : -borderRadius,
    height: 270,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: '#ffffff'
  }}>
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => onPress({ tag: data, color })}
    >
      <View style={{
        height: 270,
        paddingTop: 110,
        padding: 40,
        borderBottomLeftRadius: borderRadius,
        backgroundColor: color
      }}>
        <Text style={{
          textAlign: 'right',
          fontFamily: 'Acme-Regular',
          fontSize: 32,
          color: '#ffffff'
        }}>
          {data.title}
        </Text>
        <Text style={{
          textAlign: 'right',
          fontFamily: 'Lateef-Regular',
          fontSize: 35,
          color: '#ffffff'
        }}>
          {data.ara}
        </Text>
        <Icon 
          name="DuaHands" 
          height={110} 
          width={110} 
          fill="#ffffff" 
          style={{
            opacity: 0.1,
            position: 'absolute',
            left: 40,
            bottom: 35
          }} 
        />
      </View>
    </TouchableOpacity>
  </View>
);

const Home = ({ navigation }) => {
  const { getColor, bgColor } = useSettingContext();
  const { tags } = useDataContext();

  return (
    <AreaView color={bgColor}>
      <View style={{ 
        zIndex: 1,
        height: 130,
        backgroundColor: bgColor,
        borderBottomLeftRadius: borderRadius,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center"
      }}>
        <OutlineButton 
          title={{ ind: "Favorit", eng: "Favorite"}} 
          icon="Love" 
          color="#e8594b"
          onPress={() => navigation.navigate('List', { isLoved: true, color: "#e8594b" })}
        />
        <OutlineButton 
          title={{ ind: "Pencarian", eng: "Search"}} 
          icon="Search"
          iconSize={23} 
          color="#3498eb"
          onPress={() => navigation.navigate("Search")}
        />
        <OutlineButton 
          title={{ ind: "Pengaturan", eng: "Setting"}} 
          icon="Setting" 
          iconSize={25} 
          color="#e8b235"
          onPress={() => navigation.navigate('Setting')}
        />
      </View>
      <ScrollView style={{ marginTop: -borderRadius }}>
        <FlatList
          data={tags.slice().reverse()}
          renderItem={({ index, item }) => 
            <Item 
              isFirst={index === tags.length - 1}
              color={getColor(tags.length - index - 1)}
              data={item} 
              onPress={(data) => navigation.navigate('List', { type: "tag", ...data })}
            />
          }
          keyExtractor={item => item.id}
          inverted
          initialScrollIndex={tags.length - 1}
        />
      </ScrollView>
    </AreaView>
  )
}

export default Home;