import Axios from "axios";

export const wordSetsAPI = {
        getWordSets: (setname) => {
            let url = `http://localhost:8888/words?setname=${setname}`;
            return Axios.get(url);
        },

        getWordSetsName: () => {
            let url = `http://localhost:8888/setsNames`;
            return Axios.get(url);
        },
        
        getWordsForMixing: (selectedWordsIds) => {
            // let url = `http://localhost:8888/mixWords?selectedset=city&wordsAmmount=2`;
            let url = 'http://localhost:8888/mixWords';
            return Axios.post(url, selectedWordsIds)
            // return Axios.get(url)
        },

        createEducationPlan: (selectedWords, trainingId) => { //потрібно відправляти тільки ід але зараз бекенд до цього не готовий
            let url = `http://localhost:8888/educationPlan`
            return Axios.post(url, selectedWords, trainingId)
        },

        getTaskCards: (selectedWordsIds) => { //це до тренування слів
            console.log('selectedWordsIds', selectedWordsIds)
            let url = 'http://localhost:8888/taskCards';
            return Axios.post(url, selectedWordsIds)
        }

        
}

export const userVocabularyAPI = {
    fetchUserVocabulary: () => {
        let url = 'http://localhost:8888/userVocabulary';
        return Axios.get(url)
    },

    savedWordToUserVocabulary: (savedWord) => {
        let url = 'http://localhost:8888/userVocabulary';
        return Axios.post(url, savedWord)
    },

    deleteWordFromUserVocabular: (word) => {
        let url = 'http://localhost:8888/userVocabulary';
        return Axios.delete(url, word)
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
