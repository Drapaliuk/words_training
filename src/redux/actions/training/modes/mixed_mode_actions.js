import { mixedModeAPI } from '../../../../API/training/modes/index';
import { FETCHING_MIXED_TASKS } from '../../../action_types/index';

export const fetchingMixedTasks = (selectedWordsIds, applicationLanguage, selectedLanguagePair) => dispatch => {
    mixedModeAPI.fetchTasks(selectedWordsIds, applicationLanguage, selectedLanguagePair)
               .then(response => {
                   dispatch({type: FETCHING_MIXED_TASKS, serverPayload: response.data})
               })
};