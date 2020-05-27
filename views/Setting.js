import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AreaView, TransparentButton, Icon } from '../components';
import { useDataContext, useSettingContext } from '../utils/app';

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

const OptionList = ({ data, color, onPress, selectedId, IconComponent }) => (
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
          <Text style={{ 
            fontFamily: 'Acme-Regular',
            fontSize: 15
          }}>
            {item.title.toLowerCase()}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)

const Setting = ({ navigation }) => {
  const { themes } = useDataContext();
  const { theme, lang, setLanguage, setTheme } = useSettingContext();
  
  return (
    <AreaView>
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
    </AreaView>
  )
}

export default Setting;