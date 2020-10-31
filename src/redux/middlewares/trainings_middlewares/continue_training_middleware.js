import { CONTINUE_TRAINING, CONTINUE_TRAINING_ID002 } from '../../action_types/index';


export const continueTrainingMiddleware = (store) => (next) => (action) => {

    if(action.type === CONTINUE_TRAINING) {
        const state = store.getState();
        const dispatch = store.dispatch

        console.log(action)

        const pausedTrainingId = action.pausedTrainingId;
        const pausedTrainingObject = state.pausedTrainings.pausedTrainingList.find(training => training._id === pausedTrainingId)
        const selectedTrainingModeId = pausedTrainingObject.data.serviceInfo.selectedTrainingModeId;
        const trainingCommonData = {
            ...pausedTrainingObject.data.trainingCommonData
        }
        
        if(selectedTrainingModeId === '002') {
            const spellingTraining = {
                ...pausedTrainingObject.data.spellingTraining
            }
            
            dispatch({type: CONTINUE_TRAINING_ID002, middlewarePayload: spellingTraining});

            return next({type: action.type, middlewarePayload: trainingCommonData})
        }
        
    }

    return next(action)
}