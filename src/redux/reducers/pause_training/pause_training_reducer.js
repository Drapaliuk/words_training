import {FETCHED_PAUSED_TRAININGS_LIST} from '../../action_types/index';

const initialState = {
    pausedTrainingsList: []
}

export const pauseTrainingReducer = function(prevState = initialState, action) {
    switch(action.type) {
        case FETCHED_PAUSED_TRAININGS_LIST:
            return {
                pausedTrainingList: [...action.serverPayload]
            }
        default: 
            return prevState
    }
    
}