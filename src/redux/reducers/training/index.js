import { spelling, spellingState } from './modes/spelling_mode_reducer'; //! додати до назви ...reducer
import { commonData, commonDataState } from './common/common_training_reducer';
import { wordTestReducer, wordTestState } from './modes/word_mode_reducer'; 

let initialState = {
    spellingState: {...spellingState},
    wordTestState: {...wordTestState},
    ...commonDataState
}


const trainingCommonDataReducer = function(state = initialState, action) {
    return { 
            ...commonData(state, action),                                   //! порядок важливий
            spellingState: {...spelling(state, action)},                    //! розібратися з логікою
            wordTestState: {...wordTestReducer(state, action)},
           }                                                                
}

export default trainingCommonDataReducer;