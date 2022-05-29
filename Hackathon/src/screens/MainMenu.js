import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CreateEvent from './CreateEvent';
import ListEvents from './ListEvents';
import DetailEvent from './DetailEvent';

import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();


export default function MainMenu() {
  return (
    <Tab.Navigator initialRouteName='ProfileScreen' screenOptions={{
      tabBarStyle: {
          height:64,
          paddingBottom:15
      }
    }}
    >
      <Tab.Screen name="ListEvents" component={ListEvents}
        options={{
          title: 'Etkinlik Listesi',
          tabBarIcon: ({ focused, color, size }) => { return (<FontAwesome5 size={22} color={color} name={'calendar'} />) },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray'

        }}
      />
  
      <Tab.Screen name="CreateEvent" component={CreateEvent}
        options={{
          title: "Etkinlik Oluştur",
          tabBarIcon: ({ focused, color, size }) => { return (<FontAwesome5 size={22} color={color} name={'plus'} />) },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',


        }} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          title: "Profil",
          tabBarIcon: ({ focused, color, size }) => { return (<FontAwesome5 size={22} color={color} name={'user'} />) },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',


        }} />




    </Tab.Navigator >
  );
}