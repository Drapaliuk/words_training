import { userWordsKitsAPI } from '../../../../API/user_store/index'
import { FETCHING_USER_WORD_SETS, CREATE_WORD_SET } from '../../../action_types/index';

export const fetchingUserWordSets = () => {
    return dispatch => {
        userWordsKitsAPI.fetchUserWordsKit()
                        .then(({data}) => {
                            dispatch({type: FETCHING_USER_WORD_SETS, serverPayload: data})
                        })

    }
};

export const createWordSet = (wordsKit) => {
    return dispatch => {
        console.log('wordsKit', wordsKit)
        userWordsKitsAPI.createUserWordsKit(wordsKit)
                        .then(({data}) => {
                            if(data.responseCode === 1) {
                                dispatch({type: CREATE_WORD_SET, serverPayload:data.payload})
                            }
                        })
    }
};