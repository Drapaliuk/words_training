import { wordTrainingAPI } from '../../../../API/training/modes/index';
import { SELECTING_TASK_VARIANT_TRAINING_ID_001,  NEXT_TASK_TRAINING_ID_001,  CREATE_VARIANT_LIST,
         FIFTY_FIFTY,  FETCH_WORDS_FOR_MIXING, SKIP_TASK_TRAINING_ID_001,
         CREATE_STATISTICS_OBJECT_TRAINING_ID_001, FETCHING_TASK_CARDS } from '../../../action_types/index';

export const selectingVariant  = (selectedVariant) => ({type: SELECTING_TASK_VARIANT_TRAINING_ID_001, selectedVariant });
export const nextTaskTrainingId001 = (wasSkipped) => ({type: NEXT_TASK_TRAINING_ID_001, wasSkipped});
export const initializationTaskStaticsObject_TrainingId001 = () => ({ type: CREATE_STATISTICS_OBJECT_TRAINING_ID_001 });
export const skipTaskTrainingId001 = () => ({type: SKIP_TASK_TRAINING_ID_001});
export const createVariantList = (firstTaskTrueWord) => ({type: CREATE_VARIANT_LIST, firstTaskTrueWord});
export const hinting = () => ({type: FIFTY_FIFTY});
export const mixingWords = () => ({type: CREATE_VARIANT_LIST});

export const fetchingTaskCards = (selectedWordsIds, applicationLanguage, selectedLanguagePair) => dispatch => {
    wordTrainingAPI.fetchTasks(selectedWordsIds, applicationLanguage, selectedLanguagePair)
                   .then(resp => {
                        dispatch({type: FETCHING_TASK_CARDS, serverPayload: resp.data})
                    })
};