import Axios from "axios";

export const mixedModeAPI = {
    getTasks: (selectedWordsIds) => {
        let url = 'http://localhost:8888/training/mixedmode';
        return Axios.post(url, selectedWordsIds)
    },
}