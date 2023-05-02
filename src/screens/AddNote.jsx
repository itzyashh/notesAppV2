import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Entypo';
const AddNote = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const saveNote = async () => {
    try {
      const note = {
        title,
        content,
        id: Math.random().toString(),
      };
      const storedNotes = await AsyncStorage.getItem('@notes');
      const prevNotes = await JSON.parse(storedNotes);
      if (!prevNotes) {
        const newNotes = [note];
        await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
      } else {
        prevNotes.push(note);
        await AsyncStorage.setItem('@notes', JSON.stringify(prevNotes));
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-thin-left" size={20} color="white" />
        </TouchableOpacity>
        <TextInput
          onChangeText={text => setTitle(text)}
          placeholder="Title"
          style={styles.title}
          onSubmitEditing={saveNote}
          >
          {title}
        </TextInput>
      </View>
      <View style={styles.content}>
        <FuncStrip/>
        <TextInput
            onChangeText={text => setContent(text)}
            placeholder="Write your note here"
            style={{color: 'white', fontSize: 20, padding: 10}}
            multiline={true}
            
            />
      </View>
    </View>
  );
};

const FuncStrip = () => {
    return (
        <View style={styles.funcStrip}>
          <Text
            style={{
                fontSize: 6,
            }}
          >comming soon!!</Text>
        </View>
    )
    }
export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'auto',
    fontWeight: '600',
    width: '80%',
},
header: {
      gap: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  funcStrip: {
    height: 40,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
    content: {
        flexGrow: 1,
        backgroundColor: 'black',
    }
});
