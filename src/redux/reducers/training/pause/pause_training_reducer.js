import { FETCHED_PAUSED_TRAININGS_LIST, WRITE_COMMENT,
         OPEN_PAUSED_TRAINING_COMMENT_FIELD, EXIT_FROM_TRAINING,
         OPEN_EXIT_TRAINING_WINDOW,
         CLOSE_EXIT_TRAINING_WINDOW, DELETE_PAUSED_TRAINING,
         CLOSE_PAUSED_TRAINING_COMMENT_FIELD} from '../../../action_types/index';

const initialState = {
    pausedTrainingList: [],
    comment: '',
    isOpenCommentField: false,
    isOpenExitWindow: false
}

export const pauseTrainingReducer = function(prevState = initialState, action) {
    switch(action.type) {

        case DELETE_PAUSED_TRAINING:
            return {
                ...prevState,
                pausedTrainingList: prevState.pausedTrainingList.filter(el => el._id !== action.deletedPausedTrainingId)
            }

        case OPEN_EXIT_TRAINING_WINDOW:
            return {
                ...prevState,
                isOpenExitWindow: true
                
            }
        
        case CLOSE_EXIT_TRAINING_WINDOW:
            return {
                ...prevState,
                isOpenExitWindow: false
            }

        case EXIT_FROM_TRAINING:
            return {
                ...prevState,
                isOpenExitWindow: false,
                isOpenCommentField: false,
                comment: ''
            }

        case OPEN_PAUSED_TRAINING_COMMENT_FIELD: 
            return {
                ...prevState,
                isOpenCommentField: !prevState.isOpenCommentField
            }

        case CLOSE_PAUSED_TRAINING_COMMENT_FIELD:
            return {
                ...prevState,
                isOpenCommentField: false,
                comment: ''
            }
        case FETCHED_PAUSED_TRAININGS_LIST:
            return {
                ...prevState,
                pausedTrainingList: [...action.serverPayload]
            }

        case WRITE_COMMENT: 
            return {
                ...prevState,
                comment: action.text
            }
        default: 
            return prevState
    }
    
}