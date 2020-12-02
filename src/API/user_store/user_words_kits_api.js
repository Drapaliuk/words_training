import Axios from 'axios';


export const userWordsKitsAPI = {
    createUserWordsKit: (words) => {
        let url = 'http://localhost:8888/userstore/userwordkits';
        return Axios.post(url, words)
    },

    
    fetchUserWordsKit: () => {
        let url = 'http://localhost:8888/userstore/userwordkits';
        return Axios.get(url)
    }

}