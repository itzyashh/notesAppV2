import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DisplayNote = ({note, navigation}) => {
    
  return (
    <View>
      <View style={styles.box}>
        <Text style={styles.description}>
            {
                !note.content ? 'No description' : note.content
            }
        </Text>
      </View>
      <Text style={styles.title}>{note.title}</Text>
      <Text
        ellipsizeMode='tail'
        style={styles.date}
      >
        {note.date} 
      </Text>
    </View>
  );
};

export default DisplayNote;

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 140,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#212121',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  date: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 12,
    },
    description: {
        color: 'white',
        fontSize: 10,
        paddingHorizontal: 10,
        textAlign: 'left',
        marginTop: 10,
    }
   
});
