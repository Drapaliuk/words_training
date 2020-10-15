import { spelling, spellingState } from './spelling_test_reducer'; //! додати до назви ...reducer
import { commonData, commonDataState } from './common_data_reducer';
import { wordTestReducer, wordTestState } from '../trainings/word_test_reducer'; 

let initialState = {
    spellingState: {...spellingState},
    wordTestState: {...wordTestState},
    ...commonDataState
}


const trainingCommonDataReducer = function(state = initialState, action) {
    return { 
            ...commonData(state, action),                                   //! порядок важливий
            spellingState: {...spelling(state, action)},
            wordTestState: {...wordTestReducer(state, action)},
           }                                                                
}

export default trainingCommonDataReducer;