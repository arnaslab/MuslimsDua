import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Slider from "react-native-slider";
import { AreaView, TransparentButton, Icon, ControlizedText } from '../components';
import { useDataContext, useSettingContext } from '../utils/app';
import { version, emailSupport } from '../utils/config';

const getRgb = ({ r, g, b, a }) => `rgba(${r},${g},${b},${a || 1})`;

const TitleIcon = ({ title, icon, color }) => (
  <View style={{
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }}>
    <Icon name={icon} fill={color} width={20} height={20} />
    <Text style={{
      color: color,
      fontFamily: 'Acme-Regular',
      fontSize: 20,
      marginLeft: 10
    }}>
      {title}
    </Text>
  </View>
)

const OptionList = ({ 
  data, 
  color, 
  onPress,
  selectedId, 
  IconComponent 
}) => (
  <View style={{ 
    flexDirection: 'row', 
    justifyContent: 'center',
    flexWrap: 'wrap' 
  }}>
    {data.map((item, key) => (
      <TouchableOpacity key={key} onPress={() => onPress(item)}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 100,
          margin: 10,
          ...(item.id === selectedId && {
            borderWidth: 3,
            borderColor: color,
            borderRadius: 10
          })
        }}>
          <IconComponent data={item} />
          <ControlizedText style={{
            fontSize: 15
          }}>
            {item.title.toLowerCase()}
          </ControlizedText>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)

const Setting = ({ navigation }) => {
  const { themes } = useDataContext();
  const { 
    theme, setTheme,
    lang, setLanguage,
    fontSize, setFontSize 
  } = useSettingContext();
  const [ localFontSize, setLocalFontSize ] = useState(fontSize);

  console.log("themes", themes);

  return (
    <AreaView 
      // color="#000000"
    >
      <View style={{
        padding: 10, 
        alignItems: 'flex-end' 
      }}>
        <TransparentButton icon="Close" onPress={navigation.goBack}/>
      </View>
      <TitleIcon title={lang === 'ind' ? "Bahasa" : "Language"} icon="Language" color="#3498eb" />
      <OptionList 
        data={[{
          id: "ind",
          title: "Indonesia",
          icon: "LanguageId"
        }, {
          id: 'eng',
          title: "English",
          icon: "LanguageEn"
        }]}
        color='#3498eb'
        onPress={item => setLanguage(item.id)}
        selectedId={lang}
        IconComponent={({ data }) => (
          <Icon name={data.icon} />
        )}
      />
      <TitleIcon title={lang === 'ind' ? "Ukuran Teks" : "Text Size"} icon="FontSize" color="#068f0f" />
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Slider
          style={{
            width: "70%", 
            marginTop: 30
          }}
          onValueChange={value => setLocalFontSize(value)}
          value={fontSize}
          onSlidingComplete={value => setFontSize(value)}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#068f0f"
          maximumTrackTintColor="#000000"
          thumbTintColor="#068f0f"
        />
      </View>
      <View style={{
        marginHorizontal: 20,
        marginBottom: 20,
        height: 150,
        justifyContent: 'center'
      }}>
        <ControlizedText 
          type="arabic"
          style={{ textAlign: 'center' }}
          ratio={localFontSize}
        >
          الدعاء سلاح المؤمن
        </ControlizedText>
        <ControlizedText 
          type="latin"
          style={{ textAlign: 'center' }}
          ratio={localFontSize}
          size="small"
        >
          Ad du'au silahul mu'min
        </ControlizedText>
        <ControlizedText 
          type="latin"
          style={{ textAlign: 'center' }}
          ratio={localFontSize}
        >
          {lang === 'ind' ? 'Doa adalah senjata orang beriman' : 'Dua is the weapon of the believer'}
        </ControlizedText>
      </View>
      <TitleIcon title={lang === 'ind' ? "Tema" : "Theme"} icon="Theme" color="#e8b235" />
      <OptionList 
        data={themes}
        color='#e8b235'
        onPress={item => setTheme(item.id)}
        selectedId={theme || themes[0].id}
        IconComponent={({ data }) => (
          <View style={{
            height: 60,
            width: 60,
            flexDirection: 'row',
            borderRadius: 60,
            overflow: 'hidden'
          }}>
            {data.colors.map((color, key) => (
              <View 
                key={key}
                style={{
                  width: 60 / data.colors.length,
                  height: 60,
                  backgroundColor: getRgb(color)
                }}
              />
            ))}
          </View>
        )}
      />
      <TitleIcon title={lang === 'ind' ? "Tentang" : "About"} icon="Info" color="#3498eb" />
      <View style={{ paddingLeft: 50, paddingTop: 10 }}>
        <Text style={{ 
          fontFamily: 'Acme-Regular',
          fontSize: 15,
          padding: 5
        }}>
          {lang === 'ind' ? "Versi app" : "App version"} {version}
        </Text>
        <Text style={{ 
          fontFamily: 'Acme-Regular',
          fontSize: 15,
          padding: 5
        }}>
          {lang === 'ind' ? "Kontak: " : "Contact: "}
          <Text
            style={{ color: 'blue' }} 
            onPress={() => Linking.openURL(`mailto:${emailSupport}`)}
          >
            {emailSupport}
          </Text>
        </Text>
      </View>
    </AreaView>
  )
}

export default Setting;