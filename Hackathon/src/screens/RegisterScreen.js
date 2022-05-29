import React, { useState } from 'react';
import {

    ScrollView,


} from 'react-native';

import styles from '../styles';
import { ApplicationProvider, Layout, Text, Input, Button, Card } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';



export default function RegisterScreen({ navigation }) {
  
    const asyncOnSubmit = async (values) => {
        console.log(values, 'is-this-working')
        const oldKey = await Keychain.getGenericPassword()
        await Keychain.resetGenericPassword({ service: oldKey.service });
        axios.post('http://192.168.78.212:8080/api/user/register',{
            username:values.username,
            password:values.password,
            name:values.name,
            surname:values.surname,
            email:values.email,
            phone:values.phone,
            adress:values.adress,
            qualifications:values.qualifications
        }).then((response)=>{
            console.log(response.data,'Register-Axios')
        }).catch((err)=>{
            console.error(err,'HATA-Axios')
        })
       
    }
    return (
        <ApplicationProvider {...eva} theme={eva.light} >
            <Formik
                initialValues={{ name: '', surname: '', email: '', 
                username: '', password: '', phone:'',
                qualifications: {university:"" , areaofinterests: ""}, 
                address: '', isAdmin: false }}
                onSubmit={
                    asyncOnSubmit
                }>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <Layout style={styles.mainContainer}>

                        <ScrollView keyboardShouldPersistTaps="handled">
                            <Card style={styles.card} header={<Text>Kişisel Bilgiler</Text>} status='primary'>
                                <Input onChangeText={handleChange('name')} style={styles.textInput} label={'isim'} status={'primary'} />
                               
                                <Input style={styles.textInput} onChangeText={handleChange('surname')} label={'Soyisim'} status={'primary'} />
                                <Input label={'Adres'} onChangeText={handleChange('address')} status={'primary'} />
                                <Input style={styles.textInput} onChangeText={handleChange('phone')} label={'Telefon'} status={'primary'} />

                            </Card>
 
                            <Card style={styles.card} header={<Text>Kullanıcı Girişi</Text>} status='primary'>
                                <Input style={styles.textInput} onChangeText={handleChange('username')} label={'Kullanıcı Adı'} status={'primary'} />
                                <Input style={styles.textInput} onChangeText={handleChange('password')} label={'sifre'} status={'primary'} />
                                <Input label={'Mail'} onChangeText={handleChange('email')} status={'primary'} />
                            </Card>

                            <Card style={styles.card} header={<Text>Deneyim ve İlgi Alanları</Text>} status='primary'>
                                <Input label={'İlgi Alanları'} onChangeText={handleChange('qualifications.areaofinterests')} status={'primary'} />
                                <Input label={'Üniversite'} onChangeText={handleChange('qualifications.university')} status={'primary'} />
                            </Card>
                            <Button onPress={handleSubmit} style={styles.actionButton} size='large' accessoryRight={<FontAwesome5 size={22} name="user" />}>
                                Üye Ol
                            </Button>
                        </ScrollView>
                    </Layout>)}
            </Formik>
        </ApplicationProvider >

    );
}