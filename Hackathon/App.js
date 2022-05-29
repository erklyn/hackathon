/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import styles from './src/styles';

import LoginScreen from './src/screens/LoginScreen';
import MainMenu from './src/screens/MainMenu';
import RegisterScreen from './src/screens/RegisterScreen';
import IntroScreen from './src/screens/IntroScreen';
import CreateEvent from './src/screens/CreateEvent';
import ListEvents from './src/screens/ListEvents';
import DetailEvent from './src/screens/DetailEvent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';





const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={'IntroScreen'}>
        <Stack.Screen name="MainMenu" component={MainMenu}
          options={{ headerShown: false }} />
        <Stack.Screen name={"LoginScreen"} component={LoginScreen}
          options={{ title: 'Giriş Sayfası' }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}
          options={{ title: 'Kayıt Sayfası' }} />
        <Stack.Screen name="IntroScreen" component={IntroScreen}
          options={{ headerShown: false }} />
        <Stack.Screen name="CreateEvent" component={CreateEvent}
          options={{ title: "Etkinlik Oluştur" }} />
        <Stack.Screen name="ListEvents" component={ListEvents}
          options={{ title: 'Etkinlik Listesi' }} />
        <Stack.Screen name="DetailEvent" component={DetailEvent}
          options={{ title: 'Etkinlik Detay' }} />
      </Stack.Navigator>

    </NavigationContainer>
  );


};


