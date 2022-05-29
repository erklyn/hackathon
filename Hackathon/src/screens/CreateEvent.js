import React, { useState } from 'react';
import {

    ScrollView,

} from 'react-native';

import styles from '../styles';
import { ApplicationProvider, Layout, Text, Input, Button, Card } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';




export default function CreateEvent({ navigation }) {
    const handleOnSubmit = (values) => {

        console.log('DEGERLER', values)
        axios.post('http://192.168.78.212:8080/secured/eventrequests', {
            userId: 1,
            title: values.title,
            description: values.description,
            peoplelimit: +values.peoplelimit,
            town: values.town,

        })
            .then((response) => {
                console.log(response.data, 'create-event-Axios')
            }).catch((err) => {
                console.error(err, 'HATA-Axios-cevent')
            })

    }

    return (
        <ApplicationProvider {...eva} theme={eva.light} >
            <Formik
                initialValues={{
                    userId: 1,
                    town: '',
                    title: '',
                    description: '',
                    peoplelimit: 0,
                    eventType: ''
                }}
                onSubmit={handleOnSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <Layout style={styles.mainContainer}>
                        <Card style={styles.card} header={<Text>Etkinlik İçeriği</Text>} status='primary'>
                            <Input onChangeText={handleChange('title')} style={styles.textInput} label={'Başlık'} status={'primary'} />
                            <Input onChangeText={handleChange('description')} style={styles.textInput} label={'Açıklama'} status={'primary'} />

                        </Card>

                        <Card style={styles.card} header={<Text>Etkinlik Detaylar</Text>} status='primary'>
                            <Input style={styles.textInput} onChangeText={handleChange('town')} label={'Belediye'} status={'primary'} />
                            <Input style={styles.textInput} onChangeText={handleChange('eventType')} label={'Etkinlik Türü'} status={'primary'} />
                            <Input label={'Kontenjan'} keyboardType='numeric' onChangeText={handleChange('peoplelimit')} status={'primary'} />
                        </Card>
                        <Button onPress={handleSubmit} style={styles.actionButton} size='large' accessoryRight={<FontAwesome5 size={22} name="user" />}>
                            Etkinlik Oluştur
                        </Button>

                    </Layout>)}
            </Formik>
        </ApplicationProvider >

    );
}