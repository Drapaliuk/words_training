import { CONTINUE_TRAINING, CONTINUE_TRAINING_ID002, CONTINUE_TRAINING_ID001 } from '../../action_types/index';


export const continueTrainingMiddleware = (store) => (next) => (action) => {
    if(action.type === CONTINUE_TRAINING) {
        console.log('----=-=-=-=-=-=-', action.serverPayload)
        const state = store.getState();
        const dispatch = store.dispatch

        // const pausedTrainingId = action.pausedTrainingId;
        // const pausedTrainingObject = state.pausedTrainings.pausedTrainingList.find((training) => training._id === pausedTrainingId)
        const pausedTrainingObject = action.serverPayload.data;
        console.log('pausedTrainingObject', pausedTrainingObject)
        const selectedTrainingModeId = action.serverPayload.serviceInfo.selectedTrainingModeId;
        
        const trainingCommonData = {
            ...pausedTrainingObject.trainingCommonData
        }

        console.log('training com dsta', trainingCommonData)

        if(selectedTrainingModeId === '001') {
            const middlewarePayload = {
                wordTestState: {
                    ...pausedTrainingObject.wordTestState
                }
            }

            dispatch({type: CONTINUE_TRAINING_ID001, middlewarePayload});
            
        }
        
        if(selectedTrainingModeId === '002') {
            const middlewarePayload = {
                spellingTraining: {
                    ...pausedTrainingObject.spellingTraining
                }
            }
            
            dispatch({type: CONTINUE_TRAINING_ID002, middlewarePayload});
        }

        if(selectedTrainingModeId === '003') {
            const middlewarePayload = {
                spellingTraining: {
                    ...pausedTrainingObject.spellingTraining
                },
                wordTestState: {
                    ...pausedTrainingObject.wordTestState
                }
            }

            dispatch({type: CONTINUE_TRAINING_ID001, middlewarePayload});
            dispatch({type: CONTINUE_TRAINING_ID002, middlewarePayload});

        }

        return next({type: action.type, middlewarePayload: trainingCommonData})
        
    }

    return next(action)
}