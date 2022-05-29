import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import styles from '../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ApplicationProvider, Layout, Input, Button, Card } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';


export default function LoginScreen({ navigation }) {
    const [credential, setCredential] = useState({})

 const handleOnSubmit = async (values) => {
        if(!values){
            console.log('value yok!')
        }
        console.log(values, 'is-this-working')

        await Keychain.resetGenericPassword().catch(err => console.error(err))

        axios.post('http://192.168.78.212:8080/api/user/login', {
            username: values.username,
            password: values.password
        }).then((response) => {
           
            if (response.data) {
                axios.defaults.headers.common['Authorization'] = response.data.token;
                setCredential(response.data)
                console.log(credential, 'LOGIN-CREDENTIALs') 
            
            }
        }).catch((err) => {
            console.error(err, 'HATA-Axios')
        })
        
       await Keychain.setGenericPassword(credential.username, credential.token,{})
        navigation.navigate('MainMenu')
    }

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={handleOnSubmit}
            >

                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <Layout style={styles.mainContainer}>

                        <Card style={styles.card} header={<Text><FontAwesome5 color={'dodgerblue'} size={24} name={'key'}/></Text>} status='primary'>
                            <Input onChangeText={handleChange('username')} style={styles.textInput} label={'Kullanıcı Adı'} status={'primary'} />

                            <Input secureTextEntry={true}  textContentType='password' style={styles.textInput} onChangeText={handleChange('password')} label={'Şifre'} status={'primary'} />
                            <Button onPress={handleSubmit} style={styles.actionButton} size='large' accessoryRight={<FontAwesome5 size={24} name="unlock" />}>
                                Giriş Yap
                            </Button>

                        </Card>

                    </Layout>)}
            </Formik>
        </ApplicationProvider >
    );
}