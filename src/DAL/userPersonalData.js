import Axios from 'axios';

export  const getUserPersonalData = (userId) => {
    let url = `http://localhost:8888/userbiography?userid=${userId}`
    return Axios.get(url)
}