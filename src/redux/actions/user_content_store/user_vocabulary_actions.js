import { ADD_WORD_TO_VOCABULARY, DELETE_WORD_FROM_VOCABULARY, UNSELECTING_WORD_FROM_USER_VOCABULARY,
        FETCHING_USER_VOCABULARY, SELECTING_WORD_FROM_USER_VOCABULARY } from '../../action_types/index';
import { userVocabularyAPI, userWordSetsAPI } from '../../../DAL/api';


export const unSelectingWordsFromUserVocabulary = (payload) => {
    return { type: UNSELECTING_WORD_FROM_USER_VOCABULARY, payload }
}

export const selectingWordsFromUserVocabulary = (payload) => {
    return {type: SELECTING_WORD_FROM_USER_VOCABULARY, payload }
}

export const fetchingUserVocabulary = () => {
    return (dispatch) => {
        userVocabularyAPI.fetchUserVocabulary()
                         .then(({data}) => {
                             dispatch({type: FETCHING_USER_VOCABULARY, serverPayload: data})
                        })
    }
}

export const addWordToVocabulary = (payload) => {
    return (dispatch) => {
        userVocabularyAPI.savedWordToUserVocabulary()
                         .then(({data}) => {
                             if(data.responseCode === 1) {
                                    dispatch({type: ADD_WORD_TO_VOCABULARY, payload})
                             }
                         })
    } 
}

export const deleteWordFromVocabulary = (payload) => {
    return (dispatch) => {
        userVocabularyAPI.deleteWordFromUserVocabular()
                         .then(({data}) => {
                            if(data.responseCode === 1) {
                                dispatch({type: DELETE_WORD_FROM_VOCABULARY, payload});
                            }
                         })
        }
}

