import { wordSetsAPI } from '../../../DAL/api';
import { FETCHING_MIXED_TASKS } from '../../action_types/index';

export const fetchingMixedTasks = selectedWordsIds => dispatch => {
    wordSetsAPI.getMixedTasks(selectedWordsIds)
               .then(response => {
                   dispatch({type: FETCHING_MIXED_TASKS, serverPayload: response.data})
               })
};