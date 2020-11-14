import { ADD_WORD_TO_VOCABULARY, DELETE_WORD_FROM_VOCABULARY, UNSELECTING_WORD_FROM_USER_VOCABULARY,
         FETCHING_USER_VOCABULARY, SELECTING_WORD_FROM_USER_VOCABULARY } from '../../action_types/index';
import { userVocabularyAPI } from '../../../DAL/user_store/index';

export const unSelectingWordsFromUserVocabulary = payload => {
    return { type: UNSELECTING_WORD_FROM_USER_VOCABULARY, payload }
};

export const selectingWordsFromUserVocabulary = payload => {
    return {type: SELECTING_WORD_FROM_USER_VOCABULARY, payload }
};

export const fetchingUserVocabulary = userId => {
    return (dispatch) => {
        userVocabularyAPI.fetchUserVocabulary(userId)
                         .then(({data}) => {
                             dispatch({type: FETCHING_USER_VOCABULARY, serverPayload: data})
                        })
    }
};

export const addWordToVocabulary = (wordId, userId) => {
    return dispatch => {
        userVocabularyAPI.savedWordToUserVocabulary(wordId, userId)
                         .then(({data}) => {
                             console.log('data', data)
                             if(data.responseCode === 1) {
                                    dispatch({type: ADD_WORD_TO_VOCABULARY, wordId})
                             }
                         })
    } 
};

export const deleteWordFromVocabulary = (wordId, userId) => {
    return dispatch => {
        userVocabularyAPI.deleteWordFromUserVocabulary(wordId, userId)
                         .then(({data}) => {
                            if(data.responseCode === 1) {
                                dispatch({type: DELETE_WORD_FROM_VOCABULARY, serverPayload: data.deletedWordId});
                            }
                         })
        }
};