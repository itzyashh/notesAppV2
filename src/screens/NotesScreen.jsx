import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';

const NotesScreen = ({navigation}) => {
  const notes = [
    {
      id: 1,
      title: 'Note 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor nisi at dapibus mollis. Praesent eget metus in nisl aliquet lacinia. In hac habitasse platea dictumst. Donec vel nisl eget nunc tincidunt aliquet. Proin vel tortor euismod, luctus nisi ut, tincidunt justo. Morbi nec mi ac nisi faucibus sagittis. Praesent sed est ut nisi interdum posuere. Ut euismod, lectus eu aliquam congue, mi felis lobortis nulla, et placerat diam diam non urna. Aenean tempor, lorem at ultricies dictum, nulla lorem eleifend risus, sit amet sodales velit sem eget elit. Morbi euismod, augue a suscipit tincidunt, risus arcu volutpat nisi, id tincidunt lacus nibh et mi. Fusce euismod, sem eget tristique tincidunt, turpis tellus vestibulum lorem, ac tincidunt odio arcu vitae lorem. Integer auctor, ex a lacinia faucibus, sapien elit ullamcorper elit, vel varius diam diam id risus. ',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor nisi at dapibus mollis. Praesent eget metus in nisl aliquet lacinia. In hac habitasse platea dictumst. Donec vel nisl eget nunc tincidunt aliquet. Proin vel tortor euismod, luctus nisi ut, tincidunt justo. Morbi nec mi ac nisi faucibus sagittis. Praesent sed est ut nisi interdum posuere. Ut euismod, lectus eu aliquam congue, mi felis lobortis nulla, et placerat diam diam non urna. Aenean tempor, lorem at ultricies dictum, nulla lorem eleifend risus, sit amet sodales velit sem eget elit. Morbi euismod, augue a suscipit tincidunt, risus arcu volutpat nisi, id tincidunt lacus',
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
          Notes
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddNote')}
          style={{
            backgroundColor: '#212121',
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            borderRadius: 100,
            position: 'absolute',
            right: 25,
            bottom: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#212121',
          padding: 10,
          marginVertical: 10,
          borderRadius: 10,
        }}
        data={notes}
        renderItem={({item}) => (
          <Text style={{padding: 10, fontSize: 18, height: 44}}>
            {item.title}
          </Text>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NotesScreen;
