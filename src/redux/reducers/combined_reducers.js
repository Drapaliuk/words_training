import { combineReducers } from 'redux';
import trainingCommonDataReducer from './training/index';
import { educationPlansReducer } from './knowledge_tests/knowledge_tests_reducer';
import { userContentStoreReducer } from './user_content_store/user_content_store_reducer';
import { trainingResultsReducer } from './training/result/training_results_reducer';
import { reducer as formReducer } from 'redux-form';
import { authorizationReducer } from './authorization/authorization_reducer';
import { personalUserDataReducer } from './personal_user_data/personal_user_data';
import { pauseTrainingReducer } from './training/pause/pause_training_reducer';
import { commonReducer } from './common/common_reducer';
import { profileReducer } from './profile/profile_settings';

export const combinedReducers = combineReducers({
    common: commonReducer,
    trainingCommonData: trainingCommonDataReducer,
    educationPlans: educationPlansReducer,
    userContentStore: userContentStoreReducer,
    trainingResults: trainingResultsReducer,
    authorization: authorizationReducer,
    personalUserData: personalUserDataReducer,
    pausedTrainings: pauseTrainingReducer,
    profile: profileReducer,
    form: formReducer,
})