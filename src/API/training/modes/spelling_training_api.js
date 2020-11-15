import Axios from "axios";

export const spellingTrainingAPI = {
    getTasks: (selectedWordsIds) => {
        let url = 'http://localhost:8888/training/spelling';
        return Axios.post(url, selectedWordsIds);
    }
}