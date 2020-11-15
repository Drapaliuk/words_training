import Axios from 'axios';


export const userWordsKitsAPI = {
    createWordSet: (words) => {
        let url = 'http://localhost:8888/userstore/userwordkits';
        return Axios.post(url, words)
    },

    
    fetchingUserWordSets: () => {
        let url = 'http://localhost:8888/userstore/userwordkits';
        return Axios.get(url)
    }

}