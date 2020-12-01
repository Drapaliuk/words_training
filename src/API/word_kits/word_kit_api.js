import Axios from 'axios';

export const wordKitsAPI = {
    getWordSets: (kitId) => {
        let url = `http://localhost:8888/wordkits/wordsfortraining?kitId=${kitId}`;
        return Axios.get(url);
    },

    getWordSetsName: () => {
        let url = `http://localhost:8888/wordkits/all`;
        return Axios.get(url);
    },

    createWordSet: (words) => {
        let url = 'http://localhost:8888/userWordSet';
        return Axios.post(url, words)
    },
    
    fetchingUserWordSets: () => {
        let url = 'http://localhost:8888/userWordSet';
        return Axios.get(url)
    }
        
}