import { trainingPauseAPI } from '../../../../API/training/training_pause/training_pause_api';
import { PAUSE_TRAINING, OPEN_PAUSED_TRAINING_COMMENT_FIELD,
         FETCHED_PAUSED_TRAININGS_LIST, WRITE_COMMENT,
         OPEN_EXIT_TRAINING_WINDOW, 
         CLOSE_EXIT_TRAINING_WINDOW, LOADING_PAUSED_TRAINING,
         CLOSE_PAUSED_TRAINING_COMMENT_FIELD,
         CONTINUE_TRAINING,
         DELETE_PAUSED_TRAINING} from '../../../action_types/index';

export const writeComment = text => ({type: WRITE_COMMENT, text});
export const openCommentField = () => ({type: OPEN_PAUSED_TRAINING_COMMENT_FIELD});
export const closeCommentField = () => ({type: CLOSE_PAUSED_TRAINING_COMMENT_FIELD});
export const openExitWindow = () => ({type: OPEN_EXIT_TRAINING_WINDOW});
export const closeExitWindow = () => ({type: CLOSE_EXIT_TRAINING_WINDOW});

export const makePausedTraining = (userId, pausedTrainingData) => dispatch => {
    trainingPauseAPI.savePausedTraining(userId, pausedTrainingData)
                    .then(({data}) => {
                        const {responseCode} = data;
                        console.log('data')
                        if(responseCode === 1) {
                            // dispatch({type: PAUSE_TRAINING})
                        }
                    })
};

export const fetchPausedTrainings = userId => dispatch => {
    console.log('user_id', userId)
    trainingPauseAPI.fetchAllPausedTrainings(userId)
                    .then(({data}) => {
                        const { responseCode, serverPayload } = data;
                        console.log(data)
                        if(responseCode === 1) {
                            dispatch({type: FETCHED_PAUSED_TRAININGS_LIST, serverPayload})
                        }
                    }) 
};

export const continuePausedTraining = (userId, pausedTrainingId) => dispatch => {
    dispatch({type:LOADING_PAUSED_TRAINING, isLoadingPausedTraining: true})
    trainingPauseAPI.fetchPausedTrainingById(userId, pausedTrainingId)
                    .then(({data}) => {
                        dispatch({type: CONTINUE_TRAINING, serverPayload: data})
                        dispatch({type:LOADING_PAUSED_TRAINING, isLoadingPausedTraining: false})
                    })
};

export const deletePausedTraining = (userId, pausedTrainingId) => dispatch => {
    trainingPauseAPI.deletePausedTraining(userId, pausedTrainingId)
                    .then(({data}) => {
                        const { responseCode, deletedPausedTrainingId } = data;

                        if(responseCode === 1) {
                            dispatch({type: DELETE_PAUSED_TRAINING, deletedPausedTrainingId})
                        }
                    })
};