import * as Keychain from 'react-native-keychain';

export default  getValue = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {

            return credentials;
        }
        console.error("sa ama credential")
    } catch (error) {
        console.error("sa ama catch")

    }
}