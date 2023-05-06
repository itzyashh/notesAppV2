import {
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState,useEffect} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Toast from 'react-native-toast-message';
  import Icon from 'react-native-vector-icons/Entypo';
  
  
  const EditNote = ({navigation,route}) => {
    const id = route.params.id;
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});
    const getNote = async () => {
        let note = notes.find(note => note.id === id);
        setNote(note);
    }
    console.log(note);
    const getNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('@notes');
            const notes = await JSON.parse(storedNotes);
            setNotes(notes);
            getNote();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getNotes();
    }, []);

    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState('');
  
    const showToast = () => {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Title is required',
        text2: 'Title is required',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      })
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-thin-left" size={20} color="white" />
          </TouchableOpacity>
          <TextInput
            onChangeText={text => setTitle(text)}
            placeholder="Title"
            placeholderTextColor="grey"
            cursorColor={'white'}
            value={title}
            style={styles.title}/>
        </View>
        <View style={styles.content}>
          <FuncStrip />
          <TextInput
            onChangeText={text => setContent(text)}
            placeholder="Write your note here"
            placeholderTextColor="grey"
            cursorColor={'white'}
            value={content}
            style={{color: 'white', fontSize: 20, padding: 10}}
            multiline={true}
            
          />
        </View>
        {
          title && <View
        >
          <TouchableOpacity 
          style={styles.saveButton}>
            <Text>
              <Icon name="save" size={30} color="lightgrey" />
            </Text>
          </TouchableOpacity>
        </View>
        }
        
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
  export default EditNote;
  
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
  
  
  