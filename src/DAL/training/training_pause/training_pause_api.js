import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://localhost:8888/training/pause'
})

export const trainingPauseAPI = {
    savePausedTraining: (userId, pausedTrainingData) => {
        const endpoint = '/';
        const requestObject = {userId, pausedTrainingData}

        return instance.post(endpoint, requestObject)
    },

    getPausedTraining: (userId, pausedTrainingId) => {
        const endpoint = `?userId=${userId}&pausedTrainingId=${pausedTrainingId}`;
        return instance.get(endpoint)
    },

    deletePausedTraining: (userId, pausedTrainingId) => {
        const endpoint = '/';
        const requestObject = {userId, pausedTrainingId};
        
        return instance.delete(endpoint, {data: requestObject})
    },

    getAllPausedTraining: userId => {
        const endpoint = `all?userid=${userId}`;
        return instance.get(endpoint)
    }
}