import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AreaView, OutlineButton, TextIcon } from '../components';
import { FlatList } from 'react-native-gesture-handler';
import { useDataContext } from '../utils/app';

const Search = ({ navigation }) => {
  const [ input, setInput ] = useState("");
  const { duas } = useDataContext();
  
  return (
    <AreaView>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <View style={{
          height: 50,
          margin: 5,
          paddingHorizontal: 20,
          flexGrow: 1,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#3498eb',
          justifyContent: 'center'
        }}>
          <TextInput 
            style={{
              fontSize: 18,
              fontFamily: 'Acme-Regular'
            }}
            value={input}
            onChangeText={text => setInput(text)}
            autoFocus
          />
        </View>
        <OutlineButton 
          size={50}
          icon="Search"
          color="#3498eb"
          style={{
            margin: 5,
            borderWidth: 1
          }}
        />
      </View>
      {input !== "" && (
        <FlatList 
          data={duas.filter(dua => 
            dua.title.reduce((acc, title) => 
            acc || title.toLowerCase().includes(input.toLowerCase()), false))}
          renderItem={({ index, item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Page', { duaId: item.id })} >
              <View style={{ padding: 10 }}>
                {item.title.map((title, key) => (
                  <TextIcon
                    key={key}
                    color="#3498eb"
                    style={{
                      fontSize: 20 - (8 * key)
                    }}
                  >
                    {title}
                  </TextIcon>
                ))}
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View style={{
              borderBottomColor: 'rgba(0, 0, 0, 0.12)',
              borderBottomWidth: 1
            }}/>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </AreaView>
  )
}

export default Search;