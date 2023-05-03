import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator'

import Toast from 'react-native-toast-message';


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar  backgroundColor="#000"  />
      <StackNavigator />
      <Toast />
    </NavigationContainer>
  )
}

export default App