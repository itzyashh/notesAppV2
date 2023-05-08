import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import RenderHtml from 'react-native-render-html';
const DisplayNote = ({note, navigation, selectButton}) => {

  const source = {
    html: note.content,
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* <Text style={styles.description}>
          {!note.content ? 'No description' : note.content}
        </Text> */}
          <RenderHtml
          baseStyle={styles.description}
      contentWidth={100}
      source={source}
    />

        {selectButton && (
          <AntDesignIcon
            style={styles.selectButton}
            name="checkcircle"
            size={20}
          />
        )}
      </View>
      <View
        style={{
          marginHorizontal: 8,
          width: 110,
        }}>
        <Text numberOfLines={1} style={styles.title}>
          {note.title}
        </Text>
        <Text ellipsizeMode="head" style={styles.date}>
          {note.date}
        </Text>
      </View>
    </View>
  );
};

export default DisplayNote;

const styles = StyleSheet.create({
  container: {
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 115,
    height: 160,
    paddingBottom: 5,
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
    fontSize: 12,
    paddingHorizontal: 10,
    textAlign: 'left',
    marginTop: 10,
  },
  selectButton: {
    color: 'skyblue',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
