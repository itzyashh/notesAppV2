import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
const AddNote = ({navigation}) => {
  const [title, setTitle] = useState('');
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
        <FuncStrip/>
      </View>
    </View>
  );
};

const FuncStrip = () => {
    return (
        <View style={styles.funcStrip}>
          <Text>funtions to be added later</Text>
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
    textAlign: 'center',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
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
});
