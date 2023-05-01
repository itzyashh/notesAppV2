import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const AddNote = () => {
  const [title, setTitle] = useState('');
  return (
    <View style={styles.container}>
    
      <TextInput
        onChangeText={text => setTitle(text)}
        placeholder='Title'
       style={styles.title}>{title}</TextInput>
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
    textAlign: 'center',
    fontWeight: '600',
  },
  
});
