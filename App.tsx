import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar  backgroundColor="#000"  />
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App