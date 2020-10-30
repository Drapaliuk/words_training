import { trainingPauseAPI } from '../../../../DAL/training/training_pause/training_pause_api';
import { PAUSE_TRAINING, FETCHED_PAUSED_TRAININGS_LIST } from '../../../action_types/index';


export const makePausedTraining = (userId, pausedTrainingData) => (dispatch) => {
    trainingPauseAPI.savePausedTraining(userId, pausedTrainingData)
                    .then(({data}) => {
                        const {responseCode} = data;
                        console.log(data)
                        if(responseCode === 1) {
                            // dispatch({type: PAUSE_TRAINING})
                        }
                    })
}

export const fetchPausedTrainings = (userId) => (dispatch) => {
    trainingPauseAPI.getAllPausedTraining(userId)
                    .then(({data}) => {
                        const { responseCode, serverPayload } = data;
                        console.log(data)
                        if(responseCode === 1) {
                            dispatch({type: FETCHED_PAUSED_TRAININGS_LIST, serverPayload})
                        }
                    }) 
}