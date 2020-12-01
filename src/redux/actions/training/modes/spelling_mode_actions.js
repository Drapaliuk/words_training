// import { spellingTrainingAPI } from '../../../../../API/training/modes/index';
import { spellingTrainingAPI } from '../../../../API/training/modes/index';

import { SELECTING_TASK_VARIANT_TRAINING_ID_002, DELETE_LETTER, CLEAR_SPLITTED_ANSWER_WORD,
         HINT, GET_TASKS, INITIALIZATION_TRAINING_ID_002, FINISH_TRAINING_ID_002,
         NEXT_TASK_TRAINING_ID_002, CREATE_STATISTICS_OBJECT_TRAINING_ID_002,
         SKIP_TASK_TRAINING_ID_002 } from '../../../action_types/index'


export const deleteLetter = () => ({ type: DELETE_LETTER });
export const hint = () => ({ type: HINT });
export const initializationTrainingID002 = () => ({type: INITIALIZATION_TRAINING_ID_002});
export const nextTaskTrainingId002 = () => ({ type: NEXT_TASK_TRAINING_ID_002 });
export const skipTask_TrainingId002 = () => ({ type: SKIP_TASK_TRAINING_ID_002 }); 
export const createTaskStatisticsObject_TrainingId002 = () => ({type: CREATE_STATISTICS_OBJECT_TRAINING_ID_002})
export const finishTraining = () => ({ type: FINISH_TRAINING_ID_002 });
export const clearSplittedAnswerWord = () => ({type: CLEAR_SPLITTED_ANSWER_WORD});

export const selectingVariant = (selectedVariant) => {
    return {type: SELECTING_TASK_VARIANT_TRAINING_ID_002, selectedVariant}
};

export const fetchTasks = (selectedWordsIds, applicationLanguage) => dispatch => {
    console.log('get task')
    spellingTrainingAPI.fetchTasks(selectedWordsIds, applicationLanguage)
                       .then(response => {
                           dispatch ({type: GET_TASKS, serverPayload: response.data})
                       });
};