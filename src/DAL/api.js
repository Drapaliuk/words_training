import Axios from "axios";

export const wordSetsAPI = {
        getMixedTasks: (selectedWordsIds) => {
            let url = 'http://localhost:8888/mixTasks';
            return Axios.post(url, selectedWordsIds)
        },

        getTaskLetter: (selectedWordsIds) => {
            let url = 'http://localhost:8888/taskLatter';
            return Axios.post(url, selectedWordsIds);
        },

        getWordSets: (setname) => {
            let url = `http://localhost:8888/words?setname=${setname}`;
            return Axios.get(url);
        },

        getWordSetsName: () => {
            let url = `http://localhost:8888/setsNames`;
            return Axios.get(url);
        },
        
        getWordsForMixing: (selectedWordsIds) => {
            let url = 'http://localhost:8888/mixWords';
            return Axios.post(url, selectedWordsIds)
        },

        createEducationPlan: (selectedWords, trainingId) => { //потрібно відправляти тільки ід але зараз бекенд до цього не готовий
            let url = `http://localhost:8888/educationPlan`
            return Axios.post(url, selectedWords, trainingId)
        },

        getTaskCards: (selectedWordsIds) => { //це до тренування слів
            let url = 'http://localhost:8888/taskCards';
            return Axios.post(url, selectedWordsIds);

        }

        
}

export const userVocabularyAPI = {
    fetchUserVocabulary: (userid) => {
        let url = `http://localhost:8888/userVocabulary?userid=${userid}`;
        return Axios.get(url)
    },

    savedWordToUserVocabulary: (wordId, userId) => {
        let url = 'http://localhost:8888/userVocabulary';
        const requestObject = {
            wordId,
            userId
        }
        return Axios.post(url, requestObject)
    },

    deleteWordFromUserVocabular: (wordId, userId) => {
        let url = 'http://localhost:8888/userVocabulary';
        let requestSendObject = {
            userId,
            wordId
        }
        return Axios.delete(url, {data: requestSendObject})

        
    },

}

export const userWordSetsAPI = {
    createWordSet: (words) => {
        let url = 'http://localhost:8888/userWordSet';
        return Axios.post(url, words)
    },

    
    fetchingUserWordSets: () => {
        let url = 'http://localhost:8888/userWordSet';
        return Axios.get(url)
    }

}



export const vocabularyTestAPI = {
    getVocabularyTest: () =>  {
        let url = 'http://localhost:8888/vocabularyTest'
        return Axios.get(url)
    }
}

export const trainingResultsAPI = {
    postTrainingStatistics: (traininingStatistics) => {
        let url = 'http://localhost:8888/trainingResult';
        return Axios.post(url, traininingStatistics)
    }
}

export const authAPI = {
    logining: (loginData) => {
        let url = 'http://localhost:8888/login'
        return Axios.post(url, loginData)
    },

    signIn: (signInData) => {
        console.log('authApi')
        let url = 'http://localhost:8888/signin';
        return Axios.post(url, signInData)
    }
}
