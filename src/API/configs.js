import Axios from 'axios';
import { localStorageManipulator } from '../utils';


Axios.interceptors.request.use(function(requestData) {
    console.log('config', requestData)
    const authToken = localStorageManipulator.getAuthToken()
    console.log('Auth token', authToken)
    return requestData
}, function(err) {
    return err
})

console.log('AXios', )


export const instanceCreator = function(endpoints, options) {
    let url = 'http://localhost:8888';

    if(typeof endpoints === 'string') {
        url = url + '/' + endpoints
    }

    if(Array.isArray(endpoints)) {
        endpoints.forEach(el => url = url + '/' + el)
    }
    
    return Axios.create({
        baseURL: url,
        timeout: 10000,
        ...options
    })
}