import { userWordSetsAPI } from '../../../DAL/api';
import { FETCHING_USER_WORD_SETS, CREATE_WORD_SET } from '../../action_types/index';

export const fetchingUserWordSets = () => {
    return (dispatch) => {
        userWordSetsAPI.fetchingUserWordSets()
                        .then(({data}) => {
                            dispatch({type: FETCHING_USER_WORD_SETS, serverPayload: data})
                        })

    }
}

export const createWordSet = (words) => {
    return (dispatch) => {
        userWordSetsAPI.createWordSet(words)
                        .then(({data}) => {
                            if(data.responseCode === 1) {
                                dispatch({type: CREATE_WORD_SET, serverPayload:data.payload})
                            }
                        })
    }
}