import Axios from "axios";

export const spellingTrainingAPI = {
    fetchTasks: (selectedWordsIds, applicationLanguage, selectedLanguagePair) => {
        const requestObject = {
            selectedWordsIds,
            applicationLanguage,
            selectedLanguagePair
        }
        let url = 'http://localhost:8888/training/spelling';
        return Axios.post(url, requestObject);
    }
}