import { CREATE_EDUCATION_PLANS, INITIALIZATION_TRAINING_ID_002 } from '../../action_types/index';
import { mixingElement } from '../../../utils/mixers/mixers'; 

export const initializationSplittedAnswerWord = function(store) {
    return (next) => (action) => {
        const isLoaded = store.getState().trainingCommonData.isLoaded
        if(action.type === CREATE_EDUCATION_PLANS && !isLoaded) {
            firstInitialization()
        }

        if(action.type === INITIALIZATION_TRAINING_ID_002 && isLoaded) {
            return reInitialization()
        }

        return next(action)
        
        function firstInitialization() {
            const {dispatch} = store
            const firstWord = action.serverPayload[0]
            const mixedWord = mixingElement([...firstWord[firstWord.answerLang]]);
            dispatch({type: INITIALIZATION_TRAINING_ID_002, middlewarePayload: mixedWord})
        }

        function reInitialization() {
            const state = store.getState()
            const currentWord = state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter][state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter].answerLang]
            const mixedWord = mixingElement([...currentWord]);
            return next({...action, middlewarePayload: mixedWord})
        }


    }
}