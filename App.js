import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/splashScreen';
import SignUpScreen from './src/signUpScreen';
import LoginScreen from './src/loginScreen';
import MainScreen from './src/main/MainScreen';
import DetailScreen from './src/main/DetailScreen';
import ProfileScreen from './src/main/ProfileScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;