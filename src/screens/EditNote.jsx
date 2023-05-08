import {
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import {actions,RichToolbar, RichEditor} from 'react-native-pell-rich-editor';

  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Toast from 'react-native-toast-message';
  import Icon from 'react-native-vector-icons/Entypo';
  
  
  const EditNote = ({navigation,route}) => {
    const [note, setNote] = useState(route.params.note);
  const richText = React.useRef();
    
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const editNote = async () => {
      try {
        const newNote = {
          title,
          content,
          id: note.id,
          date: note.date,
          time: note.time,
        };
        const storedNotes = await AsyncStorage.getItem('@notes');
        const prevNotes = await JSON.parse(storedNotes);
        const newNotes = prevNotes.map((note) => {
          if (note.id === newNote.id) {
            return newNote
          } else {
            return note;
          }
        });
        await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
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
            placeholderTextColor="grey"
            cursorColor={'white'}
            value={title}
            style={styles.title}/>
        </View>
        <View style={styles.content}>
        <View style={styles.funcStrip}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.undo,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.checkboxList,
              actions.redo,
            ]}
            style={styles.richBar}
            iconTint={'white'}
            selectedIconTint={'#cad939'}
          />
        </View>
        <RichEditor
          androidLayerType='software'
          ref={richText}
          initialContentHTML={content}
          onChange={text => setContent(text)}
          placeholder="Write your note here"
          cursorColor={'white'}
          placeholderTextColor="pink"
          editorStyle={styles.editor}
          multiline={true}
        />
        </View>
        {
          title && <View
        >
          <TouchableOpacity 
            onPress={() => editNote()}
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
    richBar: {
      height: 40,
      width: '100%',
      backgroundColor: '#212121',
    },
    editor: {
      backgroundColor: 'black',
      color: 'white',
      contentCSSText: 'font-size: 19px; min-height: 200px; height: 100%;',
    },
  })
  
  
  