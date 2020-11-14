import Axios from 'axios';

export const userVocabularyAPI = {
    fetchUserVocabulary: (userid) => {
        let url = `http://localhost:8888/userstore/uservocabulary?userid=${userid}`;
        return Axios.get(url)
    },

    savedWordToUserVocabulary: (wordId, userId) => {
        let url = 'http://localhost:8888/userstore/uservocabulary';
        const requestBody = {
            wordId,
            userId
        }
        return Axios.post(url, requestBody)
    },

    deleteWordFromUserVocabulary: (wordId, userId) => {
        let url = 'http://localhost:8888/userstore/uservocabulary';
        let requestBody = {
            userId,
            wordId
        }
        return Axios.delete(url, {data: requestBody})
    },
}