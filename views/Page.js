import React, { useState } from 'react';
import { Dimensions, View, Text, Share } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { AreaView, OutlineButton, TransparentButton, TextIcon } from '../components';
import { useDataContext, useSettingContext, toSentence, combineTitle } from '../utils/app';
import Animated from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;

const openArticle = async (url, color) =>
  await WebBrowser.openBrowserAsync(url, { toolbarColor: color, showInRecents: true });

const onShare = async (message) => {
  try {
    await Share.share({ message });
  } catch (error) {
    alert(error.message);
  }
}

const DuaPage = ({ color, data, setLoved, goBack }) => {
  const [ view, setView ] = useState("dua");
  const { getTextByLang } = useSettingContext();
  const [ scrollY ] = useState(new Animated.Value(0));

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
    <View style = {{ 
      width: windowWidth,
      backgroundColor: color 
    }}>
      <Animated.View style={{
        height: getHeaderHeight(),
        justifyContent: 'space-between', 
      }}>
        <View style={{ 
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between' 
        }}>
          <TransparentButton 
            onPress={goBack} 
            icon="LeftArrow" 
            color="#ffffff"
          />
          <View style={{ 
            width: 120, 
            flexDirection: 'row', 
            justifyContent: 'space-between' 
          }}>
            <TransparentButton 
              onPress={() => onShare(`
                *${combineTitle(data.title)}*\n\n
                ${data.dua}\n\n
                ${data.transliteration}\n\n
                ${data.translation}`)}
              icon="Share" 
              size={30} 
              color="#ffffff"
            />
            <TransparentButton 
              onPress={() => openArticle(data.article, color)}
              icon="WebPage" 
              size={30} 
              color="#ffffff"
            />
            <TransparentButton 
              onPress={() => setLoved(!data.isLoved)}
              icon="Love" 
              size={30} 
              color={data.isLoved ? "#e8594b" : "#ffffff"}
            />
          </View>
        </View>
        <View style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 20
        }}>
          {data.title.map((item, key) => (
            <TextIcon
              key={key} 
              iconSize={20}
              style={{
                fontSize: 28 - (10 * key),
              }}
            >
              {item}
            </TextIcon>
          ))}
        </View>
      </Animated.View>
      <Animated.ScrollView 
        contentContainerStyle={{
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 90,
          backgroundColor: '#ffffff',
          flex: 1,
          alignItems: "center",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY }}}],
          { useNativeDriver: true }
        )}
      >
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 40,
          marginBottom: 20
        }}>
          <OutlineButton
            title={{ ind: 'Doa', eng: 'Dua'}}
            color={color}
            icon="DuaHands"
            onPress={() => setView("dua")}
            isActive={view === 'dua'}
            size={60}
            iconSize={40}
            textSize={15}
          />
          <OutlineButton
            title={{ ind: "Terjemah", eng: "Translate"}}
            color={color}
            icon={{ ind: "TransId", eng: "TransEn" }}
            onPress={() => setView("trans")}
            isActive={view === 'trans'}
            size={60}
            iconSize={50}
            textSize={15}
          />
          <OutlineButton
            title={{ ind: "Suara", eng: "Audio" }}
            color={color}
            icon="TransEn"
            onPress={() => setView("audio")}
            isActive={view === 'audio'}
            size={60}
            iconSize={50}
            textSize={15}
          />
        </View>
        <View style={{
          paddingTop: 20,
          paddingBottom: 10,
          paddingRight: 10,
          paddingLeft: 10
        }}>
          {view === 'dua' ? (
            <>
              <Text style={{
                fontFamily: 'Lateef-Regular',
                fontSize: 50,
                textAlign: 'center'
              }}>
                {data.dua}
              </Text>
              <Text style={{
                marginTop: 10,
                fontFamily: 'Acme-Regular',
                fontSize: 20,
                textAlign: 'center'
              }}>
                {toSentence(data.transliteration)}
              </Text>
            </>
          ) : view === 'trans' ? (
            <Text style={{
              fontFamily: 'Acme-Regular',
              fontSize: 25,
              textAlign: 'center'
            }}>
              {data.translation}
            </Text>
          ) : (
            <Text style={{
              fontFamily: 'Acme-Regular',
              fontSize: 25,
              textAlign: 'center'
            }}>
              {getTextByLang({ ind: "Dalam pengembangan Insyaallah", eng: "Under construction Insyaallah"})}
            </Text>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const Page = ({ navigation, route }) => {
  const { tagId, duaId, isLoved } = route.params;

  const { getColor } = useSettingContext();
  const { duas, setLoved } = useDataContext();

  const data = duas
    .filter(dua => (!tagId || (dua.tags && dua.tags.includes(tagId))))
    .filter(dua => (!isLoved || dua.isLoved));

  return (
    <AreaView>
      <FlatList
        data={data}
        renderItem={({ index, item }) => 
          <DuaPage 
            color={getColor(index)}
            data={item} 
            goBack={navigation.goBack}
            setLoved={setLoved(item.id)}
          />
        }
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        initialScrollIndex={data.findIndex(dua => dua.id === duaId)}
        getItemLayout={(data, index) => ({ length: windowWidth, offset: windowWidth * index, index })}
      />
    </AreaView>
  );
}

export default Page;