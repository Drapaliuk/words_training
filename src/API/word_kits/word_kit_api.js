import Axios from 'axios';

export const wordKitsAPI = {
    getWordSets: (setname) => {
        let url = `http://localhost:8888/wordkits/wordsfortraining?setname=${setname}`;
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