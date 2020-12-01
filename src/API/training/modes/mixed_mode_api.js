import Axios from "axios";

export const mixedModeAPI = {
    fetchTasks: (selectedWordsIds, applicationLanguage, selectedLanguagePair) => {
        const requestObject = {
            selectedWordsIds,
            applicationLanguage,
            selectedLanguagePair
        }
        let url = 'http://localhost:8888/training/mixedmode';
        return Axios.post(url, requestObject)
    },
}