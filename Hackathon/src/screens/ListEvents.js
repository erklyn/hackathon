import React, { useState, useEffect } from 'react';
import {
    FlatList,
    TouchableOpacity,
    View
} from 'react-native';
import styles from '../styles';

import { ApplicationProvider, Layout, Text, Input, Button, Card, List, ListItem } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';











export default function ListEvents({ navigation }) {

    const [events, setEvents] = useState([])
    const [UC, setUC] = useState({})
    const axiosFetch = () => {
        axios.get('http://192.168.78.212:8080/secured/events')
            .then((response) => {

                console.log(response.data);
                if (response.data) {
                    setEvents(response.data)

                }
            }).catch((err) => {
                console.error(err, 'EventList-err')
            })
    }

    useEffect(() => {
        Keychain.getGenericPassword().then(({ username, password }) => {
            console.log('AAAAAAAAA', username, password)
        }).catch(err => {
            console.err(err)
        })
        axiosFetch()

    }, [Keychain])


    const nav = useNavigation()
    const renderItemAccessory = (props) => (
        <Button onPress={(props) => console.log(props)} size='tiny'>FOLLOW</Button>
    );

    const renderItemIcon = (props) => (
        <FontAwesome5 size={34} color={'black'} name="calendar" />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title}`}
            description={`${item.eventType}`}
            onPress={() => nav.navigate('DetailEvent', { ID: item.ID })}
            accessoryLeft={renderItemIcon}
            style={{margin:10,backgroundColor:'#E3FAF9',borderRadius:10,borderTopEndRadius:30}}
        />
    );

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Layout >


                <List
                    renderItem={renderItem}
                    data={events} />


            </Layout>

        </ApplicationProvider >
    );
}