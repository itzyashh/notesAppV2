import {View, Text, FlatList, TouchableOpacity,StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayNote from '../components/DisplayNote';
import Icon from 'react-native-vector-icons/Entypo';

const NotesScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [screenIsFocused, setScreenIsFocused] = useState(false);
  if (navigation.addListener) {
    navigation.addListener('focus', () => {
      setScreenIsFocused(true);
    });
    navigation.addListener('blur', () => {
      setScreenIsFocused(false);
    });
  }
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
  }, [screenIsFocused]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          height: 250,
          backgroundColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>
          Notes
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 14,
            textAlign: 'center',
            marginTop: 2,
          }}>
          {notes.length} notes
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddNote')}
         style={styles.addButton}>
          <View>
            <Icon name="plus" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          marginTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <FlatList
          keyExtractor={item => item.id}
          data={notes}
          numColumns={3}
          renderItem={({item}) => {
            console.log(item);
            return (
              
                <DisplayNote note={item} navigation={navigation} />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
      backgroundColor: '#212121',
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      borderRadius: 100,
      position: 'absolute',
      right: 25,
      bottom: 10,
    },
  });

export default NotesScreen;

