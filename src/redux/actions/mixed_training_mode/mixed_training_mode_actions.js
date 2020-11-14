import { mixedModeAPI } from '../../../DAL/training/modes/index';
import { FETCHING_MIXED_TASKS } from '../../action_types/index';

export const fetchingMixedTasks = selectedWordsIds => dispatch => {
    mixedModeAPI.getTasks(selectedWordsIds)
               .then(response => {
                   dispatch({type: FETCHING_MIXED_TASKS, serverPayload: response.data})
               })
};