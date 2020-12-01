import Axios from "axios";

export const wordTrainingAPI = {
    fetchTasks: (selectedWordsIds, applicationLanguage, selectedLanguagePair) => {
        const requestObject = {
            selectedWordsIds,
            applicationLanguage,
            selectedLanguagePair
        }
        let url = 'http://localhost:8888/training/words';
        return Axios.post(url, requestObject);
    }
}