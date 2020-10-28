import { trainingPauseAPI } from '../../../../DAL/training/training_pause/training_pause_api';
import { PAUSE_TRAINING } from '../../../action_types/index';


export const makePausedTraining = (userId, pausedTrainingData) => (dispatch) => {
    trainingPauseAPI.savePausedTraining(userId, pausedTrainingData)
                    .then(({data}) => {
                        const {responseCode} = data;
                        if(responseCode === 1) {
                            // dispatch({type: PAUSE_TRAINING})
                        }
                    })
}