import { wordSetsAPI } from '../../DAL/api';
import {  
          DELETE_SELECTED_WORD, CREATE_EDUCATION_PLANS, FETCHING_WORDS, CLEAR_SELECTED_WORDS, SELECTING_TRAINING_MODE,
          SELECTING_WORD,  FETCHING_WORD_SETS_NAMES, COLLECTING_COMMON_STATISTICS, CLEAR_SELECTED_WORDS_CURRENT_WORD_SET,
          SELECTING_FULL_KIT, NEXT_TASK_COMMON, SKIP_TASK_COMMON, INITIALIZATION_CURRENT_TRAINING_MODE,
          UNSELECTING_WORD, UNSELECTING_FULL_KIT, EXIT_FROM_TRAINING,
          REVIEW_PREVIOUS_TASKS 
        } from '../action_types/index';

export const exitFromTraining = trainingId => ({type: EXIT_FROM_TRAINING, trainingId});
export const reviewPreviousTasks = taskNumber => ({type: REVIEW_PREVIOUS_TASKS, taskNumber});
export const selectingWord = payload => ({type: SELECTING_WORD, payload});
export const unSelectingWord = payload => ({type: UNSELECTING_WORD, payload});
export const nextTaskCommon = () => ({type: NEXT_TASK_COMMON});
export const skipTaskCommon = () => ({ type: SKIP_TASK_COMMON }); 
export const clearSelectedWords = () => ({type: CLEAR_SELECTED_WORDS});
export const selectingAllWords = () => ({type: SELECTING_FULL_KIT});
export const unSelectingFullWordsKit = () => ({type: UNSELECTING_FULL_KIT});

export const collectingCommonStatistics = trainingId => { 
    return { type: COLLECTING_COMMON_STATISTICS, trainingId }
};

export const initializationCurrentTrainingModeId = trainingId => {
    return {type: INITIALIZATION_CURRENT_TRAINING_MODE, trainingId};
};

export const selectingTrainingMode = selectedTrainingModeId => {
    return {type: SELECTING_TRAINING_MODE, payload:selectedTrainingModeId }
};

export const clearSelectedWordCurrenWordSet = () => {
    return {type: CLEAR_SELECTED_WORDS_CURRENT_WORD_SET}
};

export const deleteSelectedWord = payload => {
    return {type: DELETE_SELECTED_WORD, payload}
};

export const createEducationPlan = selectedWords => {
    return (dispatch) => {
        wordSetsAPI.createEducationPlan(selectedWords)
                   .then(({data}) => {
                       dispatch({type: CREATE_EDUCATION_PLANS, serverPayload: data})
                   })
    }
};

export const fetchingWords = setName => { //! RENAME
    return (dispatch) => {
        wordSetsAPI.getWordSets(setName)
                   .then((resp) => {
                       dispatch({type: FETCHING_WORDS, initialisedWords: resp.data})  ////!
                   })
    }
};

export const fetchingWordSetsNames = () => { //fetchingSetsList
    return (dispatch) => {
        wordSetsAPI.getWordSetsName()
                   .then((resp) => {
                       dispatch({type: FETCHING_WORD_SETS_NAMES, payload: resp.data})
                   })
    }
};