import {FETCHING_TRAINING_RESULTS} from '../../../action_types/index';


const initialState = {
    trainingResults: []
}

export const trainingResultsReducer = function(previousState = initialState, action) {
    switch(action.type) {
        case FETCHING_TRAINING_RESULTS:
            return {
                ...previousState,
                trainingResults: action.serverPayload
            }

        default:
            return previousState
    }
} 