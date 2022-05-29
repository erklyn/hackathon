
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,

    useColorScheme,
    TextInput,
    Text,
    View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from '../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ApplicationProvider, Layout, Input, Button, Card } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native';


const slides = [
    {
        key: 1,
        title: '',
        text: 'Spor, Konuşma, Konser gibi\nher türlü etkinliği tek platformdan takip et.',
        color: '#C3CBF4',
        backgroundColor: '#163DF8',
    },
    {
        key: 2,
        title: 'İstediğin türde etkinlik yok mu?',
        text: 'Belediyene başvurarak kendi etkinliğini düzenle',
        color: '#163DF8',
        backgroundColor: '#C3CBF4',
    },

];

_renderDoneButton = () => {
    return (
        <View style={styles.buttonCircle} >
            <FontAwesome5 size={20} name={"check-circle"} solid />
        </View>
    );
};
_renderNextButton = () => {
    return (
        <View style={styles.buttonCircle}>
            <FontAwesome5 size={20} name={"arrow-right"} />
        </View>
    );
};
export default function IntroScreen({ navigation }) {
    const [isLastSlide, setIsLastSlide] = useState(false)

    const nav = useNavigation();
    useEffect(() => {

        Keychain.getGenericPassword().then(({ username, password }) => {
            axios.defaults.headers.common['Authorization'] = password
            if (username) {
                nav.navigate('MainMenu')
            }
        }).catch(err => {
            console.error(err)
        })
    }, [Keychain])
    _renderItem = ({ item }, navigation) => {

        return (
            <ApplicationProvider {...eva} theme={eva.light}>
                <Layout style={[styles.slideContainer, { backgroundColor: item.backgroundColor }]}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.slideTitle, { color: item.color }]} >{item.title}</Text>
                        <Text style={[styles.slideText, { color: item.color }]}>{item.text}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 70, alignItems: 'baseline' }}>
                        {item.key === 2 ? <Button style={{ margin: 10 }} onPress={() => { navigation.navigate('LoginScreen') }} >Giriş Yap</Button> : null}
                        {item.key === 2 ? <Button onPress={() => { navigation.navigate('RegisterScreen') }} >Üye Ol</Button> : null}
                    </View>
                </Layout>
            </ApplicationProvider>
        );
    }
    if (!isLastSlide) {
        return (<AppIntroSlider renderItem={(item) => _renderItem(item, navigation)}
            data={slides}
            activeIndex={1}
            onDone={() => { setIsLastSlide(true) }}
            showDoneButton={false}
            showNextButton={false} />);
    }
}