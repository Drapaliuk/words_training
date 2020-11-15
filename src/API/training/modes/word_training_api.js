import Axios from "axios";

export const wordTrainingAPI = {
    getTasks: (selectedWordsIds) => {
        let url = 'http://localhost:8888/training/words';
        return Axios.post(url, selectedWordsIds);
    }
}