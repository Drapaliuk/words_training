import Axios from "axios";

export const trainingPauseAPI = {
    savePausedTraining: (userId, pausedTrainingData) => {
        let url = 'http://localhost:8888/trainingpause';
        const requestObject = {userId, pausedTrainingData}

        return Axios.post(url, requestObject)
    },

    getPausedTraining: (userId, pausedTrainingId) => {
        let url = `http://localhost:8888/trainingpause?userId=${userId}&pausedTrainingId=${pausedTrainingId}`;
        return Axios.get(url)
    },

    deletePausedTraining: (userId, pausedTrainingId) => {
        let url = 'http://localhost:8888/trainingpause';
        const requestObject = {userId, pausedTrainingId};
        
        return Axios.delete(url, {data: requestObject})
    },

    getAllPausedTraining: (userId) => {
        let url = `http://localhost:8888/trainingpause/all?userid=${userId}`;
        return Axios.get(url)
    }
}
