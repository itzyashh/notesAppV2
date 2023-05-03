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
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Entypo';


const AddNote = ({navigation}) => {


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Error',
      text2: 'Title is required',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })
  }

  // Function to save notes to async storage
  const saveNote = async () => {
    try {
      // Create note object
      const note = {
        title,
        content,
        id: Math.random().toString(),
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
      };
      // Get stored notes from async storage
      const storedNotes = await AsyncStorage.getItem('@notes');
      // Parse stored notes
      const prevNotes = await JSON.parse(storedNotes);
      // If there are no stored notes, create new array with note
      if (!prevNotes) {
        const newNotes = [note];
        await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
      } else {
        // If there are stored notes, push note to prev notes and save to async storage
        prevNotes.push(note);
        await AsyncStorage.setItem('@notes', JSON.stringify(prevNotes));
      }
      // Go back to home screen
      navigation.goBack();
    } catch (error) {
      // Catch error if there is one
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
          style={styles.title}>
          {title}
        </TextInput>
      </View>
      <View style={styles.content}>
        <FuncStrip />
        <TextInput
          onChangeText={text => setContent(text)}
          placeholder="Write your note here"
          style={{color: 'white', fontSize: 20, padding: 10}}
          multiline={true}
          
        />
      </View>
      <View
      >
        <TouchableOpacity 
        style={styles.saveButton}
        onPress={title ? saveNote : showToast}>
          <Text>
            <Icon name="save" size={30} color="lightgrey" />
          </Text>
        </TouchableOpacity>
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
        }}>
        comming soon!!
      </Text>
    </View>
  );
};
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
  },
  saveButton: {
    backgroundColor: '#212121',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
})


