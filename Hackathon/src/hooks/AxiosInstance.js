import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const AxiosInstance=()=>{
    const getToken = async() => {
        return await Keychain.getGenericPassword().password
    }
    const token = getToken()
    if (!token) {
        console.error("There is no token wtf")
    }
    const instance=axios.create({
        baseURL:'http://192.168.78.212:8080',
        timeout:1000,
        headers:{'Authorization' : token}
    });
    return instance 
        
}
export default AxiosInstance;