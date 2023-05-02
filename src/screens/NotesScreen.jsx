import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  
  const getNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('@notes');
      const notes = await JSON.parse(storedNotes);
      if (notes) {
        setNotes(notes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotes();
  }, [notes]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
          Notes
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddNote')}
          style={{
            backgroundColor: '#212121',
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            borderRadius: 100,
            position: 'absolute',
            right: 25,
            bottom: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#212121',
          padding: 10,
          marginVertical: 10,
          borderRadius: 10,
        }}
        data={notes}
        renderItem={({item}) => (
          <Text style={{padding: 10, fontSize: 18, height: 44}}>
            {item.title}
          </Text>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NotesScreen;
