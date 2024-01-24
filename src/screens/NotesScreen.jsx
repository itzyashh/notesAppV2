import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayNote from '../components/DisplayNote';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const NotesScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [screenIsFocused, setScreenIsFocused] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);
 
  if (navigation.addListener) {
    navigation.addListener('focus', () => {
      setScreenIsFocused(true);
    });
    navigation.addListener('blur', () => {
      setScreenIsFocused(false);
    });
  }
  useEffect(() => {
    selectedNotes.length === 0 && setSelectMode(false);
  }, [selectedNotes]);
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
  console.log(notes);
  const deleteNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('@notes');
      const notes = await JSON.parse(storedNotes);
      const newNotes = notes.filter(note => !selectedNotes.includes(note.id));
      await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
      setSelectedNotes([]);
      setSelectMode(false);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedNotes);
  useEffect(() => {
    getNotes();
  }, [screenIsFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notes</Text>
        <Text style={styles.subHeaderText}>{notes.length} notes</Text>
        <View style={styles.buttonContainer}>
          {
            selectMode && <TouchableOpacity
              onPress={deleteNotes}
              style={styles.deleteButton}>
              <View>
                <AntDesignIcon name="delete" size={20} color="white" />
              </View>
            </TouchableOpacity>

          }
          
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNote')}
            style={styles.addButton}>
            <View>
              <EntypoIcon name="plus" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.notesContainer}>
        <FlatList
          keyExtractor={item => item.id}
          data={notes}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          renderItem={({item}) => {
            return (
              <AnimatedBtn
                onPress={() => {
                  if (selectMode) {
                    if (selectedNotes.includes(item.id)) {
                      setSelectedNotes(
                        selectedNotes.filter(id => id !== item.id),
                      );
                    } else {
                      setSelectedNotes([...selectedNotes, item.id]);
                    }
                  } else {
                    navigation.navigate('EditNote', {note: item});
                  }
                }}
                onLongPress={() => {
                  setSelectMode(true);
                  setSelectedNotes([...selectedNotes, item.id]);
                }}
                activeOpacity={0.8}>
                <DisplayNote
                  note={item}
                  navigation={navigation}
                  selectButton={selectedNotes.includes(item.id)}
                />
              </AnimatedBtn>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: 250,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  headerText: {color: 'white', fontSize: 30, textAlign: 'center'},
  subHeaderText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#212121',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  deleteButton: {
    backgroundColor: '#212121',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 100,
  },
  notesContainer: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default NotesScreen;
