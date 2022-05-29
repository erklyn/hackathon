import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    
        
    },
    slideContainer: {
        color: '#000',
        flex: 1,
    },
    slideText: {
        color: 'black',
        fontSize:30,
        textAlign:'center',
        margin:10
    },
    slideTitle:{
        fontSize:48,
        margin:10,
        textAlign:'center'
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        marginTop:10
        
    },
    inputLabel: {
        color: 'black',

    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        margin: 5
    },
    actionButton: {
        margin:20,
    },
    card:{
        marginTop:10
    },
    listItem:{
        
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      menuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      menuItemsCard: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      circleContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
      }
});
export default styles
