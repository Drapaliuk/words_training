import { combineReducers } from 'redux';
import trainingCommonDataReducer from './trainings/index';
import { educationPlansReducer } from './education_plans/education_plans_reducer';
import { userContentStoreReducer } from './user_content_store/user_content_store_reducer';
import { trainingResultsReducer } from './trainings_results/training_results';
import { reducer as formReducer } from 'redux-form';
import { authorizationReducer } from './authorization/authorization_reducer';
import { personalUserDataReducer } from './personal_user_data/personal_user_data';



export const combinedReducers = combineReducers({
    trainingCommonData: trainingCommonDataReducer,
    educationPlans: educationPlansReducer,
    userContentStore: userContentStoreReducer,
    trainingResults: trainingResultsReducer,
    authorization: authorizationReducer,
    personalUserData: personalUserDataReducer,
    form: formReducer,

})