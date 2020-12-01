import Axios from 'axios';

export const mixedModeAPI = {
    fetchTasks: (trainingName, selectedWordsIds, selectedLanguage, selectedLanguagePair) => {

        // const requestObject = sele


        let url = `http://localhost:8888/training/${trainingName}`;
        return Axios.post(url, selectedWordsIds)
    },
}