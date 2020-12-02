import Axios from 'axios';

export const wordKitsAPI = {
    fetchWordsKit: (kitId) => {
        let url = `http://localhost:8888/wordkits/wordsfortraining?kitId=${kitId}`;
        return Axios.get(url);
    },

    fetchWordsKitsNames: () => {
        let url = `http://localhost:8888/wordkits/all`;
        return Axios.get(url);
    }   
}