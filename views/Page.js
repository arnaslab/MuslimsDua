import React, { useState } from 'react';
import { Dimensions, View, Text, Share } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AreaView, OutlineButton, TransparentButton, TextIcon } from '../components';
import { useDataContext, useSettingContext, toSentence, combineTitle, hexify } from '../utils/app';
import Animated from 'react-native-reanimated';
import { Linking } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

const windowWidth = Dimensions.get('window').width;

const openArticle = async (url, color) => {
  if (await InAppBrowser.isAvailable()) {
    const result = await InAppBrowser.open(url, {
      // iOS Properties
      dismissButtonStyle: 'cancel',
      preferredBarTintColor: '#453AA4',
      preferredControlTintColor: 'white',
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: false,
      // Android Properties
      showTitle: true,
      toolbarColor: hexify(color),
      secondaryToolbarColor: 'black',
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,
      // Specify full animation resource identifier(package:anim/name)
      // or only resource name(in case of animation bundled with app).
      animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right'
      }
    })
    console.log(result);
  }
  else Linking.openURL(url)
}

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

  const fadeOut = scrollY.interpolate({
    inputRange: [0, 35],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true
  });

  const fadeIn = scrollY.interpolate({
    inputRange: [0, 35],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true
  });

  const sticky = scrollY.interpolate({
    inputRange: [0, 150, 200],
    outputRange: [50, 50, 100],
    extrapolate: 'clamp',
    useNativeDriver: true
  })

  return (
    <View style = {{ 
      width: windowWidth,
      backgroundColor: color 
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
        <TextIcon
          iconSize={20}
          numberOfLines={1}
          style={{
            width: 200,
            color: '#ffffff',
            opacity: fadeIn,
            fontSize: 20,
          }}
          iconStyle={{ 
            opacity: fadeIn
          }}
        >
          {data.title[0]}
        </TextIcon>
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
      <Animated.ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY }}}],
          { useNativeDriver: false }
        )}
      >
        <View style={{
          height: 100,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 20,
          justifyContent: 'flex-end'
        }}>
          {data.title.map((item, key) => (
            <TextIcon
              key={key} 
              iconSize={20}
              style={{
                color: '#ffffff',
                opacity: fadeOut,
                fontSize: 28 - (10 * key),
              }}
              iconStyle={{ 
                opacity: fadeOut
              }}
            >
              {item}
            </TextIcon>
          ))}
        </View>
        <View 
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 90,
            backgroundColor: '#ffffff',
            alignItems: "center",
          }}
        >
          <Animated.View style={{
            position: 'absolute',
            top: sticky,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // marginTop: 40,
            // marginBottom: 20
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
          </Animated.View>
          <View style={{
            paddingTop: 160,
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