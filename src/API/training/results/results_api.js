import Axios from 'axios';

export const trainingResultsAPI = {
    postTrainingStatistics: (traininingStatistics) => {
        let url = 'http://localhost:8888/training/results';
        return Axios.post(url, traininingStatistics)
    }
}