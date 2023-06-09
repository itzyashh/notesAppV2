// In App.js in a new project

import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotesScreen from './src/screens/NotesScreen';
import AddNote from './src/screens/AddNote';
import EditNote from './src/screens/EditNote';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NotesScreen" component={NotesScreen} />
      <Stack.Screen name="AddNote" component={AddNote} />
      <Stack.Screen name="EditNote" component={EditNote} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
