import Axios from 'axios';

export  const getUserPersonalData = (userId) => {
    let url = `http://localhost:8888/userbiography?userid=${userId}`
    return Axios.get(url)
}

export const postUserPersonalData = (userId, data) => {
    let url = `http://localhost:8888/userbiography`;
    return Axios.post(url, {userId, data})
    
}