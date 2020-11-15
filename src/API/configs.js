import Axios from 'axios';
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