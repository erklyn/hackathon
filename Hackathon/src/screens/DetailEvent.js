import React, { useState, useEffect } from 'react';
import {

    ScrollView,

} from 'react-native';

import styles from '../styles';
import { ApplicationProvider, Layout, Text, Input, Button, Card } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';





export default function DetailEvent({ route, navigation }) {
    const [event, setEvent] = useState({})
    
    const [userId, setUserId] = useState()
    const[isBtnDisabled,setIsBtnDisabled]=useState(false)

    useEffect(() => {
        
        Keychain.getGenericPassword().then(({ username, password }) => {
            axios.get(`http://192.168.78.212:8080/secured/userId/${username}`)
                .then((res) => {
                    setUserId(res.data.userID)
                }).catch(err => console.log(err))
        }).catch(err => {
            console.err(err)
        })


        fetchEvent()
        if(route.params.isBtnDisabled){
            setIsBtnDisabled(true)
        }
    }, [Keychain,isBtnDisabled,route])

    const joinAttend = () => {

        
        if (event.attendees.length <= event.peoplelimit) {
            

            console.log(userId, 'dasdasdasd')
            axios.post(`http://192.168.78.212:8080/secured/attend/event`,
                {
                    userId: userId,
                    eventId: event.ID
                }).catch(err => console.log(err))

        }
        setIsBtnDisabled(true)
    }

    const fetchEvent = () => {
        const id = route.params.ID
        
        axios.get(`http://192.168.78.212:8080/secured/events/${id}`)
            .then((response) => {
                console.log(response.data, 'EVENTSTATE')
                if (response.data) {
                    setEvent(response.data)
                    console.log('EVENTDATA', event)
                }

                
            }).catch((err) => console.log(err, 'AXIOS-SINGLE-EVENT-ERROR'))
            //isAttendedAlready();
    }

    const isAttendedAlready = () => {
        console.log('stateid', userId)
        if (event) {
           event.attendees.includes(userId)?setIsBtnDisabled(false):setIsBtnDisabled(true)
        }
        //console.log(,'denemeverisi')
    }
    return (
        <ApplicationProvider {...eva} theme={eva.light} >

            <Layout style={styles.mainContainer}>

                <ScrollView>
                    <Card style={styles.card} header={<Text>Etkinlik İçeriği</Text>} status='primary'>
                        <Input value={event.title} disabled style={styles.textInput} label={'Başlık'} status={'primary'} />
                        <Input value={event.description} disabled style={styles.textInput} label={'Açıklama'} status={'primary'} />

                    </Card>

                    <Card style={styles.card} header={<Text>Etkinlik Detaylar</Text>} status='primary'>
                        <Input style={styles.textInput} value={event.town} disabled label={'Belediye'} status={'primary'} />
                        <Input style={styles.textInput} disabled value={event.eventType} label={'Etkinlik Türü'} status={'primary'} />
                        <Input value={`${event.peoplelimit}`} disabled label={'Kontenjan'} status={'primary'} />
                    </Card>
                    {!isBtnDisabled?
                    <Button style={styles.actionButton} onPress={joinAttend} size='large' accessoryRight={<FontAwesome5 size={22} name="plus" />}>
                        Katıl
                    </Button>:null}

                </ScrollView>
            </Layout>

        </ApplicationProvider >

    );
}