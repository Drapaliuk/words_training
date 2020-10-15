import {    SELECTING_TASK_VARIANT_TRAINING_ID_002,
            DELETE_LETTER,
            HINT,
            INITIALIZATION_TRAINING_ID_002,
            FINISH_TRAINING_ID_002,
            NEXT_TASK_TRAINING_ID_002,
            CREATE_STATISTICS_OBJECT_TRAINING_ID_002,
            SKIP_TASK_TRAINING_ID_002 } from '../action_types/index'

export const selectingVariant = (selectedVariant) => ({ type: SELECTING_TASK_VARIANT_TRAINING_ID_002, selectedVariant });
export const deleteLetter = () => ({ type: DELETE_LETTER });
export const hint = () => ({ type: HINT });
export const initialServiceWord = () => {
    console.log('initialServiceWord')
     return { type: INITIALIZATION_TRAINING_ID_002 }
};
export const nextTaskTrainingId002 = () => ({ type: NEXT_TASK_TRAINING_ID_002 }); // nextTask_TrainingId002
export const skipTask_TrainingId002 = () => ({ type: SKIP_TASK_TRAINING_ID_002 }); 
export const createTaskStatisticsObject_TrainingId002 = () => ({ type: CREATE_STATISTICS_OBJECT_TRAINING_ID_002 })
export const finishTraining = () => ({ type: FINISH_TRAINING_ID_002 });