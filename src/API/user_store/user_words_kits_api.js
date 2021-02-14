import Axios from 'axios';


export const userWordsKitsAPI = {
    createUserWordsKit: (wordsKit) => {
        let url = 'http://localhost:8888/userstore/userwordkits';
        return Axios.post(url, wordsKit)
    },
    
    fetchUserWordsKit: () => {
        let url = 'http://localhost:8888/userstore/userwordkits';
        return Axios.get(url)
    }
    
}