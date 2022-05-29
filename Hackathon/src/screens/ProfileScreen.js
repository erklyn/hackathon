import React, { useState, useEffect } from 'react';
import {
TouchableOpacity,
    ScrollView,
    View

} from 'react-native';

import styles from '../styles';
import { ApplicationProvider, ViewPager, Layout, Text, Input, Button, Card, ListItem,List } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';




export default function ProfileScreen({ route, navigation }) {
    const [user, setUser] = useState({})
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const fetchUser = (username) => {

        axios.get(`http://192.168.78.212:8080/secured/user/${username}`)
            .then((response) => {
                console.log(response.data, 'EVENTSTATE')
                if (response.data) {
                    setUser(response.data)
                    console.log('EVENTDATA', user)
                }


            }).catch((err) => console.log(err, 'AXIOS-SINGLE-EVENT-ERROR'))
    }

    useEffect(() => {
        Keychain.getGenericPassword().then(({ username, password }) => {
            fetchUser(username)
        }).catch(err => {
            console.err(err)
        })

    }, [Keychain])

    const nav=useNavigation()
    const headerView = () => {
        return (
            <View style={{ flexDirection: 'row', flex: 1, margin: 15, alignItems: 'center' }}>
                <FontAwesome5 style={{ flex: 1 }} color='dodgerblue' size={36} name="user" />
                <Text style={{ flex: 4, alignItems: 'center', fontSize: 36, }}>
                    {user.username}
                </Text>
                <Button onPress={()=>{
                    Keychain.resetGenericPassword().catch(err=>console.log(err))
                    nav.navigate('IntroScreen')
                    
                }} status={'danger'} > Çıkış Yap <FontAwesome5 size={18} name={'times'}/></Button>
            </View>
        )
    }
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('DetailEvent',{ID:item.ID,isBtnDisabled:true})} style={{backgroundColor:'red',margin:10,padding:10,width:100,borderRadius:8}}>
            <FontAwesome5 name={'calendar'} size={24} color='black'/>
            <Text>{item.title}</Text>
        </TouchableOpacity>
      );
      const renderItem2 = ({ item, index }) => (
        <TouchableOpacity style={{backgroundColor:'orange',margin:10,padding:10,width:100,borderRadius:8}}>
            <FontAwesome5 name={'clock'} size={24} color='black'/>
            <Text>{item.title}</Text>
        </TouchableOpacity>
      );
    return (
        <ApplicationProvider {...eva} theme={eva.light} >

            <Layout style={styles.mainContainer}>

                <ScrollView>
                    <Card style={styles.card} header={headerView} status='primary'>
                        <Input value={user.name} disabled style={styles.textInput} label={'Başlık'} status={'primary'} />
                        <Input value={user.surname} disabled style={styles.textInput} label={'Açıklama'} status={'primary'} />

                    </Card>


                    <Layout>
                        <Layout
                            level='2'
                            >
                            <Text category='h5'>Etkinlik İsteklerim</Text>
                            <List horizontal={true} renderItem={renderItem2}
                            data={user.eventRequests}/>

                        
                        </Layout>
                        <Layout
                            level='2'
                            >
                            
                            <Text category='h5'>Etkinlikler</Text>
                            <List horizontal={true}  renderItem={renderItem}
                            data={user.events}/>
                        </Layout>
                    </Layout>

                </ScrollView>
            </Layout>

        </ApplicationProvider >

    );
}