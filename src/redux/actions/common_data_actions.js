import { wordSetsAPI } from '../../DAL/api';
import {  DELETE_SELECTED_WORD, CREATE_EDUCATION_PLANS, FETCHING_WORDS, CLEAR_SELECTED_WORDS, SELECTING_TRAINING_MODE,
          SELECTING_WORD,  FETCHING_WORD_SETS_NAMES, COLLECTING_COMMON_STATISTICS, CLEAR_SELECTED_WORDS_CURRENT_WORD_SET,
          SELECTING_FULL_KIT, NEXT_TASK_COMMON, SKIP_TASK_COMMON, INITIALIZATION_CURRENT_TRAINING_MODE,
          UNSELECTING_WORD, CREATE_VARIANT_LIST, UNSELECTING_FULL_KIT } from '../action_types/index';


export const selectingTrainingMode = function(selectedTrainingModeId) {
    return {type: SELECTING_TRAINING_MODE, payload:selectedTrainingModeId }
}

export const clearSelectedWordCurrenWordSet = function() {
    return {type: CLEAR_SELECTED_WORDS_CURRENT_WORD_SET}
}

export const clearSelectedWords = function() {
    return {type: CLEAR_SELECTED_WORDS}
}

export const deleteSelectedWord = function(payload) {
    return {type: DELETE_SELECTED_WORD, payload}
}

export const createEducationPlan = function(selectedWords) {
    return (dispatch) => {
        wordSetsAPI.createEducationPlan(selectedWords)
                   .then(({data}) => {
                       dispatch({type: CREATE_EDUCATION_PLANS, serverPayload: data})
                    //    dispatch({ type: CREATE_VARIANT_LIST })
                   })
    }
}

export const fetchingWords = (setName) => { //! RENAME
    return (dispatch) => {
        wordSetsAPI.getWordSets(setName)
                   .then((resp) => {
                       dispatch({type: FETCHING_WORDS, initialisedWords: resp.data})  ////!
                   })
    }
}



export const selectingWord = (payload) => {
    return {type: SELECTING_WORD, payload}
}

export const unSelectingWord = (payload) => {
    return {type: UNSELECTING_WORD, payload}
}

export const selectingAllWords = () => {
    return {type: SELECTING_FULL_KIT}
}

export const unSelectingFullWordsKit = () => {
    return {type: UNSELECTING_FULL_KIT}
}

export const fetchingWordSetsNames = () => { //fetchingSetsList
    return (dispatch) => {
        wordSetsAPI.getWordSetsName()
                   .then((resp) => {
                       dispatch({type: FETCHING_WORD_SETS_NAMES, payload: resp.data})
                   })
    }
}

export const collectingCommonStatistics = (trainingId) => { 
    return { type: COLLECTING_COMMON_STATISTICS, trainingId }
}

export const nextTaskCommon = () => {
    return {type: NEXT_TASK_COMMON}
}

export const skipTaskCommon = () => ({ type: SKIP_TASK_COMMON }); 
export const initializationCurrentTrainingModeId = trainingId => ({type: INITIALIZATION_CURRENT_TRAINING_MODE, trainingId})